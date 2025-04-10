# Purpose

Terraform scan using [CheckOV](https://github.com/marketplace/actions/checkov-github-action)

# Workflow Inputs

| name                        | description                                                                                                                                                                        | type    | required | default     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ----------- |
| `directories`               | optional: .tf files located directories in JSON Array format to run scan, example "["path/1", "path/2"]". If not defined all the directories containing .tf files will be scanned. | string  | no       | `[.]`       |
| `log_level`                 | set log level. Supported values: `DEBUG`, `WARNING`                                                                                                                                | string  | no       | `WARNING`   |
| `quiet`                     | Whether to display only failed checks                                                                                                                                              | boolean | no       | `true`      |
| `output_format`             | Scan result output format. Can be `cli` and/or one of: `json`, `junitxml`, `github_failed_only`, or `sarif`.                                                                       | string  | no       | `cli,sarif` |
| `download_external_modules` | Whether to download external terraform modules from public git repositories and terraform registry                                                                                 | boolean | no       | `true`      |
| `var_file                   | variable files to load in addition to the default `terraform.tfvars`                                                                                                               | string  | no       |             |

# Action variables

> Repository Action Variables to be defined in GitHub UI

| name                         | description                                              | type   | required |
| ---------------------------- | -------------------------------------------------------- | ------ | -------- |
| `IAC_SCAN_SKIP_CHECKS`       | A string of comma separated check IDs to skip scan       | string | no       |
| `IAC_SCAN_SKIP_CVE_PACKAGES` | A string of comma separated CVE package IDs to skip scan | string | no       |

# How to setup

> To run scan from current directory (also scans sub directories. (Refer to the next example for scan multiple directories scan)

```yaml
name: ci
on:
  pull_request:
    branches: ["main", "master"]

jobs:
  call-worflow:
    uses: studiographene/github-action-workflows/.github/workflows/checkov-terraform-iac-scan.yml@master
    secrets: inherit
```

> To scan specific directories
> This example finds all the top level directories in `./tf/layers` and scans all those directories

```yaml
name: ci
on:
  pull_request:
    branches: ["main", "master"]

jobs:
call-worflow:
  uses: studiographene/github-action-workflows/.github/workflows/checkov-terraform-iac-scan.yml@master # if you want alternatively pin to tag version version
  secrets: inherit
  with:
    directories: ["path/1", "path/2"]
```
