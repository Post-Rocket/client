const COPYRIGHT = "PostRocket",
  YEAR = 2024,
  HREF = "/terms-of-use.html#intellectual-property",
  TARGET = "_self";

export class CopyrightLine extends HTMLElement {
  #anchor;

  // Constructor.
  constructor() {
    super();

    // Create template if needed.
    template || (template = createTemplate());

    // Attach shadow DOM to element.
    const shadow = this.attachShadow({mode: "closed"});
    shadow.appendChild(template.cloneNode(true));
    this.#anchor = shadow.childNodes[1];
  }

  connectedCallback() {
    // Extract specific attributes.
    const endYear = this.getAttribute("end") || new Date(Date.now()).getFullYear(),
    startYear = this.getAttribute("start") || this.getAttribute("year") || YEAR,
    value = this.getAttribute("entity") || this.getAttribute("company") || this.getAttribute("name") || COPYRIGHT,
    short = this.hasAttribute("short"),
    text = this.getAttribute("value") || `©${!short && " Copyright" || ""} ${value} ${startYear}${endYear !== startYear && `-${endYear}` || ''}`,
    href = this.getAttribute("href") || HREF,
    target = this.getAttribute("target") || TARGET;
    
    // Remove specific attributes.
    this.removeAttribute("year");
    this.removeAttribute("start");
    this.removeAttribute("end");
    this.removeAttribute("entity");
    this.removeAttribute("company");
    short && this.removeAttribute("short");
    this.removeAttribute("value");

    // Transfer the rest of the attributes.
    href && (
      this.setAttribute("href", href),
      this.#anchor.setAttribute("href", href)
    );
    target && this.#anchor.setAttribute("target", target);
    this.setAttribute("title", `Copyright ${text.replace(/(\s+|)(©|Copyright)/gi, "").trim()}. All rights reserved`);
    this.#anchor.innerHTML = text;
  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createDocumentFragment();

  // Style.
  template.appendChild(document.createElement("style")).innerHTML = `
  :host {
    --transition-time: 300ms;
    color: inherit;
    display: flex;
  }
  
  * {
    font-size: 12px;
    opacity: 0.35;
    font-style: italic;
    transition: var(--transition-time);
  }

  a, a:visited, a:active, a:disabled {
    opacity: 0.35;
    color: inherit;
    text-decoration: none;
    -webkit-decoration: none;
    -webkit-text-decoration: none;
    pointer-events: auto;
    transition: var(--transition-time);
    margin: 0;
    padding: 0;
    border: 0;
  }

  @media (hover: hover) and (pointer: fine), (-ms-high-contrast: active), (forced-colors: active) {
    a:hover {
      opacity: 1;
    }
  }
  `;

  // Copyright line.
  template.appendChild(document.createElement("a"));

  // Output.
  return template;
}

// Register component.
customElements.define('copyright-line', CopyrightLine);

// Exports.
export default Object.freeze(Object.defineProperty(CopyrightLine, 'CopyrightLine', {
  value: CopyrightLine
}));