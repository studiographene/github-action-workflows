# Purpose

CI scans workflow for PhP code.

# Workflow Inputs

| Name                               | Description                                                                  | Required | Default                          |
| ---------------------------------- | ---------------------------------------------------------------------------- | -------- | -------------------------------- |
| excluded_jobs                      | A string of comma separated jobs that you want to exculude.                  | no       |                                  |
| docker_build_command               | Docker build command                                                         | no       | `docker build -t local:latest .` |
| docker_build_image_id              | Docker image ID as mentioned in docker_build_command                         | no       | `local:latest`                   |
| CONTAINER_SCANNERS:                | comma-separated list of what security issues to detect (vuln,secret,config)  | no       | `vuln`                           |
| CONTAINER_SCAN_SKIP_DIRS           | Comma separated list of directories to skip scanning                         | no       |                                  |
| allowedLicenses                    | A file containing allowed licenses name in License scan finding              | no       |                                  |
| semgrep_options                    | SEMGREP command options                                                      | no       |                                  |
| security_scan_before_step_command  | Optional command to execute before secuirty scan job                         | no       |                                  |
| security_scan_after_step_command   | Optional command to execute after secuirty scan job steps execution          | no       |                                  |
| container_scan_before_step_command | Optional command to execute before techology based scans job steps execution | no       |                                  |
| container_scan_after_step_command  | Optional command to execute after techology based scans job steps execution  | no       |                                  |
| pr_agent_before_step_command       | Optional command to execute before Codium PR agent job steps execution       | no       |                                  |
| pr_agent_after_step_command        | Optional command to execute after Codium PR agent job steps execution        | no       |                                  |

## How To setup:

1. Under `.github/workflows/` directory, create a file `ci.yml` with below content (change inputs as required).

```yaml
name: CI

on:
  pull_request: {}
  issue_comment:

jobs:
  call-workflow:
    uses: studiographene/github-action-workflows/.github/workflows/php-ci.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
    permissions: write-all
```

---

### Jobs list:

Jobs & its steps:

- Codium PR Agent
- Container Scan
- Security scans
  - SAST Scan
  - Gitleaks scan
  - License Scan
  - Dependency Scan using Google OSV
