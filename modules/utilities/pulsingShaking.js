let timeoutId;

// Add pulsing / onblur. 
export const addPulsingShaking = (elmt, delay = 10000) => {
  // Add pulsing after a certain time.
  elmt && (timeoutId = setTimeout(() => {
    elmt.classList.add("pulsing");
    elmt.classList.add("shaking");
  }, delay));
}

// Remove pulsing / onfocus
export const removePulsingShaking = elmt => {
  // Remove pulsing.
  clearTimeout(timeoutId);
  elmt && (
    elmt.classList.remove("pulsing"),
    elmt.classList.remove("shaking")
  );
}