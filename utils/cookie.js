const additionalParams = new Set([
  "domain",
  "expires",
  "max-age",
  "partitioned",
  "path",
  "samesite",
  "secure"
]);

// Helper function to parse stringified cookies.
export const parseCoockies = cookies => {
  if (typeof cookies !== "string") return cookies;
  const arr = (cookies || "").split(";") || [], out = {};
  let last = {};
  for (let i = 0, l = arr.length, c, pre; i !== l; ++i) {
    let [k, v = true] = (arr[i] || "").split("=");
    k = k.trim();
    v === true || v.trim();
    additionalParams.has(c = k.toLowerCase()) ? (
      last[c] = c === "samesite" && v.toLowerCase() || v
    ) : (
      last = { value: v },
      (pre = (k.match(/__Secure\-|__Host\-/gi) || [])[0]) && (
        last.prefix = pre,
        k = k.replace(pre, "")
      ),
      out[k] = last
    );
  }
  return out;
}

// Helper function to stringify cookies.
export const stringifyCookies = cookies => {
  if (typeof cookies !== "object") return `${cookies}`;
  let out = "", temp;
  for (const k in cookies) {
    temp = {...cookies[k]};
    out += `${out && "; " || ""}${temp.prefix || ""}${k}${temp.value !== true && `=${temp.value}` || ""}`;
    delete temp.value;
    delete temp.prefix;
    for (const k2 in temp) {
      out += `; ${k2}${temp[k2] !== true && `=${temp[k2]}` || ""}`
    }
  }
  return out;
}

// Helper function to normalize cookies.
const normalizeCookies = cookies => {
  const isString = typeof cookies === "string";
  isString && (cookies = parseCoockies(cookies));
  for (const k in cookies) {
    if (cookies[k] === null || cookies[k].value === null) {
      delete cookies[k];
      continue;
    }
    const ck = cookies[k];
    for (const k2 in ck) {
      ck[k2] === null && (
        delete ck[k2]
      )
    }
  }

  return isString && stringifyCookies(cookies) || cookies;
}

// Helper function to get a cookie.
export const getCookie = (cookies, name) => (
  typeof cookies === "string" && (cookies = parseCoockies(cookies)),
  cookies && typeof cookies === "object" && cookies[name] || undefined
);

// Helper function to set a cookie.
export const setCookie = (cookies, name, value, type) => (
  type || (type = typeof cookies),
  typeof cookies === "string" && (cookies = parseCoockies(cookies)),
  cookies && typeof cookies === "object" && (
    value === null && (delete cookies[name], true)
    || (typeof value === "object" && Object.assign(cookies[name], value))
    || (cookies[name].value = value),
    cookies = normalizeCookies(cookies),
    type === "string" && stringifyCookies(cookies) || cookies
  )
);

try {
  module.exports = {
    parseCoockies,
    stringifyCookies,
    normalizeCookies,
    getCookie,
    setCookie
  };
} catch {}