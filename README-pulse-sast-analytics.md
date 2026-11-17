# Purpose

Studiographene Pulse SAST Analystics Reporting

Report is pusblised on to [Pulse](https://pulse.studiographene.com)

# Workflow Inputs

| Name                  | Description                                | Required | Default                                                  |
| --------------------- | ------------------------------------------ | -------- | -------------------------------------------------------- |
| `PULSE_URL`           | Pule API URL                               | no       | `https://a0lrn1xwl4.execute-api.eu-west-1.amazonaws.com` |
| `semgrep_options`     | SEMGREP options                            | no       |                                                          |
| `dev_test_branch`     | Branch name(s) Pulse uses for this repo (comma separated). `nodejs-ci.yml` passes its own `dev_test_branch` | no       |                                                          |
| `before_step_command` | Command to execute at the start of the job | no       |                                                          |
| `after_step_command`  | Command to execute at the end of the job   | no       |                                                          |

## How To setup:

1. Under `./github/workflows` directory, create a file `sast-analytics.yml` with below content (change inputs as required).

```yaml
name: StudioGraphene-SAST-Analytics

on:
  push:
    branches: [<enter-branch-name>]

jobs:
  call-worflow:
    uses: studiographene/github-action-workflows/.github/workflows/pulse-sast-analytics.yml@master # if you want alternatively pin to tag version version
    secrets: inherit
```

## Artifact format (`pulse-security-errors-report`)

`pulse-sast-analytics-v2.yml` uploads the raw Semgrep JSON (`results`, `version`, ...) plus:

- Legacy fields: `date`, `repo`, `orgId`, `repoId`, `errors[]`.
- Scan metadata: `branch`, `createdAt`, `commitSha`, `prNumber`, `mergedAt`, `isDefaultBranch`.
- Branch scope: `devTestBranch` (the configured value) and `isDevTestBranch` (whether this scan's `branch` is one of them). Both are `null` when `dev_test_branch` is not configured. Pulse's v2 pipeline ingests scans where `isDevTestBranch` is `true`, skips `false`, and for `null`/missing only ingests onto the branch Pulse already tracks for the repo (the first scan sets it).
- Finding identity: `fingerprintVersion` (currently `1`), and each `results[].extra.fingerprint` replaced with our own hash: sha256 of version + rule + file + the flagged lines with all whitespace removed + a counter for identical code in the same file. Pulse uses it to keep a finding's status across scans. Only the hash leaves CI, never the code. Secret-type rules use an HMAC-SHA256 keyed with the org secret `PULSE_SAST_FINGERPRINT_KEY` instead of a plain hash, so a hash of a secret value cannot be guessed back. Until that secret is set, a default key is used and the step logs a warning; replacing the key gives every secret-type finding a new id in Pulse. The fingerprint is `null` only for files that cannot be read; Pulse falls back to its own id for those.

`prNumber` and `mergedAt` are `null` when not available (for example, push builds). `isDefaultBranch` is `true` for a push to the default branch, or a merged PR whose base is the default branch. `commitSha` is the merge commit for a merged PR (`nodejs-ci.yml` only runs this workflow for merged PRs), otherwise the PR head or pushed commit.
