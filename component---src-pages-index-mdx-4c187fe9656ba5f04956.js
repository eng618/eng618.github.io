"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[809],{3624:function(e,t,a){a.d(t,{Z:function(){return k}});var r=a(7294),n=a(8650),l=a.n(n),c=a(1597),i=a(9124),o=a(9820),s=a(5900),d=a.n(s),m=function(e){var t,a=e.title,n=e.theme,l=e.tabs,c=void 0===l?[]:l;return r.createElement("div",{className:d()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=c.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===n,t))},r.createElement("div",{className:"cds--grid"},r.createElement("div",{className:"cds--row"},r.createElement("div",{className:"cds--col-lg-12"},r.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},u=function(e){var t=e.relativePagePath,a=e.repository,n=(0,c.useStaticQuery)("1364590287").site.siteMetadata.repository,l=a||n,i=l.baseUrl,o=l.subDirectory,s=i+"/edit/"+l.branch+o+"/src/pages"+t;return i?r.createElement("div",{className:"cds--row EditLink-module--row--BEmSX"},r.createElement("div",{className:"cds--col"},r.createElement("a",{className:"EditLink-module--link--IDrl1",href:s},"Edit this page on GitHub"))):null},p=a(4703),g=a(1721),b=function(e){function t(){return e.apply(this,arguments)||this}return(0,g.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,n=e.slug,i=n.split("/").filter(Boolean).slice(-1)[0],o=a.map((function(e){var t,a=l()(e,{lower:!0,strict:!0}),o=a===i,s=new RegExp(i+"/?(#.*)?$"),m=n.replace(s,a);return r.createElement("li",{key:e,className:d()((t={},t["PageTabs-module--selected-item--aBB0K"]=o,t),"PageTabs-module--list-item--024o6")},r.createElement(c.Link,{className:"PageTabs-module--link--Kz-7R",to:""+m},e))}));return r.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},r.createElement("div",{className:"cds--grid"},r.createElement("div",{className:"cds--row"},r.createElement("div",{className:"cds--col-lg-12 cds--col-no-gutter"},r.createElement("nav",{"aria-label":t},r.createElement("ul",{className:"PageTabs-module--list--xLqxG"},o))))))},t}(r.Component),h=b,f=a(7296),E=a(5387),y=a(3732),v=function(e){var t=e.date,a=new Date(t);return t?r.createElement(y.X2,{className:"last-modified-date-module--row--XJoYQ"},r.createElement(y.sg,null,r.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},k=function(e){var t=e.pageContext,a=e.children,n=e.location,s=e.Title,d=t.frontmatter,g=void 0===d?{}:d,b=t.relativePagePath,y=t.titleType,k=g.tabs,w=g.title,T=g.theme,x=g.description,C=g.keywords,P=g.date,N=(0,E.Z)().interiorTheme,L=(0,c.useStaticQuery)("2456312558").site.pathPrefix,D=L?n.pathname.replace(L,""):n.pathname,I=k?D.split("/").filter(Boolean).slice(-1)[0]||l()(k[0],{lower:!0}):"",S=T||N;return r.createElement(o.Z,{tabs:k,homepage:!1,theme:S,pageTitle:w,pageDescription:x,pageKeywords:C,titleType:y},r.createElement(m,{title:s?r.createElement(s,null):w,label:"label",tabs:k,theme:S}),k&&r.createElement(h,{title:w,slug:D,tabs:k,currentTab:I}),r.createElement(f.Z,{padded:!0},a,r.createElement(u,{relativePagePath:b}),r.createElement(v,{date:P})),r.createElement(p.Z,{pageContext:t,location:n,slug:D,tabs:k,currentTab:I}),r.createElement(i.Z,null))}},1624:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return o},default:function(){return b}});var r=a(3366),n=(a(7294),a(4983)),l=(a(3624),a(9602)),c=a(1597),i=["components"],o={},s=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,n.kt)("div",t)}},d=s("Row"),m=s("Column"),u=s("ImageCard"),p={_frontmatter:o},g=l.Z;function b(e){var t=e.components,a=(0,r.Z)(e,i);return(0,n.kt)(g,Object.assign({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",null,"Welcome!!"),(0,n.kt)("p",null,"This site is setup to showcase my professional career and hobbies as a Software Engineer."),(0,n.kt)("p",null,"You can find out more about me on the ",(0,n.kt)(c.Link,{to:"about",mdxType:"Link"},"About")," page."),(0,n.kt)("h2",null,"Badges earned"),(0,n.kt)(d,{className:"image-card-group",mdxType:"Row"},(0,n.kt)(m,{colMd:2,colLg:2,noGutterSm:!0,mdxType:"Column"},(0,n.kt)(u,{title:"Agile explorer",href:"https://www.credly.com/badges/84c7f84c-eb57-489a-93ce-f0701008b7e3/public_url",actionIcon:"Launch",mdxType:"ImageCard"},"![Agile explorer](./images/credly/ibm-agile-explorer.png)")),(0,n.kt)(m,{colMd:2,colLg:2,noGutterSm:!0,mdxType:"Column"},(0,n.kt)(u,{title:"IBM Cloud Kubernetes Service",href:"https://www.credly.com/badges/836c8f8f-fdd6-41aa-a310-ca38c0a6e54e/public_url",actionIcon:"Launch",mdxType:"ImageCard"},"![IBM Cloud Kubernetes Service](./images/credly/ibm-cloud-kubernetes-service.png)")),(0,n.kt)(m,{colMd:2,colLg:2,noGutterSm:!0,mdxType:"Column"},(0,n.kt)(u,{title:"IBM Carbon Design System Developer Essentials - React",href:"https://www.credly.com/badges/de8ea4d0-1d49-4084-bc16-3b0a5366d354/public_url",actionIcon:"Launch",mdxType:"ImageCard"},"![IBM Carbon Design System Developer Essentials - React](./images/credly/ibm-carbon-design-system-developer-essentials-react.png)")),(0,n.kt)(m,{colMd:2,colLg:2,noGutterSm:!0,mdxType:"Column"},(0,n.kt)(u,{title:"Enterprise Design Thinking Practitioner",href:"https://www.credly.com/badges/36ddd342-c057-4624-9738-504cd982d585/public_url",actionIcon:"Launch",mdxType:"ImageCard"},"![Enterprise Design Thinking Practitioner](./images/credly/enterprise-design-thinking-practitioner.png)"))))}b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-index-mdx-4c187fe9656ba5f04956.js.map