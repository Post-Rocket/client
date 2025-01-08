export const DEFAULT_CACHE_STORE_NAME = "request-cache";

// Helper function to remove circular dependencies.
export const removeCircularDependencies = (obj, output, _refs) => {
  // Invalid input.
  if (!obj || typeof obj !== 'object') return obj;

  // Prevent infinite recursion.
  if (_refs) {
    _refs instanceof Map || (
      _refs = new Map(Array.from(_refs).map(ref => Array.isArray(ref) && (
        ref.length > 1 && ref.slice(0, 2)
        || [ref[0] || obj, obj]
      ) || [ref || obj, ref || obj]))
    );
    const v = _refs.get(obj);
    if (v) return v;
  } else _refs = new Map;

  // If input object is an array, deep copy all the items.
  if (Array.isArray(obj)) {
    !Array.isArray(output) && (output = new Array(obj.length));
    let i = 0, l = output.length;
    _refs.set(obj, output);
    for (; i !== l; ++i) output[i] = removeCircularDependencies(obj[i], null, _refs);
    for (l = obj.length; i !== l; ++i) output.push(removeCircularDependencies(obj[i], null, _refs));
    output.length = obj.length;
    return output;
  }

  // Init output and copy proptype keys if needed.
  output || (output = {});
  _refs.set(obj, output);

  // Copy just enumerables.
  for (const key in obj) {
    let v = obj[key], vv = typeof v === "object" && _refs.get(v);
    if (vv) continue;
    v = removeCircularDependencies(v, null, _refs);
    (typeof v !== "object" || !_refs.get(v)) && (output[key] = v);
  }

  return output;
}

// Helper function to normalize the body.
export const normalizeBody = body => {
  if (body && typeof body === "object" && !(
    body instanceof ArrayBuffer
    || body instanceof Int8Array
    || body instanceof Uint8Array
    || body instanceof Uint8ClampedArray
    || body instanceof Int16Array
    || body instanceof Uint16Array
    || body instanceof Int32Array
    || body instanceof Uint32Array
    || body instanceof Float32Array
    || body instanceof Float64Array
    || body instanceof DataView
    || body instanceof Blob
    || body instanceof File
    || body instanceof URLSearchParams
    || body instanceof FormData
    || body instanceof ReadableStream
  )) {
    try {
      return JSON.stringify(removeCircularDependencies(body));
    } catch (error) {
      throw Error('Cannot normalize body:', error);
    }
  }

  return body;
}

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
      params.body && (params.body = normalizeBody(params.body));
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
    const [req, cache] = normalizeInput(url, params),
      online = navigator.onLine || navigator.online;
    if (cache && typeof cache === "object") {
      // Get cache store.
      cache = await caches.open(storeName || DEFAULT_CACHE_STORE_NAME);

      // Try to get cached response wrt the request.
      const {
        timestamp: _timestamp, expires = timestamp,
        response: _response, data = _response, cachedResponse = data
      } = await cache.match(request) || {};

      // Return cached response if ttl not exceeded.
      if (cachedResponse && (!expires || expires > Date.now())) {
        cachedResponse.cached = true;
        return cachedResponse;
      } else {
        // If offline, return response error.
        if (!online) {
          return noConnection();
        }

        // Fetch response.
        const response = await fetch(req);

        // Cache response.
        let cached;
        response.ok && (
          cached = {
            response: response.clone()
          },
          ttl > 0 && (cached.expires = Date.now() + ttl),
          cache.put(req, cached) // Do not block.
        );

        // Return response.
        return response;
      }
    }

    // No caching, return fetched response or a response error if no connection.
    return online && await fetch(req) || noConnection();
  } catch (error) {
    throw error;
  }
}

// Response in case there's no internet connection.
export const noConnection = request.noConnection = params => {
  // Normalize params.
  params = {
    body: {
      error: "No internet connection client side",
      offline: true
    },
    status: 433,
    statusText: "Offline",
    type: "error",
    ...(params || {})
  };

  // Migrate message and error to the body.
  const msg = params.message || params.msg, error = params.error || params.err;
  delete params.message;
  delete params.msg;
  delete params.error;
  delete params.err;
  msg && (params.body = { ...(params.body || {}), msg });
  error && (params.body = { ...(params.body || {}), error });

  // Stringify the body.
  let body = normalizeBody(params.body);
  delete params.body;
  return new Response(body, params);
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