import throttle from "../utils/throttle.js";

(() => { // START OF SCRIPT

// Disabling transition mode on window resize
// and keep menu status.
let timeoutId;
window.onresize = throttle(() => {
  document.body.clientWidth <= 800 && (
    document.body.scrollLeft = document.body.classList.contains("menu-opened") &&
      -document.body.scrollWidth
      || 0
  );
  timeoutId || document.body.classList.remove('transition-on');
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    document.body.classList.add('transition-on');
    timeoutId = 0;
  }, 100);
});

// Add transition mode.
setTimeout(() => {
  document.body.classList.add('transition-on');
}, 100);

// Remove focus.
// document.addEventListener('click', event => (
//   event.target === document.body && (
//     event.preventDefault(),
//     event.stopPropagation(),
//     document.activeElement.blur()
//   )
// ));

})(); // END OF SCRIPT