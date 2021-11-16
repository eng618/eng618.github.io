"use strict";(self.webpackChunkengarcia=self.webpackChunkengarcia||[]).push([[2551],{2108:function(e,t,l){l.r(t),l.d(t,{_frontmatter:function(){return o},default:function(){return u}});var a=l(3366),n=(l(7294),l(4983)),s=l(4295),r=["components"],o={},i={_frontmatter:o},h=s.Z;function u(e){var t=e.components,l=(0,a.Z)(e,r);return(0,n.kt)(h,Object.assign({},i,l,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",null,"Setting up your Terminal with zsh and iTerm2"),(0,n.kt)("p",null,"I’ll be combining a couple different tutorials that I will like to in the footnotes. As well as some minor differences that I have updated for my personal use."),(0,n.kt)("h2",null,"Installing Xcode"),(0,n.kt)("p",null,"Ensure Xcode developer tools are installed with:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},"xcode-select —-install\n")),(0,n.kt)("h2",null,"Install Homebrew"),(0,n.kt)("p",null,"If homebrew is not installed do so now with:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},'/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"\n')),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://brew.sh"},"source")),(0,n.kt)("h2",null,"Install iTerm2 via Homebrew"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},"brew cask install iterm2\n")),(0,n.kt)("h2",null,"Install zsh"),(0,n.kt)("p",null,"Make sure you have the latest zsh installed"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},"brew install zsh\n")),(0,n.kt)("h2",null,"Install Oh My Zsh"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},'sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"\n')),(0,n.kt)("p",null,"Once installed install your various plugins, by adding them to the plugins array in your ",(0,n.kt)("inlineCode",{parentName:"p"},"~/.zshrc"),"."),(0,n.kt)("p",null,"Here are the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins"},"list of plugins")," or check out the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins"},"wiki")),(0,n.kt)("p",null,"Keep you upgrade oh my zsh with:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},"upgrade_oh_my_zsh\n")),(0,n.kt)("h2",null,"Powerlevel9k"),(0,n.kt)("p",null,"Install ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/Powerlevel9k/powerlevel9k/wiki/Install-Instructions#option-2-install-for-oh-my-zsh"},"Powerlevel9k")," theme. Since we are using Oh My Zsh, we can install it in the ",(0,n.kt)("strong",{parentName:"p"},"~/.oh-my-zsh/custom/themes/")," directory with the following."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},"git clone https://github.com/bhilburn/powerlevel9k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel9k\n")),(0,n.kt)("p",null,"then simply add the theme to you ",(0,n.kt)("strong",{parentName:"p"},"~/.zsh")," file."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},'ZSH_THEME="powerlevel9k/powerlevel9k"\n')),(0,n.kt)("p",null,"To include syntax highlighting of your shell install the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/zsh-users/zsh-syntax-highlighting"},"zsh-syntax-highlighting plugins")," with the following:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},"git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting\n")),(0,n.kt)("h2",null,"Install fonts with gliphs"),(0,n.kt)("p",null,"I like to use ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/IBM/plex"},"IBM Plex"),", which is patch with powerline gliphs from ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/ryanoasis/nerd-fonts"},"Nerd Fonts"),"."),(0,n.kt)("p",null,"See ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/ryanoasis/nerd-fonts#patched-fonts"},"this list")," of patched fonts to find the one you want"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},"# Clone repo\ngit clone https://github.com/ryanoasis/nerd-fonts.git\n\ncd nerd-fonts\n\n# Install all fonts\n./install.sh\n\n# or\n\n# Install a single font\n./install.sh <FontName>\n\n# In my case I used\n./install.sh IBMPlexMono # which installs IBM Plex Mono\n")),(0,n.kt)("h2",null,"Other plugins and custimizations"),(0,n.kt)("p",null,"Install ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/athityakumar/colorls#installation"},"colorls")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-zsh"},"gem install colorls\n")),(0,n.kt)("h2",null,"Add Aliases"),(0,n.kt)("hr",null),(0,n.kt)("h2",null,"Links"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://www.freecodecamp.org/news/how-to-configure-your-macos-terminal-with-zsh-like-a-pro-c0ab3f3c1156/"},"How to Configure your macOs Terminal with Zsh like a Pro")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/robbyrussell/oh-my-zsh"},"oh-my-zsh"))))}u.isMDXComponent=!0},4295:function(e,t,l){l.d(t,{Z:function(){return N}});var a=l(7294),n=l(8650),s=l.n(n),r=l(5444),o=l(5426),i=l(5885),h=l(5900),u=l.n(h),m=function(e){var t,l=e.title,n=e.theme,s=e.tabs,r=void 0===s?[]:s;return a.createElement("div",{className:u()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=r.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===n,t))},a.createElement("div",{className:"bx--grid"},a.createElement("div",{className:"bx--row"},a.createElement("div",{className:"bx--col-lg-12"},a.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},l)))))},c=function(e){var t=e.relativePagePath,l=e.repository,n=(0,r.useStaticQuery)("1364590287").site.siteMetadata.repository,s=l||n,o=s.baseUrl,i=s.subDirectory,h=o+"/edit/"+s.branch+i+"/src/pages"+t;return o?a.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},a.createElement("div",{className:"bx--col"},a.createElement("a",{className:"EditLink-module--link--IDrl1",href:h},"Edit this page on GitHub"))):null},p=l(4275),g=l(1721),d=function(e){function t(){return e.apply(this,arguments)||this}return(0,g.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,l=e.tabs,n=e.slug,o=n.split("/").filter(Boolean).slice(-1)[0],i=l.map((function(e){var t,l=s()(e,{lower:!0,strict:!0}),i=l===o,h=new RegExp(o+"/?(#.*)?$"),m=n.replace(h,l);return a.createElement("li",{key:e,className:u()((t={},t["PageTabs-module--selected-item--aBB0K"]=i,t),"PageTabs-module--list-item--024o6")},a.createElement(r.Link,{className:"PageTabs-module--link--Kz-7R",to:""+m},e))}));return a.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},a.createElement("div",{className:"bx--grid"},a.createElement("div",{className:"bx--row"},a.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},a.createElement("nav",{"aria-label":t},a.createElement("ul",{className:"PageTabs-module--list--xLqxG"},i))))))},t}(a.Component),k=d,b=l(2881),f=l(6958),w=l(36),y=function(e){var t=e.date,l=new Date(t);return t?a.createElement(w.X2,{className:"last-modified-date-module--row--XJoYQ"},a.createElement(w.sg,null,a.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",l.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},N=function(e){var t=e.pageContext,l=e.children,n=e.location,h=e.Title,u=t.frontmatter,g=void 0===u?{}:u,d=t.relativePagePath,w=t.titleType,N=g.tabs,v=g.title,z=g.theme,E=g.description,x=g.keywords,P=g.date,I=(0,f.Z)().interiorTheme,T=(0,r.useStaticQuery)("2456312558").site.pathPrefix,H=T?n.pathname.replace(T,""):n.pathname,M=N?H.split("/").filter(Boolean).slice(-1)[0]||s()(N[0],{lower:!0}):"",Z=z||I;return a.createElement(i.Z,{tabs:N,homepage:!1,theme:Z,pageTitle:v,pageDescription:E,pageKeywords:x,titleType:w},a.createElement(m,{title:h?a.createElement(h,null):v,label:"label",tabs:N,theme:Z}),N&&a.createElement(k,{title:v,slug:H,tabs:N,currentTab:M}),a.createElement(b.Z,{padded:!0},l,a.createElement(c,{relativePagePath:d}),a.createElement(y,{date:P})),a.createElement(p.Z,{pageContext:t,location:n,slug:H,tabs:N,currentTab:M}),a.createElement(o.Z,null))}}}]);
//# sourceMappingURL=component---content-notes-osx-terminal-mdx-dcce693c879b8c4dcdeb.js.map