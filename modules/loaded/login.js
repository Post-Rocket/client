

export const login = (identifier, token) => {
  document.cookie = `__Secure-postrocket_login=${document.encodeURIComponent(btoa(JSON.stringify([identifier, token || ""])))}; Secure; Path=/; SameSite=Strict;`;
}

export const checkSession = () => {
  
}

// Exports.
export default Object.freeze(Object.defineProperty(login, "login", {
  value: login
}));