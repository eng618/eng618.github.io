"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[1562],{3555:function(e,t,a){a.d(t,{Z:function(){return w}});var n=a(7294),l=a(2749),r=a.n(l),i=a(1082),o=a(4715),s=a(2093),c=a(8086),m=a.n(c);var d=e=>{let{title:t,theme:a,tabs:l=[]}=e;return n.createElement("div",{className:m()("PageHeader-module--page-header--36a7c",{"PageHeader-module--with-tabs--bdb43":l.length,"PageHeader-module--dark-mode--58278":"dark"===a})},n.createElement("div",{className:"cds--grid"},n.createElement("div",{className:"cds--row"},n.createElement("div",{className:"cds--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--12bd8"},t)))))};var u=e=>{let{relativePagePath:t,repository:a}=e;const{site:{siteMetadata:{repository:l}}}=(0,i.useStaticQuery)("1364590287"),{baseUrl:r,subDirectory:o,branch:s}=a||l,c=r+"/edit/"+s+o+"/src/pages"+t;return r?n.createElement("div",{className:"cds--row EditLink-module--row--04499"},n.createElement("div",{className:"cds--col"},n.createElement("a",{className:"EditLink-module--link--203ae",href:c},"Edit this page on GitHub"))):null},p=a(6471),k=a(1721);let h=function(e){function t(){return e.apply(this,arguments)||this}return(0,k.Z)(t,e),t.prototype.render=function(){const{title:e,tabs:t,slug:a}=this.props,l=a.split("/").filter(Boolean).slice(-1)[0],o=t.map((e=>{const t=r()(e,{lower:!0,strict:!0}),o=t===l,s=new RegExp(l+"/?(#.*)?$"),c=a.replace(s,t);return n.createElement("li",{key:e,className:m()({"PageTabs-module--selected-item--68107":o},"PageTabs-module--list-item--d36e2")},n.createElement(i.Link,{className:"PageTabs-module--link--2b3ff",to:""+c},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--09d7f"},n.createElement("div",{className:"cds--grid"},n.createElement("div",{className:"cds--row"},n.createElement("div",{className:"cds--col-lg-12 cds--col-no-gutter"},n.createElement("nav",{"aria-label":e},n.createElement("ul",{className:"PageTabs-module--list--c4bab"},o))))))},t}(n.Component);var b=h,g=a(2124),f=a(5387),y=a(4563);var N=e=>{let{date:t}=e;const a=new Date(t);return t?n.createElement(y.X2,{className:"last-modified-date-module--row--5c9a1"},n.createElement(y.sg,null,n.createElement("div",{className:"last-modified-date-module--text--a203d"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null};var w=e=>{let{pageContext:t,children:a,location:l,Title:c}=e;const{frontmatter:m={},relativePagePath:k,titleType:h}=t,{tabs:y,title:w,theme:E,description:v,keywords:x,date:T}=m,{interiorTheme:P}=(0,f.Z)(),{site:{pathPrefix:L}}=(0,i.useStaticQuery)("2456312558"),A=L?l.pathname.replace(L,""):l.pathname,C=y?A.split("/").filter(Boolean).slice(-1)[0]||r()(y[0],{lower:!0}):"",D=E||P;return n.createElement(s.Z,{tabs:y,homepage:!1,theme:D,pageTitle:w,pageDescription:v,pageKeywords:x,titleType:h},n.createElement(d,{title:c?n.createElement(c,null):w,label:"label",tabs:y,theme:D}),y&&n.createElement(b,{title:w,slug:A,tabs:y,currentTab:C}),n.createElement(g.Z,{padded:!0},a,n.createElement(u,{relativePagePath:k}),n.createElement(N,{date:T})),n.createElement(p.Z,{pageContext:t,location:l,slug:A,tabs:y,currentTab:C}),n.createElement(o.Z,null))}},114:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return s},default:function(){return g}});var n=a(5987),l=(a(7294),a(498)),r=a(3555),i=a(1082);const o=["components"],s={},c=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.kt)("div",t)},m=c("NotesNav"),d=c("PageDescription"),u=c("AnchorLinks"),p=c("AnchorLink"),k=c("ExternalLink"),h={_frontmatter:s},b=r.Z;function g(e){let{components:t}=e,a=(0,n.Z)(e,o);return(0,l.kt)(b,Object.assign({},h,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Back to notes ",(0,l.kt)(i.Link,{to:"/notes",mdxType:"Link"},"landing page")),(0,l.kt)(m,{mdxType:"NotesNav"}),(0,l.kt)(d,{mdxType:"PageDescription"},(0,l.kt)("p",null,"A place to keep track of my career milestones. test")),(0,l.kt)(u,{mdxType:"AnchorLinks"},(0,l.kt)(p,{mdxType:"AnchorLink"},"2023"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2022"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2021"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2020"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2019"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2018"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2017"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2016"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2015")),(0,l.kt)("h1",null,"2023"),(0,l.kt)(u,{small:!0,mdxType:"AnchorLinks"},(0,l.kt)(p,{mdxType:"AnchorLink"},"2023Q2"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2023Q2"),(0,l.kt)(p,{mdxType:"AnchorLink"},"2023Q1")),(0,l.kt)("h2",null,"2023Q3"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Earned ",(0,l.kt)("a",{parentName:"li",href:"https://www.credly.com/badges/01f77238-4e0d-406b-a2e1-b94ab3d27ef3/public_url"},"Developer Profession - Level 3 Expert"))),(0,l.kt)("h2",null,"2023Q2"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Spoke on Chapter calls",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Discussed untyped const standards for go repository"),(0,l.kt)("li",{parentName:"ul"})))),(0,l.kt)("h2",null,"2023Q1"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Resolve security vulnerabilities within 24 turn around all the way through a hot fix to production environments.",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"It was found that our frontend config was printing all secrets and api keys."),(0,l.kt)("li",{parentName:"ul"},"It was also found that our backend services was printing all secrets and config changes through the watcher…which was corrected with another fix that was set up within 24hrs or reporting."))),(0,l.kt)("li",{parentName:"ul"},"Optimize constants for micro backend. By converting all constants to unsigned constants.")),(0,l.kt)("h1",null,"2022"),(0,l.kt)(u,{small:!0,mdxType:"AnchorLinks"},(0,l.kt)(p,{mdxType:"AnchorLink"},"2022Q4")),(0,l.kt)("h2",null,"2022Q4"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"November joined ",(0,l.kt)("a",{parentName:"li",href:"https://github.com/carbon-design-system"},"Carbon Design System"),", and became a maintainer of ",(0,l.kt)("a",{parentName:"li",href:"https://github.com/carbon-design-system/gatsby-theme-carbon"},"gatsby-theme-carbon")),(0,l.kt)("li",{parentName:"ul"},"Participated in IBM 2022 CIO Hackathon"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.credly.com/badges/84c7f84c-eb57-489a-93ce-f0701008b7e3/public_url"},"IBM Agile Explorer")," (Credly badge earned)")),(0,l.kt)("h1",null,"2021"),(0,l.kt)("h1",null,"2020"),(0,l.kt)("h2",null,"2020Q1"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.credly.com/badges/836c8f8f-fdd6-41aa-a310-ca38c0a6e54e/public_url"},"IBM Cloud Kubernetes Service")," (Credly badge earned)")),(0,l.kt)("h1",null,"2019"),(0,l.kt)("h2",null,"2019Q3"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.credly.com/badges/de8ea4d0-1d49-4084-bc16-3b0a5366d354/public_url"},"IBM Carbon Design System Developer Essentials - React")," (Credly badge earned)")),(0,l.kt)("h1",null,"2018"),(0,l.kt)("h1",null,"2017"),(0,l.kt)("p",null,"Wrote sample applications (reusable assets)"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://github.ibm.com/MFPSamples/PushNotificationsAndroid"},"MFP Android Push notifications"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"accompanying ",(0,l.kt)("a",{parentName:"li",href:"https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/notifications/"},"tutorial")))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://github.ibm.com/MFPSamples/PushNotificationsSwift"},"MFP iOS Push notifications"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"accompanying ",(0,l.kt)("a",{parentName:"li",href:"https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/notifications/"},"tutorial"))))),(0,l.kt)("h1",null,"2016"),(0,l.kt)("h2",null,"2016Q3"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.credly.com/badges/36ddd342-c057-4624-9738-504cd982d585/public_url"},"Enterprise Design Thinking Practitioner")," (Credly badge earned)"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)(k,{href:"https://example.com",mdxType:"ExternalLink"},"Test"))),(0,l.kt)("h1",null,"2015"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Graduated from Full Sail University")))}g.isMDXComponent=!0}}]);
//# sourceMappingURL=component---content-notes-career-roadmap-mdx-fd3fffda76c2475084f2.js.map