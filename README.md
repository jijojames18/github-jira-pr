# Github - Jira Pull Request helper
A browser extension that automatically fills certain fields when opening a pull request in Github.  

### Description ###
![image](https://user-images.githubusercontent.com/14849347/111897852-8ced3400-89df-11eb-93fa-55c82ef88664.png)

A context menu will be created in the compare when a new pull request is being created. When clicking on that menu, based on the configuration, the following sequence of events will take place.

1. Start
2. Opens the reviewer popup
3. Loop for each reviewer given in config
4. Search for the reviewer in the text box
5. If present, add the user. else skip
6. Close the reviewer popup.
7. Based on branch name, get the label text.
8. Open label popup
9. Search for the label.
10. If found, add the label.
11. Close the label popup.
12. Generate template for the pull request body after replacing placeholders `{BRANCH_NAME}` and `{NEWLINE}` with branch id and new line character respectively.
13. Set the pull request body to the text.
14. 1. If only one commit is present, set the commit text as the pull request title.
    2. Else Generate template for the pull request title by replacing `{ID}` with branch id and set it as the title
15. End


### Config ###
Field | Type  | Description | Default |
------|-------|-------------|---------|
branchSelector | Object |  | |
branchSelector.bug | Array | Array of identifiers used to detect if branch is for a bug fix  | ["bug"] |
branchSelector.feature   | Array | Array of identifiers used to detect if branch is for a feature | ["feature"] |
prTitle| String | Title field for pull request | "" |
prText| String | Body field of pull request | "" |
reviewerList  | Array | List of github users to be added as reviewers | [] |

### Documentation ###
[Getting started](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
[Extensions Architecture](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/)

