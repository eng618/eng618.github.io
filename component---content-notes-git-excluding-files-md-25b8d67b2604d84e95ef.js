"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[9340],{3555:function(e,t,a){a.d(t,{Z:function(){return y}});var n=a(7294),l=a(2749),r=a.n(l),s=a(1082),o=a(4715),i=a(2093),c=a(8086),d=a.n(c);var u=e=>{let{title:t,theme:a,tabs:l=[]}=e;return n.createElement("div",{className:d()("PageHeader-module--page-header--36a7c",{"PageHeader-module--with-tabs--bdb43":l.length,"PageHeader-module--dark-mode--58278":"dark"===a})},n.createElement("div",{className:"cds--grid"},n.createElement("div",{className:"cds--row"},n.createElement("div",{className:"cds--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--12bd8"},t)))))};var m=e=>{let{relativePagePath:t,repository:a}=e;const{site:{siteMetadata:{repository:l}}}=(0,s.useStaticQuery)("1364590287"),{baseUrl:r,subDirectory:o,branch:i}=a||l,c=r+"/edit/"+i+o+"/src/pages"+t;return r?n.createElement("div",{className:"cds--row EditLink-module--row--04499"},n.createElement("div",{className:"cds--col"},n.createElement("a",{className:"EditLink-module--link--203ae",href:c},"Edit this page on GitHub"))):null},p=a(6471),g=a(1721);let k=function(e){function t(){return e.apply(this,arguments)||this}return(0,g.Z)(t,e),t.prototype.render=function(){const{title:e,tabs:t,slug:a}=this.props,l=a.split("/").filter(Boolean).slice(-1)[0],o=t.map((e=>{const t=r()(e,{lower:!0,strict:!0}),o=t===l,i=new RegExp(l+"/?(#.*)?$"),c=a.replace(i,t);return n.createElement("li",{key:e,className:d()({"PageTabs-module--selected-item--68107":o},"PageTabs-module--list-item--d36e2")},n.createElement(s.Link,{className:"PageTabs-module--link--2b3ff",to:""+c},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--09d7f"},n.createElement("div",{className:"cds--grid"},n.createElement("div",{className:"cds--row"},n.createElement("div",{className:"cds--col-lg-12 cds--col-no-gutter"},n.createElement("nav",{"aria-label":e},n.createElement("ul",{className:"PageTabs-module--list--c4bab"},o))))))},t}(n.Component);var h=k,b=a(2124),f=a(5387),E=a(4563);var N=e=>{let{date:t}=e;const a=new Date(t);return t?n.createElement(E.X2,{className:"last-modified-date-module--row--5c9a1"},n.createElement(E.sg,null,n.createElement("div",{className:"last-modified-date-module--text--a203d"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null};var y=e=>{let{pageContext:t,children:a,location:l,Title:c}=e;const{frontmatter:d={},relativePagePath:g,titleType:k}=t,{tabs:E,title:y,theme:v,description:w,keywords:P,date:x}=d,{interiorTheme:T}=(0,f.Z)(),{site:{pathPrefix:C}}=(0,s.useStaticQuery)("2456312558"),I=C?l.pathname.replace(C,""):l.pathname,L=E?I.split("/").filter(Boolean).slice(-1)[0]||r()(E[0],{lower:!0}):"",Z=v||T;return n.createElement(i.Z,{tabs:E,homepage:!1,theme:Z,pageTitle:y,pageDescription:w,pageKeywords:P,titleType:k},n.createElement(u,{title:c?n.createElement(c,null):y,label:"label",tabs:E,theme:Z}),E&&n.createElement(h,{title:y,slug:I,tabs:E,currentTab:L}),n.createElement(b.Z,{padded:!0},a,n.createElement(m,{relativePagePath:g}),n.createElement(N,{date:x})),n.createElement(p.Z,{pageContext:t,location:l,slug:I,tabs:E,currentTab:L}),n.createElement(o.Z,null))}},5870:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return o},default:function(){return d}});var n=a(5987),l=(a(7294),a(498)),r=a(3555);const s=["components"],o={},i={_frontmatter:o},c=r.Z;function d(e){let{components:t}=e,a=(0,n.Z)(e,s);return(0,l.kt)(c,Object.assign({},i,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",null,"Ignoring tracked files in your local repo"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"git update-index --skip-worktree SOME_FILE\n")),(0,l.kt)("p",null,"or"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"git update-index --assume-unchanged SOME_FILE\n")),(0,l.kt)("p",null,"To undo assume unchanged"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"git update-index --no-assume-unchanged SOME_FILE\n")),(0,l.kt)("p",null,"If using ",(0,l.kt)("inlineCode",{parentName:"p"},"assume-unchanged")," you can add the following to your ",(0,l.kt)("strong",{parentName:"p"},"~/.gitconfig")),(0,l.kt)("p",null,"This will allow you to use the alias ",(0,l.kt)("inlineCode",{parentName:"p"},"git ignored")," to list all excluded files"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'[alias]\n    ignored = !git ls-files -v | grep "^[[:lower:]]"\n')),(0,l.kt)("h2",null,"Ignoring un-tracked files in your local repo"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Untested")),(0,l.kt)("p",null,"If you ever want to ignore a file from git, but don’t want to add it to the ",(0,l.kt)("strong",{parentName:"p"},".gitignore")," file, you can do it on your local copy by adding it to the file ",(0,l.kt)("strong",{parentName:"p"},".git/info/exclude")),(0,l.kt)("p",null,"I’ve setup an alias to do so, just add this to your ",(0,l.kt)("strong",{parentName:"p"},".gitconfig")," file under the ",(0,l.kt)("inlineCode",{parentName:"p"},"[alias]")," section"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"exclude = !sh -c 'echo \"$1\" >> .git/info/exclude' -\n")),(0,l.kt)("p",null,"Then you can execute:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"git exclude SOME_FILE\n")))}d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---content-notes-git-excluding-files-md-25b8d67b2604d84e95ef.js.map