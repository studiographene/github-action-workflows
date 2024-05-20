# Purpose

Terraform scan using [CheckOV](https://github.com/marketplace/actions/checkov-github-action)

# Workflow Inputs

|name|description|type|required| default|
|---|--|--|--|--|
|`directories`| comma separated list of .tf files located directories to run scan. Default = "."] |string| no| `.`|
| `log_level` | set log level. Supported values: `DEBUG`, `WARNING` | string | no | `WARNING`  |
| `quiet` | Whether to display only failed checks | boolean | no | `true`  |
| `output_format` | Scan result output format. Can be `cli` and/or one of: `json`, `junitxml`, `github_failed_only`, or `sarif`.|string | no | `cli,sarif`  |
| `download_external_modules` | Whether to download external terraform modules from public git repositories and terraform registry | boolean |no | `true`  |
| `var_file | variable files to load in addition to the default `terraform.tfvars` | string | no |   |

# Action variables

> Repository Action Variables to be defined in GitHub UI

|name|description|type|required|
|---|--|--|--|
| `IAC_SCAN_SKIP_CHECKS` | comma separated list of check IDs to skip scan | string | no |
| `IAC_SCAN_SKIP_CVE_PACKAGES` | comma separated list of CVE package IDs to skip scan | string | no  |

# How to setup

> To run scan from current directory (also scans sub directories. (Refer to the next example for scan multiple directories scan)

```yaml
name: ci
on:
  pull_request:
    branches: [ "main", "master" ]

jobs:
  iac-scan:
    uses: studiographene/github-action-workflows/.github/workflows/checkov-terraform-iac-scan.yml@master ddd
    secrets: inherit
    # with:
      # if you want to specify any input uncomment `with` and add the inputs that you want to set.
```

> To scan multiple directories
> This example finds all the top level directories in `./tf/layers` and scans all those directories

```yaml
name: ci
on:
  pull_request:
    branches: ["main", "master"]

jobs:
  find_all_layers:
    runs-on: ubuntu-latest
    name: Available TF layers
    outputs:
      LAYERS: ${{ steps.find_layers.outputs.LAYERS }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Finding available layers
        id: find_layers
        run: |
          DIR_LIST=$(find ./tf/layers -mindepth 1 -maxdepth 1 -type d -exec printf '{"directory": "%s"}' {} \; | jq -s . | jq -c 'map(.directory)')
          echo Avalilable Layers are $DIR_LIST ...
          echo "LAYERS=${DIR_LIST}" >> $GITHUB_OUTPUT

  iac_scan:
    uses: studiographene/github-action-workflows/.github/workflows/checkov-terraform-iac-scan.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
    needs: find_all_layers
    with:
      directories: ${{needs.find_all_layers.outputs.LAYERS}}
```
