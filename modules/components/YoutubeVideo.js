const re = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;

// YouTube main component.
export class YoutubeVideo extends HTMLElement {
  #script;
  #container;
  #video;
  #videoId;
  #headline;
  #description;
  #button;
  #thumbnail;
  #thumbnailSrcs = [];
  #player;
  #creatingPlayer;

  // Constructor.
  constructor() {
    super();

    // Create template if needed.
    template || (template = createTemplate());

    // Attach shadow DOM to element.
    const shadow = this.attachShadow({mode: "closed"});
    shadow.appendChild(template.cloneNode(true));
    this.#headline = shadow.childNodes[1];
    this.#description = shadow.childNodes[2];
    this.#script = shadow.childNodes[3];
    this.#container = shadow.childNodes[4];
    this.#video = this.#container.firstChild;
    this.#button = this.#container.childNodes[1];
    this.#thumbnail = this.#button.firstChild;

    window.YT || this.#script.setAttribute("src", "https://www.youtube.com/iframe_api");
  }

  // Check if API is loaded.
  static get isApiLoaded () { return window.YT; }

  // Helper function to create a YT player.
  createPlayer(cb) {
    if (!window.YT || this.#creatingPlayer) return this;
    typeof cb === "function" || (cb = (() => {
      this.#player.playVideo();
    }));
    this.#creatingPlayer = true;
    window.YT.ready(() => {
      this.#player = new window.YT.Player(this.#video, {
        host: "https://www.youtube-nocookie.com",
        height: 196,
        width: 333,
        videoId: this.#videoId,
        playerVars: {
          playsinline: 1,
          theme: "dark",
          autohide: 2,
          modestbranding: 1
        },
        events: {
          onReady: (...args) => {
            (this.#video = this.#container.firstChild).setAttribute("allow", "autoplay; fullscreen");
            cb(...args);
          },
          onError: () => {
            this.#creatingPlayer = false;
          } 
        }
      });
    });
    return this;
  }

