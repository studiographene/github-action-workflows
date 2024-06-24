# Purpose

CI scans workflow for Mobile NodeJS code.

> This workflow has **pr_agent** job, an automated PR review using [Codium AI PR Agent](https://www.codium.ai/products/git-plugin/). It required OpenAI key defined as environment variable `OPENAI_KEY`. If you prefer not to use `pr_agent` because you do not have OpenAI license or any for other reasons, you can exclude the `pr_agent` job from execution by setting this workflow input `excluded_jobs: "pr_agent"`.

# Workflow Inputs

| Name                                              | Description                                                                                                                                                                   | Required | Default         |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- | --- |
| excluded_jobs <a name="inputs_EXCLUDED_JOBS"></a> | A string of comma separated job IDs that you want to exculude from execution. Job IDs that can be used to exclude `lint,sast,gitleaks,license_scan,dependency_scan,pr_agent`. | no       |                 |
| package_manager                                   |                                                                                                                                                                               | no       | npm             |
| npm_token                                         | NPM token                                                                                                                                                                     | no       |                 |
| build_command                                     | build command for the project                                                                                                                                                 | no       | `npm run build` |
| lint_command                                      | lint command for the project                                                                                                                                                  | no       | `npm run lint`  |
| semgrep_options                                   |                                                                                                                                                                               | no       |                 |
| security_scan_before_step_command                 | Optional commands to pass before secuirty scan job                                                                                                                            | no       |                 |
| security_scan_after_step_command                  | Optional commands to pass after secuirty scan job steps execution                                                                                                             | no       |                 |
| caching_before_step_command                       | Optional commands to pass before caching job steps execution                                                                                                                  | no       |                 |
| caching_after_step_command                        | Optional commands to pass after caching job steps execution                                                                                                                   | no       |                 |
| pr_agent_before_step_command                      | Optional commands to pass before Codium PR agent job steps execution                                                                                                          | no       |                 |
| pr_agent_after_step_command                       | Optional commands to pass after Codium PR agent job steps execution                                                                                                           | no       |                 |     |

# Action variables

> Repository Action Variables to be defined in GitHub UI

| name                                                                | description                                                                                                                                                                                 | type   | example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | required |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `OSV_SUPPRESSIONS` <a name="action_variables_OSV_SUPPRESSIONS"></a> | <ul><li>OSV Dependency IDs to suppress from the scan</li><li>Set this in Repository Action variable.</li><li>To define multiple suppression, define them with empty line between each.</ul> | string | [[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br>[[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br><ul><li>`id` is OSV Dependency ID you would want to suppress (values can be taken from OSV Report in PR comment)</li><li>In addition to the above mandatory value, date until which to apply suppression can be set using `ignoreUntil = 2022-11-09` (optional)</li></ul> | no       |
| `ALLOWED_LICENSES` <a name="action_variables_ALLOWED_LICENSES"></a> | List of allowed package licenses. Enter each license in new line                                                                                                                            | string | Apache-2.0<br>MIT<br>BSD-2-Clause<br>No-Licence<br>Unlicense<br>LGPL-2.1                                                                                                                                                                                                                                                                                                                                                                                                                                                      | no       |

## How To Supress Vulnerability Findings

- **SAST**
  ref: https://semgrep.dev/docs/ignoring-files-folders-code
- **OSV DEPENDENCY SCAN**
  Ref to [OSV_SUPPRESSIONS](#action_variables_OSV_SUPPRESSIONS) above
- **License Scan**
  Ref to [ALLOWED_LICENSES](#action_variables_ALLOWED_LICENSES) above

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
    uses: studiographene/github-action-workflows/.github/workflows/mobile-nodejs-ci.yml@master # if you want alternatively pin to tag version version
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
- Codium PR Agent
