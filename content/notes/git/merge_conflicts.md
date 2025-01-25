---
title: "Resolving Merge Conflicts"
author: "Eric Garcia"
last_updated: 2016-07-14
category: git
---

## Local changes to same files

To resolve merge conflicts with error.

```bash
error: Your local changes to the following files would be overwritten by merge:
```

To stash entire working tree

```bash
git stash save --keep-index
```

Now you will be able to merge branch successfully

If you do not need your local changes you can simple drop the stash

```bash
git stash drop
```

or...if you need your changes you can attempt to process them in now using pop

```bash
git stash pop
```

To show what is in your stash use show

```bash
git stash show
```
