## Ace UI

## Working with multiple remotes
## Add a remote using git bash

git remote add github https://github.com/ductran95/AceUI.git
git remote add gitlab https://gitlab.com/ductran95/aceui.git
git remote add bitbucket https://duc_tran95@bitbucket.org/duc_tran95/aceui.git

## Setup a remote 'all' to push all remotes, by opening '.git/config'

[remote "all"]
    url = https://ductran95@dev.azure.com/ductran95/AceUI/_git/AceUI
	url = https://github.com/ductran95/AceUI.git
    url = https://gitlab.com/ductran95/aceui.git
	url = https://duc_tran95@bitbucket.org/duc_tran95/aceui.git

## Fetch all remote using git bash

git fetch --all