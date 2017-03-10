---
layout: note
title: "Excluding Files"
author: "Eric Garcia"
last_updated: 2016-07-14
category: git
---


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

