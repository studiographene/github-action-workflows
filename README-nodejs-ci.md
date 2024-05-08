# Purpose

CI scans workflow for NodeJS code.

# Workflow Inputs

| Name                                       | Description                                                                 | Required | Default                          |
| ------------------------------------------ | --------------------------------------------------------------------------- | -------- | -------------------------------- |
| excluded_jobs                              | A string of comma separated jobs that you want to exculude.                 | no       |                                  |
| package_manager                            |                                                                             | no       | npm                              |
| npm_token                                  | NPM token                                                                   | no       |                                  |
| build_command                              | build command for the project                                               | no       | `npm run build`                  |
| docker_build_command                       | Docker build command                                                        | no       | `docker build -t local:latest .` |
| docker_build_image_id                      | Docker image ID as mentioned in docker_build_command                        | no       | `local:latest`                   |
| CONTAINER_SCANNERS:                        | comma-separated list of what security issues to detect (vuln,secret,config) | no       | `vuln`                           |
| CONTAINER_SCAN_SKIP_DIRS                   | Comma separated list of directories to skip scanning                        | no       |                                  |
| lint_command                               | lint command for the project                                                | no       | `npm run lint`                   |
| allowedLicenses                            | A file containing allowed licenses name in License scan finding             | no       |                                  |
| semgrep_options                            |                                                                             | no       |                                  |
| security_scan_before_step_command          | Optional commands to pass before secuirty scan job                          | no       |                                  |
| security_scan_after_step_command           | Optional commands to pass after secuirty scan job steps execution           | no       |                                  |
| caching_before_step_command                | Optional commands to pass before caching job steps execution                | no       |                                  |
| caching_after_step_command                 | Optional commands to pass after caching job steps execution                 | no       |                                  |
| technology_based_scans_before_step_command | Optional commands to pass before techology based scans job steps execution  | no       |                                  |
| technology_based_scans_after_step_command  | Optional commands to pass after techology based scans job steps execution   | no       |                                  |
| pr_agent_before_step_command               | Optional commands to pass before Codium PR agent job steps execution        | no       |                                  |
| pr_agent_after_step_command                | Optional commands to pass after Codium PR agent job steps execution         | no       |                                  |
| container_scan_before_step_command         | Command to execute at the start of the container scan                       | no       |                                  |
| container_scan_after_step_command          | Command to execute at the end of the container scan                         | no       |                                  |

## How To setup:

### CI workflow

1. Create a file `ci.yml` with below content (change inputs as required).

#### ci.yml

```yaml
name: CI

on:
  pull_request: {}
  issue_comment:

jobs:
  ci:
    uses: studiographene/github-action-workflows/.github/workflows/nodejs-ci.yml@master # if you want alternatively pin to tag version version
    with:
      package_manager: pnpm
      build_command: pnpm run build
      lint_command: pnpm run lint
    secrets: inherit
    permissions: write-all
```

---

### Jobs list:

#### Jobs have nested steps which are running the mentioned scans.

- Security scans
  - SAST Scan
  - Gitleaks scan
  - License Scan
  - Dependency Scan using Google OSV
- Technology based scans
  - Eslint scan
  - Docker Build
  - Trivy container vulnerability scan
  - Build project
- Codium PR Agent
