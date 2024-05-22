---
title: GREP
author: "Eric Garcia"
last_updated: 2016-07-14
category: osx
---

Using `grep` to search a file (ex: \*.log), and save to and new file (ex: NEW_FILE.log)

```bash
grep "SEARCH_TERM" PATH_TO_FILE_TO_GREP > PATH_TO_NEW_FILE
```

The below command will remove all files in the current directory except the ones with .log in their filename.

```bash
ls | grep -v ".log" | xargs rm
```

## Flags

- Use the `-c` flag to count the number of occurrences of search in a file.

       ```bash
       grep -c "SEARCH_TERM" FILE.log
       ```

- Use the `-i` flag to search a term without case sensitivity

       ```bash
       grep -i "SEARCH_TERM" FILE.log
       ```

- Use the `-v` flag to return everything but the search term

       ```bash
       grep -v "SEARCH_TERM" FILE.log
       ```
