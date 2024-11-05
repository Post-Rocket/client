// Logout.
const logout = document.getElementById("logout");
logout && (logout.onclick = () => {
  if (window.confirm("Do you really want to leave?")) {
    window.location.href = "../index.htm?intro=false";
    // --- TODO ---
    // Add proper off logging
    // ----------------------
  }
});