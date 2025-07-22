# Purpose

To validate PR Title and Commits for conventional commit and more

# Workflow Inputs

| name                        | description                                                                                                                                                                                                                                                                                                                                                                                                                                               | type                                                             | required | default                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| pr_title_type               | OPTIONAL. PR Title conventional types. For multiple types, use pipe                                                                                                                                                                                                                                                                                                                                                                                       | to separate each without any space. Example: `feat\|fix\|hotfix` | false    | `feat\|fix\|hotfix\|build\|chore\|ci\|docs\|refactor\|revert\|style\|test` |
| jira_project_pr_title_scope | OPTIONAL. Used to validate conventional commit scope. This is Jira project abbreviation as seen in Jira tickets. For multiple projects use pipe "\|" to separate each without any space. CASE SENSITIVE, if you want to use Jira ticket in scope in both lower case and upper cases define both lower and upper case here. Example, if Jira projects associated with your repo are `ABC`, and `12AB` jira_project_pr_title_scope = "ABC\|abc\|12AB\|12ab" | false                                                            |          |

# How to use this PR Check workflow

```yaml
name: pr-check

on:
  pull_request:
    types: [edited, opened, reopened, synchronize]

jobs:
  call-worflow:
    uses: studiographene/github-action-workflows/.github/workflows/pr-check.yml@master # if you want alternatively pin to tag version
    # with:
    #   jira_project_pr_title_scope: "ENB|enb"
```
