"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[1562],{3555:function(e,t,a){a.d(t,{Z:function(){return E}});var n=a(7294),l=a(2749),r=a.n(l),i=a(1082),o=a(4715),c=a(2093),s=a(8086),m=a.n(s),d=function(e){var t,a=e.title,l=e.theme,r=e.tabs,i=void 0===r?[]:r;return n.createElement("div",{className:m()("PageHeader-module--page-header--36a7c",(t={},t["PageHeader-module--with-tabs--bdb43"]=i.length,t["PageHeader-module--dark-mode--58278"]="dark"===l,t))},n.createElement("div",{className:"cds--grid"},n.createElement("div",{className:"cds--row"},n.createElement("div",{className:"cds--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--12bd8"},a)))))},u=function(e){var t=e.relativePagePath,a=e.repository,l=(0,i.useStaticQuery)("1364590287").site.siteMetadata.repository,r=a||l,o=r.baseUrl,c=r.subDirectory,s=o+"/edit/"+r.branch+c+"/src/pages"+t;return o?n.createElement("div",{className:"cds--row EditLink-module--row--04499"},n.createElement("div",{className:"cds--col"},n.createElement("a",{className:"EditLink-module--link--203ae",href:s},"Edit this page on GitHub"))):null},p=a(6471),k=a(1721),h=function(e){function t(){return e.apply(this,arguments)||this}return(0,k.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,l=e.slug,o=l.split("/").filter(Boolean).slice(-1)[0],c=a.map((function(e){var t,a=r()(e,{lower:!0,strict:!0}),c=a===o,s=new RegExp(o+"/?(#.*)?$"),d=l.replace(s,a);return n.createElement("li",{key:e,className:m()((t={},t["PageTabs-module--selected-item--68107"]=c,t),"PageTabs-module--list-item--d36e2")},n.createElement(i.Link,{className:"PageTabs-module--link--2b3ff",to:""+d},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--09d7f"},n.createElement("div",{className:"cds--grid"},n.createElement("div",{className:"cds--row"},n.createElement("div",{className:"cds--col-lg-12 cds--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--c4bab"},c))))))},t}(n.Component),b=h,g=a(2124),f=a(5387),y=a(4563),N=function(e){var t=e.date,a=new Date(t);return t?n.createElement(y.X2,{className:"last-modified-date-module--row--5c9a1"},n.createElement(y.sg,null,n.createElement("div",{className:"last-modified-date-module--text--a203d"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},E=function(e){var t=e.pageContext,a=e.children,l=e.location,s=e.Title,m=t.frontmatter,k=void 0===m?{}:m,h=t.relativePagePath,y=t.titleType,E=k.tabs,v=k.title,P=k.theme,T=k.description,w=k.keywords,x=k.date,L=(0,f.Z)().interiorTheme,A=(0,i.useStaticQuery)("2456312558").site.pathPrefix,C=A?l.pathname.replace(A,""):l.pathname,D=E?C.split("/").filter(Boolean).slice(-1)[0]||r()(E[0],{lower:!0}):"",M=P||L;return n.createElement(c.Z,{tabs:E,homepage:!1,theme:M,pageTitle:v,pageDescription:T,pageKeywords:w,titleType:y},n.createElement(d,{title:s?n.createElement(s,null):v,label:"label",tabs:E,theme:M}),E&&n.createElement(b,{title:v,slug:C,tabs:E,currentTab:D}),n.createElement(g.Z,{padded:!0},a,n.createElement(u,{relativePagePath:h}),n.createElement(N,{date:x})),n.createElement(p.Z,{pageContext:t,location:l,slug:C,tabs:E,currentTab:D}),n.createElement(o.Z,null))}},114:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return c},default:function(){return g}});var n=a(3366),l=(a(7294),a(498)),r=a(3555),i=a(1082),o=["components"],c={},s=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.kt)("div",t)}},m=s("NotesNav"),d=s("PageDescription"),u=s("AnchorLinks"),p=s("AnchorLink"),k=s("ExternalLink"),h={_frontmatter:c},b=r.Z;function g(e){var t=e.components,a=(0,n.Z)(e,o);return(0,l.kt)(b,Object.assign({},h,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Back to notes ",(0,l.kt)(i.Link,{to:"/notes",mdxType:"Link"},"landing page")),(0,l.kt)(m,{mdxType:"NotesNav"}),(0,l.kt)(d,{mdxType:"PageDescription"},(0,l.kt)("p",null,"A place to keep track of my career milestones. test")),(0,l.kt)(u,{mdxType:"AnchorLinks"},(0,l.kt)(p,{mdxType:"AnchorLink"},"2022"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2021"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2020"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2019"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2018"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2017"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2016"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2015")),(0,l.kt)("h1",null,"2022"),(0,l.kt)(u,{small:!0,mdxType:"AnchorLinks"},(0,l.kt)(p,{mdxType:"AnchorLink"},"2022Q4")),(0,l.kt)("h2",null,"2022Q4"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"November joined ",(0,l.kt)("a",{parentName:"li",href:"https://github.com/carbon-design-system"},"Carbon Design System"),", and became a maintainer of ",(0,l.kt)("a",{parentName:"li",href:"https://github.com/carbon-design-system/gatsby-theme-carbon"},"gatsby-theme-carbon")),(0,l.kt)("li",{parentName:"ul"},"Participated in IBM 2022 CIO Hackathon"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.credly.com/badges/84c7f84c-eb57-489a-93ce-f0701008b7e3/public_url"},"IBM Agile Explorer")," (Credly badge earned)")),(0,l.kt)("h1",null,"2021"),(0,l.kt)("h1",null,"2020"),(0,l.kt)("h2",null,"2020Q1"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.credly.com/badges/836c8f8f-fdd6-41aa-a310-ca38c0a6e54e/public_url"},"IBM Cloud Kubernetes Service")," (Credly badge earned)")),(0,l.kt)("h1",null,"2019"),(0,l.kt)("h2",null,"2019Q3"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.credly.com/badges/de8ea4d0-1d49-4084-bc16-3b0a5366d354/public_url"},"IBM Carbon Design System Developer Essentials - React")," (Credly badge earned)")),(0,l.kt)("h1",null,"2018"),(0,l.kt)("h1",null,"2017"),(0,l.kt)("p",null,"Wrote sample applications (reusable assets)"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://github.ibm.com/MFPSamples/PushNotificationsAndroid"},"MFP Android Push notifications"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"accompanying ",(0,l.kt)("a",{parentName:"li",href:"https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/notifications/"},"tutorial")))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://github.ibm.com/MFPSamples/PushNotificationsSwift"},"MFP iOS Push notifications"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"accompanying ",(0,l.kt)("a",{parentName:"li",href:"https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/notifications/"},"tutorial"))))),(0,l.kt)("h1",null,"2016"),(0,l.kt)("h2",null,"2016Q3"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.credly.com/badges/36ddd342-c057-4624-9738-504cd982d585/public_url"},"Enterprise Design Thinking Practitioner")," (Credly badge earned)"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)(k,{href:"https://example.com",mdxType:"ExternalLink"},"Test"))),(0,l.kt)("h1",null,"2015"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Graduated from Full Sail University")))}g.isMDXComponent=!0}}]);
//# sourceMappingURL=component---content-notes-career-roadmap-mdx-885ee54519e8680a3d95.js.map