---
layout: default
---
<!-- 
<div class="home">

  <h1 class="page-heading">Posts</h1>

  <ul class="post-list">
    {% for post in site.posts %}
    <li>
      <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

      <h2>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
    </li>
    {% endfor %}
  </ul>

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>

</div>
-->

{% for post in site.posts %}
<div class="mdl-cell mdl-cell--5-col mdl-cell--4-col-tablet mdl-card  mdl-card mdl-shadow--4dp">
  <div class="mdl-card__title mdl-card--expand portfolio-blog-card-strip-bg mdl-color-text--white">
    <h2 class="mdl-card__title-text">{{ post.title }}</h2>
  </div>
  <div class="mdl-card__supporting-text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="{{ post.url | prepend: site.baseurl }}">
      READ MORE
    </a>
  </div>



  <!-- 
  <div class="mdl-card__media mdl-cell mdl-cell--12-col-tablet">
    <img class="article-image" src="/images/example-blog01.jpg" border="0" alt="">
  </div>
  <div class="mdl-cell mdl-cell--8-col">
    <h2 class="mdl-card__title-text">
      <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
    </h2>
    <div class="mdl-card__supporting-text padding-top">
      <span>Posted 2 days ago</span>
      <div id="tt1" class=" icon material-icons portfolio-share-btn">share</div>
      <div class="mdl-tooltip" for="tt1">
        Share via social media
      </div>
    </div>
    <div class="mdl-card__supporting-text no-left-padding">
      <p>Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet. Voluptate voluptate irure occaecat deserunt incididunt esse in. Qui ullamco consectetur aute fugiat officia ullamco proident Lorem ad irure. Sint eu ut consectetur ut esse veniam laboris adipisicing aliquip minim anim labore commodo.</p>
      <span>Category: <a href="#">Latest</a></span>
    </div>
  </div> 
-->
</div>
{% endfor %}

<p class="rss-subscribe mdl-cell mdl-cell--8-col mdl-card__supporting-text no-padding">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>