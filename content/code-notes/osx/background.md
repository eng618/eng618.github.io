---
title: Background Processes
author: 'Eric Garcia'
last_updated: 2016-07-14
category: osx
---

## Running processes in the background

When running a command, add `&` at the end to run that process in the background.

To see a list of background jobs, use:

```bash
jobs
```

To kill a background process, use:

```bash
kill %<job number>
```

To bring a background process to the foreground, use:

```bash
fg %<job number>
```

## Java background

If an MFPF server fails to start (due to a process already running), you can use `lsof -i:<port>` to list processes on a specific `port`. If you want to kill all Java processes in the background, run:

```bash
killall -9 java
```
