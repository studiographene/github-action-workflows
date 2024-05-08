# Purpose

To automatically create Git Tag + Release with

- auto calculated [Semantic version](https://semver.org/#semantic-versioning-200) Tag name based on [Conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)
- auto generated Release not based on the Conventional commits made

> For guide and to know how this works, ref to [Git Auto Release Trunk Tag Based CI/CD](https://studiographene.atlassian.net/wiki/spaces/SGKB/pages/2147615558/Git+Auto+Release+Trunk+Tag+Based+CI+CD)

# Workflow Inputs

| name           | description                                                                                                                            | type   | required | default  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- | -------- |
| `RELEASE_TYPE` | Release type based on the code. Supported values: https://github.com/marketplace/actions/release-please-action#release-types-supported | string | no       | `simple` |

# How to setup

```yaml
name: release_please
on:
  push:
    branches:
      - master
      - main
      - hotfix/**

jobs:
  release_please:
    uses: studiographene/github-action-workflows/.github/workflows/release-please.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
```
