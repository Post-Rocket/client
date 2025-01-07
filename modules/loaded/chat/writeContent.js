export const writeText = (
  text,
  elmt,
  cb,
  i = 0,
  k = elmt instanceof Text && "nodeValue" || "textContent"
) => (
  i >= 0 || (i = 0),
  i || Array.isArray(text) || (text = [...`${text || ""}`]),
  i = Math.min(i, text.length),
  elmt[k] = text.slice(0, i).join("") + " ⬤",
  i < text.length && (
    setTimeout(() => writeText(
      text,
      elmt,
      cb,
      ++i
    ), 1 + Math.floor(Math.random() * 30))
  ) || (
    elmt[k] = text.join(""),
    typeof cb === "function" && cb()
  ),
  elmt
);

const isValid = x => x || x === 0 || x === false;

// Write content to chat box.
export const writeContent = (arr, elmt, cb, i = 0, c, p) => (
  // Normalize input.
  i >= 0 || (i = 0),
  i || Array.isArray(arr) || (arr = [arr]),
  arr = arr.filter(isValid),
  i = Math.min(i, arr.length),
  // If not beyond last item.
  i < arr.length && (
    // Normalize item.
    c = arr[i],
    (typeof c === "number" || typeof c === "boolean") && (c = `${c}`),
    // Add spacer if needed.
    i && Array.isArray(c) && (
      p = document.createElement("div"),
      p.classList.add("br"),
      elmt.appendChild(p)
    ),
    // String, number, boolean item.
    typeof c !== "object" ? (
      // Add element to the chat.
      elmt.appendChild(
        // Add characters to the chat like someone's typing them.
        writeText(
          c,
          document.createTextNode(""),
          // Go to next item.
          () => writeContent(arr, elmt, cb, ++i, null, c)
        )
      )
    )
    // sub array of items, i.e. a row of items.
    : Array.isArray(c) && (c = c.filter(isValid)).length ? (
      c.length > 1 && (
        // Add row container, unless it's only one element in the row.
        p = document.createElement("pre"),
        p.classList.add("row"),
        elmt.appendChild(p)
      ) || (
        p = elmt
      ),
      // Add row to the chat.
      writeContent(c, p, () => writeContent(arr, elmt, cb, ++i, null, c))
    )
    // Item is a non-null object that is not an array,
    // like inforamtion about a button or an image or a video.
    : (
      Array.isArray(c) || !c || (
        // Get the object type.
        p = (c.type || "").toLowerCase(),
        // If item is info about a button
        p === "button" && (
          // Create element.
          p = document.createElement("button"),
          // Set button text.
          p.textContent = c.text,
          // Onclick callback based on the button action.
          p.onclick = event => {
            event.preventDefault();
            event.stopPropagation();
            switch ((c.action || "").toLowerCase()) {
              // Navigation action.
              case "nav":
              case "goto":
              case "navigate":
                const url = c.url || c.uri || c.href;
                (url === "back" || url === -1) ?
                window.history && window.history.length && window.history.back && window.history.back()
                : url && (window.location.href = url);
                break;
              case "back":
                window.history && window.history.length && window.history.back && window.history.back();
                break;
              // Submit to chatbot action.
              case "submit":
              default:
                const content = c.send || c.text;
                content && (
                  input.value = content,
                  (typeof c.onsubmit === "function" || (c.form && (c.onsubmit = () => form.requestSubmit()))) && c.onsubmit()
                );
            }
          },
          // Add element to the chat.
          elmt.appendChild(p)
        ) || (p === "img" || p === "image") && c.src && (
          // Create image element.
          p = document.createElement("img"),
          // Add attributes to the image.
          p.setAttribute("src", c.src),
          p.setAttribute("alt", (c.alt || c.title || c.text) && `Image of ${c.alt || c.title || c.text}` || "image"),
          p.setAttribute("title", (c.title || c.alt || c.text) && `Image of ${c.title || c.alt || c.text}` || "image"),
          p.setAttribute("loading", c.loading || "lazy"),
          c.class && p.classList.add(...c.class.split(/\s+/g)),
          c.style && (p.style.cssText += c.style),
          // Add element to the chat.
          elmt.appendChild(p)
        ) || (p === "yt" || p === "youtube") && c.src && (
          // Create YT video custome element.
          p = document.createElement("youtube-video"),
          // Add attributes to the element.
          p.setAttribute("src", c.src),
          c.headline && p.setAttribute("headline", c.headline),
          (c.description || c.text) && p.setAttribute("description", c.description || c.text),
          // Add element to the chat.
          elmt.appendChild(p)
        )
      ),
      // Go to the next item after a delay.
      setTimeout(
        () => writeContent(arr, elmt, cb, ++i, null, c),
        20 + Math.floor(Math.random() * 20)
      )
    )
  ) || (
    // If done, call the callback.
    typeof cb === "function" && cb()
  ),
  // Return the parent.
  elmt
);

// Exports.
writeContent.writeText = writeText;
export default Object.freeze(Object.defineProperty(writeContent, "writeContent", {
  value: writeContent
}));