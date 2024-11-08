import "./common";

(() => { // START OF SCRIPT

  // Back nav functionality.
  const addBackOption = str => str && str.includes("index.html") && (
    str.includes("?") && (str + "&intro=false")
    || str + "?intro=false"
  ) || str;

  const createBackCallback = (
    backUrl,
    defaultBackUrl = "../index.html",
    decrementHistory = true
  ) => () => {
    decrementHistory && window.history && window.history.length && window.history.back ?
      window.history.back()
    : window.location.href = addBackOption(backUrl || document.referrer || defaultBackUrl || "../index.html");
  }

  let back = document.getElementById("back");
  back && (back.onclick = createBackCallback(null, "../index.html", true));
  back = document.getElementById("back-home");
  back && (back.onclick = createBackCallback("../index.html", "../index.html", back.hasAttribute("data-decrement-history")));

})(); // END OF SCRIPT