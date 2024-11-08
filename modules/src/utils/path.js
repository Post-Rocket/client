export const Path = {};

export const urlstring = Path.urlstring = url => {
  url || (url = '');
  try {
    if (url instanceof URL) url = url.hostname;
  } catch {}
  return url.replace(/\s+/g, '');
}

export const urladdress = Path.urladdress = url => (
  urlstring(url).replace(/^(https|http|ftp)\:\/\/(www\.|)/i, '')
);

export const urlhost = Path.urlhost = url => (
  (url = urladdress(url)).slice(0, Math.max(url.indexOf('/') || 0, 0))
);

export const urlbasename = Path.urlbasename = url => (
  (url = urlhost(url)).slice(0, Math.max(url.lastIndexOf('.') || 0, 0))
)

export const urlname = Path.urlname = url => urlbasename(url).split('.').reverse().join(' ');

export const urlpage = Path.urlpage = url => (
  (url = urladdress(url)).slice(
    Math.max(url.indexOf('/') || 0, 0),
    Math.min(
      Math.max(url.indexOf('?') || 0, 0),
      Math.max(url.indexOf('#') || 0, 0)
    ) || url.length
  )
);

// Deafult export.
export default Object.freeze(Path);