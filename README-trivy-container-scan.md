# Purpose

To perform container scan and report vulnerabilities on PR

# Workflow Inputs

| name                            | description                                                                 | type   | required | default                                           |
| ------------------------------- | --------------------------------------------------------------------------- | ------ | -------- | ------------------------------------------------- |
| `action_runner_container_image` | Action runner container image                                               | string | no       | `public.ecr.aws/studiographene/ci:node-20-alpine` |
| `before_step_command`           | Command to execute at the start of the job                                  | string | no       |                                                   |
| `after_step_command`            | Command to execute at the end of the job                                    | string | no       |                                                   |
| `docker_build_command`          | Docker Build command                                                        | string | no       | `docker build -t local:latest .`                  |
| `docker_build_image_id`         | Docker image ID as mentioned in docker_build_command                        | string | no       | `local:latest`                                    |
| `CONTAINER_SCANNERS`            | comma-separated list of what security issues to detect (vuln,secret,config) | string | no       | `vuln`                                            |
| `CONTAINER_SCAN_SKIP_DIRS`      | Comma separated list of directories to skip scanning                        | string | no       |

# Action variables

> Repository Action Secrets to be defined in GitHub UI [Creating secrets for an environment](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository/Creating%20secrets%20for%20a%20repository)

| name      | description                                                                                                                                               | example | required |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| NPM_TOKEN | A GitHub PersonalAccessToken used to access NPM package regististy. NPM_TOKEN is passed as Docker build --build-arg. If not defined GITHUB_TOKEN is used. |         | no       |

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
