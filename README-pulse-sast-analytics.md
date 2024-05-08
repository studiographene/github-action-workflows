# Purpose

Studiographene Pulse SAST Analystics Reporting

Report is pusblised on to [Pulse](https://pulse.studiographene.com)

# Workflow Inputs

| Name                  | Description                                | Required | Default                                                  |
| --------------------- | ------------------------------------------ | -------- | -------------------------------------------------------- |
| `PULSE_URL`           | Pule API URL                               | no       | `https://a0lrn1xwl4.execute-api.eu-west-1.amazonaws.com` |
| `semgrep_options`     | SEMGREP options                            | no       |                                                          |
| `before_step_command` | Command to execute at the start of the job | no       |                                                          |
| `after_step_command`  | Command to execute at the end of the job   | no       |                                                          |

## How To setup:

1. Under `./github/workflows` directory, create a file `sast-analytics.yml` with below content (change inputs as required).

```yaml
name: StudioGraphene SAST Analytics

on:
  push:
    branches: [<enter-branch-name>]

jobs:
  sast_analytics:
    uses: studiographene/github-action-workflows/.github/workflows/pulse-sast-analytics.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
```