  // When the component gets connected to the DOM.
  connectedCallback() {
    // Get the headline.
    (this.#headline.innerHTML = this.getAttribute('headline'))
      || this.#headline.classList.add("hidden");

    // Get the description.
    (this.#description.innerHTML = this.getAttribute('description'))
      || this.#description.classList.add("hidden");

    // Get the video id, thumbnails, set the onload and onclick, etc.
    let src;
    (src= this.getAttribute('src')) ? (
      this.#videoId = src.match(re)[1],
      this.#thumbnailSrcs = [
        getThumbnailSrc(this.#videoId, ""),
        getThumbnailSrc(this.#videoId, "mq"),
        getThumbnailSrc(this.#videoId, "hq"),
        getThumbnailSrc(this.#videoId, "sd"),
        getThumbnailSrc(this.#videoId, "maxres")
      ],
      addPrefetch({
        rel: "prefetch",
        href: `https://www.youtube-nocookie.com/embed/${this.#videoId}`,
        fetchpriority: "high",
        as: "document"
      }),
      addPrefetch({
        rel: "prefetch",
        href: this.#thumbnailSrcs[3],
        fetchpriority: "high",
        as: "image",
        type: "image/webp"
      }),
      this.#thumbnail.onload = () => {
        this.#thumbnail.getAttribute("src") === this.#thumbnailSrcs[3]
        || this.#thumbnail.setAttribute("src", this.#thumbnailSrcs[3]);
      },
      this.#thumbnail.onerror = this.#button.onclick = () => {
        this.createPlayer(() => {
          setTimeout(() => this.#button.classList.add("disabled"), 200);
          this.#player.playVideo();
        });
      },
      this.#button.ontransitionend = event => {
        event.propertyName === "opacity"
          && this.#button.classList.contains("disabled")
           && this.#button.classList.add("hidden");
      },
      this.#thumbnail.setAttribute("src", this.#thumbnailSrcs[2]),
      setTimeout(() => {
        this.createPlayer(() => {
          setTimeout(() => this.#button.classList.add("disabled"), 200);
        });
      }, 5000)
    ) : this.#container.classList.add("hidden");
  }

  // If some attribute changes.
  attributeChangedCallback(name, oldValue, newValue) {
    name = name.toLowerCase();
    switch (name) {
      case "headline":
        (this.#headline.innerHTML = newValue) ?
          this.#headline.classList.remove("hidden")
          : this.#headline.classList.add("hidden")
        break;
      case "description":
        (this.#description.innerHTML = newValue) ?
          this.#description.classList.remove("hidden")
          : this.#description.classList.add("hidden")
        break;
      case "src":
        newValue ? (
          this.#videoId = newValue.match(re)[1],
          this.#thumbnailSrcs = [
            getThumbnailSrc(this.#videoId, ""),
            getThumbnailSrc(this.#videoId, "mq"),
            getThumbnailSrc(this.#videoId, "hq"),
            getThumbnailSrc(this.#videoId, "sd"),
            getThumbnailSrc(this.#videoId, "maxres")
          ],
          createPlayer(() => {}),
          this.#description.classList.remove("hidden")
        ) : this.#container.classList.add("hidden");
        break;
      default:
    }
  }
}

// Get video thumbnail source.
const getThumbnailSrc = (videoId, resolution= "sd") => `https://i.ytimg.com/vi_webp/${videoId}/${resolution}default.webp`;

// Add a <link rel={preload | preconnect} ...> to the head
const addPrefetch = ({rel, href, as, fetchpriority, type}) => {
  const link = document.createElement('link');
  link.setAttribute("rel", rel);
  link.setAttribute("href", href);
  as && link.setAttribute("as", as);
  fetchpriority && link.setAttribute("fetchpriority", fetchpriority);
  type && link.setAttribute("type", type);
  return document.head.appendChild(link);
}

/**
 * Begin pre-connecting to warm up the iframe load
 * Since the embed's network requests load within its iframe,
 * preload/prefetch'ing them outside the iframe will only cause double-downloads.
 * So, the best we can do is warm up a few connections to origins that are in the critical path.
 *
 * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
 * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
 */
let preconnected;
export const warmConnections = YoutubeVideo.warmConnections = () => {
  if (preconnected) return false;

  // The iframe document and most of its subresources come right off youtube.com
  addPrefetch({rel: 'preconnect', href: 'https://www.youtube-nocookie.com'});
  // The botguard script is fetched off from google.com
  addPrefetch({rel: 'preconnect', href: 'https://www.google.com'});

  // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
  addPrefetch({rel: 'preconnect', href: 'https://googleads.g.doubleclick.net'});
  addPrefetch({rel: 'preconnect', href: 'https://static.doubleclick.net'});

  return preconnected = true;
}

setTimeout(warmConnections, 100);

// Template.
let template;
const createTemplate = () => {
  const template = document.createDocumentFragment();

  // Style.
  template.appendChild(document.createElement("style")).innerHTML = `
  :host {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
  }


  span {
    padding-bottom: 24px;
  }
 
  h2,
  p,
  span {
    width: 100%;
  }

  h2 {
    background-clip: text;
    box-decoration-break: clone;
    -webkit-background-clip: text;
    -webkit-box-decoration-break: clone;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-box-decoration-break: clone;
    -moz-text-fill-color: transparent;
    background-repeat: no-repeat;
    background-image: linear-gradient(45deg, #9B51E0, #3DA5E0);
  }

  button:visited,
  button:active, 
  button:disabled,
  button {
    opacity: 1;
    text-decoration: none;
    -webkit-decoration: none;
    -webkit-text-decoration: none;
    pointer-events: auto;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 0;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.27198%;
    background: transparent;
  }

  .video-container > button,
  .video-container > iframe:first-of-type,
  .video-container > div:first-of-type {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: transparent;
    opacity: 1;
    transition: 300ms;
  }

  .video-container > button::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='196' height='140' viewBox='0 0 196 140' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.24509 31.7267C2.32311 31.2065 2.39524 30.6912 2.46636 30.17C4.6182 14.4004 14.7856 4.57178 30.6956 2.83104C30.8832 2.81052 31.0521 2.79478 31.2402 2.77942C34.4172 2.51997 66.0961 -7.53969e-08 98 0C129.904 7.53968e-08 161.583 2.51996 164.76 2.77942C164.948 2.79478 165.117 2.81052 165.304 2.83104C181.438 4.59627 191.667 14.6785 193.62 30.8391C193.629 30.9167 193.637 30.9828 193.647 31.0603C193.834 32.5818 196 50.601 196 70C196 89.399 193.834 107.418 193.647 108.94C193.637 109.017 193.629 109.083 193.62 109.161C191.667 125.321 181.438 135.404 165.304 137.169C165.117 137.189 164.948 137.205 164.76 137.221C161.583 137.48 129.904 140 98 140C66.0961 140 34.4173 137.48 31.2402 137.221C31.0521 137.205 30.8832 137.189 30.6956 137.169C14.7856 135.428 4.6182 125.6 2.46636 109.83C2.39524 109.309 2.32311 108.793 2.24509 108.273C1.76204 105.053 0 91.8109 0 70C0 48.1891 1.76204 34.9471 2.24509 31.7267Z' fill='%23FF1A00'/%3E%3Cpath d='M132 70.5L79 101V40L132 70.5Z' fill='white'/%3E%3C/svg%3E%0A");    background-position: center;
    background-repeat: no-repeat;
    background-size: 68px auto;
    filter: drop-shadow(0px 3px 10px #00000055);
  }

  .video-container > button > img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .disabled {
    pointer-events: none;
    cursor: none;
    opacity: 0 !important;
  }

  .hidden {
    display: none !important;
  }

  @media (hover: hover) and (pointer: fine), (-ms-high-contrast: active), (forced-colors: active) {
    .video-container > button:not(.disabled):not(.hidden) > img,
    .video-container > button:not(.disabled):not(.hidden):hover > img,
    .video-container > button:not(.disabled):not(.hidden)::after,
    .video-container > button:not(.disabled):not(.hidden):hover::after {
      transition: 300ms;
      opacity: 1;
    }

    .video-container > button:not(.disabled):not(.hidden):hover > img {
      opacity: 0.7;
    }

    .video-container > button:not(.disabled):not(.hidden):hover::after {
      transform: scale(1.1);
    }
  }
  `;

  // Title.
  template.appendChild(document.createElement("h2"));

  // Description.
  template.appendChild(document.createElement("span"));

  // YT api.
  template.appendChild(document.createElement("script"));

  // Video container.
  const container = template.appendChild(document.createElement("div"));
  container.classList.add("video-container");
  
  // YT iframe.
  const video = container.appendChild(document.createElement("div"));
  video.setAttribute("title", "YouTube video embed");

  // Facade.
  const img = container.appendChild(document.createElement("button")).appendChild(document.createElement("img"));
  img.setAttribute("loading", "lazy");
  img.setAttribute("title", "Click to start video");
  img.setAttribute("alt", "Youtube video thumbnail");

  // Output.
  return template;
}

// Register component.
customElements.define('youtube-video', YoutubeVideo);

// Exports.
export default Object.freeze(Object.defineProperty(YoutubeVideo, 'YoutubeVideo', {
  value: YoutubeVideo
}));