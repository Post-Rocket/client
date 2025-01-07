// Ping api.
export const post = async (
  data,
  route
) => {
  try {
    typeof data === "object" && data && (data = JSON.stringify(data));
    const response = await fetch(route, {
      method: "POST",
      body: data,
    });
    if (!response.ok) {
      throw Error(`Response status: ${response.status}`);
    }

    return await response.json() || await response.text();
  } catch (error) {
    throw Error(error.message);
  }
}

// Exports.
export default Object.freeze(Object.defineProperty(post, 'post', {
  value: post
}));