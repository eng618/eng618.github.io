"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[4147],{3555:function(e,t,a){a.d(t,{Z:function(){return N}});var l=a(7294),n=a(2749),r=a.n(n),s=a(1082),o=a(4715),c=a(2093),i=a(8086),d=a.n(i);var m=e=>{let{title:t,theme:a,tabs:n=[]}=e;return l.createElement("div",{className:d()("PageHeader-module--page-header--36a7c",{"PageHeader-module--with-tabs--bdb43":n.length,"PageHeader-module--dark-mode--58278":"dark"===a})},l.createElement("div",{className:"cds--grid"},l.createElement("div",{className:"cds--row"},l.createElement("div",{className:"cds--col-lg-12"},l.createElement("h1",{id:"page-title",className:"PageHeader-module--text--12bd8"},t)))))};var u=e=>{let{relativePagePath:t,repository:a}=e;const{site:{siteMetadata:{repository:n}}}=(0,s.useStaticQuery)("1364590287"),{baseUrl:r,subDirectory:o,branch:c}=a||n,i=r+"/edit/"+c+o+"/src/pages"+t;return r?l.createElement("div",{className:"cds--row EditLink-module--row--04499"},l.createElement("div",{className:"cds--col"},l.createElement("a",{className:"EditLink-module--link--203ae",href:i},"Edit this page on GitHub"))):null},p=a(6471),g=a(1721);let h=function(e){function t(){return e.apply(this,arguments)||this}return(0,g.Z)(t,e),t.prototype.render=function(){const{title:e,tabs:t,slug:a}=this.props,n=a.split("/").filter(Boolean).slice(-1)[0],o=t.map((e=>{const t=r()(e,{lower:!0,strict:!0}),o=t===n,c=new RegExp(n+"/?(#.*)?$"),i=a.replace(c,t);return l.createElement("li",{key:e,className:d()({"PageTabs-module--selected-item--68107":o},"PageTabs-module--list-item--d36e2")},l.createElement(s.Link,{className:"PageTabs-module--link--2b3ff",to:""+i},e))}));return l.createElement("div",{className:"PageTabs-module--tabs-container--09d7f"},l.createElement("div",{className:"cds--grid"},l.createElement("div",{className:"cds--row"},l.createElement("div",{className:"cds--col-lg-12 cds--col-no-gutter"},l.createElement("nav",{"aria-label":e},l.createElement("ul",{className:"PageTabs-module--list--c4bab"},o))))))},t}(l.Component);var b=h,f=a(2124),E=a(5387),v=a(4563);var k=e=>{let{date:t}=e;const a=new Date(t);return t?l.createElement(v.X2,{className:"last-modified-date-module--row--5c9a1"},l.createElement(v.sg,null,l.createElement("div",{className:"last-modified-date-module--text--a203d"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null};var N=e=>{let{pageContext:t,children:a,location:n,Title:i}=e;const{frontmatter:d={},relativePagePath:g,titleType:h}=t,{tabs:v,title:N,theme:P,description:w,keywords:y,date:T}=d,{interiorTheme:x}=(0,E.Z)(),{site:{pathPrefix:D}}=(0,s.useStaticQuery)("2456312558"),Z=D?n.pathname.replace(D,""):n.pathname,C=v?Z.split("/").filter(Boolean).slice(-1)[0]||r()(v[0],{lower:!0}):"",H=P||x;return l.createElement(c.Z,{tabs:v,homepage:!1,theme:H,pageTitle:N,pageDescription:w,pageKeywords:y,titleType:h},l.createElement(m,{title:i?l.createElement(i,null):N,label:"label",tabs:v,theme:H}),v&&l.createElement(b,{title:N,slug:Z,tabs:v,currentTab:C}),l.createElement(f.Z,{padded:!0},a,l.createElement(u,{relativePagePath:g}),l.createElement(k,{date:T})),l.createElement(p.Z,{pageContext:t,location:n,slug:Z,tabs:v,currentTab:C}),l.createElement(o.Z,null))}},2868:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return o},default:function(){return u}});var l=a(5987),n=(a(7294),a(498)),r=a(3555);const s=["components"],o={},c=(i="PageDescription",function(e){return console.warn("Component "+i+" was not imported, exported, or provided by MDXProvider as global scope"),(0,n.kt)("div",e)});var i;const d={_frontmatter:o},m=r.Z;function u(e){let{components:t}=e,a=(0,l.Z)(e,s);return(0,n.kt)(m,Object.assign({},d,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)(c,{mdxType:"PageDescription"},(0,n.kt)("p",null,"This page holds bash cheat sheets")),(0,n.kt)("h2",null,"Finding file with particular extensions to open in vs code"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell",metastring:"path=https://stackoverflow.com/a/69690491",path:"https://stackoverflow.com/a/69690491"},'find . -iname "*\\.{file-extension}" -print0 | xargs -0 code\n')),(0,n.kt)("h2",null,"Printing the last exit code"),(0,n.kt)("p",null,"Sometimes you need to read the exit code of the last ran command, to check it if succeeded or failed. To do so exicute the following command."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"echo $?\n")))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-code-notes-cheat-sheets-bash-mdx-ece82d2c5110a7142bd8.js.map