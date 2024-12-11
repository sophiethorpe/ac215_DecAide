(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[731,916],{9916:(e,t,r)=>{"use strict";var n=r(5909),o=r(1484),i=r(5442),u=r(884),a=r(2441),c=r(8743);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return v}});var s=r(7677),l=r(4848),d=s._(r(6540)),f=s._(r(9626)),p={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function h(e){var t=e.res,r=e.err;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}var y={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}},v=function(e){u(n,e);var t,r=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r=c(n);return e=t?Reflect.construct(r,arguments,c(this).constructor):r.apply(this,arguments),a(this,e)});function n(){return o(this,n),r.apply(this,arguments)}return i(n,[{key:"render",value:function(){var e=this.props,t=e.statusCode,r=e.withDarkMode,n=this.props.title||p[t]||"An unexpected error has occurred";return(0,l.jsxs)("div",{style:y.error,children:[(0,l.jsx)(f.default,{children:(0,l.jsx)("title",{children:t?t+": "+n:"Application error: a client-side exception has occurred"})}),(0,l.jsxs)("div",{style:y.desc,children:[(0,l.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(void 0===r||r?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),t?(0,l.jsx)("h1",{className:"next-error-h1",style:y.h1,children:t}):null,(0,l.jsx)("div",{style:y.wrap,children:(0,l.jsxs)("h2",{style:y.h2,children:[this.props.title||t?n:(0,l.jsx)(l.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}]),n}(d.default.Component);v.displayName="ErrorPage",v.getInitialProps=h,v.origGetInitialProps=h,("function"==typeof t.default||"object"===n(t.default)&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7770:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"AmpStateContext",{enumerable:!0,get:function(){return n}});var n=r(7677)._(r(6540)).default.createContext({})},1010:(e,t)=>{"use strict";function r(e){var t=void 0===e?{}:e,r=t.ampFirst,n=t.hybrid,o=t.hasQuery;return void 0!==r&&r||void 0!==n&&n&&void 0!==o&&o}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},9626:(e,t,r)=>{"use strict";var n=r(7836),o=r(5909),i=r(7494);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return b},defaultHead:function(){return y}});var a=r(7677),c=r(544),s=r(4848),l=c._(r(6540)),d=a._(r(9005)),f=r(7770),p=r(1602),h=r(1010);function y(e){void 0===e&&(e=!1);var t=[(0,s.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,s.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function v(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}r(8418);var m=["name","httpEquiv","charSet","itemProp"];function g(e,t){var r,o,a,c,s=t.inAmpMode;return e.reduce(v,[]).reverse().concat(y(s).reverse()).filter((r=new Set,o=new Set,a=new Set,c={},function(e){var t=!0,n=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){n=!0;var i=e.key.slice(e.key.indexOf("$")+1);r.has(i)?t=!1:r.add(i)}switch(e.type){case"title":case"base":o.has(e.type)?t=!1:o.add(e.type);break;case"meta":for(var u=0,s=m.length;u<s;u++){var l=m[u];if(e.props.hasOwnProperty(l)){if("charSet"===l)a.has(l)?t=!1:a.add(l);else{var d=e.props[l],f=c[l]||new Set;("name"!==l||!n)&&f.has(d)?t=!1:(f.add(d),c[l]=f)}}}}return t})).reverse().map(function(e,t){var r=e.key||t;if(n.env.__NEXT_OPTIMIZE_FONTS&&!s&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach(function(t){i(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},e.props||{});return o["data-href"]=o.href,o.href=void 0,o["data-optimized-fonts"]=!0,l.default.cloneElement(e,o)}return l.default.cloneElement(e,{key:r})})}var b=function(e){var t=e.children,r=(0,l.useContext)(f.AmpStateContext),n=(0,l.useContext)(p.HeadManagerContext);return(0,s.jsx)(d.default,{reduceComponentsToState:g,headManager:n,inAmpMode:(0,h.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"===o(t.default)&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9005:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});var n=r(6540),o=n.useLayoutEffect,i=n.useEffect;function u(e){var t=e.headManager,r=e.reduceComponentsToState;function u(){if(t&&t.mountedInstances){var o=n.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(o,e))}}return o(function(){var r;return null==t||null==(r=t.mountedInstances)||r.add(e.children),function(){var r;null==t||null==(r=t.mountedInstances)||r.delete(e.children)}}),o(function(){return t&&(t._pendingUpdate=u),function(){t&&(t._pendingUpdate=u)}}),i(function(){return t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),function(){t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)}}),null}},8418:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});var r=function(e){}},7836:(e,t,r)=>{"use strict";var n,o;e.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(o=r.g.process)?void 0:o.env)?r.g.process:r(5307)},6194:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_error",function(){return r(9916)}])},5307:e=>{!function(){var t={229:function(e){var t,r,n,o=e.exports={};function i(){throw Error("setTimeout has not been defined")}function u(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{r="function"==typeof clearTimeout?clearTimeout:u}catch(e){r=u}}();var c=[],s=!1,l=-1;function d(){s&&n&&(s=!1,n.length?c=n.concat(c):l=-1,c.length&&f())}function f(){if(!s){var e=a(d);s=!0;for(var t=c.length;t;){for(n=c,c=[];++l<t;)n&&n[l].run();l=-1,t=c.length}n=null,s=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===u||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new p(e,t)),1!==c.length||s||a(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}},u=!0;try{t[e](i,i.exports,n),u=!1}finally{u&&delete r[e]}return i.exports}n.ab="//";var o=n(229);e.exports=o}()}},e=>{var t=t=>e(e.s=t);e.O(0,[636,593,792],()=>t(6194)),_N_E=e.O()}]);