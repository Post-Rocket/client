(() => { // START OF SCRIPT

  const back = document.getElementById("back");
  back && (back.onclick = () => {
    window.history && window.history.length && window.history.back ?
      window.history.back()
    : window.location.href = document.referrer || "./index.html";
  });

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

})(); // END OF SCRIPT