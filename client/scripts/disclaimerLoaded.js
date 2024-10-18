(() => { // START OF SCRIPT

  document.getElementById("back").onclick = () => {
    console.log(">>", window.history.back);
    window.history && window.history.length && window.history.back ?
      window.history.back()
    : window.location.href = document.referrer || "./index.html";
  }

})(); // END OF SCRIPT