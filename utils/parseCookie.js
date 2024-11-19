// For normalization.
const additionalParams = new Map([
  ["domain", "Domain"],
  ["expires", "Expires"],
  ["httponly", "HttpOnly"],
  ["max-age", "Max-Age"],
  ["partitioned", "Partitioned"],
  ["path", "Path"],
  ["samesite", "SameSite"],
  ["secure", "Secure"]
]);

// Helper function to parse stringified cookies.
const parse = (cookies, out = {}) => {
  if (typeof cookies !== "string") return cookies;
  const arr = (cookies || "").split(";") || [];
  let last = {};
  for (let i = 0, l = arr.length, c, pre, o; i !== l; ++i) {
    let [k, v = true] = (arr[i] || "").split("=");
    k = k.trim();
    v === true || v.trim();
    (o = additionalParams.get(c = k.toLowerCase())) ? (
      last[o] = c === "samesite" && (v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()) || v
    ) : (
      last = new CookieContent(v),
      (pre = (k.match(/__Secure\-|__Host\-/gi) || [])[0]) && (
        last.prefix = pre,
        k = k.replace(pre, "")
      ),
      out[k] = last
    );
  }
  return out;
}

// Helper function to normalize cookies.
const normalize = cookies => {
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

// Helper functions to stringify cookies.
const stringifyContent = cookie => {
  if (typeof cookie !== "object") return `${cookie}`;
  let out = "", temp = {...cookie};
  out += `${out && "; " || ""}${temp.prefix || ""}${k}${temp.value !== true && `=${temp.value}` || ""}`;
  delete temp.value;
  delete temp.prefix;
  for (const k2 in temp) {
    out += `; ${k2}${temp[k2] !== true && `=${temp[k2]}` || ""}`
  }
  return out;
}

const stringify = cookies => {
  if (typeof cookies !== "object") return `${cookies}`;
  let out = "";
  for (const k in cookies) {
    out += stringifyContent(cookies[k])
  }
  return out;
}

// Helper function to get a cookie.
const get = (cookies, name) => (
  typeof cookies === "string" && (cookies = parse(cookies)),
  cookies && typeof cookies === "object" && cookies[name] || undefined
);

// Helper function to set a cookie.
const set = (cookies, name, value, type) => (
  type || (type = typeof cookies),
  typeof cookies === "string" && (cookies = parse(cookies)),
  cookies && typeof cookies === "object" && (
    value === null && (delete cookies[name], true)
    || (typeof value === "object" && Object.assign(cookies[name], value))
    || (cookies[name].value = value),
    cookies = normalize(cookies),
    type === "string" && stringify(cookies) || cookies
  )
);

// Cookie content class.
export class CookieContent {
  // Static methods.
  static stringify = stringifyContent;

  // Constructor.
  constructor (value) {
    typeof value === "object" && Object.assign(this, value) || (this.value = value);
  }

  // Helper function to stringify the content.
  toString() { return stringifyContent(this); }
}

// Export Cookie class.
export class Cookie {
  // Static methods.
  static stringify = stringifyContent;
  static parse = parse;
  static stringify = stringify;
  static set = set;
  static get = get;
  static normalize = normalize;

  // Constructor.
  constructor(cookie) {
    // If cookie not provided, try to catch it from the document.
    if (!cookie) {
      try {
        cookie = decodeURIComponent(document.cookie);
      } catch {}
    }

    // Parse cookie.
    cookie && (
      typeof cookie === "string" && (cookie = parse(cookie, this))
        || (cookie instanceof Cookie && Object.assign(this, cookie))
    );
  }

  // Helper function to stringify cookies.
  toString() { return stringify(this); }
}

// Export main function to parse cookie.
export const parseCookie = cookie => new Cookie(cookie);

// Exports.
parseCookie.Cookie = Cookie;
parseCookie.CookieContent = CookieContent;
export default Object.freeze(Object.defineProperty(parseCookie, 'parseCookie', {
  value: parseCookie
}));

// Node.js exports.
try {
  module.exports = parseCookie;
} catch {}