---
layout: post
title: "Test Draft"
author: "Eric N. Garcia"
tags: comma, separated, list
---

This first section is a blurb describing the post. It will be truncated and displayed on the posts card. It is also used to verify you are serving drafts when running locally.

[Source](https://jekyllrb.com/docs/drafts/){:target="\_blank"}

Drafts are posts without a date. They’re posts you’re still working on and don’t want to publish yet. To get up and running with drafts, create a **\_drafts** folder in your site’s root (as described in the site [structure section](https://jekyllrb.com/docs/structure/)) and create your first draft:

```
|-- _drafts/
|   |-- a-draft-post.md
```

To preview your site with drafts, simply run `jekyll serve` or `jekyll build` with the `--drafts` switch. Each will be assigned the value modification time of the draft file for its date, and thus you will see currently edited drafts as the latest posts.
