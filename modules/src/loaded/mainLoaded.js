import "./common.js";
import createFormData from "./createFormData.js";
import throttle from "../utils/throttle.js";
import "../components/YoutubeVideo.js";
import "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
import { createConfettis } from "../components/Confettis.js";

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

// Form and pulsing.
let timeoutId2;
const form = document.getElementById("form"),
input = document.getElementById("input"),
// Add pulsing / onblur. 
addPulsingShaking = input.onblur = () => {
  // Add pulsing after a certain time.
  timeoutId2 = setTimeout(() => {
    input.classList.add("pulsing");
    input.classList.add("shaking");
  }, 10000);
},
// Remove pulsing / onfocus
removePulsingShaking = input.onfocus = () => {
  // Remove pulsing.
  clearTimeout(timeoutId2);
  input.classList.remove("pulsing");
  input.classList.remove("shaking");
}

// Send cancelling request to the bot.
const sendCancel = data => {
  removeThinking();
  writeContent(
    data && data.timeout && [
      "🤷🏻‍♀️  I could not figure it out on time...\n\nAnything else you wanted to add?",
      [
        {
          type: "button",
          text: "sure",
          send: "I want to try again"
        },
        {
          type: "button",
          text: "not now",
          send: "I want to try later"
        },
        {
          type: "button",
          text: "tutorials",
          action: "navigate",
          href: "pages/help.html"
        }
      ]
    ]
    || [
      "💁🏻‍♀️  Ok, I'll stop thinking about it.\n\nAnything else on your mind?",
      [
        {
          type: "button",
          text: "yes",
          send: "I have something to add"
        },
        {
          type: "button",
          text: "no",
          send: "nothing else to add"
        },
        {
          type: "button",
          text: "learn more",
          action: "navigate",
          href: "pages/help.html"
        }
      ]
    ]
  );

  // To be completed.
}

let timeoutIdTest; // For the test below

// When a user talk to the bot.
form.onsubmit = event => {
  event.preventDefault();
  event.stopPropagation();

  // Check validity.
  form.checkValidity();
  form.reportValidity();

  // Normalize input.
  const formData = createFormData(event),
    msg = formData.msg || formData.demoMsg,
    isDemoCancel = formData.demoCancel,
    isDemo = !!(formData.demoMsg || isDemoCancel);
  (isDemoCancel || formData.cancel) && (formData.cancel = true);
  (formData.isDemo = isDemo) && (
    delete formData.demoMsg,
    delete formData.demoCancel,
    formData.msg = msg
  );
  
  // Clear input.
  input.value = "";

  // --- TO BE REPLACED ---
  console.log(formData);
  // ----------------------

  // Clear the chat.
  while (chat.lastChild) {
    chat.removeChild(chat.lastChild);
  }

  // Process formData.
  if (formData.cancel) {
    sendCancel(formData);
    clearTimeout(timeoutIdTest) // For the test below
  } else {
    // Add thinking animation.
    addThinking(null, () => (
      sendCancel({
        ...formData,
        timeout: true
      }),
      clearTimeout(timeoutIdTest) // For the test below
    ));

    // Simulating response.
    timeoutIdTest = setTimeout(() => {
      removeThinking();
      writeContent("Ok. Roger that.");
    }, 50000);
    // ----------------------
  }

  return false;
}

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
// Write content to chat box.
writeContent = (arr, elmt = chat, cb, i = 0, c, p) => (
  // Normalize input.
  i >= 0 || (i = 0),
  i || Array.isArray(arr) || (arr = [arr]),
  arr = arr.filter(isValid),
  i = Math.min(i, arr.length),
  // If not beyond last item.
  i < arr.length && (
    // Normalize item.
    c = arr[i],
    (typeof c === "number" || typeof c === "boolean") && (c = `${c}`),
    // Add spacer if needed.
    i && Array.isArray(c) && (
      p = document.createElement("div"),
      p.classList.add("br"),
      elmt.appendChild(p)
    ),
    // String, number, boolean item.
    typeof c !== 'object' ? (
      // Add element to the chat.
      elmt.appendChild(
        // Add characters to the chat like someone's typing them.
        writeText(
          c,
          document.createTextNode(""),
          // Go to next item.
          () => writeContent(arr, elmt, cb, ++i, null, c)
        )
      )
    )
    // sub array of items, i.e. a row of items.
    : Array.isArray(c) && (c = c.filter(isValid)).length ? (
      c.length > 1 && (
        // Add row container, unless it's only one element in the row.
        p = document.createElement("pre"),
        p.classList.add("row"),
        elmt.appendChild(p)
      ) || (
        p = elmt
      ),
      // Add row to the chat.
      writeContent(c, p, () => writeContent(arr, elmt, cb, ++i, null, c))
    )
    // Item is a non-null object that is not an array,
    // like inforamtion about a button or an image or a video.
    : (
      Array.isArray(c) || !c || (
        // Get the object type.
        p = (c.type || "").toLowerCase(),
        // If item is info about a button
        p === "button" && (
          // Create element.
          p = document.createElement("button"),
          // Set button text.
          p.textContent = c.text,
          // Onclick callback based on the button action.
          p.onclick = event => {
            event.preventDefault();
            event.stopPropagation();
            switch ((c.action || "").toLowerCase()) {
              // Navigation action.
              case "nav":
              case "goto":
              case "navigate":
                const url = c.url || c.uri || c.href;
                (url === "back" || url === -1) ?
                window.history && window.history.length && window.history.back && window.history.back()
                : url && (window.location.href = url);
                break;
              case "back":
                window.history && window.history.length && window.history.back && window.history.back();
                break;
              // Submit to chatbot action.
              case "submit":
              default:
                const content = c.send || c.text;
                content && (
                  input.value = content,
                  form.requestSubmit()
                );
            }
          },
          // Add element to the chat.
          elmt.appendChild(p)
        ) || (p === "img" || p === "image") && c.src && (
          // Create image element.
          p = document.createElement("img"),
          // Add attributes to the image.
          p.setAttribute("src", c.src),
          p.setAttribute("alt", (c.alt || c.title || c.text) && `Image of ${c.alt || c.title || c.text}` || "image"),
          p.setAttribute("title", (c.title || c.alt || c.text) && `Image of ${c.title || c.alt || c.text}` || "image"),
          p.setAttribute("loading", c.loading || "lazy"),
          c.class && p.classList.add(...c.class.split(/\s+/g)),
          c.style && (p.style.cssText += c.style),
          // Add element to the chat.
          elmt.appendChild(p)
        ) || (p === "yt" || p === "youtube") && c.src && (
          // Create YT video custome element.
          p = document.createElement("youtube-video"),
          // Add attributes to the element.
          p.setAttribute("src", c.src),
          c.headline && p.setAttribute("headline", c.headline),
          (c.description || c.text) && p.setAttribute("description", c.description || c.text),
          // Add element to the chat.
          elmt.appendChild(p)
        )
      ),
      // Go to the next item after a delay.
      setTimeout(
        () => writeContent(arr, elmt, cb, ++i, null, c),
        20 + Math.floor(Math.random() * 20)
      )
    )
  ) || (
    // If done, call the callback.
    typeof cb === "function" && cb()
  ),
  // Return the parent.
  elmt
);

