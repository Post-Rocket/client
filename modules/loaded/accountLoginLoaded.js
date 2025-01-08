import createFormData from "../utilities/createFormData.js";
import "./pageLoaded.js";
import touchScreenDetected from "./touchScreenDetected.js";
import hasTouchScreen from "../utilities/hasTouchScreen.js";
import isMobile from "../utilities/isMobile.js";
import authenticate from "../api/authenticate.js";

(() => { // START OF SCRIPT

const form = document.getElementById("form"),
[identifier, code] = form.getElementsByTagName("input"),
newCodeButton = document.getElementById("new-code"),
submitButton = document.getElementById("submit");
submitButton.innerHTML = "Send Code";

// Toggle between the identifier entry and the code.
const toggle = () => {
  const sendCode = identifier.classList.contains("hidden");
  identifier.classList.toggle("hidden");
  code.classList.toggle("hidden");
  newCodeButton.classList.toggle("hidden");
  sendCode || (
    code.value = "",
    setTimeout(() => code.focus(), 10000)
  );
  submitButton.innerHTML = sendCode && "Send Code" || "Verify Code";
  return sendCode;
}

// When user request to resubmit a new code.
newCodeButton.onclick = event => {
  event.preventDefault();
  toggle();
}

// When a code request or code validation is submitted.
form.onsubmit = event => {
  event.preventDefault();
  form.checkValidity();
  form.reportValidity();
  const formData = createFormData(form);
  (formData.verify = toggle()) || (delete formData.code);

  // --- TO BE REPLACED ---
  console.log(formData);
  document.cookie = "__Secure-postrocket_home_intro=; Secure; Path=/; SameSite=Strict; Max-Age=-99999999";
  authenticate(formData)
    .then(async response => {
      if (response.ok) {
        response = await response.json();
        // TO BE REPLACED.
        response.verified && (window.location.href = "./home.html");
      } else {
        let error;
        try {
          error = (await response.json()).error;
        } catch {}

        // TO BE REPLACED.
        throw Error(`${response.status} ${response.statusText}${error && ` > ${error}`}`)
      }
    });
  //formData.verify && (window.location.href = "./home.html");
  // ----------------------

}

// Autofocus unless the identifier is already filled.
setTimeout(() => (
 (hasTouchScreen() || isMobile()) && touchScreenDetected(),
  identifier.focus()
), 10);

// Capture a keybord key down and set the focus on the input.
document.addEventListener("keydown", event => {
  const input = code.classList.contains("hidden") && identifier || code;
  document.activeElement !== input && event.key.length === 1 && (
    event.stopPropagation(),
    event.preventDefault(),
    input.focus(),
    input.value = (input.value || "") + event.key
  );
});

})(); // END OF SCRIPT