̉̉̉̉̉̉̉̉̉̉̉# Purpose

To automatically create Git Tag + Release with

- auto calculated [Semantic version](https://semver.org/#semantic-versioning-200) Tag name based on [Conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)
- auto generated CHANGELOG & Release not based on the Conventional commits made

> To know how Release-Please works, ref to [Git Auto Release Trunk Tag Based CI/CD](https://studiographene.atlassian.net/wiki/spaces/SGKB/pages/2147615558/Git+Auto+Release+Trunk+Tag+Based+CI+CD)

# Workflow Inputs

| name                       | description                                                                                                                                                                                                              | type    | required | default |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | -------- | ------- |
| `RELEASE_TYPE`             | Release type based on the code. Set this to `simple` if your code release type does not match with any mention in supported values: https://github.com/marketplace/actions/release-please-action#release-types-supported | string  | no       | `node`  |
| `PATH`                     | create a release from a path other than the repository's root                                                                                                                                                            | string  | no       | ""      |
| `TARGET_BRANCH`            | branch to open pull release PR against (detected by default)                                                                                                                                                             | string  | no       | ""      |
| `INCLUDE_COMPONENT_IN_TAG` | If true, add prefix to tags and branches, allowing multiple libraries to be released from the same repository                                                                                                            | boolean | no       | false   |
| `SKIP_GITHUB_RELEASE`      | if set to true, then do not try to tag releases                                                                                                                                                                          | boolean | no       | false   |
| `SKIP_GITHUB_PULL_REQUEST` | if set to true, then do not try to open pull requests                                                                                                                                                                    | boolean | no       | false   |

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
  push:
    branches:
      - master

jobs:
  call-worflow:
    uses: studiographene/github-action-workflows/.github/workflows/release-please.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
    # with:
    #   RELEASE_TYPE: "node" # Release type based on the code. Default = `node`. Set this to `simple` if your code release type does not match with any mention in supported values: https://github.com/marketplace/actions/release-please-action#release-types-supported
```
