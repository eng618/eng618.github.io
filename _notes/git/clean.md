---
layout: note
title: "Git Clean"
author: "Eric Garcia"
last_updated: 2016-07-14
category: git
---

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
