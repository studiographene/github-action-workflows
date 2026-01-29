# Purpose

To perform container scan and report vulnerabilities on PR

> By default `GITHUB_TOKEN` will be used as `NPM_TOKEN` and passed to Docker build arg.
> To use any other token, create an Action secret in the repository with key `NPM_TOKEN`, and make sure this workflow call job has inherits secrets or passess `NPM_TOKEN` secret.

# Workflow Inputs

| name                            | description                                                                | type   | required | default                                           |
| ------------------------------- | -------------------------------------------------------------------------- | ------ | -------- | ------------------------------------------------- |
| `action_runner_container_image` | Action runner container image                                              | string | no       | `public.ecr.aws/studiographene/ci:node-20-alpine` |
| `before_step_command`           | Command to execute at the start of the job                                 | string | no       |                                                   |
| `after_step_command`            | Command to execute at the end of the job                                   | string | no       |                                                   |
| `docker_build_command`          | Optional Docker build command override (must build/load a local image)      | string | no       |                                                   |
| `docker_build_image_id`         | Docker image ID/tag to scan when using `docker_build_command`              | string | no       | `local:latest`                                    |
| `container_scanners`            | A string of comma-separated security issues to detect (vuln,secret,config) | string | no       | `vuln`                                            |
| `container_scan_skip_dirs`      | A string of comma separated directories to skip scanning                   | string | no       |

Notes:

- If `docker_build_command` is not provided, the workflow builds a Docker image archive tar (`trivy-image.tar`) and scans that archive (archive scan is the default path).
- If `docker_build_command` is provided:
  - If your command creates `trivy-image.tar` as a Docker image archive (must contain `manifest.json`), the workflow scans that archive.
  - Otherwise, the workflow scans the local Docker image tag from `docker_build_image_id`.
- Your `docker_build_command` can use these env vars provided by the workflow:
  - `DOCKERFILE_PATH` (current matrix dockerfile)
  - `IMAGE_ID` (same value as `docker_build_image_id`)

# Action variables

> Repository Action Secrets to be defined in GitHub UI [Creating secrets for an environment](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository/Creating%20secrets%20for%20a%20repository)

| name        | description                                                                                                                                               | example | required |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| `NPM_TOKEN` | A GitHub PersonalAccessToken used to access NPM package regististy. NPM_TOKEN is passed as Docker build --build-arg. If not defined GITHUB_TOKEN is used. |         | no       |

# How to setup

```yaml
name: container-scan
on:
  push:
    pull_request: {}

jobs:
  call-worflow:
    uses: studiographene/github-action-workflows/.github/workflows/trivy-container-scan.yml@master # if you want alternatively pin to tag version
    secrets: inherit
    with:
      action_runner_container_image: "public.ecr.aws/studiographene/ci:node-20-alpine" # optional

```

# Example: custom build command (simple Docker image)

This works when you want Trivy to scan by image tag (`image-ref`). Make sure the tag matches `docker_build_image_id`.

```yaml
jobs:
  call-worflow:
    uses: studiographene/github-action-workflows/.github/workflows/trivy-container-scan.yml@master
    secrets: inherit
    with:
      docker_build_image_id: local:latest
      docker_build_command: docker build -t local:latest .
```

If you are scanning multiple Dockerfiles via `dockerfile_paths` (matrix), use the matrix Dockerfile explicitly:

```yaml
with:
  docker_build_image_id: local:latest
  docker_build_command: docker build -f $DOCKERFILE_PATH -t local:latest .
```

# Example: custom build command that outputs an image tar

This works because your build command outputs `trivy-image.tar`, and the workflow auto-detects and scans it.

```yaml
jobs:
  call-worflow:
    uses: studiographene/github-action-workflows/.github/workflows/trivy-container-scan.yml@master
    secrets: inherit
    with:
      dockerfile_paths: '["./Dockerfile.prod.api","./Dockerfile.prod.celery"]'
      docker_build_command: >-
        docker buildx build
        --build-arg NPM_TOKEN=$NPM_TOKEN
        -f $DOCKERFILE_PATH
        --output type=docker,dest=trivy-image.tar
        .
```
