---
title: 'Portfolio'
---

This page is under construction

![under construction](/images/uc1.png)

```html
<h4>Published Applications</h4>

<div class="mdl-grid">
  {/* Add liquid to add card for each item in directory */}

  <!-- Add this block per item in portfolio -->
  <div
    class="
      mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone
      mdl-card
      mdl-shadow--3dp
    "
  >
    <div class="mdl-card__media">
      <img class="article-image" src="./memory_vault.webp" border="0" alt="" />
    </div>
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">Memory Vault</h2>
    </div>
    <div class="mdl-card__supporting-text">
      Cross platform app that keeps all your memories safe and synced between all your Android and iOS devices. Your
      memories are saved in the cloud so they are always safe...even if your phone isn't.
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <a
        class="
          mdl-button mdl-button--colored
          mdl-js-button mdl-js-ripple-effect
          mdl-button--accent
        "
        href="{{ site.url }}{{ site.baseurl }}/mobile_apps/memory_vault"
        >Read more<i class="material-icons">chevron_right</i></a
      >
    </div>
  </div>
</div>

<h4>Lynda.com Certificates of Completion</h4>

<!-- Setup for category cards -->

{% assign certCategories = site.data.lyndaCoC | group_by: "category" | sort: "name" %}

<div class="mdl-grid">
  {% for certCategory in certCategories %}
  <!--
  # - course:
  #   url:
  #   completed:
  #   authority: Lynda.com
  #   certificateNumber:
  #   length:
  #   category:
  -->

  <!-- Add this block per item in portfolio -->
  <div
    class="
      mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone
      mdl-card
      mdl-shadow--3dp
    "
  >
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{ certCategory.name }}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <ul>
        {% for cert in certCategory.items %}
        <li><a href="{{ cert.url }}" target="_blank">{{ cert.course }}</a></li>
        {% endfor %}
      </ul>
    </div>
  </div>

  {% endfor %}
</div>
```
