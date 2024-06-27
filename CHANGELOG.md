# Changelog

## [1.10.2](https://github.com/studiographene/github-action-workflows/compare/v1.10.1...v1.10.2) (2024-06-27)


### Bug Fixes

* **iac-scan:** vulnerability report step getting skipped on vuln. findings in container scan step is now fixed  ([#41](https://github.com/studiographene/github-action-workflows/issues/41)) ([b7bce21](https://github.com/studiographene/github-action-workflows/commit/b7bce213747ac5f833e353d4b473d66de22a6c12))

## [1.10.1](https://github.com/studiographene/github-action-workflows/compare/v1.10.0...v1.10.1) (2024-06-24)


### Bug Fixes

* **all workflows:** Job ID and job name are matched to facilitate automation in GitHub checks mandate config ([#38](https://github.com/studiographene/github-action-workflows/issues/38)) ([ab85afa](https://github.com/studiographene/github-action-workflows/commit/ab85afa7bb56b8c7013240094fd26ed391482c58))

## [1.10.0](https://github.com/studiographene/github-action-workflows/compare/v1.9.0...v1.10.0) (2024-06-24)


### Features

* Depn. scan, SAST custom exit error message ([d74a5b6](https://github.com/studiographene/github-action-workflows/commit/d74a5b69f9ff616f21d85928fda88805d282fc1e))
* **iac scan:** terraform fmt run on all dir and commits the change to source branch in PR ([#37](https://github.com/studiographene/github-action-workflows/issues/37)) ([9183b94](https://github.com/studiographene/github-action-workflows/commit/9183b9419caeed86228a3c71ce1941872b4908d6))
* **release-please:** Security practice,setting vuln context as ENV ([5d9a4b1](https://github.com/studiographene/github-action-workflows/commit/5d9a4b1a9fd360dbb3a3d66c32b1ecb9997f4cd2))
* **unit-test:** added unit test config ([#25](https://github.com/studiographene/github-action-workflows/issues/25)) ([614bd81](https://github.com/studiographene/github-action-workflows/commit/614bd81182a3392d2eaf188070b9f7a15b14c8e3))


### Bug Fixes

* All the workflow jobs permission revisited and set to minimum ([#36](https://github.com/studiographene/github-action-workflows/issues/36)) ([397b352](https://github.com/studiographene/github-action-workflows/commit/397b352a5945fe7d333b703505fe13a7026af61b))
* **release-please:** HotFix branch name can follow hotfix/ticket/tag ([ba435b3](https://github.com/studiographene/github-action-workflows/commit/ba435b3325a92eee5d4bf2b0d569e81e0db38eda))
* **security-scan:** custom error message on Dep. scan,SAST ([2799a7a](https://github.com/studiographene/github-action-workflows/commit/2799a7ab022d51944020f359977b1cab2494cd38))

## [1.9.0](https://github.com/studiographene/github-action-workflows/compare/v1.8.1...v1.9.0) (2024-06-15)


### Features

* **release-please:** Tag naming automated for HotFix release & regular realase post HF release ([#34](https://github.com/studiographene/github-action-workflows/issues/34)) ([0d76393](https://github.com/studiographene/github-action-workflows/commit/0d763939a9f692c4374f413f389eaef8f0f9b921))


### Bug Fixes

* status check always-&gt;!cancelled() ([7430fb0](https://github.com/studiographene/github-action-workflows/commit/7430fb0e3f677167ec3b6a1d67e73ca7ee39cd19))
* status check always-&gt;!cancelled() ([94ac73b](https://github.com/studiographene/github-action-workflows/commit/94ac73bc81944501260c353d05058169e81d4b8f))

## [1.8.1](https://github.com/studiographene/github-action-workflows/compare/v1.8.0...v1.8.1) (2024-06-14)


### Bug Fixes

* **dependency scan:** report to display suppressed vulnerabilities when there are no vulnerabilities ([#30](https://github.com/studiographene/github-action-workflows/issues/30)) ([3481816](https://github.com/studiographene/github-action-workflows/commit/348181691de4e04ed760143bfa84b6a983c399c2))
* **osv suppression:** config.toml file created at runtime, config file from Dockerfile is deprecated and has issue ([#32](https://github.com/studiographene/github-action-workflows/issues/32)) ([684bd9c](https://github.com/studiographene/github-action-workflows/commit/684bd9c6d4b134edd800632d04a908a1f26781db))

## [1.8.0](https://github.com/studiographene/github-action-workflows/compare/v1.7.0...v1.8.0) (2024-06-14)


### Features

* **Dependency scan:** Suppressed vulnerabilities are listed in the report ([5012c45](https://github.com/studiographene/github-action-workflows/commit/5012c451144e7468ac31974d3777cb6e21294cb9))
* **Dependency scan:** Suppressed vulnerabilities are listed in the report ([4ca41a4](https://github.com/studiographene/github-action-workflows/commit/4ca41a4d274c2a4d1e4efdaf7b6397a92607e2a0))
* **security scan:** OSV suppressions are added to Dependency scan report ([#28](https://github.com/studiographene/github-action-workflows/issues/28)) ([6e65e29](https://github.com/studiographene/github-action-workflows/commit/6e65e299223a1cb472480fe21af8b10431c9f2e2))


### Bug Fixes

* **dependency scan:** step condition ([87198e1](https://github.com/studiographene/github-action-workflows/commit/87198e18f82a98e793bc6307d6801a761dafaa93))
* **download-artifact:** deprecated action updownload-artifact@v2 updated to -&gt;4 ([669b0ef](https://github.com/studiographene/github-action-workflows/commit/669b0ef1de7ae4be127bdeb286a80bfa6192af4d))
* **upload-artifact:** deprecated action upload-artifact updated to -&gt;4 ([58c0a10](https://github.com/studiographene/github-action-workflows/commit/58c0a1009b7bc99361409e70aa728b22c98342f5))

## [1.7.0](https://github.com/studiographene/github-action-workflows/compare/v1.6.3...v1.7.0) (2024-06-06)


### Features

* **container scan:** step to setup Docker Buildx ([8694b03](https://github.com/studiographene/github-action-workflows/commit/8694b034bb918f71e179f77b2249694d6ab3871c))


### Bug Fixes

* **container scan:** report format ([#26](https://github.com/studiographene/github-action-workflows/issues/26)) ([8694b03](https://github.com/studiographene/github-action-workflows/commit/8694b034bb918f71e179f77b2249694d6ab3871c))

## [1.6.3](https://github.com/studiographene/github-action-workflows/compare/v1.6.2...v1.6.3) (2024-06-06)


### Bug Fixes

* **container scan:** report formatting ([cdfd7e5](https://github.com/studiographene/github-action-workflows/commit/cdfd7e527db0a3b0514e36c36a57ba6527df30c2))

## [1.6.2](https://github.com/studiographene/github-action-workflows/compare/v1.6.1...v1.6.2) (2024-06-05)


### Bug Fixes

* **container scan:** NPM_TOKEN input as docker build arg ([#22](https://github.com/studiographene/github-action-workflows/issues/22)) ([e0ac31c](https://github.com/studiographene/github-action-workflows/commit/e0ac31cb75f290d1b4a24fd95b06882dd5ea6f5b))

## [1.6.1](https://github.com/studiographene/github-action-workflows/compare/v1.6.0...v1.6.1) (2024-05-24)


### Features

* **license scan:** license addition: MIT-0 ([97151af](https://github.com/studiographene/github-action-workflows/commit/97151af59eb0e39deda607dc42ad24f2e8d9bcf0))


### Bug Fixes

* releasing as v1.6.1 ([6460790](https://github.com/studiographene/github-action-workflows/commit/646079033850db79a30ab650701e42aa16a12d04))

## [1.6.0](https://github.com/studiographene/github-action-workflows/compare/v1.5.0...v1.6.0) (2024-05-23)


### Features

* **Mobile-scans:** Added mobile scan and centralised security scans workflow configuration ([#17](https://github.com/studiographene/github-action-workflows/issues/17)) ([82cf1e5](https://github.com/studiographene/github-action-workflows/commit/82cf1e523fdf7e3b7ff63f2b3eaef17684aee7cc))


### Bug Fixes

* **License scans:** updated the list of allowed licenses default values ([#19](https://github.com/studiographene/github-action-workflows/issues/19)) ([51814e1](https://github.com/studiographene/github-action-workflows/commit/51814e123ee135b945a78ab77d46515efd11810b))
* setting release verison to 1.6.0 ([#20](https://github.com/studiographene/github-action-workflows/issues/20)) ([10c1fa5](https://github.com/studiographene/github-action-workflows/commit/10c1fa5916efae5bf59ee83e794ffd2162c76f28))

## [1.5.0](https://github.com/studiographene/github-action-workflows/compare/v1.4.0...v1.5.0) (2024-05-16)


### Features

* added osv scan suppression config and json report support for semgrep and osv scans ([#15](https://github.com/studiographene/github-action-workflows/issues/15)) ([f913912](https://github.com/studiographene/github-action-workflows/commit/f913912c3fc15d72f4007d08532d37c4270b6b25))

## [1.4.0](https://github.com/studiographene/github-action-workflows/compare/v1.3.0...v1.4.0) (2024-05-15)


### Features

* **release-please:** deprecated workflow updated to googleapis ([#13](https://github.com/studiographene/github-action-workflows/issues/13)) ([f8bec34](https://github.com/studiographene/github-action-workflows/commit/f8bec34a53ba5b109b61eca53e91b47ddab8e5de))

## [1.3.0](https://github.com/studiographene/github-action-workflows/compare/v1.2.0...v1.3.0) (2024-05-08)


### Features

* **php-ci:** new workflow addition ([0a4f553](https://github.com/studiographene/github-action-workflows/commit/0a4f553909a26b4cf5872fb7fe06fd62e926b0e7))

## [1.2.0](https://github.com/studiographene/github-action-workflows/compare/v1.1.1...v1.2.0) (2024-05-08)


### Features

* **container-scan:** add report  only if it is PR ([44894dd](https://github.com/studiographene/github-action-workflows/commit/44894dd4ce64f7d52651302a3bf9e0331f1d010c))
* nodejs ci, and Pulse analytics made reusable workflow ([#10](https://github.com/studiographene/github-action-workflows/issues/10)) ([95c43c6](https://github.com/studiographene/github-action-workflows/commit/95c43c66c80105666a12c2ad36d6de4dc2621a42))

## [1.1.1](https://github.com/studiographene/github-action-workflows/compare/v1.1.0...v1.1.1) (2024-05-08)


### Bug Fixes

* **container-scan:** scan report job condition ([#7](https://github.com/studiographene/github-action-workflows/issues/7)) ([cd187bc](https://github.com/studiographene/github-action-workflows/commit/cd187bca0aa146e550ee0a1a720c1cd7f330c84a))

## [1.1.0](https://github.com/studiographene/github-action-workflows/compare/v1.0.0...v1.1.0) (2024-05-08)


### Features

* **container-scan:** trivy-container-scan workflow addition ([#4](https://github.com/studiographene/github-action-workflows/issues/4)) ([525b3bc](https://github.com/studiographene/github-action-workflows/commit/525b3bcd1cfee954cefb2c4ca9a76ece3d27e30d))

## 1.0.0 (2024-05-07)


### Features

* **auto-release:** release-please added ([69e2359](https://github.com/studiographene/github-action-workflows/commit/69e2359fb740cc2c41fe02b24b31fe92e4e7ce65))
* **iac-scan:** CheckOV IaC scan workflow addition ([#1](https://github.com/studiographene/github-action-workflows/issues/1)) ([a33ec19](https://github.com/studiographene/github-action-workflows/commit/a33ec19bc08c733c222dd34250f011b1f1889542))
* **pr agent:** Codium PR agent workflow added ([#3](https://github.com/studiographene/github-action-workflows/issues/3)) ([2e9ec5e](https://github.com/studiographene/github-action-workflows/commit/2e9ec5eb9106161903335192661b1f06237406ec))
* **release-please:** feature added newly ([50c717c](https://github.com/studiographene/github-action-workflows/commit/50c717c6fee76a257243165f8b9ab6ff9c6f956e))


### Bug Fixes

* **pr-agent:** Bot event filter from trigger ([b04e0fe](https://github.com/studiographene/github-action-workflows/commit/b04e0fe9a7997eaf92a52fbba0136d3fa31c79e5))
