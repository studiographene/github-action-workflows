# Purpose

To validate PR Title and Commits for conventional commit and more

# Workflow Inputs

| name                            | description                                                                | type   | required | default                                           |
| ------------------------------- | -------------------------------------------------------------------------- | ------ | -------- | ------------------------------------------------- |
| pr_title_type                   | OPTIONAL. PR Title conventional types. For multiple types, use pipe | to separate each without any space. Example: `feat|fix|hotfix` | false    | `feat|fix|test`      |
| jira_project_pr_title_scope     | OPTIONAL. Jira project abbreviation as seen in Jira tickets for PR conventional title scope. For multiple projects use pipe | to separate each without any space. Example= ABC|abc|12AB | false    |      |

# How to use this PR Check workflow

```yaml
name: pr-check
on:
  push:
    pull_request: {}

jobs:
  call-worflow:
    uses: studiographene/github-action-workflows/.github/workflows/pr-check.yml@master # if you want alternatively pin to tag version
```
