# Purpose

Security scans workflow for CI checks for codes such as NodeJS, NodeJs Mobile, PhP, etc.,.

# Workflow Inputs
| name                                 | description                                                                                   | type   | required | default            |
|--------------------------------------|-----------------------------------------------------------------------------------------------|--------|----------|--------------------|
| excluded_jobs                        | Comma-separated list of jobs to be excluded from execution                                    | string | no       |                    |
| semgrep_options                      | SEMGREP command options                                                                       | string | no       |                    |
| security_scan_before_step_command    | Optional commands to pass before security scan job steps execution                            | string | no       |                    |
| security_scan_after_step_command     | Optional commands to pass after security scan job steps execution                             | string | no       |                    |


# Action variables

> Repository Action Variables to be defined in GitHub UI

| name | description | type | example | required | default |
| --- | --- | --- | --- | --- | --- |
| `OSV_SUPPRESSIONS` | <ul><li>OSV Dependency IDs to suppress from the scan</li><li>Set this in Repository Action variable.</li><li>To define multiple suppression, define them with empty line between each.</ul> | string |[[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br>[[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br><ul><li>`id` is OSV Dependency ID you would want to suppress (values can be taken from OSV Report in PR comment)</li><li>In addition to the above mandatory value, date until which to apply suppression can be set using `ignoreUntil = 2022-11-09` (optional)</li></ul>| no | - |

## To supress SEMGREP scan on a code or file

>ref: https://semgrep.dev/docs/ignoring-files-folders-code

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

