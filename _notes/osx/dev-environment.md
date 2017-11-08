---
layout: note
title: Setting up your OSX development environment
updatedBy: Eric Garcia
author: Eric Garcia
last_updated: 2016-09-14
category: osx
tags: [jenv, java, osx, brew]
---

**Table of Contents:**

* TOC
{:toc}

# Overview

In this document we will explore different aspects of setting up your Macbook for for development purposes.  This includes but is not limited to setting up some essential software that will enable you to install some core aspects of MobileFirst.

## Homebrew

I like to use `sudu` as little as possible especially when installing software.  To avoid this I use **Home Brew** for as much software installation as possible.

Some very useful tools that can be installed with **Home Brew** `brew install COMAND`:

* `bash-completion`
* `node`
* `nvm`
* `rbenc`
* `wget`

For trouble shooting brew issues see [Homebrew](./homebrew)

### Updating bash and bash-completion

[source][bash_completion_source]

You can update bash using homebrew. With `homebrew install bash`.  It is also important to note that you will have to insure you **bash_profile** or **bash_rc** is updated to have the brew path first in your systems path.  Once you have the updated bash installed you can install the latest bash-completion with `brew install bash-completion2`

You will need to update how you load the bash completion in your **[bash/bash_rc]profile** as follows.

```shell
####### Verify is bash_completon is installed #######

 # Add tab completion for bash completion 2
if which brew > /dev/null && [ -f "$(brew --prefix)/share/bash-completion/bash_completion" ]; then
  source "$(brew --prefix)/share/bash-completion/bash_completion";
  export PS1='\W$(__git_ps1) \$ '

# Fallback to bash completion
elif [ -f /etc/bash_completion ]; then
  source /etc/bash_completion;
  export PS1='\W$(__git_ps1) \$ '
fi;
```

**Note**: you can leave out the `export` of `PS1` if you choose.  I just prefer a simple concise command prompt.

[bash_completion_source]: https://troymccall.com/better-bash-4--completions-on-osx/

## Java Version Management

When it comes to Java management on a Mac there are several option in which you can chose.  Below I will detail a few of them to chose from.  First I will mention my favorite jenv

### jenv

This software is available through Homebrew.  It is well documented on it's <a href="https://github.com/gcuisinier/jenv" target="blank">github page</a>, .  Let us discus a few caveats here.  First and foremost you must add any installed versions of Java installed for jenv to be able to manage it.  You can see a list of install by running the command `/usr/libexec/java_home -V`.  

* <a href="http://www.jenv.be/" target="blank">jenv</a> - use jenv to manage Java versions


### Using .bash_profile

<a href="http://stackoverflow.com/questions/26252591/mac-os-x-and-multiple-java-versions/26252993#26252993" target="blank">See this StackOverflow post</a> for simple java version management using your `.bash_profile`

## Ruby Management

rbenv is awesome!!  `brew install rbenv`

Plugins to consider
* `git clone https://github.com/rbenv/rbenv-default-gems.git $(rbenv root)/plugins/rbenv-default-gems`
* `git clone https://github.com/mislav/rbenv-user-gems.git "$(rbenv root)/plugins/rbenv-user-gems"`
* `git clone https://github.com/rkh/rbenv-update.git "$(rbenv root)/plugins/rbenv-update"`
* `git clone https://github.com/rkh/rbenv-whatis.git $(rbenv root)/plugins/rbenv-whatis`
* `git clone https://github.com/rkh/rbenv-use.git $(rbenv root)/plugins/rbenv-use`

## Text Editors

This is a very personal choice, and I can only detail the ones I'm familiar with.

* Sublime Text 3: is a very customizable text editor with a largely supported development community.
	* For usage details see the internal [Sublime Text 3](../osx-sublime_text) notes page.
	* <a href="https://www.sublimetext.com/" target="blank" >Sublime Homepage<i class="material-icons">open_in_new</i></a>

* Atom

*If you would like to share your favorite please update this page.*

## Other

<a href="https://robots.thoughtbot.com/using-rbenv-to-manage-rubies-and-gems" target="blank">Using rbenv to Manage Rubies and Gems</a>
