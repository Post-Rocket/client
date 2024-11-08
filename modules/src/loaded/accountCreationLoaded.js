import createFormData from "./createFormData.js";
import "./pageLoaded.js";

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
  const form = event.target;
  form.checkValidity();
  form.reportValidity();
  const formData = createFormData(form);
  (formData.verify = toggle()) || (delete formData.code);

  // --- TO BE REPLACED ---
  console.log(formData);
  formData.verify && (window.location.href = "./home.html");
  // ----------------------

}

// Autofocus unless the identifier is already filled.
setTimeout(() => identifier.focus(), 10);