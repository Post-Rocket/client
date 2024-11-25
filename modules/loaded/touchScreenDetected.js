import hasTouchScreen from "../utilities/hasTouchScreen.js";
import isMobile from "../utilities/isMobile.js";

(() => { // START OF SCRIPT

if (hasTouchScreen() || isMobile()) {
  // Refine accessibility.
  setTimeout(() => {
    const meta = document.querySelector('meta[name="viewport"]'),
      content = "width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=1, user-scalable=no",
      androidContent = !/iP(hone|ad|od)/.test(navigator.userAgent) && ", interactive-widget=resizes-content" || "";
      meta && meta.setAttribute("content", content + androidContent);
  }, 1000);
}

})(); // END OF SCRIPT