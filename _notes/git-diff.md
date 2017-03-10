---
layout: note
title: "Git Diff"
author: "Eric Garcia"
last_updated: 2016-07-14
category: git
---

Simply use `git diff` and a file name to check difference between commited and non staged changes

```bash
git diff FILE_NAME
```

If you need to verify the difference of a file that is already staged use the following

```bash
git diff --staged FILE_NAME
```

### Git diff with opendiff

[Source](https://thomashunter.name/blog/set-opendiff-filemerge-as-your-git-diff-tool-on-os-x/)

```bash
mkdir ~/bin/
touch ~/bin/git-diff.sh
```

The contents of the file will look like this:
```bash
#!/bin/sh
/usr/bin/opendiff "$2" "$5" -merge "$1"
```

Once the script has been made, you’ll want it to be executable

```bash
chmod u+x ~/bin/git-diff.sh
```

Finally, tell git that you want to set it up as your default merge tool:

```bash
git config --global diff.external ~/bin/git-diff.sh
```

If you later decide you hate it, run this command to go back:

```bash
git config --global --unset diff.external
```



