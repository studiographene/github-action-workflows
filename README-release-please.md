# Purpose

To automatically create Git Tag + Release with

- auto calculated [Semantic version](https://semver.org/#semantic-versioning-200) Tag name based on [Conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)
- auto generated CHANGELOG & Release not based on the Conventional commits made

> To know how Release-Please works, ref to [Git Auto Release Trunk Tag Based CI/CD](https://studiographene.atlassian.net/wiki/spaces/SGKB/pages/2147615558/Git+Auto+Release+Trunk+Tag+Based+CI+CD)

# Workflow Inputs

| name           | description                                                                                                                            | type   | required | default  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- | -------- |
| `RELEASE_TYPE` | Release type based on the code. Supported values: https://github.com/marketplace/actions/release-please-action#release-types-supported | string | no       | `simple` |

# How to setup

> ### If you have anyother GitHub action workflow (like CI checks) defined to run on PR, to avoid those from running on the PR that is created by Release-Please, add `on.pull_request.path-ignore` condition as below in the PR check workflow.
>
> ### This is to avoid running the PR checks running on Release-Please PR as it will only contian only CHANGELOG.md changes

### _`on` condition to add in your other PR check workflows to avoid running PR check on Release-Please PR_

```yaml
<a-pr-check-workflow>

on:
  pull_request:
    <other-configs>
    paths-ignore:
      - "CHANGELOG.md"
```

```yaml
name: Release Please

on:
  pull_request:
    branches:
      - master
      - main
      - trunk
  push:
    branches:
      - master
      - main
      - trunk

jobs:
  call-worflow:
    uses: studiographene/github-action-workflows/.github/workflows/release-please.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
```
