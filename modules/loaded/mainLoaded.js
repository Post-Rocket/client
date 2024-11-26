import "./common.js";
import createFormData from "../utilities/createFormData.js";
import "../components/YoutubeVideo.js";
import "./navAndMenuLoaded.js";
import { createConfettis } from "../components/Confettis.js";
import touchScreenDetected from "./touchScreenDetected.js";
import {
  addPulsingShaking as _addPulsingShaking,
  removePulsingShaking as _removePulsingShaking
} from "../utilities/pulsingShaking.js"
import {
  addThinking,
  removeThinking as _removeThinking,
  writeContent as _writeContent
} from "./chat/index.js";
import { getOpenDialog } from "./dialogLoaded.js";

(() => { // START OF SCRIPT

// Get all affected elements.
const agent = document.getElementById("agent"),
chat = document.getElementById("text"),
form = document.getElementById("form"),
input = document.getElementById("input"),
cancelButton = document.getElementById("cancel-button"),
main = document.getElementById("main-content"),
menu = document.getElementById("side-menu"),
index = document.getElementById("index"),
home = document.getElementById("home");

// Specialization of utility functions.
const writeContent = (arr, ...args) => _writeContent(arr, chat, ...args),
removeThinkingCallback = () => {
  document.activeElement || addPulsingShaking();
  input.disabled = null;
  cancelButton.disabled = true;
},
removeThinking = () => _removeThinking(removeThinkingCallback),
// Add pulsing / onblur. 
addPulsingShaking = input.onblur = () => _addPulsingShaking(input, 10000),
// Remove pulsing / onfocus
removePulsingShaking = input.onfocus = () => _removePulsingShaking(input);

// Agent dialog opening.
agent.onclick = getOpenDialog("agent-dialog");

// Send cancelling request to the bot.
const sendCancel = data => {
  removeThinking();
  writeContent(
    data && data.timeout && [
      "🤷🏻‍♀️  I could not figure it out on time...\n\nAnything else I can do for you?",
      [
        {
          type: "button",
          text: "yes",
          send: "I want to try again",
          form
        },
        {
          type: "button",
          text: "not now",
          send: "I want to try later",
          form
        },
        {
          type: "button",
          text: "tutorials",
          action: "navigate",
          href: index && "pages/help.html" || "./help.html"
        }
      ]
    ]
    || [
      "💁🏻‍♀️  Ok, I'll stop thinking about it.\n\nAnything else on your mind?",
      [
        {
          type: "button",
          text: "yes",
          send: "I have something to add",
          form
        },
        {
          type: "button",
          text: "no",
          send: "nothing else to add",
          form
        },
        {
          type: "button",
          text: "learn more",
          action: "navigate",
          href: index && "pages/help.html" || "./help.html"
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
      removePulsingShaking(),
      input.disabled = true,
      cancelButton.disabled = null
    ), () => (
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

// Capture a keyboard key down and set the focus on the input.
document.addEventListener("keydown", event => {
  document.activeElement !== input && event.key.length === 1 && (
    event.stopPropagation(),
    event.preventDefault(),
    input.focus(),
    input.value = (input.value || "") + event.key
  );
});

// Unhide main content and add original content for the index.html.
const unhide = () => {
  touchScreenDetected();
  main.classList.remove("hidden");
  menu.classList.remove("hidden");
  index === document.body && writeContent([
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
}

// Home page chat content.
// TO BE REPLACED.
const homePageChatContent = ["What can I help you with today?"];

// Add confettis for logging in / creating an account.
const referrer = (document.referrer || "").toLowerCase(),
isWelcome = (
  !referrer || (
    referrer.includes("postrocket") && (
      referrer.includes("account-creation.html")
      || referrer.includes("account-login.html")
      || referrer.includes("index.html")
      || !referrer.includes(".html")
    )
  )
) && !((decodeURIComponent(document.cookie) || "").match("postrocket_home_intro") || []).length;

home === document.body && (
  isWelcome && (
    document.cookie = "__Secure-postrocket_home_intro=1; Secure; Path=/; SameSite=Strict",
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

// Intro animation.
const intro = document.getElementById("intro");
let introTimeoutId;
intro && (
  intro.onanimationend = event => {
    if (event.animationName === "bg") {
      intro.close();
      addPulsingShaking();
    }
  },
  intro.onclick = event => {
    event.stopPropagation();
    unhide();
    clearTimeout(introTimeoutId);
    intro.close();
  },
  introTimeoutId = setTimeout(() => {
    unhide();
    addPulsingShaking();
  }, !(decodeURIComponent(document.cookie) || "").includes("postrocket_index_intro=1") && 13000 || 100)
) || (
  unhide(),
  addPulsingShaking()
);

// Add intro cookie.
setTimeout(() => {
  document.cookie = "__Host-postrocket_index_intro=1; Secure; Path=/";
}, 10000);

})(); // END OF SCRIPT