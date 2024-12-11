(()=>{var e={};e.id=731,e.ids=[220,636,731],e.modules={2765:(e,t,r)=>{"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});var u=r(9929),a=r(8732),c=u._(r(2015)),s=u._(r(5013)),l={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function f(e){var t=e.res,r=e.err;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}var p={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}},d=function(e){var t;function r(){var e,t;return function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,r),e=r,t=arguments,e=o(e),function(e,t){if(t&&("object"===n(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,!function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){return!1}}()?e.apply(this,t):Reflect.construct(e,t||[],o(this).constructor))}return function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&i(e,t)}(r,e),t=[{key:"render",value:function(){var e=this.props,t=e.statusCode,r=e.withDarkMode,n=this.props.title||l[t]||"An unexpected error has occurred";return(0,a.jsxs)("div",{style:p.error,children:[(0,a.jsx)(s.default,{children:(0,a.jsx)("title",{children:t?t+": "+n:"Application error: a client-side exception has occurred"})}),(0,a.jsxs)("div",{style:p.desc,children:[(0,a.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(void 0===r||r?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),t?(0,a.jsx)("h1",{className:"next-error-h1",style:p.h1,children:t}):null,(0,a.jsx)("div",{style:p.wrap,children:(0,a.jsxs)("h2",{style:p.h2,children:[this.props.title||t?n:(0,a.jsx)(a.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}],function(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,function(e){var t=function(e,t){if("object"!==n(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==n(o))return o;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===n(t)?t:String(t)}(o.key),o)}}(r.prototype,t),Object.defineProperty(r,"prototype",{writable:!1}),r}(c.default.Component);d.displayName="ErrorPage",d.getInitialProps=f,d.origGetInitialProps=f,("function"==typeof t.default||"object"===n(t.default)&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3073:(e,t)=>{"use strict";function r(e){var t=void 0===e?{}:e,r=t.ampFirst,n=t.hybrid,o=t.hasQuery;return void 0!==r&&r||void 0!==n&&n&&void 0!==o&&o}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},5013:(e,t,r)=>{"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return m},defaultHead:function(){return d}});var i=r(9929),u=r(4588),a=r(8732),c=u._(r(2015)),s=i._(r(8756)),l=r(9811),f=r(9241),p=r(3073);function d(e){void 0===e&&(e=!1);var t=[(0,a.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,a.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function y(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===c.default.Fragment?e.concat(c.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}r(5823);var b=["name","httpEquiv","charSet","itemProp"];function v(e,t){var r,i,u,a,s=t.inAmpMode;return e.reduce(y,[]).reverse().concat(d(s).reverse()).filter((r=new Set,i=new Set,u=new Set,a={},function(e){var t=!0,n=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){n=!0;var o=e.key.slice(e.key.indexOf("$")+1);r.has(o)?t=!1:r.add(o)}switch(e.type){case"title":case"base":i.has(e.type)?t=!1:i.add(e.type);break;case"meta":for(var c=0,s=b.length;c<s;c++){var l=b[c];if(e.props.hasOwnProperty(l)){if("charSet"===l)u.has(l)?t=!1:u.add(l);else{var f=e.props[l],p=a[l]||new Set;("name"!==l||!n)&&p.has(f)?t=!1:(p.add(f),a[l]=p)}}}}return t})).reverse().map(function(e,t){var r=e.key||t;if(process.env.__NEXT_OPTIMIZE_FONTS&&!s&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var i=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){var o,i;o=t,i=r[t],(o=function(e){var t=function(e,t){if("object"!==n(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==n(o))return o;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===n(t)?t:String(t)}(o))in e?Object.defineProperty(e,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[o]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,c.default.cloneElement(e,i)}return c.default.cloneElement(e,{key:r})})}var m=function(e){var t=e.children,r=(0,c.useContext)(l.AmpStateContext),n=(0,c.useContext)(f.HeadManagerContext);return(0,a.jsx)(s.default,{reduceComponentsToState:v,headManager:n,inAmpMode:(0,p.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"===n(t.default)&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8756:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});var n=r(2015),o=function(){},i=function(){};function u(e){var t,r=e.headManager,u=e.reduceComponentsToState;function a(){if(r&&r.mountedInstances){var t=n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(u(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),a(),o(function(){var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),function(){var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),o(function(){return r&&(r._pendingUpdate=a),function(){r&&(r._pendingUpdate=a)}}),i(function(){return r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),function(){r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)}}),null}},5823:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});var r=function(e){}},4608:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u}),r(1179),r(3946);var n=r(8732);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}let u=function(e){var t=e.Component,r=e.pageProps;return(0,n.jsx)(t,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach(function(t){var n,i;n=t,i=r[t],(n=function(e){var t=function(e,t){if("object"!==o(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==o(n))return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===o(t)?t:String(t)}(n))in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},r))}},671:(e,t)=>{"use strict";Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},6653:(e,t,r)=>{"use strict";r.r(t),r.d(t,{config:()=>y,default:()=>l,getServerSideProps:()=>d,getStaticPaths:()=>p,getStaticProps:()=>f,reportWebVitals:()=>b,routeModule:()=>j,unstable_getServerProps:()=>h,unstable_getServerSideProps:()=>P,unstable_getStaticParams:()=>g,unstable_getStaticPaths:()=>m,unstable_getStaticProps:()=>v});var n=r(3865),o=r(9455),i=r(671),u=r(6830),a=r.n(u),c=r(4608),s=r(2765);let l=(0,i.M)(s,"default"),f=(0,i.M)(s,"getStaticProps"),p=(0,i.M)(s,"getStaticPaths"),d=(0,i.M)(s,"getServerSideProps"),y=(0,i.M)(s,"config"),b=(0,i.M)(s,"reportWebVitals"),v=(0,i.M)(s,"unstable_getStaticProps"),m=(0,i.M)(s,"unstable_getStaticPaths"),g=(0,i.M)(s,"unstable_getStaticParams"),h=(0,i.M)(s,"unstable_getServerProps"),P=(0,i.M)(s,"unstable_getServerSideProps"),j=new n.PagesRouteModule({definition:{kind:o.A.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:c.default,Document:a()},userland:s})},1179:()=>{},3946:()=>{},9455:(e,t)=>{"use strict";var r;Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE"}(r||(r={}))},9811:(e,t,r)=>{"use strict";e.exports=r(3865).vendored.contexts.AmpContext},9241:(e,t,r)=>{"use strict";e.exports=r(3865).vendored.contexts.HeadManagerContext},361:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},2015:e=>{"use strict";e.exports=require("react")},8732:e=>{"use strict";e.exports=require("react/jsx-runtime")},3873:e=>{"use strict";e.exports=require("path")},4588:(e,t)=>{"use strict";function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}t._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var o={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var a=i?Object.getOwnPropertyDescriptor(e,u):null;a&&(a.get||a.set)?Object.defineProperty(o,u,a):o[u]=e[u]}return o.default=e,n&&n.set(e,o),o}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[830],()=>r(6653));module.exports=n})();