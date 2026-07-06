# Releasing plugin updates

Plugin sources in [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) are **pinned**
to an exact tag + commit (`ref` + `sha`), not a moving branch. This de-risks installs: a work-in-progress
push to a plugin repo can never reach users — only a deliberate pin bump does. `sha` is the real
guarantee (it's the effective pin even if the tag moves); `ref` is the human-readable version.

## Shipping an update to a plugin

1. **In the plugin repo** — land the change on `main` and bump `version` in its `plugin.json`.
2. **Tag the release** at that commit:
   ```bash
   git tag v0.2.0 && git push origin v0.2.0
   # or: gh api -X POST repos/sherizan/<repo>/git/refs -f ref=refs/tags/v0.2.0 -f sha=<commit-sha>
   ```
3. **In this repo** — update that plugin's source in `marketplace.json`: set `ref` to the new tag and
   `sha` to the new commit. Get the commit with:
   ```bash
   gh api repos/sherizan/<repo>/commits/v0.2.0 --jq .sha
   ```
4. **Gate then push** — `claude plugin validate . --strict`, then commit + push this repo.
5. Users pick it up with `/plugin marketplace update designagent` (a cached `add` won't re-pull).

## Current pins

| Plugin | Repo | Pin |
| --- | --- | --- |
| `designagent` | designagent-figma | `v0.18.0` |
| `setup` | designagent-setup | `v0.1.0` |
| `designreview` | designagent-review | `v0.1.0` |
| `tokens` | designagent-tokens | `v0.1.0` |
| `design-qa` | designagent-design-qa | `v0.1.0` |
| `backgrounds` | designagent-backgrounds | `v0.1.0` |

> Note: `designagent-figma` is actively developed, so its pin will lag `main` by design — bump it
> deliberately when a figma-plugin release is ready.
