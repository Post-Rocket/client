(() => { // START OF SCRIPT

// Logout.
const logout = document.getElementById("logout");
logout && (logout.onclick = event => {
  event.preventDefault();
  event.stopPropagation();
  if (window.confirm("Do you really want to leave?")) {
    // Reset logged in intro.
    document.cookie = "__Secure-postrocket_home_intro=0; Secure; Path=/; SameSite=Strict; Max-Age=-99999999";
    // --- TODO ---
    // Add proper off logging
    // ----------------------
    window.location.href = event.target.getAttribute("href") || "../index.html";
  }
});

})(); // END OF SCRIPT