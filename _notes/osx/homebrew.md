---
layout: note
title: Homebrew
author: Eric Garcia
last_updated: 2016-07-14
category: osx
tags: [osx, homebrew, brew]
---

## When trying to install using homebrew

User does not have permission to write to **/usr/local/Cellar** and throws following error.

```bash
Error: Cannot write to /usr/local/Cellar
```

Attempting to `sudo` it refuses with following error.

```bash
Cowardly refusing to `sudo brew install'
```

You somehow have limited permissions to **/usr/local/Cellar**. Brew doesn't like to install with sudo which is why it refuses. Correct the issue with the following commands:

1. Check the permissions:

   ```bash
   ls -ld /usr/local/Cellar
   ```

2. Open them up for writing:

   ```bash
   sudo chmod a+w /usr/local/Cellar
   ```
