# Purpose

To execute [Codium PR agent](https://www.codium.ai/products/git-plugin/)

# Workflow Inputs


|name|description|type|required|default|
|---|---|---|---|---|
|`pr_agent_before_step_command`| Command to execute before the Codium PR agent is executed |string| no| |
|`pr_agent_after_step_command`| Command to execute after the Codium PR agent is executed |string| no| |

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
  <other job configurations>

  pr_agent:
    uses: studiographene/github-action-workflows/.github/workflows/codium-pr-agent.yml@v1
    secrets: inherit
```

> To setup as a separate workflow

```yaml
name: pr_agent
on:
  pull_request: {}

jobs:
  codium:
    uses: studiographene/github-action-workflows/.github/workflows/codium-pr-agent.yml@v1
    secrets: inherit
```
