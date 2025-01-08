import { post } from "./request";

// export const URL = "https://api.postrocket.app:3000/authenticate";
export const URL = "http://localhost:3000/authenticate";

// Authenticate api.
export const authenticate = async (
  data,
  route = URL
) => post(route, {
  body: data,
  headers: {
    "Content-Type": "application/json"
  }
});
authenticate.URL = URL;

// Exports.
export default Object.freeze(Object.defineProperty(authenticate, "authenticate", {
  value: authenticate
}));