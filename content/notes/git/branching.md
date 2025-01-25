---
title: "Git Branching"
author: "Eric Garcia"
last_updated: 2016-07-14
category: git
---

> I follow git branching naming convention outline in this [gist](https://gist.github.com/digitaljhelms/4287848)

List all branches including remotes

```bash
git branch -a
```

### Resetting local branch to match remote

Setting your branch to exactly match the remote branch can be done in two steps:

```bash
git fetch origin
git reset --hard origin/master
```

If you want to save your current branch's state before doing this (just in case), you can do:

```bash
git commit -a -m "Saving my work, just in case"
git branch my-saved-work
```

> Tip: Also see git clean

### Deleting a remote branch

```bash
git push origin :<branch-name>
```

## Local branches

**Sourced From:** [Git housekeeping tutorial](https://railsware.com/blog/2014/08/11/git-housekeeping-tutorial-clean-up-outdated-branches-in-local-and-remote-repositories/)

At first, list all local branches:

```bash
git branch
```

We need to know what branches are already merged in “master” and can be easily removed:

```bash
git checkout master
git branch --merged
```

Now, remove all outdated branches with:

```bash
git branch -d <branch-name-old-merged-feature>
```

Next, decide what to do with not merged branches:

```bash
git branch --no-merged
```

If some of them is just abandoned stuff that you don’t need anymore, remove it with “-D” option:

```bash
git branch -D old-abandoned-feature
```

### References to remote branches

After each git pull or git fetch command Git creates references to remote branches in local repository, but doesn’t clean up stale references.

List referenced remote branches:

```bash
git branch -r
```

Clean-up outdated references:

```bash
git remote prune origin
```

> Tip: Update repository with: `git fetch -p` and Git automatically prunes all stale references.

## Remote branches

Usually, remote repository is a big garbage heap of stale branches, if there is no responsible housekeeping person.

After previous `git remote prune origin` we should have synched list of remote branches.

At first, we can find branches which are already merged in “master”:

```bash
git checkout master
$ git branch -r --merged
```

But this command does not provide much information. What if this branch is merged, but still used for feature development. Would be cool to know last commit date and author.

This magic snippet provides all required information:

```bash
for branch in `git branch -r --merged | grep -v HEAD`; do echo -e `git show --format="%ci %cr %an" $branch | head -n 1` \\t$branch; done | sort -r
```

Now, you can delete own remote branches, and ask other authors to clean-up theirs:

```bash
git push origin --delete branch-name
```

Similar snippet for not merged branches:

```bash
for branch in `git branch -r --no-merged | grep -v HEAD`; do echo -e `git show --format="%ci %cr %an" $branch | head -n 1` \\t$branch; done | sort -r
```

This list should be reviewed more thoroughly to avoid losing important commits.
