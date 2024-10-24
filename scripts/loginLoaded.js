const form = document.getElementById("form"),
[identifier, code] = form.getElementsByTagName("input"),
newCodeButton = document.getElementById("new-code");

const toggle = () => {
  const sendCode = identifier.classList.contains("hidden");
  identifier.classList.toggle("hidden");
  code.classList.toggle("hidden");
  newCodeButton.classList.toggle("hidden");
  sendCode || (code.value = "");
  return sendCode;
}

newCodeButton.onclick = event => {
  event.preventDefault();
  toggle();
}

form.onsubmit = event => {
  event.preventDefault();
  const form = event.target;
  form.checkValidity();
  form.reportValidity();
  const formData = createFormData(form);
  (formData.verify = toggle()) || (delete formData.code);

  console.log(formData);

}