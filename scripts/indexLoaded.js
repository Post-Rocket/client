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
document.getElementById("side-menu-button").onclick = (event) => {
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

// Disabling transition mode on window resize
// and keep menu status.
let timeoutId, _throttle;
try {
  _throttle = throttle;
} catch {
  _throttle = x => x;
}
window.onresize = _throttle(() => {
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

// Keyboard push the content top.
const vv = window.visualViewport;
vv && (vv.onresize = _throttle(event => {
  document.documentElement.style.setProperty('--top', `${vv.offsetTop}px`);
  document.documentElement.style.setProperty('--height', `${vv.height}px`);
  // window.scrollTo(0,0);
  // document.getElementById("input").setAttribute("placeholder",
  //   `${++cnt} ${vv.offsetTop} ${vv.height} ${document.body.clientHeight} ${document.body.scrollHeight}`);
}));

// First add an invisble dummy input field to the top.
/*const dummy = document.createElement("input");
document.body.appendChild(dummy);
dummy.style.cssText = "position:fixed; top: -100px; left: 0";

const input = document.getElementById("input");
input.setAttribute("readonly", "readonly");
input.onfocus = event => {
  if(input.getAttribute("readonly")) {
    event.preventDefault();
    // console.log("input focused");
    // input.setAttribute("placeholder", "focused");
    dummy.focus();

    // input.blur();
    // input.removeAttribute("readonly");
    console.log("focus");
    setTimeout(() => {
      input.focus();
      input.removeAttribute("readonly");
    }, 3000);
    // input.focus();
  }
}
input.onblur = () => {
  input.setAttribute("readonly", "readonly");
}
// input.focus();*/

})(); // END OF SCRIPT