---
title: Useful Commands
author: 'Eric Garcia'
updatedBy: Eric Garcia
last_updated: 2016-10-06
category: osx
---

## Bash Profile

Use `source` to update the bash profile without relaunching the terminal:

```bash
source ~/.bash_profile
```

## Open with application

- Can also be used with `.` for the file path to open the current directory:

```bash
open -a "PROVIDED_APPLICATION" FILE/PATH
```

## Scripts

This section is designated to helping you work with and create scripts.

### Setting script permissions

[Source](https://bash.cyberciti.biz/guide/Setting_up_permissions_on_a_script)

To allow everyone to execute the script, enter:

```bash
chmod +x <script>.sh
```

To set the permissions for the user and the group to read and execute only (no write permission), enter:

```bash
chmod ug=rx script.sh
```

### Unzip

Unzip all files in a directory:

```bash
for i in *.zip ; do
 mkdir $i.d
 cd $i.d
 unzip $i
 cd ../
done
```
