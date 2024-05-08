# Purpose

To execute [Codium PR agent](https://www.codium.ai/products/git-plugin/)

# Workflow Inputs


|name|description|type|required|default|
|---|---|---|---|---|
|`before_step_command`| Command to execute at the start of the job |string| no| |
|`after_step_command`| Command to execute at the end of the job |string| no| |

# Action Secrets

|name|description|type|required|default|
|---|---|---|---|---|
|`OPENAI_KEY`| OpenAI key for Codium to use |string| yes| |
|`GITHUB_TOKEN`| GitHub access token, this is not requrired mostly when executing from the same repo |string| no| |

# How to setup

> To setup as job in workflow (Recommended)

```yaml
<other action configurations>

jobs:
on:
  pull_request: {}
  issue_comment:
  <other job configurations>

  pr_agent:
    if: ${{ github.event.sender.type != 'Bot' }}
    uses: studiographene/github-action-workflows/.github/workflows/codium-pr-agent.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
```

> To setup as a separate workflow

```yaml
name: pr_agent
on:
  pull_request: {}
  issue_comment:

jobs:
  codium:
    if: ${{ github.event.sender.type != 'Bot' }}
    uses: studiographene/github-action-workflows/.github/workflows/codium-pr-agent.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
```
