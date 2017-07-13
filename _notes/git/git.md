---
layout: note
title: git
author: "Eric Garcia"
updateBy: Eric Garcia
last_updated: 2017-06-09
category: git
tags: [git]
---

**Jump to**:

* TOC
{:toc}

# Overview

This page is designed to unify all the tips and tricks associated with using git.  Please feel free to modify and update as needed.


# Amending a Commit Message

Changing a commit message can cause lots of problems if not handled correctly.  Only use the following if **absolutely** necessary.

## Local commits

To open your editor, allowing you to change the commit message of the most recent commit:

```bash
git commit --amend
```

Additionally, you can set the commit message directly in the command line with:

```bash
git commit --amend -m "New commit message"
```

…however, this can make multi-line commit messages or small corrections more cumbersome to enter.

**Note**: Make sure you don't have any working copy changes before doing this or they can get committed too.

## Remote commits

Changing the message of a commit that you've already pushed to your remote branch

**Warning:** be cautious about amending commits that you have already shared with other people. Amending commits essentially rewrites them to have different SHA IDs, which poses a problem if other people have copies of the old commit that you've rewritten. Anyone who has a copy of the old commit will need to re-synchronize their work with your newly re-written commit, which can sometimes be difficult, so make sure you coordinate with others when attempting to rewrite shared commit history, or just avoid rewriting shared commits altogether.

If you've already pushed your commit up to your remote branch, then you'll need to force push the commit with

```bash
git push <remote> <branch> --force
```

Or

```bash
git push <remote> <branch> -f
```
**Warning:** force-pushing will overwrite the remote branch with the state of your local one. If there are commits on the remote branch that you don't have in your local branch, you will lose those commits.

