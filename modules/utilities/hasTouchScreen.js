export const hasTouchScreen = () => {
  let mq;
  try {
    return /iP(hone|ad|od)/.test(navigator.userAgent || "")
      || 'ontouchstart' in document
      || 'ontouchstart' in documentElement
      || navigator.maxTouchPoints > 0
      || navigator.msMaxTouchPoints > 0
      || (
        (mq = matchMedia('(pointer:coarse)') || {})
        && mq.media === '(pointer:coarse)'
        && !!mq.matches
      );
  } catch {}
  return false;
}

// Exports.
export default Object.freeze(Object.defineProperty(hasTouchScreen, 'hasTouchScreen', {
  value: hasTouchScreen
}));