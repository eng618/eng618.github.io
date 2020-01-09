---
layout: note
title: Working with Forked Repositories
author: 'Eric Garcia'
last_updated: 2016-07-14
category: git
---

[Source](https://stackoverflow.com/questions/9153598/how-do-i-fetch-a-branch-on-someone-elses-fork-on-github)

When needing to work with a new branch on a forked repo you have to create a new branch in your local fork that references that branch. This can be accomplished by:

```bash
git remote add theirUsername git@github.com:theirUsername/repoName.git
git fetch theirUsername
git checkout -b my_name_for_their_branch theirUsername/theirBranch
```

### Example

Following directions for [Keeping your fork in sync](https://github.ibm.com/MFPSamples/DevCenter/wiki/Keep-fork-in-sync) for the DevCetner.

In this example I will be demonstrating creating a `GA` branch from `upstream`, in my local environment. I will be prefixing the remote `GA` branch with my initials to have a differentiation between the `upstream` branch and my local (forked) copy.

You can set `upstream` as the repo to follow (**userName**)

```sh
git remote add upstream git@github.ibm.com:MFPSamples/DevCenter
```

Once this is done your are free to `fetch` and `pull` code from the `upstream` witch is the source repo for all changes (representing another ** userName**).

```sh
git fetch upstream
git merge upstream/master
```

**Note:** This is assuming you are trying to merge to you local (forked) `master` branch

If you need to work off a branch that is in the `upstream` but not in your local repository (forked) you can create it with a link to upstream as follows:

```sh
git checkout -b ENG-GA upstream/GA
```

This line creates a local branch `ENG-GA` based on `upstream/GA`. So now you can make updates to your local repo `ENG-GA` and then push it back to `upstream/GA` which should help reduce merge conflicts. You still want to be sure to keep your local (forked) branch up to date if your changes will happen over time. Periodically you will need to merge `upstream/GA` with the following:

```sh
git fetch upstream
git merge upstream/GA
```

Once you are ready to submit your changes back to upstream you can create a pull request via [_github.com_](github.ibm.com). Ensuring that your base branch is `GA` and the head branch is `ENG-GA`. See image for details.

![Pull Request](./git-pull-request.png)
