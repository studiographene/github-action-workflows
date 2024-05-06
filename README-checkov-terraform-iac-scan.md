# Purpose

Terraform scan using [CheckOV](https://github.com/marketplace/actions/checkov-github-action)

# Workflow Inputs

|name|description|type|required| default|
|---|--|--|--|--|
|`directory`| .tf files directory where to perform scan|string| no| `.`|
| `log_level` | set log level. Supported values: `DEBUG`, `WARNING` | string | no | `DEBUG`  |
| `skip_check` | comma separated list of check IDs to skip scan | string | no |   |
| `skip_cve_package` | comma separated list of CVE package IDs to skip scan | string | no  |   |
| `quiet` | Whether to display only failed checks | boolean | no | `true`  |
| `output_format` | Scan result output format. Can be `cli` and/or one of: `json`, `junitxml`, `github_failed_only`, or `sarif`.|string | no | `cli,sarif`  |
| `download_external_modules` | Whether to download external terraform modules from public git repositories and terraform registry | boolean |no | `true`  |
| `var_file | variable files to load in addition to the default `terraform.tfvars` | string | no |   |

# How to setup

```
name: iac-scan
on:
  pull_request:
    branches: [ "main", "master" ]

jobs:
  release-please:
    uses: studiographene/github-action-workflows/.github/workflows/checkov-terraform-iac-scan.yml@v1
    secrets: inherit
    # with:
      # if you want to specify any input uncomment `with` and add the inputs that you want to set.
```
