# Purpose

CI scans workflow for NodeJS code.

> This workflow has **pr_agent** job, an automated PR review using [Codium AI PR Agent](https://www.codium.ai/products/git-plugin/). It required OpenAI key defined as GitHub action secret `OPENAI_KEY`. If you prefer not to use `pr_agent` because you do not have OpenAI license or any for other reasons, you can exclude the `pr_agent` job from execution by setting this workflow input `excluded_jobs: "pr_agent"`

# Workflow Inputs

| Name                                       | Description                                                                 | Required | Default         |
| ------------------------------------------ | --------------------------------------------------------------------------- | -------- | --------------- |
| excluded_jobs <a name="inputs_EXCLUDED_JOBS"></a> | A string of comma separated job IDs that you want to exclude from execution. Job IDs that can be used to exclude `lint,sast,gitleaks,license_scan,dependency_scan,build,docker,pr_agent`. | no       | package_manager  |
| run_dev_test | A boolen value to enable Developer tests (Unit/Integration/etc.,) are available in your repo code. | no | false |
| dev_test_branch | A string of comma separated branches that you want to run developer tests on. Also, when PR merged to this branch, each commits work breakdown will be computed and sent to Pulse (support list of branches. Ex  `dev,qa` or `uat`) | no | `'qa'` |
| coverage_summary_path                      | Path to the coverage summary JSON file generated from developer's test      | no       | `./coverage/coverage-summary.json` |
| junitxml_path                              | Path to the JUnit XML report file generated from developer's test           | no       | `./coverage/report.xml`  |
| build_command                              | build command for the project                                               | no       | `npm run build` |
| package_install_command                    | Package install command to use instead of the default command               | no       |                 |
| docker_build_command                       | Docker build command                                                        | no       |                 |
| docker_build_image_id                      | Docker image ID as mentioned in docker_build_command                        | no       | `local:latest`  |
| is_monorepo_with_multi_dockerfile          | For container scan. Whether it is a monorepo with Dockerfile in differnet directories. If `true` repo will be searched for all the Dockerfile and scan performed on each. To scan only selected Docker file use input `dockerfile_paths` | no  | false  |
|       dockerfile_paths:                    | For container scan. Set of separated Dockerfile paths. Useful when you want scan Dockerfile in selected directories. Example: [./apps/users/Dockerfile, ./apps/account/Dockerfile] | no  |   |
| container_scanners:                        | comma-separated list of what security issues to detect (vuln,secret,config)                        | no       | `vuln`          |
| container_scan_skip_dirs                   | Comma separated list of directories to skip scanning                                               | no       |                 |
| lint_command                               | lint command for the project                                                                       | no       | `npm run lint`  |
| semgrep_options                            |                                                                                                    | no       |                 |
| caching_before_step_command                | Optional commands to pass before caching job steps execution                                       | no       |                 |
| caching_after_step_command                 | Optional commands to pass after caching job steps execution                                        | no       |                 |
| pr_agent_before_step_command               | Optional commands to pass before Codium PR agent job steps execution                               | no       |                 |
| pr_agent_after_step_command                | Optional commands to pass after Codium PR agent job steps execution                                | no       |                 |
| container_scan_before_step_command         | Command to execute at the start of the container scan                                              | no       |                 |
| container_scan_after_step_command          | Command to execute at the end of the container scan                                                | no       |                 |
| developer_tests_before_step_command        | Command to execute at the start of the Developer tests                                             | no       |                 |
| developer_tests_after_step_command         | Command to execute at the end of the Developer tests                                               | no       |                 |
| lint_scan_before_step_command              | Command to execute at the start of the Lint scan                                                   | no       |                 |
| lint_scan_after_step_command               | Command to execute at the end of the Lint scan                                                     | no       |                 |
| send_dev_test_coverage_report_to_pulse     | Switch deciding to send the Test Coverage Report to Pulse                                          | no       | false           |
| dev_test_coverage_report_directory         | The Directory path from project root where `coverage-summary.json` is generated after running test | false    | `coverage`      |
| PR_TITLE_TYPE                              | OPTIONAL. PR Title conventional types. For multiple types, use pipe | to separate without any space since, it is a regex. Example: `feat|fix|hotfix` | false    | `feat|fix|build|chore|ci|docs|refactor|revert|style|test`      |
| JIRA_PROJECT_PR_TITLE_SCOPE                | OPTIONAL. Jira project abbreviation as seen in Jira tickets. For PR conventional title scope. | false    | `A-Za-z`      |

# Depreciated Inputs

| Name                                       | Description                                                                                                       |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| technology_based_scans_before_step_command | *DEPRECIATED:* only kept to tackle the backwards compatibility to avoid error use the respective new job inputs   |
| technology_based_scans_after_step_command  | *DEPRECIATED:* only kept to tackle the backwards compatibility to avoid error use the respective new job inputs   |
| security_scan_before_step_command          | *DEPRECIATED:* only kept to tackle the backwards compatibility to avoid error use the respective new job inputs   |
| security_scan_after_step_command           | *DEPRECIATED:* only kept to tackle the backwards compatibility to avoid error use the respective new job inputs   |

# Workflow Secrets

| Name                                       | Description                                                                 | Required | Default         |
| ------------------------------------------ | --------------------------------------------------------------------------- | -------- | --------------- |
| `NPM_TOKEN`                                | A GitHub PersonalAccessToken used to access GitHub package regististy. NPM_TOKEN is also passed as Docker build --build-arg. If not defined default GITHUB_TOKEN is used. `Set this key and GitHub PAT with read:packages permission in GitHub Actions Secrets.`   | To authenicate SG's private NPM packages hosted on Github Package Registry     | GITHUB_TOKEN |
| `PULSE_HMAC_SECRET`                        | A secret used to generate HMAC(Hash-based Message Authentication Code) in order for Pulse to verify it the source is a known source or not.  | no       | - |

# Action variables

> Repository Action Variables to be defined in GitHub UI

| name                                                               | description                                                                                                                                                                                 | example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | required |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `OSV_SUPPRESSIONS` <a name="action_variable_OSV_SUPPRESSIONS"></a> | <ul><li>OSV Dependency IDs to suppress from the scan</li><li>Set this in Repository Action variable.</li><li>To define multiple suppression, define them with empty line between each.</ul> | [[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br>[[IgnoredVulns]]<br>id = "GHSA-fx4w-v43j-vc45"<br>reason = "No fix is currently available for this vulnerability."<br><br><ul><li>`id` is OSV Dependency ID you would want to suppress (values can be taken from OSV Report in PR comment)</li><li>In addition to the above mandatory value, date until which to apply suppression can be set using `ignoreUntil = 2022-11-09` (optional)</li></ul> | no       |
| `ALLOWED_LICENSES` <a name="action_variable_ALLOWED_LICENSES"></a> | List of allowed package licenses. Enter each license in new line                                                                                                                            | Apache-2.0<br>MIT<br>BSD-2-Clause<br>No-Licence<br>Unlicense<br>LGPL-2.1
| `COVERAGE_THRESHOLD` <a name="action_variable_COVERAGE_THRESHOLD"></a> | Specifies the minimum acceptable percentage for test coverage. If the test coverage falls below this threshold, the scan will fail.                                                                                                                     |     `70` | no       |
| `PULSE_URL`                                                            | Base URL of Pulse that will be used to send various generated reports to Pulse      | `https://a0lrn1xwl4.execute-api.eu-west-1.amazonaws.com`    | yes                                                                  |

## How To Suppress Vulnerability Findings

- **SAST**
  ref: https://semgrep.dev/docs/ignoring-files-folders-code
- **OSV DEPENDENCY SCAN**
  Ref to [OSV_SUPPRESSIONS](#action_variables_OSV_SUPPRESSIONS) above
- **License Scan**
  Ref to [ALLOWED_LICENSES](#action_variable_ALLOWED_LICENSES) above

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
    uses: studiographene/github-action-workflows/.github/workflows/nodejs-ci.yml@master # if you want alternatively pin to tag version version
    with:
      package_manager: pnpm
      build_command: pnpm run build
      lint_command: pnpm run lint
      run_dev_test: true   # Set this input only if the Developer tests (Unit/Integration/etc.,) are available in your repo code
    secrets: inherit
```

---

### Jobs list:

#### Jobs have nested steps which are running the mentioned scans.

- pr_agent (Automated PR review using [Codium AI PR Agent](https://www.codium.ai/products/git-plugin/) )
- Container scan
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
- Pulse Work Breakdown
- PR Check
