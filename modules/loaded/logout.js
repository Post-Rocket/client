(() => { // START OF SCRIPT

// Logout.
const logout = document.getElementById("logout");
logout && (logout.onclick = event => {
  event.preventDefault();
  event.stopPropagation();
  if (window.confirm("Do you really want to leave?")) {
    window.location.href = event.target.getAttribute("href") || "../index.htm?intro=false";
    // --- TODO ---
    // Add proper off logging
    // ----------------------
  }
});

})(); // END OF SCRIPT