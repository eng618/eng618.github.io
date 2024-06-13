---
title: "Updating .gitignore"
author: "Eric Garcia"
last_updated: 2016-07-14
category: git
---

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
