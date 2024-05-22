---
title: "Amending a Commit Message"
author: "Eric Garcia"
last_updated: 2016-07-14
category: git
---

To open your editor, allowing you to change the commit message of the most recent commit. Additionally, you can set the commit message directly in the command line with:

```bash
git commit --amend
```

…however, this can make multi-line commit messages or small corrections more cumbersome to enter.

```bash
git commit --amend -m "New commit message"
```

Make sure you don't have any working copy changes before doing this or they can get committed too.

Changing the message of a commit that you've already pushed to your remote branch

If you've already pushed your commit up to your remote branch, then you'll need to force push the commit with

```bash
git push <remote> <branch> --force
```

Or

```bash
git push <remote> <branch> -f
```

**Warning:** force-pushing will overwrite the remote branch with the state of your local one. If there are commits on the remote branch that you don't have in your local branch, you will lose those commits.

**Warning:** be cautious about amending commits that you have already shared with other people. Amending commits essentially rewrites them to have different SHA IDs, which poses a problem if other people have copies of the old commit that you've rewritten. Anyone who has a copy of the old commit will need to re-synchronize their work with your newly re-written commit, which can sometimes be difficult, so make sure you coordinate with others when attempting to rewrite shared commit history, or just avoid rewriting shared commits altogether.
