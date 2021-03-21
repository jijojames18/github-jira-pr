# Github - Jira Pull Request helper
A browser extension that automatically fills certain fields when opening a pull request in Github.  

### Config ###
Field | Type  | Description | Default |
------|-------|-------------|---------|
branchSelector | Object |  | |
branchSelector.bug | Array | Array of identifiers used to detect if branch is for a bug fix  | ["bug"] |
branchSelector.feature   | Array | Array of identifiers used to detect if branch is for a feature | ["feature"] |
prTitle| String | Title field for pull request | "" |
prText| String | Body field of pull request | "" |
reviewerList  | Array | List of github users to be added as reviewers | [] |
