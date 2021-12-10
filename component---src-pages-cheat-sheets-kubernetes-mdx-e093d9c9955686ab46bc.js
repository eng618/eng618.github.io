"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[7693],{652:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return o},default:function(){return g}});var n=a(3366),r=(a(7294),a(498)),l=a(7637),s=["components"],o={},c=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.kt)("div",t)}},i=c("PageDescription"),m=c("AnchorLinks"),p=c("AnchorLink"),d={_frontmatter:o},u=l.Z;function g(e){var t=e.components,a=(0,n.Z)(e,s);return(0,r.kt)(u,Object.assign({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)(i,{mdxType:"PageDescription"},(0,r.kt)("p",null,"Kubernetes notes and cheatsheet")),(0,r.kt)(m,{mdxType:"AnchorLinks"},(0,r.kt)(p,{mdxType:"AnchorLink"},"Special use Cases"),(0,r.kt)(p,{mdxType:"AnchorLink"},"General Troubleshooting"),(0,r.kt)(p,{mdxType:"AnchorLink"},"Deleting A Namespace")),(0,r.kt)("h2",null,"Special Use Cases"),(0,r.kt)("p",null,"If you need too delete a pod, and can not wait for it to stop and terminate, you can force the delettions with the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl delete pods -n <namespace> --grace-period=0 --force\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Flags")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"--grace-period"),": Period of time in seconds given to the resource to terminate gracefully. Ignored if negative. Set to 1 for immediate shutdown. Can only be set to 0 when —force is true (force deletion)."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"--force"),": Only used when grace-period=0. If true, immediately remove resources from API and bypass graceful deletion. Note that immediate deletion of some resources may result in inconsistency or data loss and requires confirmation.")),(0,r.kt)("h2",null,"General Troubleshooting"),(0,r.kt)("p",null,"Below are a few basic general areas to look into when trying to debug a issues depending on what the problem is."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Describe pod"),(0,r.kt)("li",{parentName:"ul"},"logs pod"),(0,r.kt)("li",{parentName:"ul"},"exec into pod to see whats going on")),(0,r.kt)("h2",null,"Deleting A Namespace"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell",metastring:"path=delete_namespace.sh src=https://github.ibm.com/engarcia/engarcia.github.ibm.com/blob/develop/bin/delete_namespace.sh",path:"delete_namespace.sh",src:"https://github.ibm.com/engarcia/engarcia.github.ibm.com/blob/develop/bin/delete_namespace.sh"},'#!/bin/bash\n\n# ./delete_namespace.sh <namespace>\n\nexport k8s_namespace=$1\n\necho "~~ Removing deployments ~~"\nkubectl get deployment -n "$k8s_namespace" | grep -v NAME | awk \'{print $1}\' | xargs -I arg kubectl delete deployment -n "$k8s_namespace" arg\necho ""\n\necho "~~ Removing statefulsets ~~"\nkubectl get statefulsets -n "$k8s_namespace" | grep -v NAME | awk \'{print $1}\' | xargs -I arg kubectl delete statefulsets -n "$k8s_namespace" arg\necho ""\n\necho "~~ Removing jobs ~~"\nkubectl get jobs -n "$k8s_namespace" | grep -v NAME | awk \'{print $1}\' | xargs -I arg kubectl delete job -n "$k8s_namespace" arg\necho ""\n\necho "~~ Removing pods ~~"\nkubectl get pods -n "$k8s_namespace" | grep -v NAME | awk \'{print $1}\' | xargs -I arg kubectl delete pod -n "$k8s_namespace" arg --force --grace-period=0\necho ""\n\necho "~~ Removing secrets ~~"\nkubectl get secrets -n "$k8s_namespace" | grep -v NAME | awk \'{print $1}\' | xargs -I arg kubectl delete secret -n "$k8s_namespace" arg\necho ""\n\necho "~~ Removing PVC\'s ~~"\nkubectl -n "$k8s_namespace" get pvc | grep -v NAME | awk \'{print $1}\' | xargs -I arg kubectl delete pvc -n "$k8s_namespace" arg\necho ""\n\necho "~~ Removing namespace ${k8s_namespace}  ~~"\nkubectl delete namespace "$k8s_namespace"\necho ""\n\necho "~~ Removing helm releases ~~"\nhelm ls --namespace "$k8s_namespace" | grep -v NAME | awk \'{print $1}\' | xargs -I arg helm delete --purge arg\necho ""\n\n')))}g.isMDXComponent=!0},7637:function(e,t,a){a.d(t,{Z:function(){return N}});var n=a(7294),r=a(2749),l=a.n(r),s=a(5444),o=a(7077),c=a(4120),i=a(8086),m=a.n(i),p=function(e){var t,a=e.title,r=e.theme,l=e.tabs,s=void 0===l?[]:l;return n.createElement("div",{className:m()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=s.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===r,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},d=function(e){var t=e.relativePagePath,a=e.repository,r=(0,s.useStaticQuery)("1364590287").site.siteMetadata.repository,l=a||r,o=l.baseUrl,c=l.subDirectory,i=o+"/edit/"+l.branch+c+"/src/pages"+t;return o?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:i},"Edit this page on GitHub"))):null},u=a(7052),g=a(1721),h=function(e){function t(){return e.apply(this,arguments)||this}return(0,g.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,r=e.slug,o=r.split("/").filter(Boolean).slice(-1)[0],c=a.map((function(e){var t,a=l()(e,{lower:!0,strict:!0}),c=a===o,i=new RegExp(o+"/?(#.*)?$"),p=r.replace(i,a);return n.createElement("li",{key:e,className:m()((t={},t["PageTabs-module--selected-item--aBB0K"]=c,t),"PageTabs-module--list-item--024o6")},n.createElement(s.Link,{className:"PageTabs-module--link--Kz-7R",to:""+p},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},c))))))},t}(n.Component),k=h,b=a(532),f=a(6958),v=a(9945),E=function(e){var t=e.date,a=new Date(t);return t?n.createElement(v.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(v.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},N=function(e){var t=e.pageContext,a=e.children,r=e.location,i=e.Title,m=t.frontmatter,g=void 0===m?{}:m,h=t.relativePagePath,v=t.titleType,N=g.tabs,w=g.title,y=g.theme,x=g.description,P=g.keywords,$=g.date,_=(0,f.Z)().interiorTheme,T=(0,s.useStaticQuery)("2456312558").site.pathPrefix,A=T?r.pathname.replace(T,""):r.pathname,C=N?A.split("/").filter(Boolean).slice(-1)[0]||l()(N[0],{lower:!0}):"",D=y||_;return n.createElement(c.Z,{tabs:N,homepage:!1,theme:D,pageTitle:w,pageDescription:x,pageKeywords:P,titleType:v},n.createElement(p,{title:i?n.createElement(i,null):w,label:"label",tabs:N,theme:D}),N&&n.createElement(k,{title:w,slug:A,tabs:N,currentTab:C}),n.createElement(b.Z,{padded:!0},a,n.createElement(d,{relativePagePath:h}),n.createElement(E,{date:$})),n.createElement(u.Z,{pageContext:t,location:r,slug:A,tabs:N,currentTab:C}),n.createElement(o.Z,null))}}}]);
//# sourceMappingURL=component---src-pages-cheat-sheets-kubernetes-mdx-e093d9c9955686ab46bc.js.map