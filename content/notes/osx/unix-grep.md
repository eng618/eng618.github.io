---
title: GREP
author: "Eric Garcia"
last_updated: 2016-07-14
category: osx
---

Using `grep` to search a file (e.g., \*.log), and save to a new file (e.g., NEW_FILE.log):

```bash
grep "SEARCH_TERM" PATH_TO_FILE_TO_GREP > PATH_TO_NEW_FILE
```

The command below will remove all files in the current directory except the ones with .log in their filename:

```bash
ls | grep -v ".log" | xargs rm
```

## Flags

- Use the `-c` flag to count the number of occurrences of a search term in a file:

       ```bash
       grep -c "SEARCH_TERM" FILE.log
       ```

- Use the `-i` flag to search for a term without case sensitivity:

       ```bash
       grep -i "SEARCH_TERM" FILE.log
       ```

- Use the `-v` flag to return everything but the search term:

       ```bash
       grep -v "SEARCH_TERM" FILE.log
       ```
