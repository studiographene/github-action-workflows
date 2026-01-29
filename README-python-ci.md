# Purpose

CI scans workflow for Python code.

# Workflow Inputs

| Name                                              | Description                                                                                                                                                                                                                              | Required | Default         |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| excluded_jobs <a name="inputs_EXCLUDED_JOBS"></a> | A string of comma separated job IDs that you want to exclude from execution. Job IDs that can be used to exclude `lint,sast,gitleaks,license_scan,dependency_scan,build,docker,pr_agent`.                                                | no       | package_manager |
| docker_build_command                              | Docker build command                                                                                                                                                                                                                     | no       |                 |
| docker_build_image_id                             | Docker image ID as mentioned in docker_build_command                                                                                                                                                                                     | no       | `local:latest`  |
| is_monorepo_with_multi_dockerfile                 | For container scan. Whether it is a monorepo with Dockerfile in differnet directories. If `true` repo will be searched for all the Dockerfile and scan performed on each. To scan only selected Docker file use input `dockerfile_paths` | no       | false           |
| dockerfile_paths:                                 | For container scan. Set of separated Dockerfile paths. Useful when you want scan Dockerfile in selected directories. Example: [./apps/users/Dockerfile, ./apps/account/Dockerfile]                                                       | no       |                 |
| container_scanners:                               | comma-separated list of what security issues to detect (vuln,secret,config)                                                                                                                                                              | no       | `vuln`          |
| container_scan_skip_dirs                          | Comma separated list of directories to skip scanning                                                                                                                                                                                     | no       |                 |
| lint_command                                      | lint command for the project                                                                                                                                                                                                             | no       | `npm run lint`  |
| container_scan_before_step_command                | Command to execute at the start of the container scan                                                                                                                                                                                    | no       |                 |
| container_scan_after_step_command                 | Command to execute at the end of the container scan                                                                                                                                                                                      | no       |                 |
| lint_scan_before_step_command                     | Command to execute at the start of the Lint scan                                                                                                                                                                                         | no       |                 |
| lint_scan_after_step_command                      | Command to execute at the end of the Lint scan                                                                                                                                                                                           | no       |                 |
| python_version                                    | Python version to use in the workflow. Default = 3.9                                                                                                                                                                                     | false    | 3.9             |
| linting_job_runner                                | GitHub action Jobs runtime. For example GitHub default runtimes like ubuntu-latest or you custome runtime. Default = ubuntu-latest                                                                                                       | false    | ubuntu-latest   |
| container_scan_job_runner                         | GitHub action Jobs runtime. For example GitHub default runtimes like ubuntu-latest or you custome runtime. Default = ubuntu-latest                                                                                                       | false    | ubuntu-latest   |
| security_scans_job_runner                         | GitHub action Jobs runtime. For example GitHub default runtimes like ubuntu-latest or you custome runtime. Default = ubuntu-latest                                                                                                       | false    | ubuntu-latest   |
| excluded_jobs                                     | comma separated string of job names to exclude from execution, must match the job names in the workflow                                                                                                                                  | false    |                 |
| allowedLicenses                                   | `allowedLicenses` input is deprecated, and not used anymore. You can set allowed licenses using `ALLOWED_LICENSES` in GitHub action variables in UI.                                                                                     | false    |                 |

# Workflow Secrets

| Name | Description | Required | Default |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------ | | - |

# Action variables

> Repository Action Variables to be defined in GitHub UI

| name | description | example | required |
| ---- | ----------- | ------- | -------- |

## How To Suppress Vulnerability Findings

## How To setup:

### CI workflow

In your repo, create a file `ci.yml` under `.github/workflows` folder with below content _(change inputs as required)_.

#### ci.yml

```yaml
name: CI

on:
  pull_request: {}
  issue_comment:

jobs:
  call-workflow:
    uses: studiographene/github-action-workflows/.github/workflows/python-ci.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
```

---

### Jobs list:

#### Jobs have nested steps which are running the mentioned scans.

- Container scan
  - docker build
  - container scan (using [Trivy](https://github.com/aquasecurity/trivy))
- osv
- gitleaks
- license_scan
- lint
