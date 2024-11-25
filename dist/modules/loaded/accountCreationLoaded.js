(()=>{"use strict";var t={149:(t,e,r)=>{var o=r(668);const n=()=>{let t;try{return"ontouchstart"in document||"ontouchstart"in documentElement||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||(t=matchMedia("(pointer:coarse)")||{})&&"(pointer:coarse)"===t.media&&!!t.matches}catch{}return!1};Object.freeze(Object.defineProperty(n,"hasTouchScreen",{value:n}))()&&setTimeout((()=>{const t=document.querySelector('meta[name="viewport"]'),e=/iP(hone|ad|od)/.test(navigator.userAgent)?"":", interactive-widget=resizes-content";t&&t.setAttribute("content","width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=1, user-scalable=no"+e)}),1e3),(()=>{let t;window.onresize=(0,o.Ay)((()=>{document.body.clientWidth<=800&&(document.body.scrollLeft=document.body.classList.contains("menu-opened")&&-document.body.scrollWidth||0),t||document.body.classList.remove("transition-on"),clearTimeout(t),t=setTimeout((()=>{document.body.classList.add("transition-on"),t=0}),100)})),setTimeout((()=>{document.body.classList.add("transition-on")}),100),document.addEventListener("click",(t=>t.target===document.body&&(t.preventDefault(),t.stopPropagation(),document.activeElement.blur())));const e=document.querySelectorAll("[data-background-image]");for(let t,r,o=0,n=e.length;o!==n;++o)(r=(t=e[o]).getAttribute("data-background-image"))&&(t.style.backgroundImage=`url("${r}")`)})(),(()=>{const t=(t,e="../index.html",r=!0)=>()=>{r&&window.history&&window.history.length&&window.history.back&&(window.history.back(),1)||(window.location.href=t||document.referrer||e||"../index.html")};let e=document.getElementById("back");e&&(e.onclick=t(null,"../index.html",!0)),e=document.getElementById("back-home"),e&&(e.onclick=t("../index.html","../index.html",e.hasAttribute("data-decrement-history")))})()},732:()=>{String.toCamelCase||Object.defineProperty(String,"toCamelCase",{value:function(t,e=""){let r="",o=!1;for(let n=0,i=t.length;n!==i;++n){const i=t.charAt(n);(i<"A"||i>"z"||i>"Z"&&i<"a")&&(o=!0)||!o&&(r+=i)||(r+=e+i.toUpperCase())&&(o=!1)}return r}}),String.prototype.toCamelCase||Object.defineProperty(String.prototype,"toCamelCase",{value:function(...t){return String.toCamelCase(this,...t)}}),String.toKebabCase||Object.defineProperty(String,"toKebabCase",{value:function(t,e="-",r,o){let n="",i=t.length;for(let r=0,o=i;r!==o;++r){const o=t.charCodeAt(r);(o<65||o>122||o>90&&o<97)&&(n+=e)||o>=65&&o<=90&&(n+=e+String.fromCharCode(o+32))||(n+=String.fromCharCode(o))}let a,c=0,s=n.length,u=s;for(a=Math.min(r||0,i);c!==a&&n.charAt(c)===e;++c);for(a=i-Math.min(o||0,i);s>a&&n.charAt(--s)===e;);return(c||s<u)&&n.slice(c,s+1)||n}}),String.prototype.toKebabCase||Object.defineProperty(String.prototype,"toKebabCase",{value:function(...t){return String.toKebabCase(this,...t)}}),String.decamelize||Object.defineProperty(String,"decamelize",{value:function(t,e=1/0,r=1/0){return t.toKebabCase("_",e,r)}}),String.prototype.decamelize||Object.defineProperty(String.prototype,"decamelize",{value:function(...t){return String.decamelize(this,...t)}}),String.toSnakeCase||Object.defineProperty(String,"toSnakeCase",{value:function(t,e=1/0,r=1/0){return t.toKebabCase("_",e,r)}}),String.prototype.toSnakeCase||Object.defineProperty(String.prototype,"toSnakeCase",{value:function(...t){return String.toSnakeCase(this,...t)}}),String.toPascalCase||Object.defineProperty(String,"toPascalCase",{value:function(t,e=""){const r=t.toCamelCase(e);return r.charAt(0).toUpperCase()+r.slice(1)}}),String.prototype.toPascalCase||Object.defineProperty(String.prototype,"toPascalCase",{value:function(...t){return String.toPascalCase(this,...t)}}),String.toHashTagCase||Object.defineProperty(String,"toHashTagCase",{value:function(t,e=""){let r="",o=!1;for(let n=0,i=t.length;n!==i;++n){const i=t.charAt(n);(i<"0"||i>"z"||i>"9"&&i<"A"||i>"Z"&&i<"a")&&(o=!0)||!o&&(r+=i)||(r+=e+i.toUpperCase())&&(o=!1)}return r}}),String.prototype.toHashTagCase||Object.defineProperty(String.prototype,"toHashTagCase",{value:function(...t){return String.toHashTagCase(this,...t)}}),String.toUserIdCase||Object.defineProperty(String,"toUserIdCase",{value:function(t){return t.toHashTagCase("-").toLowerCase().replace(/^\-+|\-+$|\-\-+/g,"")}}),String.prototype.toUserIdCase||Object.defineProperty(String.prototype,"toUserIdCase",{value:function(...t){return String.toUserIdCase(this,...t)}}),String.toHashTag||Object.defineProperty(String,"toHashTag",{value:function(t){return"#"+t.toHashTagCase()}}),String.prototype.toHashTag||Object.defineProperty(String.prototype,"toHashTag",{value:function(...t){return String.toHashTag(this,...t)}}),String.toTitleCase||Object.defineProperty(String,"toTitleCase",{value:function(t){return t.charAt(0).toUpperCase()+t.slice(1)}}),String.prototype.toTitleCase||Object.defineProperty(String.prototype,"toTitleCase",{value:function(...t){return String.toTitleCase(this,...t)}});const t=/\s+/g;String.toCapitalCase||Object.defineProperty(String,"toCapitalCase",{value:function(e){return e.split(t).map((t=>t.charAt(0).toUpperCase()+t.slice(1))).join(" ")}}),String.prototype.toCapitalCase||Object.defineProperty(String.prototype,"toCapitalCase",{value:function(...t){return String.toCapitalCase(this,...t)}}),String.toQuote||Object.defineProperty(String,"toQuote",{value:function(t,e="❝ ",r=" ❞"){return`${e}${t}${r}`}}),String.prototype.toQuote||Object.defineProperty(String.prototype,"toQuote",{value:function(...t){return String.toQuote(this,...t)}}),String.toSocketHeaderKey||Object.defineProperty(String,"toSocketHeaderKey",{value:function(t){let e="",r=!1,o=0,n=t.length;for(;o!==n;++o){const n=t.charAt(o);(" "===n||"-"===n||"_"===n)&&(r=!0)&&(e+="-")||!r&&o&&(e+=n)||(e+=n.toUpperCase())&&(r=!1)}return e}}),String.prototype.toSocketHeaderKey||Object.defineProperty(String.prototype,"toSocketHeaderKey",{value:function(...t){return String.toSocketHeaderKey(this,...t)}});const e={geese:"goose",mice:"mouse",feet:"foot",teeth:"tooth",oxen:"ox",cacti:"cactus",cactus:"cactus",couscous:"couscous",octopus:"octopus"};String.toSingular||Object.defineProperty(String,"toSingular",{value:function(t){return`${(t=>{if(t.length<4)return t;const r=e[t];if(r)return r;const o=t.length-1,n=t.charAt(o),i=o-1,a=t.charAt(i),c=i-1,s=t.charAt(c);return"s"===n&&"s"!==a?"e"===a?"i"===s?t.slice(0,c)+"y":"v"===s?t.slice(0,c)+"f":"a"===s||"o"===s||"u"===s?t.slice(0,i):t.slice(0,o):t.slice(0,o):t})(t)}`}}),String.prototype.toSingular||Object.defineProperty(String.prototype,"toSingular",{value:function(...t){return String.toSingular(this,...t)}}),String.raw||Object.defineProperty(String,"raw",{value:function(t){return`${t}`}}),String.prototype.raw||Object.defineProperty(String.prototype,"raw",{value:function(...t){return String.raw(this,...t)}}),String.utf16To8||Object.defineProperty(String,"utf16To8",{value:function(){const t=(t,e)=>String.fromCharCode(parseInt(e,16));return function(e){try{return encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,t)}catch{return e}}}()}),String.prototype.utf16To8||Object.defineProperty(String.prototype,"utf16To8",{value:function(...t){return String.utf16To8(this,...t)}}),String.utf8To16||Object.defineProperty(String,"utf8To16",{value:function(){const t=t=>"%"+((t=t.charCodeAt())<16?"0":"")+t.toString(16).toUpperCase();return function(e){try{return decodeURIComponent(e.replace(/[\x00-),:-?[-^`{-\xFF]/g,t))}catch{return e}}}()}),String.prototype.utf8To16||Object.defineProperty(String.prototype,"utf8To16",{value:function(...t){return String.utf8To16(this,...t)}})},668:(t,e,r)=>{r.d(e,{Ay:()=>n}),t=r.hmd(t);const o=(t,e=50,r=!1,o=!1)=>e>0&&function(...n){r?o=!0:(t.apply(this||{},n),r=!0,setTimeout((function(){o&&t.apply(this||{},n),o=r=!1}),e))}||t;Object.defineProperty(o,"DEFAULT_DELAY",{value:50});const n=Object.freeze(Object.defineProperty(o,"throttle",{value:o}));try{t.exports=o}catch{}}},e={};function r(o){var n=e[o];if(void 0!==n)return n.exports;var i=e[o]={id:o,loaded:!1,exports:{}};return t[o](i,i.exports,r),i.loaded=!0,i.exports}r.d=(t,e)=>{for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},r.hmd=t=>((t=Object.create(t)).children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r(732);const o=(t,e={})=>{if(!t||"object"!=typeof t)return e;let r;if(t instanceof HTMLFormElement||(t=>{if(!t||"object"!=typeof t)return!1;if(t.target&&t.target instanceof HTMLFormElement)return!0;try{return t instanceof SyntheticBaseEvent||t instanceof SubmitEvent}catch{return t instanceof SubmitEvent}})(t)&&(r=t.submitter||t.relatedTarget&&("submit"===(t.relatedTarget.type||t.relatedTarget.getAttribute("type"))||"button"===t.relatedTarget.nodeName.toLowerCase())&&t.relatedTarget,t=t.target),r&&(r={name:r.name||r.getAttribute("name"),value:r.value||r.getAttribute("value")},r.value||(r.value=!!r.name)),!(t instanceof HTMLFormElement))return e;const o={};t=new FormData(t),r&&r.name&&t.append(r.name,r.value);for(const e of t){const[t,r]=e;("number"==typeof r||"boolean"==typeof r||r)&&(o[t.toCamelCase()]=r)}return o},n=Object.freeze(Object.defineProperty(o,"createFormData",{value:o}));r(149),(()=>{const t=document.getElementById("form"),[e,r]=t.getElementsByTagName("input"),o=document.getElementById("new-code"),i=document.getElementById("submit");i.innerHTML="Send Code";const a=()=>{const t=e.classList.contains("hidden");return e.classList.toggle("hidden"),r.classList.toggle("hidden"),o.classList.toggle("hidden"),t||(r.value="",setTimeout((()=>r.focus()),1e4)),i.innerHTML=t?"Send Code":"Verify Code",t};o.onclick=t=>{t.preventDefault(),a()},t.onsubmit=e=>{e.preventDefault(),t.checkValidity(),t.reportValidity();const r=n(t);(r.verify=a())||delete r.code,console.log(r),document.cookie="__Secure-postrocket_home_intro=0; Secure; Path=/; SameSite=Strict; Max-Age=-99999999",r.verify&&(window.location.href="./home.html")},document.addEventListener("keydown",(t=>{const o=r.classList.contains("hidden")&&e||r;document.activeElement!==o&&1===t.key.length&&(t.stopPropagation(),t.preventDefault(),o.focus(),o.value=(o.value||"")+t.key)})),setTimeout((()=>e.focus()),10)})()})();