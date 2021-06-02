---
layout: note
title: Useful Commands
author: "Eric Garcia"
updatedBy: Eric Garcia
last_updated: 2016-10-06
category: osx
---

**Jump to**:

- TOC
  {:toc}

# Bash Profile

Use `source` to update bash_profile without relaunching terminal

```bash
source ~/.bash_profile
```

# Open with application

- Can also be used with `.` for the file path to open current directory\*

```bash
open -a "PROVIDED_APPLICATION" FILE/PATH
```

# Scripts

This section is designated to helping you work with and create scripts.

## Setting script permissions

<a href="https://bash.cyberciti.biz/guide/Setting_up_permissions_on_a_script" target="blank">Source</a>

Allowing everyone to execute the script, enter:

`chmod +x <script>.sh`

Set the permissions for the user and the group to read and execute only (no write permission), enter:

`chmod ug=rx script.sh`

## Unzip

Unzip all files in directory

```bash
for i in *.zip ; do
	mkdir $i.d
	cd $i.d
	unzip $i
	cd ../
done
```
