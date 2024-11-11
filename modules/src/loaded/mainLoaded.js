import "./common.js";
import createFormData from "./createFormData.js";
import throttle from "../utils/throttle.js";

(() => { // START OF SCRIPT

// Util function for side menu interaction.
let sideMenuScrollingDone = true;
const whileSideMenuToggled = () => {
  sideMenuScrollingDone = false;
  let overflow = document.body.style["overflow-x"] || null;
  document.body.style["overflow-x"] = "hidden !important";
  setTimeout(() => {
    sideMenuScrollingDone = true;
    document.body.style["overflow-x"] = overflow;
  }, 320);
}

// Add onclick on the side menu button.
document.getElementById("side-menu-button").onclick = event => {
  event.preventDefault();
  event.stopPropagation();
  document.body.classList.toggle("menu-opened");
  
  document.body.clientWidth <= 800 && (
    document.body.scrollLeft = document.body.classList.contains("menu-opened") &&
      -document.body.scrollWidth
      || 0
  );
  whileSideMenuToggled();
}

// Get menu element.
let menu = null, main = null;
for (let i = 0, cn = document.body.childNodes, l = cn.length, c; i !== l; ++i) {
  (c = cn[i]).nodeName === 'DIV' && (main && (menu = c) || (main = c));
}

main.onclick = () => {
  document.body.clientWidth <= 560
  && document.body.classList.contains("menu-opened") && (
    document.body.classList.remove("menu-opened"),
    document.body.scrollLeft = 0,
    whileSideMenuToggled()
  );
}

// Add on scroll event if needed.
document.body.addEventListener('scroll', () => {
  document.body.clientWidth <= 800 && sideMenuScrollingDone && (
    document.body.scrollLeft > -0.5 * Math.min(200, document.body.clientWidth) ?
    document.body.classList.remove("menu-opened")
    : document.body.classList.add("menu-opened")
  );
} );

// Keyboard push the content top.
const vv = window.visualViewport,
origHeight = Math.max(document.documentElement && document.documentElement.clientHeight || 0, window.innerHeight || 0);
vv && (vv.onresize = throttle(() => {
  document.documentElement.style.setProperty('--top', `${vv.offsetTop}px`);
  document.documentElement.style.setProperty('--height', `${vv.height}px`);
  const offset = Math.max(vv.offsetTop || 0, origHeight - (vv.height || 0));
  document.body.classList[offset && "add" || "remove"]("keyboard-up");
}));

// Write text to chat box.
const chat = document.getElementById("text"),
writeText = (
  text,
  elmt = chat,
  cb,
  i = 0,
  k = elmt instanceof Text && "nodeValue" || "textContent"
) => (
  i >= 0 || (i = 0),
  i || Array.isArray(text) || (text = [...`${text || ""}`]),
  i = Math.min(i, text.length),
  elmt[k] = text.slice(0, i).join("") + " ⬤",
  i < text.length && (
    setTimeout(() => writeText(
      text,
      elmt,
      cb,
      ++i
    ), 1 + Math.floor(Math.random() * 30))
  ) || (
    elmt[k] = text.join(""),
    typeof cb === "function" && cb()
  ),
  elmt
),
isValid = x => x || x === 0 || x === false,
writeContent = (arr, elmt = chat, cb, i = 0, c, p) => (
  i >= 0 || (i = 0),
  i || Array.isArray(arr) || (arr = [arr]),
  arr = arr.filter(isValid),
  i = Math.min(i, arr.length),
  i < arr.length && (
    c = arr[i],
    (typeof c === "number" || typeof c === "boolean") && (c = `${c}`),
    i && Array.isArray(c) && (
      elmt.appendChild(document.createElement('br')),
      elmt.appendChild(document.createElement('br'))
    ),
    typeof c !== 'object' ? (
      elmt.appendChild(writeText(
        c,
        document.createElement("pre"),
        () => writeContent(arr, elmt, cb, ++i, null, c)
      ))
    ) : Array.isArray(c) && (c = c.filter(isValid)).length ? (
      c.length > 1 && (
        p = document.createElement("pre"),
        p.classList.add("row"),
        elmt.appendChild(p)
      ) || (
        p = elmt
      ),
      writeContent(c, p, () => writeContent(arr, elmt, cb, ++i, null, c))
    ) : (
      Array.isArray(c) || !c || (
        c.type === "button" && (
          p = document.createElement("button"),
          p.textContent = c.text,
          p.onclick = event => (
            event.preventDefault(),
            event.stopPropagation(),
            // input.value = c.send || c.text,
            // form.submit(),
            console.log(p, c.send || c.text)
          ),
          elmt.appendChild(p)
        ) || c.type === "img" && c.src && (
          p = document.createElement("img"),
          p.setAttribute("src", c.src),
          p.setAttribute("alt", (c.alt || c.title) && `Image of ${c.alt || c.title}` || "image"),
          p.setAttribute("title", (c.title || c.alt) && `Image of ${c.title || c.alt}` || "image"),
          p.setAttribute("loading", c.loading || "lazy"),
          elmt.appendChild(p)
        ) || c.type === "youtube" && c.src && (
          p = document.createElement("youtube-video"),
          p.setAttribute("src", c.src),
          elmt.appendChild(p)
        )
      ),
      setTimeout(
        () => writeContent(arr, elmt, cb, ++i, null, c),
        20 + Math.floor(Math.random() * 20)
      )
    )
  ) || (
    typeof cb === "function" && cb()
  ),
  elmt
);

window.location.href.includes("index.html") && writeContent([
"Welcome to PostRocket 🚀\nLet's unleash your social media together! Do you have a website?", [
  {
    type: "button",
    text: "yes"
  },
  {
    type: "button",
    text: "no"
  },
  {
    type: "button",
    text: "not sure"
  }
]
]) || writeContent(`What can I help with today?`);

// Delay navigation.
const close = event => {
  event.preventDefault();
  event.stopPropagation();
  const hasMenuOpened = document.body.classList.contains("menu-opened");
  hasMenuOpened && (
    document.body.classList.remove("menu-opened"),
    document.body.clientWidth <= 800 && (document.body.scrollLeft = 0),
    whileSideMenuToggled()
  );
  return hasMenuOpened;
}

const getOnclick = onclick => event => (
  close(event),
  typeof onclick === 'function'
    || (typeof onclick === 'string' && (onclick = eval(onclick)))
    || ((event = event.target.getAttribute("href")) && (onclick = () => {
      window.location.href = event
    })),
  onclick && setTimeout(() => onclick(event), 310)
); 

for (let i = 0, cn = menu.getElementsByTagName('a'), l = cn.length, el; i !== l; ++i) {
  (el = cn[i]).onclick = getOnclick(el.onclick);
}

for (let i = 0, cn = menu.getElementsByTagName('button'), l = cn.length, el; i !== l; ++i) {
  (el = cn[i]).onclick = getOnclick(el.onclick);
}

// Dialog closing.
const closeDialog = event => {
  event.stopPropagation();
  event.target.tagName.toLowerCase() === "dialog" && event.target.close();
}
for (let i = 0, cn = document.getElementsByTagName('dialog'), l = cn.length; i !== l; ++i) {
  cn[i].onclick = closeDialog;
}

// Agent dialog opening.
const getOpenDialog = target => (
  typeof target === "string" && (target = document.getElementById(target)),
  event => {
    event.stopPropagation();
    target.showModal();
  }
);
document.getElementById("agent").onclick = getOpenDialog("agent-dialog");

// Remove focus.
const blurActiveElement = event => (
  event.preventDefault(),
  (origHeight > vv.height || vv.offsetTop)
    && document.activeElement && document.activeElement.blur()
);

// Pulsing.
let timeoutId2;
const form = document.getElementById("form"),
input = document.getElementById("input"),
addPulsingShaking = input.onblur = event => {
  if (event && event.relatedTarget && event.relatedTarget.type === "submit") {
    event.preventDefault();
    event.target.focus();
    removePulsingShaking();
    return;
  }

  // Add pulsing after a certain time.
  timeoutId2 = setTimeout(() => {
    input.classList.add("pulsing");
    input.classList.add("shaking");
  }, 10000);

  // Remove defocus event handler.
  () => document.removeEventListener('scroll', blurActiveElement);
},
removePulsingShaking = input.onfocus = () => {
  // Remove pulsing.
  clearTimeout(timeoutId2);
  input.classList.remove("pulsing");
  input.classList.remove("shaking");
}

// Intro animation.
const intro = document.getElementById("intro");
intro && (
  intro.onanimationend = event => {
    if (event.animationName === "bg") {
      intro.close();
      addPulsingShaking();
    }
  },
  intro.onclick = event => {
    event.stopPropagation();
    intro.close();
  },
  setTimeout(addPulsingShaking, 11000)
) || addPulsingShaking();

// Thinking.
let timeoutId3;
const thinking = document.getElementById("thinking"),
thinkingText = document.getElementById("thinking-text"),
defaultThinkingMsg = [
  "🙇🏻‍♀️ Thinking hard...",
  "🙆🏻‍♀️ Almost there...",
  "🤦🏻‍♀️ Maybe something's wrong..."
],
addThinking = msg => {
  Array.isArray(msg) || (msg = [msg]);
  thinking.classList.remove("hidden");
  removePulsingShaking();
  input.disabled = true;
  timeoutId3 = setTimeout(() => {
    thinkingText.innerHTML = msg[0] || defaultThinkingMsg[0];
    timeoutId3 = setTimeout(() => {
      thinkingText.innerHTML = msg[1] || defaultThinkingMsg[1];
      timeoutId3 = setTimeout(() => {
        thinkingText.innerHTML = msg[2] || defaultThinkingMsg[2];
      }, 10000);
    }, 10000);
  }, 5000);
},
removeThinking = () => {
  clearTimeout(timeoutId3);
  thinkingText.innerHTML = "";
  thinking.classList.add("hidden");
  document.activeElement || addPulsingShaking();
  input.disabled = null;
}

// When a user talk to the bot.
form.onsubmit = event => {
  event.preventDefault();
  form.checkValidity();
  form.reportValidity();
  const formData = createFormData(form),
    msg = formData.msg || formData.demoMsg,
    isDemo = !!formData.demoMsg;
  (formData.isDemo = isDemo) && (
    delete formData.demoMsg,
    formData.msg = msg
  );
  input.value = "";
  input.focus();

  // --- TO BE REPLACED ---
  console.log(formData);
  // ----------------------

}

})(); // END OF SCRIPT