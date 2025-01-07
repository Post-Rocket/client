export const DEFAULT_CACHE_STORE_NAME = "request-cache";

// Returns [Request Object and cache object].
export const normalizeInput = (
  url,
  params
) => {
  // Normalize params.
  let cache;
  if (params) {
    if (typeof params === "string") {
      try {
        params = JSON.parse(params);
      } catch {
        params = {
          method: params.toUpperCase()
        }
      }
    } else if (typeof params === "object") {
      params.body && typeof params.body === "object" && !(
        params.body instanceof ArrayBuffer
        || params.body instanceof TypedArray
        || params.body instanceof DataView
        || params.body instanceof Blob
        || params.body instanceof File
        || params.body instanceof URLSearchParams
        || params.body instanceof FormData
        || params.body instanceof ReadableStream
      ) && (
        params.body = JSON.stringify(params.body)
      );
      cache = params.cache;
      delete params.cache;
      params.method = (params.method || "GET").toUpperCase();
    }
  }

  // Transform url into a request.
  url instanceof Request && params && typeof params === "object" && (
    url = new Request(url, params)
  ) || (
    url && typeof url === "object" && (
      params = {...url, ...(params || {})},
      url = params.route || params.url || params.href || params.uri || params.endpoint,
      delete params.route,
      delete params.url,
      delete params.href,
      delete params.uri,
      delete params.endpoint,
      url = new Request(
        url,
        params
      )
    ) || (
      url && typeof url === "string" && (
        url = new Request(
          url,
          params
        )
      )
    ) || (
      url = null
    )
  );

  if (!(url instanceof Request)) throw Error("Input url/request is not a valid");

  // Normalize cache options.
  (typeof cache === "number" && cache > 0 || cache === true) && (
    cache = {
      ttl: cache === true && Infinity || cache,
      storeName: DEFAULT_CACHE_STORE_NAME
    }
  );
  const {
    control, ttl = control,
    cache: _cache, type = _cache,
    name, store = name, storeName = store,
    ...other
  } = cache || {};

  // Ouput [Request, cache].
  return [
    type && new Request(url, { cache: type }) || url,
    ttl > 0 && {
      ttl,
      storeName: storeName || DEFAULT_CACHE_STORE_NAME,
      ...other
    } || null
  ];
}

// Request api.
export const request = async (
  url,
  params
) => {
  try {
    const [req, cache] = normalizeInput(url, params);
    if (cache && typeof cache === "object") {
      // Return cached response if ttl not exceeded.
      cache = await caches.open(storeName || DEFAULT_CACHE_STORE_NAME);
      const {
        timestamp: _timestamp,
        expires = timestamp,
        response: _response, data = _response
      } = await cache.match(request) || {};
      if (data && (!expires || expires > Date.now())) {
        return data;
      } else {
        const response = await fetch(req);
        let cached;
        response.ok && (
          cached = {
            response: response.clone()
          },
          ttl > 0 && (cached.expires = Date.now() + ttl),
          cache.put(req, cached) // Do not block.
        );
        return response;
      }
    }

    // No caching.
    return await fetch(req);
  } catch (error) {
    throw error;
  }
}

// Helper function to get input request from url and params.
export const getInputRequest
  = request.getInputRequest
  = (url, params) => normalizeInput(url, params)[0];

// Helper function to create a custom request with initial presets.
export const createCustomRequest = request.createCustom = preset => {
  typeof preset === "string" && (preset = { method: preset });
  const output = async (url, params) => await request(
    url, 
    preset && params && {...preset, ...params} || preset || params
  );

  output.createCustom = params => createCustomRequest(
    preset && params && {...preset, ...params} || preset || params
  );

  const { 
    route,
    url = route,
    href = url,
    uri = href,
    endpoint = uri
  } = preset || {};
  endpoint && (output.URL = endpoint);

  return output;
};

// Custom requests based on the method.
export const get = request.get = createCustomRequest("get");
export const post = request.post = createCustomRequest("post");
export const put = request.put = createCustomRequest("put");
export const patch = request.patch = createCustomRequest("patch");
export const remove = request.remove = request.delete = createCustomRequest("delete"); // delete keyword already taken.

// Exports.
export default Object.freeze(Object.defineProperty(request, 'request', {
  value: request
}));