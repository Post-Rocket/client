


const DEFAULT = navigator.userAgent || navigator.vendor || window.opera || "";
export const isIOS = (input = DEFAULT) => /iP(hone|ad|od)/i.test(input);
export const isAndroid = (input = DEFAULT) => /Android/i.test(input);
export const isBlackBerry = (input = DEFAULT) => /BlackBerry/i.test(input);
export const isOperaMobile = (input = DEFAULT) => /Opera Mini/i.test(input);
export const isWindowsMobile = (input = DEFAULT) => /IEMobile|Windows Phone|WPDesktop/i.test(input);
export const isOtherMobile = (input = DEFAULT) => /webOS/i.test(input);

export const isMobile = (input = DEFAULT) => (
  isIOS(input)
  || isAndroid(input)
  || isBlackBerry(input)
  || isOperaMobile(input)
  || isWindowsMobile(input)
  || isOtherMobile(input)
);

// Exports.
isMobile.isIOS = isIOS;
isMobile.isAndroid = isAndroid;
isMobile.isBlackBerry = isBlackBerry;
isMobile.isOperaMobile = isOperaMobile;
isMobile.isWindowsMobile = isWindowsMobile;
isMobile.isOtherMobile = isOtherMobile;
export default Object.freeze(Object.defineProperty(isMobile, 'isMobile', {
  value: isMobile
}));