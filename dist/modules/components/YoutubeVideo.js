(()=>{"use strict";const t=/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;class e extends HTMLElement{#t;#e;#n;#i;#o;#d;#s;#r;#a=[];#c;#h;constructor(){super(),s||(s=r());const t=this.attachShadow({mode:"closed"});t.appendChild(s.cloneNode(!0)),this.#o=t.childNodes[1],this.#d=t.childNodes[2],this.#t=t.childNodes[3],this.#e=t.childNodes[4],this.#n=this.#e.firstChild,this.#s=this.#e.childNodes[1],this.#r=this.#s.firstChild,window.YT||this.#t.setAttribute("src","https://www.youtube.com/iframe_api")}static get isApiLoaded(){return window.YT}createPlayer(t){return!window.YT||this.#h||("function"==typeof t||(t=()=>{this.#c.playVideo()}),this.#h=!0,window.YT.ready((()=>{this.#c=new window.YT.Player(this.#n,{host:"https://www.youtube-nocookie.com",height:196,width:333,videoId:this.#i,playerVars:{playsinline:1,theme:"dark",autohide:2,modestbranding:1},events:{onReady:(...e)=>{(this.#n=this.#e.firstChild).setAttribute("allow","autoplay; fullscreen"),t(...e)},onError:()=>{this.#h=!1}}})}))),this}connectedCallback(){let e;(this.#o.innerHTML=this.getAttribute("headline"))||this.#o.classList.add("hidden"),(this.#d.innerHTML=this.getAttribute("description"))||this.#d.classList.add("hidden"),(e=this.getAttribute("src"))?(this.#i=e.match(t)[1],this.#a=[n(this.#i,""),n(this.#i,"mq"),n(this.#i,"hq"),n(this.#i,"sd"),n(this.#i,"maxres")],i({rel:"prefetch",href:`https://www.youtube-nocookie.com/embed/${this.#i}`,fetchpriority:"high",as:"document"}),i({rel:"prefetch",href:this.#a[3],fetchpriority:"high",as:"image",type:"image/webp"}),this.#r.onload=()=>{this.#r.getAttribute("src")===this.#a[3]||setTimeout(this.#r.setAttribute("src",this.#a[3]),500)},this.#r.onerror=this.#s.onclick=()=>{this.createPlayer((()=>{setTimeout((()=>this.#s.classList.add("disabled")),200),this.#c.playVideo()}))},this.#s.ontransitionend=t=>{"opacity"===t.propertyName&&this.#s.classList.contains("disabled")&&this.#s.classList.add("hidden")},this.#r.setAttribute("src",this.#a[2]),setTimeout((()=>{this.createPlayer((()=>{setTimeout((()=>this.#s.classList.add("disabled")),200)}))}),1e3)):this.#e.classList.add("hidden")}attributeChangedCallback(e,i,o){switch(e=e.toLowerCase()){case"headline":(this.#o.innerHTML=o)?this.#o.classList.remove("hidden"):this.#o.classList.add("hidden");break;case"description":(this.#d.innerHTML=o)?this.#d.classList.remove("hidden"):this.#d.classList.add("hidden");break;case"src":o?(this.#i=o.match(t)[1],this.#a=[n(this.#i,""),n(this.#i,"mq"),n(this.#i,"hq"),n(this.#i,"sd"),n(this.#i,"maxres")],createPlayer((()=>{})),this.#d.classList.remove("hidden")):this.#e.classList.add("hidden")}}}const n=(t,e="sd")=>`https://i.ytimg.com/vi_webp/${t}/${e}default.webp`,i=({rel:t,href:e,as:n,fetchpriority:i,type:o})=>{const d=document.createElement("link");return d.setAttribute("rel",t),d.setAttribute("href",e),n&&d.setAttribute("as",n),i&&d.setAttribute("fetchpriority",i),o&&d.setAttribute("type",o),document.head.appendChild(d)};let o;const d=e.warmConnections=()=>!o&&(i({rel:"preconnect",href:"https://www.youtube-nocookie.com"}),i({rel:"preconnect",href:"https://www.google.com"}),i({rel:"preconnect",href:"https://googleads.g.doubleclick.net"}),i({rel:"preconnect",href:"https://static.doubleclick.net"}),o=!0);let s;setTimeout(d,100);const r=()=>{const t=document.createDocumentFragment();t.appendChild(document.createElement("style")).innerHTML="\n  :host {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    background: transparent;\n  }\n\n\n  span {\n    padding-bottom: 24px;\n  }\n \n  h2,\n  p,\n  span {\n    width: 100%;\n  }\n\n  h2 {\n    background-clip: text;\n    box-decoration-break: clone;\n    -webkit-background-clip: text;\n    -webkit-box-decoration-break: clone;\n    -webkit-text-fill-color: transparent;\n    -moz-background-clip: text;\n    -moz-box-decoration-break: clone;\n    -moz-text-fill-color: transparent;\n    background-repeat: no-repeat;\n    background-image: linear-gradient(45deg, #9B51E0, #3DA5E0);\n  }\n\n  button:visited,\n  button:active, \n  button:disabled,\n  button {\n    opacity: 1;\n    text-decoration: none;\n    -webkit-decoration: none;\n    -webkit-text-decoration: none;\n    pointer-events: auto;\n    cursor: pointer;\n    margin: 0;\n    padding: 0;\n    border: 0;\n  }\n\n  button:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n\n  .video-container {\n    position: relative;\n    width: 100%;\n    height: 0;\n    padding-bottom: 56.27198%;\n    background: transparent;\n  }\n\n  .video-container > button,\n  .video-container > iframe:first-of-type,\n  .video-container > div:first-of-type {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border-radius: 8px;\n    overflow: hidden;\n    background: transparent;\n    opacity: 1;\n    transition: 300ms;\n  }\n\n  .video-container > button::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-image: url(\"data:image/svg+xml,%3Csvg width='196' height='140' viewBox='0 0 196 140' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.24509 31.7267C2.32311 31.2065 2.39524 30.6912 2.46636 30.17C4.6182 14.4004 14.7856 4.57178 30.6956 2.83104C30.8832 2.81052 31.0521 2.79478 31.2402 2.77942C34.4172 2.51997 66.0961 -7.53969e-08 98 0C129.904 7.53968e-08 161.583 2.51996 164.76 2.77942C164.948 2.79478 165.117 2.81052 165.304 2.83104C181.438 4.59627 191.667 14.6785 193.62 30.8391C193.629 30.9167 193.637 30.9828 193.647 31.0603C193.834 32.5818 196 50.601 196 70C196 89.399 193.834 107.418 193.647 108.94C193.637 109.017 193.629 109.083 193.62 109.161C191.667 125.321 181.438 135.404 165.304 137.169C165.117 137.189 164.948 137.205 164.76 137.221C161.583 137.48 129.904 140 98 140C66.0961 140 34.4173 137.48 31.2402 137.221C31.0521 137.205 30.8832 137.189 30.6956 137.169C14.7856 135.428 4.6182 125.6 2.46636 109.83C2.39524 109.309 2.32311 108.793 2.24509 108.273C1.76204 105.053 0 91.8109 0 70C0 48.1891 1.76204 34.9471 2.24509 31.7267Z' fill='%23FF1A00'/%3E%3Cpath d='M132 70.5L79 101V40L132 70.5Z' fill='white'/%3E%3C/svg%3E%0A\");    background-position: center;\n    background-repeat: no-repeat;\n    background-size: 68px auto;\n    filter: drop-shadow(0px 3px 10px #00000055);\n  }\n\n  .video-container > button > img {\n    object-fit: cover;\n    object-position: center;\n    width: 100%;\n    height: 100%;\n    background: transparent;\n  }\n\n  .disabled {\n    pointer-events: none;\n    cursor: none;\n    opacity: 0 !important;\n  }\n\n  .hidden {\n    display: none !important;\n  }\n\n  @media (hover: hover) and (pointer: fine), (-ms-high-contrast: active), (forced-colors: active) {\n    .video-container > button:not(.disabled):not(.hidden) > img,\n    .video-container > button:not(.disabled):not(.hidden):hover > img,\n    .video-container > button:not(.disabled):not(.hidden)::after,\n    .video-container > button:not(.disabled):not(.hidden):hover::after {\n      transition: 300ms;\n      opacity: 1;\n    }\n\n    .video-container > button:not(.disabled):not(.hidden):hover > img {\n      opacity: 0.7;\n    }\n\n    .video-container > button:not(.disabled):not(.hidden):hover::after {\n      transform: scale(1.1);\n    }\n  }\n  ",t.appendChild(document.createElement("h2")),t.appendChild(document.createElement("span")),t.appendChild(document.createElement("script"));const e=t.appendChild(document.createElement("div"));e.classList.add("video-container"),e.appendChild(document.createElement("div")).setAttribute("title","YouTube video embed");const n=e.appendChild(document.createElement("button")).appendChild(document.createElement("img"));return n.setAttribute("loading","lazy"),n.setAttribute("title","Click to start video"),n.setAttribute("alt","Youtube video thumbnail"),t};customElements.define("youtube-video",e),Object.freeze(Object.defineProperty(e,"YoutubeVideo",{value:e}))})();