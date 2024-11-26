import hasTouchScreen from "../utilities/hasTouchScreen.js";
import isMobile from "../utilities/isMobile.js";

let timeoutId;

export const touchScreenDetected = () => {
  timeoutId && clearTimeout(timeoutId);
  const meta = document.querySelector('meta[name="viewport"]'),
      content = "width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=1, user-scalable=no",
      androidContent = !/iP(hone|ad|od)/.test(navigator.userAgent) && ", interactive-widget=resizes-content" || "";
      meta && meta.setAttribute("content", content + androidContent);
}

// Exports.
export default Object.freeze(Object.defineProperty(touchScreenDetected, 'touchScreenDetected', {
  value: touchScreenDetected
}));

(() => { // START OF SCRIPT

if (hasTouchScreen() || isMobile()) {
  // Refine accessibility.
  timeoutId = setTimeout(() => {
    touchScreenDetected()
  }, 10000);
}

})(); // END OF SCRIPT