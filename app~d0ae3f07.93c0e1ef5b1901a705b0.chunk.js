(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{0:function(t,e,n){n("GAND"),n("GmYv"),t.exports=n("b9nV")},app:function(t,e,n){"use strict";n.r(e);n("70NS");var a=n("u5ZI"),i=n("4ysu"),c=function(){function t(){}return t.prototype.run=function(t,e){if(t.getAllInstructions().some(function(t){return t.config.settings.auth})&&!(a.a.autoLogin&&a.a.loginID&&a.a.password&&a.a.category&&a.a.authenticated))return e.cancel(new i.b("auth/"));if(t.getAllInstructions().some(function(t){return t.config.settings.picked})){if("category"in t.queryParams){var n=t.queryParams.category;if("all"!==n&&"adult"!==n)return e.cancel(new i.b("game-list/"));if("all"!==n&&"all"===a.a.category)return e.cancel(new i.b("game-list/"))}if(!a.a.game||!a.a.gameCategory)return e.cancel(new i.b("game-list/"))}return e()},t}(),r=n("aurelia-event-aggregator");n.d(e,"App",function(){return o});var o=function(){function t(t){var e=this;this.ea=t,this.closeDrawerPostRenderStep={run:function(t,n){return setTimeout(function(){return e.drawer.close()},0),n()}}}return t.prototype.attached=function(){this.ea.subscribe("notice",function(t){})},t.prototype.configureRouter=function(t,e){t.title="躲猫猫",t.map([{route:"auth",name:"auth",moduleId:"./routes/auth/auth",nav:!0,title:"登录",settings:{icon:"exit_to_app"}},{route:"game-list",name:"game-list",moduleId:"./routes/game-list/game-list",nav:!0,title:"游戏列表",settings:{auth:!0,icon:"list"}},{route:["","play"],name:"play",moduleId:"./routes/play/play",nav:!0,title:"运行游戏",settings:{auth:!0,picked:!0,icon:"play_arrow"}},{route:["about"],name:"about",moduleId:"./routes/about/about",nav:!0,title:"关于",settings:{icon:"info"}}]),t.options.pushState=!0,t.addAuthorizeStep(c),t.addPostRenderStep(this.closeDrawerPostRenderStep),this.router=e},t.inject=[r.a],t}()},"app.html":function(t,e,n){t.exports='<template>\n  <require from="app.styl"></require>\n  <require from="./components/drawer/drawer"></require>\n  \x3c!--<require from="material-components-web/dist/material-components-web.min.css"></require>--\x3e\n  <link href="https://cdn.bootcss.com/material-components-web/2.3.0/material-components-web.min.css" rel="stylesheet">\n  <link href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css" rel="stylesheet">\n  <div>\n    <header class=" mdc-top-app-bar">\n      <div class="mdc-top-app-bar__row">\n        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">\n          <button class="material-icons mdc-top-app-bar__navigation-icon" click.delegate="drawer.open()">menu</button><span class="mdc-top-app-bar__title">${router.currentInstruction.config.title}</span></section>\n        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">\n          <a href="https://github.com/zazck/php-dmm-netgame" target="_blank" class="mdc-top-app-bar__action-item" aria-label="Github Repository"><svg height="24" class="octicon octicon-mark-github text-white" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a>\n        </section>\n      </div>\n    </header>\n    <drawer view-model.ref="drawer">\n      <div class="mdc-drawer__header">\n        <h3 class="mdc-drawer__title">站点导航</h3>\n        <h6 class="mdc-drawer__subtitle">DMM网页游戏启动器</h6>\n      </div>\n      <div class="mdc-drawer__content">\n        <nav class="mdc-list">\n          <a class="mdc-list-item" repeat.for="row of router.navigation" class.bind="row.isActive ? \'mdc-list-item--activated\' : \'\'" href.bind="row.href[row.href.length - 1] === \'/\' ? row.href : `${row.href}/`" aria-current="page">\n            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">${row.settings.icon}</i>\n            <span class="mdc-list-item__text">${row.title}</span>\n          </a>\n          <hr class="mdc-list-divider">\n          <h6 class="mdc-list-group__subheader">友情链接</h6>\n          <a class="mdc-list-item" href="http://ooi.moe/" tabindex="-1">\n            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">bookmark</i>OOI缓存系统\n          </a>\n        </nav>\n      </div>\n    </drawer>\n    <div class="mdc-top-app-bar--fixed-adjust">\n      <router-view></router-view>\n    </div>\n    \x3c!--<div class="mdc-snackbar">\n      <div class="mdc-snackbar__surface">\n        <div class="mdc-snackbar__label"\n            role="status"\n            aria-live="polite">\n          Can\'t send photo. Retry in 5 seconds.\n        </div>\n        <div class="mdc-snackbar__actions">\n          <button type="button" class="mdc-button mdc-snackbar__action">Retry</button>\n        </div>\n      </div>\n    </div>--\x3e\n  </div>\n</template>\n'},"app.styl":function(t,e,n){(t.exports=n("I1BE")(!1)).push([t.i,"body {\n  margin: 0;\n  background: #fff;\n}\n/*\n.adult\n  --mdc-theme-primary #ee0080\n  --mdc-theme-secondary #010187\n\n  .mdc-drawer .mdc-list-item--activated\n    color rgba(238, 0, 128, 0.87)\n    .mdc-list-item__graphic\n      color var(--mdc-theme-primary, #ee0080)\n*/\n",""])},"components/checkbox/checkbox":function(t,e,n){"use strict";n.r(e),n.d(e,"Checkbox",function(){return s});var a=n("BnLB"),i=n("08CF"),c=n("aurelia-framework"),r=function(t,e,n,a){var i,c=arguments.length,r=c<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,a);else for(var o=t.length-1;o>=0;o--)(i=t[o])&&(r=(c<3?i(r):c>3?i(e,n,r):i(e,n))||r);return c>3&&r&&Object.defineProperty(e,n,r),r},o=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},s=function(){function t(){}return t.prototype.bind=function(){this.mdcCheckBox=a.a.attachTo(this.checkBox),this.mdcFormField=i.a.attachTo(this.formField)},t.prototype.attached=function(){var t=this;setTimeout(function(){return t.mdcCheckBox.ripple.layout()},0)},t.prototype.unbind=function(){this.mdcCheckBox.destroy(),this.mdcFormField.destroy()},r([c.b,o("design:type",Boolean)],t.prototype,"checked",void 0),t}()},"components/checkbox/checkbox.html":function(t,e,n){t.exports='<template bindable="checked">\n  <require from="../input.styl"></require>\n  <div class="mdc-form-field" element.ref="formField">\n    <label class="input-label-row">\n      <div class="mdc-checkbox" element.ref="checkBox">\n        <input type="checkbox"\n                class="mdc-checkbox__native-control" checked.bind="checked">\n        <div class="mdc-checkbox__background">\n          <svg class="mdc-checkbox__checkmark"\n                viewBox="0 0 24 24">\n            <path class="mdc-checkbox__checkmark-path"\n                  fill="none"\n                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>\n          </svg>\n          <div class="mdc-checkbox__mixedmark"></div>\n        </div>\n      </div>\n      <slot></slot>\n    </label>\n  </div>\n</template>\n'},"components/drawer/drawer":function(t,e,n){"use strict";n.r(e),n.d(e,"Drawer",function(){return a});var a=function(){function t(){}return t.prototype.unbind=function(){this.el.MDCDrawer.destroy()},t.prototype.open=function(){this.el.MDCDrawer.open=!0},t.prototype.close=function(){this.el.MDCDrawer&&(this.el.MDCDrawer.open=!1)},t}()},"components/drawer/drawer.html":function(t,e){t.exports='<template>\n  <aside class="mdc-drawer mdc-drawer--modal" element.ref="el">\n    <slot></slot>\n  </aside>\n  <div class="mdc-drawer-scrim"></div>\n</template>\n'},"components/input.styl":function(t,e,n){(t.exports=n("I1BE")(!1)).push([t.i,".input-label-row {\n  display: flex;\n  align-items: center;\n}\n",""])},"components/switch/switch":function(t,e,n){"use strict";n.r(e),n.d(e,"Switch",function(){return c});var a=n("9gpl"),i=n("08CF"),c=function(){function t(){}return t.prototype.bind=function(){this.mdcMDCSwitch=a.a.attachTo(this.switchBox),this.mdcFormField=i.a.attachTo(this.formField)},t.prototype.attached=function(){var t=this;setTimeout(function(){return t.mdcMDCSwitch.ripple.layout()},0)},t.prototype.unbind=function(){this.mdcMDCSwitch.destroy(),this.mdcFormField.destroy()},t}()},"components/switch/switch.html":function(t,e,n){t.exports='<template bindable="checked">\n  <require from="../input.styl"></require>\n  <div class="mdc-form-field" element.ref="formField">\n    <label class="input-label-row">\n      <div class="mdc-switch" element.ref="switchBox">\n        <div class="mdc-switch__track"></div>\n        <div class="mdc-switch__thumb-underlay">\n          <div class="mdc-switch__thumb">\n            <input type="checkbox" class="mdc-switch__native-control" role="switch" checked.bind="checked">\n          </div>\n        </div>\n      </div>\n      <span class="mdc-button__label">\n        <slot></slot>\n      </span>\n    </label>\n  </div>\n</template>\n'},"components/tab-bar/tab-bar":function(t,e,n){"use strict";n.r(e),n.d(e,"TabBar",function(){return r});var a=n("aurelia-framework"),i=function(t,e,n,a){var i,c=arguments.length,r=c<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,a);else for(var o=t.length-1;o>=0;o--)(i=t[o])&&(r=(c<3?i(r):c>3?i(e,n,r):i(e,n))||r);return c>3&&r&&Object.defineProperty(e,n,r),r},c=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},r=function(){function t(){var t=this;this.index=0,this.manual=!1,this.tabBarActivated=function(e){t.index=e.detail.index}}return t.prototype.attached=function(){var t=this;setTimeout(function(){t.el.MDCTabBar.listen("MDCTabBar:activated",t.tabBarActivated),t.el.MDCTabBar.activateTab(t.index)},0)},t.prototype.detached=function(){this.el.MDCTabBar.unlisten("MDCTabBar:activated",this.tabBarActivated),this.el.MDCTabBar.destroy()},i([a.b,c("design:type",Number)],t.prototype,"index",void 0),t}()},"components/tab-bar/tab-bar.html":function(t,e){t.exports='<template>\n  <div class="mdc-tab-bar" role="tablist" element.ref="el">\n    <div class="mdc-tab-scroller">\n      <div class="mdc-tab-scroller__scroll-area">\n        <div class="mdc-tab-scroller__scroll-content">\n          <slot></slot>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n'},e2Tw:function(t,e,n){"use strict";e.a={debug:!1,testing:!1}}}]);