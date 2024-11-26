import { removePulsingShaking } from "../../utilities/pulsingShaking";

// Thinking elements.
let timeoutId;
const thinking = document.getElementById("thinking"),
thinkingText = document.getElementById("thinking-text"),
defaultThinkingMsg = [
  "🙇🏻‍♀️ Thinking hard...",
  "🙆🏻‍♀️ Almost there...",
  "🤦🏻‍♀️ Maybe something's wrong..."
],
isValid = x => x || x === 0 || x === false;

// Add thining animation.
export const addThinking = (msg, onstart, onerror) => {
  Array.isArray(msg) || (msg = [msg].filter(isValid));
  thinking.classList.remove("hidden");
  typeof onstart === "function" && onstart();
  timeoutId = setTimeout(() => {
    thinkingText.innerHTML = msg[0] || defaultThinkingMsg[0];
    timeoutId = setTimeout(() => {
      thinkingText.innerHTML = msg[1] || defaultThinkingMsg[1];
      thinking.classList.add("warning");
      timeoutId = setTimeout(() => {
        thinkingText.innerHTML = msg[2] || defaultThinkingMsg[2];
        thinking.classList.add("error");
        typeof onerror === "function" && (timeoutId = setTimeout(() => onerror(), 5000));
      }, 10000);
    }, 10000);
  }, 5000);
};

// Remove thinking animation.
export const removeThinking = cb => {
  clearTimeout(timeoutId);
  thinkingText.innerHTML = "";
  thinking.classList.add("hidden");
  thinking.classList.remove("warning");
  thinking.classList.remove("error");
  typeof cb === "function" && cb();
}