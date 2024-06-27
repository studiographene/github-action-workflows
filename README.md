> This repo has auto Git release workflow using Release-Please. For guide and to know how it works, ref to [Git Auto Release Trunk Tag Based CI/CD](https://studiographene.atlassian.net/wiki/spaces/SGKB/pages/2147615558/Git+Auto+Release+Trunk+Tag+Based+CI+CD)

# Should contain only the Workflows that can be public

# README for each workflow can be found separately, they are named as README-<< the-workflow-name >>.md

# Contributors Attention:

- Follow conventional commit with scope set to the workflow file. For example, if you are adding feature to `nodejs-ci`
  set the scope to `nodejs-ci`, `feature(nodejs-ci): ...message...`
- In worklow created
  - job name and job ID must be same.
  - Job name and ID must follow "-" delimeter (do not use space, "\_", or any other)g
  ```
  jobs:
    pr_agent:
      name: pr_agent
  ```
