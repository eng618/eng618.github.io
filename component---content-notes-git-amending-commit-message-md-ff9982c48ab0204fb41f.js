"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[7268],{8329:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return i},default:function(){return c}});var r=a(3366),n=(a(7294),a(498)),o=a(7637),l=["components"],i={},m={_frontmatter:i},s=o.Z;function c(e){var t=e.components,a=(0,r.Z)(e,l);return(0,n.kt)(s,Object.assign({},m,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"To open your editor, allowing you to change the commit message of the most recent commit. Additionally, you can set the commit message directly in the command line with:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"git commit --amend\n")),(0,n.kt)("p",null,"…however, this can make multi-line commit messages or small corrections more cumbersome to enter."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'git commit --amend -m "New commit message"\n')),(0,n.kt)("p",null,"Make sure you don’t have any working copy changes before doing this or they can get committed too."),(0,n.kt)("p",null,"Changing the message of a commit that you’ve already pushed to your remote branch"),(0,n.kt)("p",null,"If you’ve already pushed your commit up to your remote branch, then you’ll need to force push the commit with"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"git push <remote> <branch> --force\n")),(0,n.kt)("p",null,"Or"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"git push <remote> <branch> -f\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Warning:")," force-pushing will overwrite the remote branch with the state of your local one. If there are commits on the remote branch that you don’t have in your local branch, you will lose those commits."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Warning:")," be cautious about amending commits that you have already shared with other people. Amending commits essentially rewrites them to have different SHA IDs, which poses a problem if other people have copies of the old commit that you’ve rewritten. Anyone who has a copy of the old commit will need to re-synchronize their work with your newly re-written commit, which can sometimes be difficult, so make sure you coordinate with others when attempting to rewrite shared commit history, or just avoid rewriting shared commits altogether."))}c.isMDXComponent=!0},7637:function(e,t,a){a.d(t,{Z:function(){return k}});var r=a(7294),n=a(2749),o=a.n(n),l=a(5444),i=a(7077),m=a(4120),s=a(8086),c=a.n(s),u=function(e){var t,a=e.title,n=e.theme,o=e.tabs,l=void 0===o?[]:o;return r.createElement("div",{className:c()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=l.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===n,t))},r.createElement("div",{className:"bx--grid"},r.createElement("div",{className:"bx--row"},r.createElement("div",{className:"bx--col-lg-12"},r.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},d=function(e){var t=e.relativePagePath,a=e.repository,n=(0,l.useStaticQuery)("1364590287").site.siteMetadata.repository,o=a||n,i=o.baseUrl,m=o.subDirectory,s=i+"/edit/"+o.branch+m+"/src/pages"+t;return i?r.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},r.createElement("div",{className:"bx--col"},r.createElement("a",{className:"EditLink-module--link--IDrl1",href:s},"Edit this page on GitHub"))):null},h=a(7052),p=a(1721),g=function(e){function t(){return e.apply(this,arguments)||this}return(0,p.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,n=e.slug,i=n.split("/").filter(Boolean).slice(-1)[0],m=a.map((function(e){var t,a=o()(e,{lower:!0,strict:!0}),m=a===i,s=new RegExp(i+"/?(#.*)?$"),u=n.replace(s,a);return r.createElement("li",{key:e,className:c()((t={},t["PageTabs-module--selected-item--aBB0K"]=m,t),"PageTabs-module--list-item--024o6")},r.createElement(l.Link,{className:"PageTabs-module--link--Kz-7R",to:""+u},e))}));return r.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},r.createElement("div",{className:"bx--grid"},r.createElement("div",{className:"bx--row"},r.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},r.createElement("nav",{"aria-label":t},r.createElement("ul",{className:"PageTabs-module--list--xLqxG"},m))))))},t}(r.Component),b=g,y=a(532),f=a(6958),w=a(9945),v=function(e){var t=e.date,a=new Date(t);return t?r.createElement(w.X2,{className:"last-modified-date-module--row--XJoYQ"},r.createElement(w.sg,null,r.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},k=function(e){var t=e.pageContext,a=e.children,n=e.location,s=e.Title,c=t.frontmatter,p=void 0===c?{}:c,g=t.relativePagePath,w=t.titleType,k=p.tabs,E=p.title,N=p.theme,P=p.description,x=p.keywords,T=p.date,C=(0,f.Z)().interiorTheme,Z=(0,l.useStaticQuery)("2456312558").site.pathPrefix,D=Z?n.pathname.replace(Z,""):n.pathname,H=k?D.split("/").filter(Boolean).slice(-1)[0]||o()(k[0],{lower:!0}):"",B=N||C;return r.createElement(m.Z,{tabs:k,homepage:!1,theme:B,pageTitle:E,pageDescription:P,pageKeywords:x,titleType:w},r.createElement(u,{title:s?r.createElement(s,null):E,label:"label",tabs:k,theme:B}),k&&r.createElement(b,{title:E,slug:D,tabs:k,currentTab:H}),r.createElement(y.Z,{padded:!0},a,r.createElement(d,{relativePagePath:g}),r.createElement(v,{date:T})),r.createElement(h.Z,{pageContext:t,location:n,slug:D,tabs:k,currentTab:H}),r.createElement(i.Z,null))}}}]);
//# sourceMappingURL=component---content-notes-git-amending-commit-message-md-ff9982c48ab0204fb41f.js.map