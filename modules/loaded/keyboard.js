import throttle from "../../utilities/throttle.js";

// Keyboard push the content top.
const vv = window.visualViewport,
origHeight = Math.max(document.documentElement && document.documentElement.clientHeight || 0, window.innerHeight || 0);
vv && (vv.onresize = throttle(() => {
  document.documentElement.style.setProperty("--top", `${vv.offsetTop}px`);
  document.documentElement.style.setProperty("--height", `${vv.height}px`);
  const offset = Math.max(vv.offsetTop || 0, origHeight - (vv.height || 0));
  document.body.classList[offset && "add" || "remove"]("keyboard-up");
}));