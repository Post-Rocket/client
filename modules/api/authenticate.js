import { post } from "./request";

export const URL = "https://api.postrocket.app:3000/authenticate";

// Authenticate api.
export const authenticate = async (
  data,
  route = URL
) => {
  try {
    const response = await post(route, {
      body: data
    });

    console.log("AUTHENTICATE:", await response.json());
  } catch (error) {
    throw Error(error);
  }
}
authenticate.URL = URL;

// Exports.
export default Object.freeze(Object.defineProperty(authenticate, "authenticate", {
  value: authenticate
}));