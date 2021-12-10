"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[4554],{2613:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return s},default:function(){return c}});var n=a(3366),l=(a(7294),a(498)),r=a(7637),i=["components"],s={},m={_frontmatter:s},o=r.Z;function c(e){var t=e.components,a=(0,n.Z)(e,i);return(0,l.kt)(o,Object.assign({},m,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",null,"Untracking a single file"),(0,l.kt)("p",null,"To untrack a single file that has already been added/initialized to your repository, i.e., stop tracking the file but not delete it from your system use:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"git rm --cached filename\n")),(0,l.kt)("h2",null,"Untracking all files"),(0,l.kt)("p",null,"To untrack every file that is now in your ",(0,l.kt)("strong",{parentName:"p"},".gitignore"),":"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Commit any outstanding code changes, and then, run this command:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'git commit -m "Commit message"\n'))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"This removes any changed files from the index(staging area), then just run:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"git rm -r --cached .\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Add all tracked changes"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"git add .\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Commit it:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'git commit -m ".gitignore is now working"\n')))))}c.isMDXComponent=!0},7637:function(e,t,a){a.d(t,{Z:function(){return v}});var n=a(7294),l=a(2749),r=a.n(l),i=a(5444),s=a(7077),m=a(4120),o=a(8086),c=a.n(o),d=function(e){var t,a=e.title,l=e.theme,r=e.tabs,i=void 0===r?[]:r;return n.createElement("div",{className:c()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=i.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===l,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},u=function(e){var t=e.relativePagePath,a=e.repository,l=(0,i.useStaticQuery)("1364590287").site.siteMetadata.repository,r=a||l,s=r.baseUrl,m=r.subDirectory,o=s+"/edit/"+r.branch+m+"/src/pages"+t;return s?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:o},"Edit this page on GitHub"))):null},p=a(7052),g=a(1721),h=function(e){function t(){return e.apply(this,arguments)||this}return(0,g.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,l=e.slug,s=l.split("/").filter(Boolean).slice(-1)[0],m=a.map((function(e){var t,a=r()(e,{lower:!0,strict:!0}),m=a===s,o=new RegExp(s+"/?(#.*)?$"),d=l.replace(o,a);return n.createElement("li",{key:e,className:c()((t={},t["PageTabs-module--selected-item--aBB0K"]=m,t),"PageTabs-module--list-item--024o6")},n.createElement(i.Link,{className:"PageTabs-module--link--Kz-7R",to:""+d},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},m))))))},t}(n.Component),k=h,b=a(532),N=a(6958),f=a(9945),E=function(e){var t=e.date,a=new Date(t);return t?n.createElement(f.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(f.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},v=function(e){var t=e.pageContext,a=e.children,l=e.location,o=e.Title,c=t.frontmatter,g=void 0===c?{}:c,h=t.relativePagePath,f=t.titleType,v=g.tabs,y=g.title,x=g.theme,P=g.description,w=g.keywords,T=g.date,C=(0,N.Z)().interiorTheme,Z=(0,i.useStaticQuery)("2456312558").site.pathPrefix,D=Z?l.pathname.replace(Z,""):l.pathname,B=v?D.split("/").filter(Boolean).slice(-1)[0]||r()(v[0],{lower:!0}):"",H=x||C;return n.createElement(m.Z,{tabs:v,homepage:!1,theme:H,pageTitle:y,pageDescription:P,pageKeywords:w,titleType:f},n.createElement(d,{title:o?n.createElement(o,null):y,label:"label",tabs:v,theme:H}),v&&n.createElement(k,{title:y,slug:D,tabs:v,currentTab:B}),n.createElement(b.Z,{padded:!0},a,n.createElement(u,{relativePagePath:h}),n.createElement(E,{date:T})),n.createElement(p.Z,{pageContext:t,location:l,slug:D,tabs:v,currentTab:B}),n.createElement(s.Z,null))}}}]);
//# sourceMappingURL=component---content-notes-git-gitignore-md-63637c09a20dd296e045.js.map