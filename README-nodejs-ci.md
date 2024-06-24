# Purpose

CI scans workflow for NodeJS code.

# Workflow Inputs

| Name                                       | Description                                                                 | Required | Default         |
| ------------------------------------------ | --------------------------------------------------------------------------- | -------- | --------------- |
| excluded_jobs                              | A string of comma separated jobs that you want to exculude.                 | no       |                 |
| package_manager                            |
| run_dev_test | A boolen value to enable Developer tests (Unit/Integration/etc.,) are available in your repo code. | no | false |
| dev_test_branch | A string of comma separated branches that you want to run developer tests on. (support list of branches. Ex  `dev,qa` or `uat`) | no | `'qa'` |
| coverage_summary_path | Path to the coverage summary JSON file generated from developer's test | no | `./coverage/coverage-summary.json` |
| junitxml_path  | Path to the JUnit XML report file generated from developer's test | no | `./coverage/report.xml`  |                                                                             | no       | `npm`           |
| npm_token                                  | NPM token                                                                   | no       |                 |
| build_command                              | build command for the project                                               | no       | `npm run build` |
| docker_build_command                       | Docker build command                                                        | no       |                 |
| docker_build_image_id                      | Docker image ID as mentioned in docker_build_command                        | no       | `local:latest`  |
| container_scanners:                        | comma-separated list of what security issues to detect (vuln,secret,config) | no       | `vuln`          |
| container_scan_skip_dirs                   | Comma separated list of directories to skip scanning                        | no       |                 |
| lint_command                               | lint command for the project                                                | no       | `npm run lint`  |
| semgrep_options                            |                                                                             | no       |                 |
| security_scan_before_step_command          | Optional commands to pass before secuirty scan job                          | no       |                 |
| security_scan_after_step_command           | Optional commands to pass after secuirty scan job steps execution           | no       |                 |
| caching_before_step_command                | Optional commands to pass before caching job steps execution                | no       |                 |
| caching_after_step_command                 | Optional commands to pass after caching job steps execution                 | no       |                 |
| technology_based_scans_before_step_command | Optional commands to pass before techology based scans job steps execution  | no       |                 |
| technology_based_scans_after_step_command  | Optional commands to pass after techology based scans job steps execution   | no       |                 |
| pr_agent_before_step_command               | Optional commands to pass before Codium PR agent job steps execution        | no       |                 |
| pr_agent_after_step_command                | Optional commands to pass after Codium PR agent job steps execution         | no       |                 |
| container_scan_before_step_command         | Command to execute at the start of the container scan                       | no       |                 |
| container_scan_after_step_command          | Command to execute at the end of the container scan                         | no       |                 |

# Action variables

> Repository Action Variables to be defined in GitHub UI

| name                                                               | description                                                                                                                                                                                 | example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | required |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `OSV_SUPPRESSIONS` <a name="action_variable_OSV_SUPPRESSIONS"></a> | <ul><li>OSV Dependency IDs to suppress from the scan</li><li>Set this in Repository Action variable.</li><li>To define multiple suppression, define them with empty line between each.</ul> | [[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br>[[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br><ul><li>`id` is OSV Dependency ID you would want to suppress (values can be taken from OSV Report in PR comment)</li><li>In addition to the above mandatory value, date until which to apply suppression can be set using `ignoreUntil = 2022-11-09` (optional)</li></ul> | no       |
| `ALLOWED_LICENSES` <a name="action_variable_ALLOWED_LICENSES"></a> | List of allowed package licenses. Enter each license in new line                                                                                                                            | Apache-2.0<br>MIT<br>BSD-2-Clause<br>No-Licence<br>Unlicense<br>LGPL-2.1                                                                                                                                                                                                                                                                                                                                                                                                                                                      | no       |

## How To Suppress Vulnerability Findings

- **SAST**
  ref: https://semgrep.dev/docs/ignoring-files-folders-code
- **OSV DEPENDENCY SCAN**
  Ref to [OSV_SUPPRESSIONS](#action_variables_OSV_SUPPRESSIONS) above
- **License Scan**
  Ref to [ALLOWED_LICENSES](#action_variable_ALLOWED_LICENSES) above

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
  call-workflow:
    uses: studiographene/github-action-workflows/.github/workflows/nodejs-ci.yml@master # if you want alternatively pin to tag version version
    with:
      package_manager: pnpm
      build_command: pnpm run build
      lint_command: pnpm run lint
      run_dev_test: true   # Set this input only if the Developer tests (Unit/Integration/etc.,) are available in your repo code
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
  - Developer's Test
- Codium PR Agent
