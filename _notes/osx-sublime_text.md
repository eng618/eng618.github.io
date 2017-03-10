---
layout: note
title: Sublime Text
author: "Eric Garcia"
last_updated: 2016-07-14
category: osx
---

in `.bash_profile`

```bash
export PATH=/bin:/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin:$PATH
export EDITOR='subl -w'
```

Create symbolic link from terminal

```bash
ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl
```

**Reference:** [Stack Overflow: Opening Sublime Text on command line as subl on Mac OS?](http://stackoverflow.com/questions/16199581/opening-sublime-text-on-command-line-as-subl-on-mac-os)