(() => { // START OF SCRIPT

  const addBackOption = str => str && (
    str.includes("?") && (str + "&back=true")
    || str + "?back=true"
  );
  const createBackCallback = (
    backUrl,
    decrementHistory = true
  ) => () => {
    decrementHistory && window.history && window.history.length && window.history.back ?
      window.history.back()
    : window.location.href = addBackOption(backUrl || document.referrer || "../index.html");
  }

  let back = document.getElementById("back");
  back && (back.onclick = createBackCallback(null, back.hasAttribute("data-decrement-history")));
  back = document.getElementById("back-home");
  back && (back.onclick = createBackCallback("../index.html", back.hasAttribute("data-decrement-history")));

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

  // Remove focus.
  document.addEventListener('click', event => (
    event.target.nodeName === 'BODY' && 
      document.activeElement.blur()
  ));

})(); // END OF SCRIPT