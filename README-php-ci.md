# Purpose

CI scans workflow for PhP code.

# Workflow Inputs

| Name                               | Description                                                                  | Required | Default        |
| ---------------------------------- | ---------------------------------------------------------------------------- | -------- | -------------- |
| excluded_jobs                      | A string of comma separated jobs that you want to exculude.                  | no       |                |
| docker_build_command               | Docker build command                                                         | no       |                |
| docker_build_image_id              | Docker image ID as mentioned in docker_build_command                         | no       | `local:latest` |
| container_scanners:                | comma-separated list of what security issues to detect (vuln,secret,config)  | no       | `vuln`         |
| container_scan_skip_dirs           | Comma separated list of directories to skip scanning                         | no       |                |
| semgrep_options                    | SEMGREP command options                                                      | no       |                |
| security_scan_before_step_command  | Optional command to execute before secuirty scan job                         | no       |                |
| security_scan_after_step_command   | Optional command to execute after secuirty scan job steps execution          | no       |                |
| container_scan_before_step_command | Optional command to execute before techology based scans job steps execution | no       |                |
| container_scan_after_step_command  | Optional command to execute after techology based scans job steps execution  | no       |                |
| pr_agent_before_step_command       | Optional command to execute before Codium PR agent job steps execution       | no       |                |
| pr_agent_after_step_command        | Optional command to execute after Codium PR agent job steps execution        | no       |                |

# Action variables

> Repository Action Variables to be defined in GitHub UI

| name                                                                | description                                                                                                                                                                                 | example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | required |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `OSV_SUPPRESSIONS` <a name="action_variables_OSV_SUPPRESSIONS"></a> | <ul><li>OSV Dependency IDs to suppress from the scan</li><li>Set this in Repository Action variable.</li><li>To define multiple suppression, define them with empty line between each.</ul> | [[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br>[[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br><ul><li>`id` is OSV Dependency ID you would want to suppress (values can be taken from OSV Report in PR comment)</li><li>In addition to the above mandatory value, date until which to apply suppression can be set using `ignoreUntil = 2022-11-09` (optional)</li></ul> | no       |
| `ALLOWED_LICENSES` <a name="action_variable_ALLOWED_LICENSES"></a>  | List of allowed package licenses. Enter each license in new line                                                                                                                            | Apache-2.0<br>MIT<br>BSD-2-Clause<br>No-Licence<br>Unlicense<br>LGPL-2.1                                                                                                                                                                                                                                                                                                                                                                                                                                                      | no       |

## How To Suppress Vulnerability Findings

- **SAST**
  ref: https://semgrep.dev/docs/ignoring-files-folders-code
- **OSV DEPENDENCY SCAN**
  Ref to [OSV_SUPPRESSIONS](#action_variables_OSV_SUPPRESSIONS) above
- **License Scan**
  Ref to [ALLOWED_LICENSES](#action_variable_ALLOWED_LICENSES) above

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
```

---

### Jobs list:

Jobs & its steps:

- Codium PR Agent
- Container Scan
- Docker Build Check
- Trivy Container Scans
- Security scans
  - SAST Scan
  - Gitleaks scan
  - License Scan
  - Dependency Scan using Google OSV
