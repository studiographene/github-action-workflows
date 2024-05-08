# Purpose

To perform container scan and report vulnerabilities on PR

# Workflow Inputs

|name|description|type|required| default|
|--|--|--|--|--|
|`before_step_command`| Command to execute at the start of the job |string| no| |
|`after_step_command`| Command to execute at the end of the job |string| no| |
|`docker_build_command`|Docker Build command|string|no|`docker build -t local:latest .`|
|`docker_build_image_id`|Docker image ID as mentioned in docker_build_command|string|no|`local:latest`|
|`CONTAINER_SCANNERS`|comma-separated list of what security issues to detect (vuln,secret,config)|string|no|`vuln`|
|`CONTAINER_SCAN_SKIP_DIRS`|Comma separated list of directories to skip scanning|string|no||

# How to setup

```
name: container-scan
on:
  push:
    pull_request: {}

jobs:
  container-scan:
    uses: studiographene/github-action-workflows/.github/workflows/trivy-container-scan.yml@master # if you want alternatively pin to tag version
    secrets: inherit
```
