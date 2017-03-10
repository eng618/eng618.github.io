---
layout: note
title: Reverting last commit
author: "Eric Garcia"
last_updated: 2016-07-14
category: git
---

[source](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)

```shell
git commit -m "Something terribly misguided"
git reset --soft HEAD~
<< edit files as necessary >>
git add ...
git commit -m "New commit message"
git commit -c ORIG_HEAD
```

[source](http://stackoverflow.com/questions/3197413/how-do-i-delete-unpushed-git-commits)

Delete the most recent commit, keeping the work you've done:

`git reset --soft HEAD~1`

Delete the most recent commit, destroying the work you've done:

`git reset --hard HEAD~1`