// Capture a keybord key down and set the focus on the input.
document.addEventListener("keydown", event => {
  document.activeElement !== input && event.key.length === 1 && (
    event.stopPropagation(),
    event.preventDefault(),
    input.focus(),
    input.value = (input.value || "") + event.key
  );
});

// Original content.
document.getElementById("index") === document.body && writeContent([
  "Welcome to PostRocket 🚀\nLet's unleash your social media together! Do you have a website?", [
    {
      type: "button",
      text: "yes",
      send: "I have a website"
    },
    {
      type: "button",
      text: "no",
      send: "I do not have a website"
    },
    {
      type: "button",
      text: "help me",
      action: "navigate",
      href: "pages/help.html"
    }
  ],
  [{
    type: "image",
    class: "small",
    src: "https://media.tenor.com/NtzA1v_UCkEAAAAj/bork.gif",
    title: "dog barking"
  }],
  [{
    type: "youtube",
    src: "https://www.youtube.com/watch?v=wbZBVu1AQSQ"
  }]
]);

// Home page chat content.
// TO BE REPLACED.
const homePageChatContent = ["What can I help with today?"];

// Add confettis for logging in / creating an account.
const referrer = (document.referrer || "").toLowerCase(),
isWelcome = (
  (referrer && referrer.includes("postrocket") && (
    referrer.includes("account-creation.html")
    || referrer.includes("account-login.html")
    || referrer.includes("index.html")
    || !referrer.includes(".html")
  )) || window.location.href.startsWith("file://") // local testing
) && !window.location.href.includes("intro=false");

document.getElementById("home") === document.body && (
  isWelcome && (
    writeContent(["🎉  Welcome!\n\n", ...homePageChatContent], chat, () =>(
      createConfettis({
        color: ["#BF9B30", "#FFBF00", "#A67C00", "#C0C0C0", "#B5B7BB", "#75777B"],
        duration: 5000,
        timeStep: 10,
        autoStart: true
      })
    ))
  ) || writeContent(...homePageChatContent)
);

// Thinking.
let timeoutId3, timeoutId4;
const thinking = document.getElementById("thinking"),
thinkingText = document.getElementById("thinking-text"),
cancelButton = document.getElementById("cancel-button"),
defaultThinkingMsg = [
  "🙇🏻‍♀️ Thinking hard...",
  "🙆🏻‍♀️ Almost there...",
  "🤦🏻‍♀️ Maybe something's wrong..."
],
addThinking = (msg, cb, ttl = 30000) => {
  Array.isArray(msg) || (msg = [msg].filter(isValid));
  thinking.classList.remove("hidden");
  removePulsingShaking();
  input.disabled = true;
  cancelButton.disabled = null;
  typeof cb === "function" && (timeoutId4 = setTimeout(() => cb(), ttl));
  timeoutId3 = setTimeout(() => {
    thinkingText.innerHTML = msg[0] || defaultThinkingMsg[0];
    timeoutId3 = setTimeout(() => {
      thinkingText.innerHTML = msg[1] || defaultThinkingMsg[1];
      thinking.classList.add("warning");
      timeoutId3 = setTimeout(() => {
        thinkingText.innerHTML = msg[2] || defaultThinkingMsg[2];
        thinking.classList.add("error");
      }, 10000);
    }, 10000);
  }, 5000);
},
removeThinking = () => {
  clearTimeout(timeoutId3);
  clearTimeout(timeoutId4);
  thinkingText.innerHTML = "";
  thinking.classList.add("hidden");
  thinking.classList.remove("warning");
  thinking.classList.remove("error");
  document.activeElement || addPulsingShaking();
  input.disabled = null;
  cancelButton.disabled = true;
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

})(); // END OF SCRIPT