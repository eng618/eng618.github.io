"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[6723],{4430:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return c},default:function(){return d}});var l,n=a(3366),i=(a(7294),a(4983)),r=a(4295),o=["components"],c={},s=(l="PageDescription",function(e){return console.warn("Component "+l+" was not imported, exported, or provided by MDXProvider as global scope"),(0,i.kt)("div",e)}),m={_frontmatter:c},u=r.Z;function d(e){var t=e.components,a=(0,n.Z)(e,o);return(0,i.kt)(u,Object.assign({},m,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)(s,{mdxType:"PageDescription"},(0,i.kt)("p",null,"This page outlines some basic but common queries used when working with elasticsearch data.")),(0,i.kt)("h1",null,"Common Queries"),(0,i.kt)("h2",null,"Checking status"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"curl -XGET 'localhost:9200/_cat/indices?v&pretty'")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"curl -XGET 'localhost:9200/_cat/health?v&pretty'")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"curl -XGET 'localhost:9200/_cat/nodes?v&pretty'"))),(0,i.kt)("h2",null,"Searching"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"curl -XGET 'localhost:9200/.kibana/_search/?pretty'")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"curl -XGET 'localhost:9200/.kibana/_mappings/?pretty'"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"This will git you the mappings, you can pipe it to the clipboard, and past in text editor for easy consumption by adding ",(0,i.kt)("inlineCode",{parentName:"li"},"| pbcopy")," to the end."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"curl -XGET 'localhost:9200/_template?pretty'"))),(0,i.kt)("h2",null,"Adding data"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},'curl -XPUT \'localhost:9200/.kibana/doc/1\' -d \'{"type": "apic", "apic" : {"title": "eng"}}\' -H \'Content-Type:application/json\''))),(0,i.kt)("h2",null,"Removing data"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"curl -XDELETE 'localhost:9200/.kibana_1'")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"curl -XDELETE 'localhost:9200/_template/kibana_index_template:.kibana'"))))}d.isMDXComponent=!0},4295:function(e,t,a){a.d(t,{Z:function(){return y}});var l=a(7294),n=a(8650),i=a.n(n),r=a(5444),o=a(5426),c=a(5885),s=a(5900),m=a.n(s),u=function(e){var t,a=e.title,n=e.theme,i=e.tabs,r=void 0===i?[]:i;return l.createElement("div",{className:m()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=r.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===n,t))},l.createElement("div",{className:"bx--grid"},l.createElement("div",{className:"bx--row"},l.createElement("div",{className:"bx--col-lg-12"},l.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},d=function(e){var t=e.relativePagePath,a=e.repository,n=(0,r.useStaticQuery)("1364590287").site.siteMetadata.repository,i=a||n,o=i.baseUrl,c=i.subDirectory,s=o+"/edit/"+i.branch+c+"/src/pages"+t;return o?l.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},l.createElement("div",{className:"bx--col"},l.createElement("a",{className:"EditLink-module--link--IDrl1",href:s},"Edit this page on GitHub"))):null},p=a(4275),g=a(1721),k=function(e){function t(){return e.apply(this,arguments)||this}return(0,g.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,n=e.slug,o=n.split("/").filter(Boolean).slice(-1)[0],c=a.map((function(e){var t,a=i()(e,{lower:!0,strict:!0}),c=a===o,s=new RegExp(o+"/?(#.*)?$"),u=n.replace(s,a);return l.createElement("li",{key:e,className:m()((t={},t["PageTabs-module--selected-item--aBB0K"]=c,t),"PageTabs-module--list-item--024o6")},l.createElement(r.Link,{className:"PageTabs-module--link--Kz-7R",to:""+u},e))}));return l.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},l.createElement("div",{className:"bx--grid"},l.createElement("div",{className:"bx--row"},l.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},l.createElement("nav",{"aria-label":t},l.createElement("ul",{className:"PageTabs-module--list--xLqxG"},c))))))},t}(l.Component),h=k,b=a(2881),E=a(6958),N=a(36),v=function(e){var t=e.date,a=new Date(t);return t?l.createElement(N.X2,{className:"last-modified-date-module--row--XJoYQ"},l.createElement(N.sg,null,l.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},y=function(e){var t=e.pageContext,a=e.children,n=e.location,s=e.Title,m=t.frontmatter,g=void 0===m?{}:m,k=t.relativePagePath,N=t.titleType,y=g.tabs,f=g.title,T=g.theme,P=g.description,x=g.keywords,C=g.date,w=(0,E.Z)().interiorTheme,X=(0,r.useStaticQuery)("2456312558").site.pathPrefix,D=X?n.pathname.replace(X,""):n.pathname,_=y?D.split("/").filter(Boolean).slice(-1)[0]||i()(y[0],{lower:!0}):"",G=T||w;return l.createElement(c.Z,{tabs:y,homepage:!1,theme:G,pageTitle:f,pageDescription:P,pageKeywords:x,titleType:N},l.createElement(u,{title:s?l.createElement(s,null):f,label:"label",tabs:y,theme:G}),y&&l.createElement(h,{title:f,slug:D,tabs:y,currentTab:_}),l.createElement(b.Z,{padded:!0},a,l.createElement(d,{relativePagePath:k}),l.createElement(v,{date:C})),l.createElement(p.Z,{pageContext:t,location:n,slug:D,tabs:y,currentTab:_}),l.createElement(o.Z,null))}}}]);
//# sourceMappingURL=component---src-pages-cheat-sheets-elasticsearch-mdx-a57d3f75f7123aaadfa3.js.map