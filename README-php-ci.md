# Purpose

CI scans workflow for PhP code.

> This workflow has **pr_agent** job, an automated PR review using [Codium AI PR Agent](https://www.codium.ai/products/git-plugin/). It required OpenAI key defined as GitHub action secret `OPENAI_KEY`. If you prefer not to use `pr_agent` because you do not have OpenAI license or any for other reasons, you can exclude the `pr_agent` job from execution by setting this workflow input `excluded_jobs: "pr_agent"`

# Workflow Inputs

| Name                                              | Description                                                                                                                                                                         | Required | Default        |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| excluded_jobs <a name="inputs_EXCLUDED_JOBS"></a> | A string of comma separated job IDs that you want to exclude from execution. Job IDs that can be used to exclude `lint,sast,gitleaks,license_scan,dependency_scan,docker,pr_agent`. | no       |                |
| is_monorepo_with_multi_dockerfile          | For container scan. Whether it is a monorepo with Dockerfile in differnet directories. If `true` repo will be searched for all the Dockerfile and scan performed on each. To scan only selected Docker file use input `dockerfile_paths` | no  | false  |
|       dockerfile_paths:                    | For container scan. Set of separated Dockerfile paths. Useful when you want scan Dockerfile in selected directories. Example: [./apps/users/Dockerfile, ./apps/account/Dockerfile] | no  |   |
| docker_build_command                              | Docker build command                                                                                                                                                                | no       |                |
| docker_build_image_id                             | Docker image ID as mentioned in docker_build_command                                                                                                                                | no       | `local:latest` |
| container_scanners:                               | comma-separated list of what security issues to detect (vuln,secret,config)                                                                                                         | no       | `vuln`         |
| container_scan_skip_dirs                          | Comma separated list of directories to skip scanning                                                                                                                                | no       |                |
| semgrep_options                                   | SEMGREP command options                                                                                                                                                             | no       |                |
| container_scan_before_step_command                | Optional command to execute before techology based scans job steps execution                                                                                                        | no       |                |
| container_scan_after_step_command                 | Optional command to execute after techology based scans job steps execution                                                                                                         | no       |                |
| PR_TITLE_TYPE                              | OPTIONAL. PR Title conventional types. For multiple types, use pipe | to separate without any space since, it is a regex. Example: `feat|fix|hotfix` | false    | `feat|fix|build|chore|ci|docs|refactor|revert|style|test`      |
| JIRA_PROJECT_PR_TITLE_SCOPE                | OPTIONAL. Jira project abbreviation as seen in Jira tickets. For PR conventional title scope. | false    | `A-Za-z`      |

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
    uses: studiographene/github-action-workflows/.github/workflows/php-ci.yml@master # if you want alternatively pin to tag version
    secrets: inherit
```

#### ci.yml (for Monorepo with multiple Dockerfiles to scan every Dockerfile in the repo)

```yaml
name: CI

on:
  pull_request: {}
  issue_comment:

jobs:
  call-workflow:
    uses: studiographene/github-action-workflows/.github/workflows/nodejs-ci.yml@master # if you want alternatively pin to tag version
    with:
      package_manager: pnpm
      build_command: pnpm run build
      lint_command: pnpm run lint
      run_dev_test: true   # Set this input only if the Developer tests (Unit/Integration/etc.,) are available in your repo code
      is_monorepo_with_multi_dockerfile: true
    secrets: inherit
```

---

### Jobs list:

Jobs & its steps:

- docker
  - docker build
  - container scan (using [Trivy](https://github.com/aquasecurity/trivy))
- Security scans
  - sast (using [SEMGREP](https://semgrep.dev/))
  - gitleaks
  - license_scan
  - dependency_scan (using [Google OSV scanner](https://github.com/google/osv-scanner))
- PR Check
