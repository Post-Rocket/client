const re = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;

export class YoutubeVideo extends HTMLElement {
  #iframe;
  #src;
  #headline;
  #description;

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
    this.#iframe = shadow.childNodes[3].firstChild;
  }

  connectedCallback() {
    console.log(">>> connectedCallback");
    // Get the headline.
    (this.#headline.innerHTML = this.getAttribute('headline'))
      || this.#headline.classList.add("hidden");

    // Get the description.
    (this.#description.innerHTML = this.getAttribute('description'))
      || this.#description.classList.add("hidden");

    // Get the video id and set the source.
    (this.#src = this.getAttribute('src')) ? (
      this.#src = this.#src.match(re)[1],
      this.#src = `https://www.youtube.com/embed/${this.#src}?&theme=dark&autohide=2&modestbranding=1`,
      this.#iframe.setAttribute("src", this.#src)
    ) : this.#description.classList.add("hidden");
  }

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
        (this.#src = newValue) ? (
          this.#src = this.#src.match(re)[1],
          this.#src = `https://www.youtube.com/embed/${this.#src}?&theme=dark&autohide=2&modestbranding=1`,
          this.#iframe.setAttribute("src", this.#src),
          this.#description.classList.remove("hidden")
        ) : this.#headline.classList.add("hidden");
        break;
      default:
    }

    console.log(">>>", name, oldValue, newValue);
  }
}

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
    margin: 32px 0;
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

  .video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.27198%;
  }

  .video-container > iframe:first-of-type {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  .hidden {
    display: none;
  }
  `;

  // Title.
  template.appendChild(document.createElement("h2"));

  // Description.
  template.appendChild(document.createElement("span"));

  // Video container.
  const container = template.appendChild(document.createElement("div"));
  container.classList.add("video-container");
  
  // YT iframe.
  const iframe = container.appendChild(document.createElement("iframe"));
  iframe.setAttribute("frameborder", 0);
  iframe.setAttribute("width", 333);
  iframe.setAttribute("height", 196);
  iframe.setAttribute("src", "https://www.youtube.com/embed/wAJ66ZSQ4b4?&theme=dark&autohide=2&modestbranding=1");

  // Output.
  return template;
}

// Register component.
customElements.define('youtube-video', YoutubeVideo);

// Exports.
export default Object.freeze(Object.defineProperty(YoutubeVideo, 'YoutubeVideo', {
  value: YoutubeVideo
}));