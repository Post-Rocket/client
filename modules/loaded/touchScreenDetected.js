import hasTouchScreen from "./hasTouchScreen.js";

(() => { // START OF SCRIPT

if (hasTouchScreen()) {
  // Refine accessibility.
  setTimeout(() => {
    const meta = document.querySelector('meta[name="viewport"]'),
      content = "width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=1, user-scalable=no, interactive-widget=resizes-content";
      meta && meta.setAttribute("content", content);
  }, 1000);
}

})(); // END OF SCRIPT