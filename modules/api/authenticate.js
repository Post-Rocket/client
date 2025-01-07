const post = require("post");

// Authenticate api.
export const authenticate = async (
  data,
  route = "https://api.postrocket.app:3000/authenticate"
) => await post(data, route);

// Exports.
export default Object.freeze(Object.defineProperty(authenticate, "authenticate", {
  value: authenticate
}));