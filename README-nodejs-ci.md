# Purpose

CI scans workflow for NodeJS code.

> This workflow has **pr_agent** job, an automated PR review using [Codium AI PR Agent](https://www.codium.ai/products/git-plugin/). It required OpenAI key defined as GitHub action secret `OPENAI_KEY`. If you prefer not to use `pr_agent` because you do not have OpenAI license or any for other reasons, you can exclude the `pr_agent` job from execution by setting this workflow input `excluded_jobs: "pr_agent"`

# Workflow Inputs

| Name                                              | Description                                                                                                                                                                                | Required | Default         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | --------------- |
| excluded_jobs <a name="inputs_EXCLUDED_JOBS"></a> | A string of comma separated job IDs that you want to exculude from execution. Job IDs that can be used to exclude `lint,sast,gitleaks,license_scan,dependency_scan,build,docker,pr_agent`. | no       |                 |
| package_manager                                   |                                                                                                                                                                                            | no       | npm             |
| npm_token                                         | NPM token                                                                                                                                                                                  | no       |                 |
| build_command                                     | build command for the project                                                                                                                                                              | no       | `npm run build` |
| docker_build_command                              | Docker build command                                                                                                                                                                       | no       |                 |
| docker_build_image_id                             | Docker image ID as mentioned in docker_build_command                                                                                                                                       | no       | `local:latest`  |
| container_scanners:                               | comma-separated list of what security issues to detect (vuln,secret,config)                                                                                                                | no       | `vuln`          |
| container_scan_skip_dirs                          | Comma separated list of directories to skip scanning                                                                                                                                       | no       |                 |
| lint_command                                      | lint command for the project                                                                                                                                                               | no       | `npm run lint`  |
| semgrep_options                                   |                                                                                                                                                                                            | no       |                 |
| security_scan_before_step_command                 | Optional commands to pass before secuirty scan job                                                                                                                                         | no       |                 |
| security_scan_after_step_command                  | Optional commands to pass after secuirty scan job steps execution                                                                                                                          | no       |                 |
| caching_before_step_command                       | Optional commands to pass before caching job steps execution                                                                                                                               | no       |                 |
| caching_after_step_command                        | Optional commands to pass after caching job steps execution                                                                                                                                | no       |                 |
| technology_based_scans_before_step_command        | Optional commands to pass before techology based scans job steps execution                                                                                                                 | no       |                 |
| technology_based_scans_after_step_command         | Optional commands to pass after techology based scans job steps execution                                                                                                                  | no       |                 |
| pr_agent_before_step_command                      | Optional commands to pass before Codium PR agent job steps execution                                                                                                                       | no       |                 |
| pr_agent_after_step_command                       | Optional commands to pass after Codium PR agent job steps execution                                                                                                                        | no       |                 |
| container_scan_before_step_command                | Command to execute at the start of the container scan                                                                                                                                      | no       |                 |
| container_scan_after_step_command                 | Command to execute at the end of the container scan                                                                                                                                        | no       |                 |

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
    secrets: inherit
```

---

### Jobs list:

#### Jobs have nested steps which are running the mentioned scans.

- pr_agent (Automated PR review using [Codium AI PR Agent](https://www.codium.ai/products/git-plugin/) )
- docker
  - docker build
  - container scan (using [Trivy](https://github.com/aquasecurity/trivy))
- Security scans
  - sast (using [SEMGREP](https://semgrep.dev/))
  - gitleaks
  - license_scan
  - dependency_scan (using [Google OSV scanner](https://github.com/google/osv-scanner))
- Technology based scans
  - lint
  - build (code build check)