## Past Commits
[source](https://stackoverflow.com/a/1186549/2218959)

You can use rebase to edit a past commit by passing the commit hash, with the following:

```bash
git rebase -i '<commit-hash>^'
```

Once your editor is opened with the rebase dialog, put edit as the action word for that commit.  Save and close.  Open the project and make the changes you wanted to update to that commit.  To keep the same commit message you have previously use:

```bash
git commit --all --amend --no-edit
```

Now you can use `git rebase --continue` and go a `git push -f` to force push your changes to the remote repo.


# Git Branching


> I follow git branching naming convention outline in this [gist](https://gist.github.com/digitaljhelms/4287848)

List all branches including remotes

``` bash
git branch -a
```

### Resetting local branch to match remote

Setting your branch to exactly match the remote branch can be done in two steps:

``` bash
git fetch origin
git reset --hard origin/master
```

If you want to save your current branch's state before doing this (just in case), you can do:

``` bash
git commit -a -m "Saving my work, just in case"
git branch my-saved-work
```

> Tip: Also see git clean


### Deleting a remote branch

```bash
git push origin :<branch-name>
```


## Local branches
**Sourced From:** [Git housekeeping tutorial](http://railsware.com/blog/2014/08/11/git-housekeeping-tutorial-clean-up-outdated-branches-in-local-and-remote-repositories/)

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
$ git push origin --delete branch-name
```

Similar snippet for not merged branches:

```bash
$ for branch in `git branch -r --no-merged | grep -v HEAD`; do echo -e `git show --format="%ci %cr %an" $branch | head -n 1` \\t$branch; done | sort -r
```

This list should be reviewed more thoroughly to avoid losing important commits.


# Clean

Perform a “dry run” of `git clean`. This will show you which files are going to be removed without actually doing it.

```bash
git clean -n
```

Remove untracked files from the current directory. The `-f` (force) flag is required unless the clean.requireForce configuration option is set to false (it's true by default). This will not remove untracked folders or files specified by .gitignore.

```bash
git clean -f
```

Remove untracked files, but limit the operation to the specified path.

```bash
git clean -f <path>
```

Remove untracked files and untracked directories from the current directory.

```bash
git clean -df
```

Remove untracked files from the current directory as well as any files that Git usually ignores.

```bash
git clean -xf
```

## Example


* Edit some existing files
* Add some new files
* Realize you have no idea what you're doing

Undo changes in tracked files

```bash
git reset --hard
```

Remove untracked files

```bash
git clean -df
```

# Diff

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

# Excluding files

## Ignoring tracked files in your local repo

```bash
git update-index --skip-worktree SOME_FILE
```

or

```bash
git update-index --assume-unchanged SOME_FILE
```

To undo assume unchanged

```bash
git update-index --no-assume-unchanged SOME_FILE
```

If using `assume-unchanged` you can add the following to your **~/.gitconfig**

This will allow you to use the alias `git ignored` to list all excluded files

```bash
[alias]
	ignored = !git ls-files -v | grep "^[[:lower:]]"
```


## Ignoring un-tracked files in your local repo
> Untested


If you ever want to ignore a file from git, but don't want to add it to the **.gitignore** file, you can do it on your local copy by adding it to the file **.git/info/exclude**

I've setup an alias to do so, just add this to your **.gitconfig** file under the `[alias]` section

```bash
exclude = !sh -c 'echo "$1" >> .git/info/exclude' -
```

Then you can execute:

```bash
git exclude SOME_FILE
```

# Forking

[Source](http://stackoverflow.com/questions/9153598/how-do-i-fetch-a-branch-on-someone-elses-fork-on-github)

When needing to work with a new branch on a forked repo you have to create a new branch in your local fork that references that branch.  This can be accomplished by:

```bash
git remote add theirUsername git@github.com:theirUsername/repoName.git
git fetch theirUsername
git checkout -b my_name_for_their_branch theirUsername/theirBranch
```

### Example

Following directions for [Keeping your fork in sync](https://github.ibm.com/MFPSamples/DevCenter/wiki/Keep-fork-in-sync) for the DevCetner.

In this example I will be demonstrating creating a `GA` branch from `upstream`, in my local environment.  I will be prefixing the remote `GA` branch with my initials to have a differentiation between the `upstream` branch and my local (forked) copy.

You can set `upstream` as the repo to follow (**userName**)

```sh
git remote add upstream git@github.ibm.com:MFPSamples/DevCenter
```

Once this is done your are free to `fetch` and `pull` code from the `upstream` witch is the source repo for all changes (representing another ** userName**).

```sh
git fetch upstream
git merge upstream/master
```

**Note:**  This is assuming you are trying to merge to you local (forked) `master` branch

If you need to work off a branch that is in the `upstream` but not in your local repository (forked) you can create it with a link to upstream as follows:

```sh
git checkout -b ENG-GA upstream/GA
```

This line creates a local branch `ENG-GA` based on `upstream/GA`.  So now you can make updates to your local repo `ENG-GA` and then push it back to `upstream/GA` which should help reduce merge conflicts.  You still want to be sure to keep your local (forked) branch up to date if your changes will happen over time.  Periodically you will need to merge `upstream/GA` with the following:

```sh
git fetch upstream
git merge upstream/GA
```

Once you are ready to submit your changes back to upstream you can create a pull request via [*github.com*](github.ibm.com).  Ensuring that your base branch is `GA` and the head branch is `ENG-GA`.  See image for details.

[[images/git-pull-request.png]]


# .gitignore

## Untracking a single file

To untrack a single file that has already been added/initialized to your repository, i.e., stop tracking the file but not delete it from your system use:

```bash
git rm --cached filename
```


## Untracking all files

To untrack every file that is now in your **.gitignore**:

1. Commit any outstanding code changes, and then, run this command:

	```bash
	git commit -m "Commit message"
	```

2. This removes any changed files from the index(staging area), then just run:

	```bash
	git rm -r --cached .
	```

3. Add all tracked changes

	```bash
	git add .
	```

4. Commit it:

	```bash
	git commit -m ".gitignore is now working"
	```


# Merge conflicts

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

# Undoing commits

[source](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)

```shell
git commit -m "Something terribly misguided"
git reset --soft HEAD~
# << edit files as necessary >>
git add ...
git commit -m "New commit message"
git commit -c ORIG_HEAD
```

[source](http://stackoverflow.com/questions/3197413/how-do-i-delete-unpushed-git-commits)

Delete the most recent commit, keeping the work you've done:

`git reset --soft HEAD~1`

Delete the most recent commit, destroying the work you've done:

`git reset --hard HEAD~1`
