export const hasTouchScreen = () => {
  let mq;
  try {
    return 'ontouchstart' in this.document
      || 'ontouchstart' in this.documentElement
      || this.navigator.maxTouchPoints > 0
      || this.navigator.msMaxTouchPoints > 0
      || (
        (mq = this.matchMedia('(pointer:coarse)') || {})
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