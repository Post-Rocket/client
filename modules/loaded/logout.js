(() => { // START OF SCRIPT

// Logout.
const logout = document.getElementById("logout");
logout && (logout.onclick = event => {
  event.preventDefault();
  event.stopPropagation();
  if (window.confirm("Do you really want to leave?")) {
    // Reset logged in intro.
    document.cookie = "__Secure-postrocket_home_intro=; Secure; Path=/; SameSite=Strict; Max-Age=-99999999;";
    document.cookie = "__Secure-postrocket_login=; Secure; Path=/; SameSite=Strict; Max-Age=-99999999;";
    // ----------------------
    window.location.href = event.target.getAttribute("href") || "../index.html";
  }
});

})(); // END OF SCRIPT