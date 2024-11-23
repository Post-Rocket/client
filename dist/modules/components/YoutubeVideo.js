(()=>{"use strict";const t=/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;class e extends HTMLElement{#t;#e;#n;#i;#o;#d;#s;#a;#r=[];#c;constructor(){super(),s||(s=a());const t=this.attachShadow({mode:"closed"});t.appendChild(s.cloneNode(!0)),this.#o=t.childNodes[1],this.#d=t.childNodes[2],this.#t=t.childNodes[3],this.#e=t.childNodes[4],this.#n=this.#e.firstChild,this.#s=this.#e.childNodes[1],this.#a=this.#s.firstChild,window.YT||this.#t.setAttribute("src","https://www.youtube.com/iframe_api")}static get isApiLoaded(){return window.YT}createPlayer(t){return window.YT?("function"==typeof t||(t=()=>{this.#c.playVideo()}),window.YT.ready((()=>{this.#c=new window.YT.Player(this.#n,{host:"https://www.youtube-nocookie.com",height:196,width:333,videoId:this.#i,playerVars:{playsinline:1,theme:"dark",autohide:2,modestbranding:1},events:{onReady:(...e)=>{this.#n=this.#e.firstChild,t(...e)}}})})),this):this}connectedCallback(){let e;(this.#o.innerHTML=this.getAttribute("headline"))||this.#o.classList.add("hidden"),(this.#d.innerHTML=this.getAttribute("description"))||this.#d.classList.add("hidden"),(e=this.getAttribute("src"))?(this.#i=e.match(t)[1],this.#r=[n(this.#i,""),n(this.#i,"mq"),n(this.#i,"hq"),n(this.#i,"sd"),n(this.#i,"maxres")],this.#a.onload=()=>{this.#a.getAttribute("src")===this.#r[3]||this.#a.setAttribute("src",this.#r[3])},this.#a.onerror=this.#s.onclick=()=>{this.createPlayer((()=>{this.#s.classList.add("hidden"),this.#c.playVideo()}))},this.#a.setAttribute("src",this.#r[2])):this.#e.classList.add("hidden")}attributeChangedCallback(e,i,o){switch(e=e.toLowerCase()){case"headline":(this.#o.innerHTML=o)?this.#o.classList.remove("hidden"):this.#o.classList.add("hidden");break;case"description":(this.#d.innerHTML=o)?this.#d.classList.remove("hidden"):this.#d.classList.add("hidden");break;case"src":o?(this.#i=o.match(t)[1],this.#r=[n(this.#i,""),n(this.#i,"mq"),n(this.#i,"hq"),n(this.#i,"sd"),n(this.#i,"maxres")],createPlayer((()=>{})),this.#d.classList.remove("hidden")):this.#e.classList.add("hidden")}}}const n=(t,e="sd")=>`https://i.ytimg.com/vi_webp/${t}/${e}default.webp`,i=(t,e,n)=>{const i=document.createElement("link");return i.setAttribute("rel",t),i.setAttribute("href",e),n&&i.setAttribute("as",n),document.head.appendChild(i)};let o;const d=e.warmConnections=()=>!o&&(i("preconnect","https://www.youtube-nocookie.com"),i("preconnect","https://www.google.com"),i("preconnect","https://googleads.g.doubleclick.net"),i("preconnect","https://static.doubleclick.net"),o=!0);let s;setTimeout(d,100);const a=()=>{const t=document.createDocumentFragment();t.appendChild(document.createElement("style")).innerHTML='\n  :host {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    background: transparent;\n  }\n\n  span {\n    padding-bottom: 24px;\n  }\n \n  h2,\n  p,\n  span {\n    width: 100%;\n  }\n\n  h2 {\n    background-clip: text;\n    box-decoration-break: clone;\n    -webkit-background-clip: text;\n    -webkit-box-decoration-break: clone;\n    -webkit-text-fill-color: transparent;\n    -moz-background-clip: text;\n    -moz-box-decoration-break: clone;\n    -moz-text-fill-color: transparent;\n    background-repeat: no-repeat;\n    background-image: linear-gradient(45deg, #9B51E0, #3DA5E0);\n  }\n\n  button:visited,\n  button:active, \n  button:disabled,\n  button {\n    opacity: 1;\n    text-decoration: none;\n    -webkit-decoration: none;\n    -webkit-text-decoration: none;\n    pointer-events: auto;\n    cursor: pointer;\n    margin: 0;\n    padding: 0;\n    border: 0;\n  }\n\n  button:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n\n  .video-container {\n    position: relative;\n    width: 100%;\n    height: 0;\n    padding-bottom: 56.27198%;\n    background: transparent;\n  }\n\n  .video-container > button,\n  .video-container > iframe:first-of-type,\n  .video-container > div:first-of-type {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border-radius: 8px;\n    overflow: hidden;\n    background: transparent;\n  }\n\n  .video-container > button::after {\n    content: "";\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-image: url("assets/icons/ytplay.svg");\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: 80px auto;\n    filter: drop-shadow(0px 3px 10px #00000055);\n  }\n\n  .video-container > button > img {\n    object-fit: cover;\n    object-position: center;\n    width: 100%;\n    height: 100%;\n    background: transparent;\n  }\n\n  .hidden {\n    display: none;\n  }\n\n  @media (hover: hover) and (pointer: fine), (-ms-high-contrast: active), (forced-colors: active) {\n    .video-container > button > img,\n    .video-container > button:hover > img,\n    .video-container > button::after,\n    .video-container > button:hover::after {\n      transition: 300ms;\n      opacity: 1;\n    }\n\n    .video-container > button:hover > img {\n      opacity: 0.7;\n    }\n\n    .video-container > button:hover::after {\n      transform: scale(1.1);\n    }\n  }\n  ',t.appendChild(document.createElement("h2")),t.appendChild(document.createElement("span")),t.appendChild(document.createElement("script"));const e=t.appendChild(document.createElement("div"));e.classList.add("video-container"),e.appendChild(document.createElement("div")).setAttribute("title","YouTube video embed");const n=e.appendChild(document.createElement("button")).appendChild(document.createElement("img"));return n.setAttribute("loading","lazy"),n.setAttribute("title","Click to start video"),n.setAttribute("alt","Youtube video thumbnail"),t};customElements.define("youtube-video",e),Object.freeze(Object.defineProperty(e,"YoutubeVideo",{value:e}))})();