# Purpose

Security scans workflow for CI checks for codes such as NodeJS, NodeJs Mobile, PhP, etc.,.

# Workflow Inputs

| name                              | description                                                        | type   | required | default |
| --------------------------------- | ------------------------------------------------------------------ | ------ | -------- | ------- |
| excluded_jobs                     | Comma-separated list of jobs to be excluded from execution         | string | no       |         |
| semgrep_options                   | SEMGREP command options                                            | string | no       |         |
| security_scan_before_step_command | Optional commands to pass before security scan job steps execution | string | no       |         |
| security_scan_after_step_command  | Optional commands to pass after security scan job steps execution  | string | no       |         |

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
    uses: studiographene/github-action-workflows/.github/workflows/security-scans.yml@master # if you want alternatively pin to tag version version
    with:
      package_manager: pnpm
      build_command: pnpm run build
      lint_command: pnpm run lint
    secrets: inherit
```

---

### Jobs list:

#### Jobs have nested steps which are running the mentioned scans.

- Security scans
  - SAST Scan
  - Gitleaks scan
  - License Scan
  - Dependency Scan using Google OSV
