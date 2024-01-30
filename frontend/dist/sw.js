try {
  self["workbox:core:7.0.0"] && _();
} catch {
}
const qe = (n, ...e) => {
  let t = n;
  return e.length > 0 && (t += ` :: ${JSON.stringify(e)}`), t;
}, Oe = qe;
class u extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(e, t) {
    const s = Oe(e, t);
    super(s), this.name = e, this.details = t;
  }
}
function _e(n) {
  n.then(() => {
  });
}
const Be = (n, e) => e.some((t) => n instanceof t);
let ce, he;
function Ke() {
  return ce || (ce = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Fe() {
  return he || (he = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const be = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap();
function je(n) {
  const e = new Promise((t, s) => {
    const r = () => {
      n.removeEventListener("success", a), n.removeEventListener("error", i);
    }, a = () => {
      t(p(n.result)), r();
    }, i = () => {
      s(n.error), r();
    };
    n.addEventListener("success", a), n.addEventListener("error", i);
  });
  return e.then((t) => {
    t instanceof IDBCursor && be.set(t, n);
  }).catch(() => {
  }), re.set(e, n), e;
}
function We(n) {
  if (X.has(n))
    return;
  const e = new Promise((t, s) => {
    const r = () => {
      n.removeEventListener("complete", a), n.removeEventListener("error", i), n.removeEventListener("abort", i);
    }, a = () => {
      t(), r();
    }, i = () => {
      s(n.error || new DOMException("AbortError", "AbortError")), r();
    };
    n.addEventListener("complete", a), n.addEventListener("error", i), n.addEventListener("abort", i);
  });
  X.set(n, e);
}
let Z = {
  get(n, e, t) {
    if (n instanceof IDBTransaction) {
      if (e === "done")
        return X.get(n);
      if (e === "objectStoreNames")
        return n.objectStoreNames || Re.get(n);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return p(n[e]);
  },
  set(n, e, t) {
    return n[e] = t, !0;
  },
  has(n, e) {
    return n instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in n;
  }
};
function He(n) {
  Z = n(Z);
}
function Ye(n) {
  return n === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...t) {
    const s = n.call(H(this), e, ...t);
    return Re.set(s, e.sort ? e.sort() : [e]), p(s);
  } : Fe().includes(n) ? function(...e) {
    return n.apply(H(this), e), p(be.get(this));
  } : function(...e) {
    return p(n.apply(H(this), e));
  };
}
function Ge(n) {
  return typeof n == "function" ? Ye(n) : (n instanceof IDBTransaction && We(n), Be(n, Ke()) ? new Proxy(n, Z) : n);
}
function p(n) {
  if (n instanceof IDBRequest)
    return je(n);
  if (W.has(n))
    return W.get(n);
  const e = Ge(n);
  return e !== n && (W.set(n, e), re.set(e, n)), e;
}
const H = (n) => re.get(n);
function Ee(n, e, { blocked: t, upgrade: s, blocking: r, terminated: a } = {}) {
  const i = indexedDB.open(n, e), o = p(i);
  return s && i.addEventListener("upgradeneeded", (c) => {
    s(p(i.result), c.oldVersion, c.newVersion, p(i.transaction), c);
  }), t && i.addEventListener("blocked", (c) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    c.oldVersion,
    c.newVersion,
    c
  )), o.then((c) => {
    a && c.addEventListener("close", () => a()), r && c.addEventListener("versionchange", (h) => r(h.oldVersion, h.newVersion, h));
  }).catch(() => {
  }), o;
}
function Qe(n, { blocked: e } = {}) {
  const t = indexedDB.deleteDatabase(n);
  return e && t.addEventListener("blocked", (s) => e(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    s.oldVersion,
    s
  )), p(t).then(() => {
  });
}
const $e = ["get", "getKey", "getAll", "getAllKeys", "count"], Je = ["put", "add", "delete", "clear"], Y = /* @__PURE__ */ new Map();
function ue(n, e) {
  if (!(n instanceof IDBDatabase && !(e in n) && typeof e == "string"))
    return;
  if (Y.get(e))
    return Y.get(e);
  const t = e.replace(/FromIndex$/, ""), s = e !== t, r = Je.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || $e.includes(t))
  )
    return;
  const a = async function(i, ...o) {
    const c = this.transaction(i, r ? "readwrite" : "readonly");
    let h = c.store;
    return s && (h = h.index(o.shift())), (await Promise.all([
      h[t](...o),
      r && c.done
    ]))[0];
  };
  return Y.set(e, a), a;
}
He((n) => ({
  ...n,
  get: (e, t, s) => ue(e, t) || n.get(e, t, s),
  has: (e, t) => !!ue(e, t) || n.has(e, t)
}));
try {
  self["workbox:expiration:7.0.0"] && _();
} catch {
}
const Ve = "workbox-expiration", v = "cache-entries", le = (n) => {
  const e = new URL(n, location.href);
  return e.hash = "", e.href;
};
class ze {
  /**
   *
   * @param {string} cacheName
   *
   * @private
   */
  constructor(e) {
    this._db = null, this._cacheName = e;
  }
  /**
   * Performs an upgrade of indexedDB.
   *
   * @param {IDBPDatabase<CacheDbSchema>} db
   *
   * @private
   */
  _upgradeDb(e) {
    const t = e.createObjectStore(v, { keyPath: "id" });
    t.createIndex("cacheName", "cacheName", { unique: !1 }), t.createIndex("timestamp", "timestamp", { unique: !1 });
  }
  /**
   * Performs an upgrade of indexedDB and deletes deprecated DBs.
   *
   * @param {IDBPDatabase<CacheDbSchema>} db
   *
   * @private
   */
  _upgradeDbAndDeleteOldDbs(e) {
    this._upgradeDb(e), this._cacheName && Qe(this._cacheName);
  }
  /**
   * @param {string} url
   * @param {number} timestamp
   *
   * @private
   */
  async setTimestamp(e, t) {
    e = le(e);
    const s = {
      url: e,
      timestamp: t,
      cacheName: this._cacheName,
      // Creating an ID from the URL and cache name won't be necessary once
      // Edge switches to Chromium and all browsers we support work with
      // array keyPaths.
      id: this._getId(e)
    }, a = (await this.getDb()).transaction(v, "readwrite", {
      durability: "relaxed"
    });
    await a.store.put(s), await a.done;
  }
  /**
   * Returns the timestamp stored for a given URL.
   *
   * @param {string} url
   * @return {number | undefined}
   *
   * @private
   */
  async getTimestamp(e) {
    const s = await (await this.getDb()).get(v, this._getId(e));
    return s == null ? void 0 : s.timestamp;
  }
  /**
   * Iterates through all the entries in the object store (from newest to
   * oldest) and removes entries once either `maxCount` is reached or the
   * entry's timestamp is less than `minTimestamp`.
   *
   * @param {number} minTimestamp
   * @param {number} maxCount
   * @return {Array<string>}
   *
   * @private
   */
  async expireEntries(e, t) {
    const s = await this.getDb();
    let r = await s.transaction(v).store.index("timestamp").openCursor(null, "prev");
    const a = [];
    let i = 0;
    for (; r; ) {
      const c = r.value;
      c.cacheName === this._cacheName && (e && c.timestamp < e || t && i >= t ? a.push(r.value) : i++), r = await r.continue();
    }
    const o = [];
    for (const c of a)
      await s.delete(v, c.id), o.push(c.url);
    return o;
  }
  /**
   * Takes a URL and returns an ID that will be unique in the object store.
   *
   * @param {string} url
   * @return {string}
   *
   * @private
   */
  _getId(e) {
    return this._cacheName + "|" + le(e);
  }
  /**
   * Returns an open connection to the database.
   *
   * @private
   */
  async getDb() {
    return this._db || (this._db = await Ee(Ve, 1, {
      upgrade: this._upgradeDbAndDeleteOldDbs.bind(this)
    })), this._db;
  }
}
class Xe {
  /**
   * To construct a new CacheExpiration instance you must provide at least
   * one of the `config` properties.
   *
   * @param {string} cacheName Name of the cache to apply restrictions to.
   * @param {Object} config
   * @param {number} [config.maxEntries] The maximum number of entries to cache.
   * Entries used the least will be removed as the maximum is reached.
   * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
   * it's treated as stale and removed.
   * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
   * that will be used when calling `delete()` on the cache.
   */
  constructor(e, t = {}) {
    this._isRunning = !1, this._rerunRequested = !1, this._maxEntries = t.maxEntries, this._maxAgeSeconds = t.maxAgeSeconds, this._matchOptions = t.matchOptions, this._cacheName = e, this._timestampModel = new ze(e);
  }
  /**
   * Expires entries for the given cache and given criteria.
   */
  async expireEntries() {
    if (this._isRunning) {
      this._rerunRequested = !0;
      return;
    }
    this._isRunning = !0;
    const e = this._maxAgeSeconds ? Date.now() - this._maxAgeSeconds * 1e3 : 0, t = await this._timestampModel.expireEntries(e, this._maxEntries), s = await self.caches.open(this._cacheName);
    for (const r of t)
      await s.delete(r, this._matchOptions);
    this._isRunning = !1, this._rerunRequested && (this._rerunRequested = !1, _e(this.expireEntries()));
  }
  /**
   * Update the timestamp for the given URL. This ensures the when
   * removing entries based on maximum entries, most recently used
   * is accurate or when expiring, the timestamp is up-to-date.
   *
   * @param {string} url
   */
  async updateTimestamp(e) {
    await this._timestampModel.setTimestamp(e, Date.now());
  }
  /**
   * Can be used to check if a URL has expired or not before it's used.
   *
   * This requires a look up from IndexedDB, so can be slow.
   *
   * Note: This method will not remove the cached entry, call
   * `expireEntries()` to remove indexedDB and Cache entries.
   *
   * @param {string} url
   * @return {boolean}
   */
  async isURLExpired(e) {
    if (this._maxAgeSeconds) {
      const t = await this._timestampModel.getTimestamp(e), s = Date.now() - this._maxAgeSeconds * 1e3;
      return t !== void 0 ? t < s : !0;
    } else
      return !1;
  }
  /**
   * Removes the IndexedDB object store used to keep track of cache expiration
   * metadata.
   */
  async delete() {
    this._rerunRequested = !1, await this._timestampModel.expireEntries(1 / 0);
  }
}
const y = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, G = (n) => [y.prefix, n, y.suffix].filter((e) => e && e.length > 0).join("-"), Ze = (n) => {
  for (const e of Object.keys(y))
    n(e);
}, N = {
  updateDetails: (n) => {
    Ze((e) => {
      typeof n[e] == "string" && (y[e] = n[e]);
    });
  },
  getGoogleAnalyticsName: (n) => n || G(y.googleAnalytics),
  getPrecacheName: (n) => n || G(y.precache),
  getPrefix: () => y.prefix,
  getRuntimeName: (n) => n || G(y.runtime),
  getSuffix: () => y.suffix
}, et = (n) => new URL(String(n), location.href).href.replace(new RegExp(`^${location.origin}`), ""), De = /* @__PURE__ */ new Set();
function tt(n) {
  De.add(n);
}
class ae {
  /**
   * @param {ExpirationPluginOptions} config
   * @param {number} [config.maxEntries] The maximum number of entries to cache.
   * Entries used the least will be removed as the maximum is reached.
   * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
   * it's treated as stale and removed.
   * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
   * that will be used when calling `delete()` on the cache.
   * @param {boolean} [config.purgeOnQuotaError] Whether to opt this cache in to
   * automatic deletion if the available storage quota has been exceeded.
   */
  constructor(e = {}) {
    this.cachedResponseWillBeUsed = async ({ event: t, request: s, cacheName: r, cachedResponse: a }) => {
      if (!a)
        return null;
      const i = this._isResponseDateFresh(a), o = this._getCacheExpiration(r);
      _e(o.expireEntries());
      const c = o.updateTimestamp(s.url);
      if (t)
        try {
          t.waitUntil(c);
        } catch {
        }
      return i ? a : null;
    }, this.cacheDidUpdate = async ({ cacheName: t, request: s }) => {
      const r = this._getCacheExpiration(t);
      await r.updateTimestamp(s.url), await r.expireEntries();
    }, this._config = e, this._maxAgeSeconds = e.maxAgeSeconds, this._cacheExpirations = /* @__PURE__ */ new Map(), e.purgeOnQuotaError && tt(() => this.deleteCacheAndMetadata());
  }
  /**
   * A simple helper method to return a CacheExpiration instance for a given
   * cache name.
   *
   * @param {string} cacheName
   * @return {CacheExpiration}
   *
   * @private
   */
  _getCacheExpiration(e) {
    if (e === N.getRuntimeName())
      throw new u("expire-custom-caches-only");
    let t = this._cacheExpirations.get(e);
    return t || (t = new Xe(e, this._config), this._cacheExpirations.set(e, t)), t;
  }
  /**
   * @param {Response} cachedResponse
   * @return {boolean}
   *
   * @private
   */
  _isResponseDateFresh(e) {
    if (!this._maxAgeSeconds)
      return !0;
    const t = this._getDateHeaderTimestamp(e);
    if (t === null)
      return !0;
    const s = Date.now();
    return t >= s - this._maxAgeSeconds * 1e3;
  }
  /**
   * This method will extract the data header and parse it into a useful
   * value.
   *
   * @param {Response} cachedResponse
   * @return {number|null}
   *
   * @private
   */
  _getDateHeaderTimestamp(e) {
    if (!e.headers.has("date"))
      return null;
    const t = e.headers.get("date"), r = new Date(t).getTime();
    return isNaN(r) ? null : r;
  }
  /**
   * This is a helper method that performs two operations:
   *
   * - Deletes *all* the underlying Cache instances associated with this plugin
   * instance, by calling caches.delete() on your behalf.
   * - Deletes the metadata from IndexedDB used to keep track of expiration
   * details for each Cache instance.
   *
   * When using cache expiration, calling this method is preferable to calling
   * `caches.delete()` directly, since this will ensure that the IndexedDB
   * metadata is also cleanly removed and open IndexedDB instances are deleted.
   *
   * Note that if you're *not* using cache expiration for a given cache, calling
   * `caches.delete()` and passing in the cache's name should be sufficient.
   * There is no Workbox-specific method needed for cleanup in that case.
   */
  async deleteCacheAndMetadata() {
    for (const [e, t] of this._cacheExpirations)
      await self.caches.delete(e), await t.delete();
    this._cacheExpirations = /* @__PURE__ */ new Map();
  }
}
function de(n, e) {
  const t = e();
  return n.waitUntil(t), t;
}
try {
  self["workbox:precaching:7.0.0"] && _();
} catch {
}
const nt = "__WB_REVISION__";
function st(n) {
  if (!n)
    throw new u("add-to-cache-list-unexpected-type", { entry: n });
  if (typeof n == "string") {
    const a = new URL(n, location.href);
    return {
      cacheKey: a.href,
      url: a.href
    };
  }
  const { revision: e, url: t } = n;
  if (!t)
    throw new u("add-to-cache-list-unexpected-type", { entry: n });
  if (!e) {
    const a = new URL(t, location.href);
    return {
      cacheKey: a.href,
      url: a.href
    };
  }
  const s = new URL(t, location.href), r = new URL(t, location.href);
  return s.searchParams.set(nt, e), {
    cacheKey: s.href,
    url: r.href
  };
}
class rt {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: e, state: t }) => {
      t && (t.originalRequest = e);
    }, this.cachedResponseWillBeUsed = async ({ event: e, state: t, cachedResponse: s }) => {
      if (e.type === "install" && t && t.originalRequest && t.originalRequest instanceof Request) {
        const r = t.originalRequest.url;
        s ? this.notUpdatedURLs.push(r) : this.updatedURLs.push(r);
      }
      return s;
    };
  }
}
class at {
  constructor({ precacheController: e }) {
    this.cacheKeyWillBeUsed = async ({ request: t, params: s }) => {
      const r = (s == null ? void 0 : s.cacheKey) || this._precacheController.getCacheKeyForURL(t.url);
      return r ? new Request(r, { headers: t.headers }) : t;
    }, this._precacheController = e;
  }
}
let x;
function it() {
  if (x === void 0) {
    const n = new Response("");
    if ("body" in n)
      try {
        new Response(n.body), x = !0;
      } catch {
        x = !1;
      }
    x = !1;
  }
  return x;
}
async function ot(n, e) {
  let t = null;
  if (n.url && (t = new URL(n.url).origin), t !== self.location.origin)
    throw new u("cross-origin-copy-response", { origin: t });
  const s = n.clone(), r = {
    headers: new Headers(s.headers),
    status: s.status,
    statusText: s.statusText
  }, a = e ? e(r) : r, i = it() ? s.body : await s.blob();
  return new Response(i, a);
}
function fe(n, e) {
  const t = new URL(n);
  for (const s of e)
    t.searchParams.delete(s);
  return t.href;
}
async function ct(n, e, t, s) {
  const r = fe(e.url, t);
  if (e.url === r)
    return n.match(e, s);
  const a = Object.assign(Object.assign({}, s), { ignoreSearch: !0 }), i = await n.keys(e, a);
  for (const o of i) {
    const c = fe(o.url, t);
    if (r === c)
      return n.match(o, s);
  }
}
class ht {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
async function ut() {
  for (const n of De)
    await n();
}
function Ce(n) {
  return new Promise((e) => setTimeout(e, n));
}
try {
  self["workbox:strategies:7.0.0"] && _();
} catch {
}
function P(n) {
  return typeof n == "string" ? new Request(n) : n;
}
class lt {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params] The return value from the
   *     {@link workbox-routing~matchCallback} (if applicable).
   */
  constructor(e, t) {
    this._cacheKeys = {}, Object.assign(this, t), this.event = t.event, this._strategy = e, this._handlerDeferred = new ht(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
    for (const s of this._plugins)
      this._pluginStateMap.set(s, {});
    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` (for non-navigation requests) and
   * `plugins` defined on the `Strategy` object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */
  async fetch(e) {
    const { event: t } = this;
    let s = P(e);
    if (s.mode === "navigate" && t instanceof FetchEvent && t.preloadResponse) {
      const i = await t.preloadResponse;
      if (i)
        return i;
    }
    const r = this.hasCallback("fetchDidFail") ? s.clone() : null;
    try {
      for (const i of this.iterateCallbacks("requestWillFetch"))
        s = await i({ request: s.clone(), event: t });
    } catch (i) {
      if (i instanceof Error)
        throw new u("plugin-error-request-will-fetch", {
          thrownErrorMessage: i.message
        });
    }
    const a = s.clone();
    try {
      let i;
      i = await fetch(s, s.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const o of this.iterateCallbacks("fetchDidSucceed"))
        i = await o({
          event: t,
          request: a,
          response: i
        });
      return i;
    } catch (i) {
      throw r && await this.runCallbacks("fetchDidFail", {
        error: i,
        event: t,
        originalRequest: r.clone(),
        request: a.clone()
      }), i;
    }
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */
  async fetchAndCachePut(e) {
    const t = await this.fetch(e), s = t.clone();
    return this.waitUntil(this.cachePut(e, s)), t;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cachedResponseWillByUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */
  async cacheMatch(e) {
    const t = P(e);
    let s;
    const { cacheName: r, matchOptions: a } = this._strategy, i = await this.getCacheKey(t, "read"), o = Object.assign(Object.assign({}, a), { cacheName: r });
    s = await caches.match(i, o);
    for (const c of this.iterateCallbacks("cachedResponseWillBeUsed"))
      s = await c({
        cacheName: r,
        matchOptions: a,
        cachedResponse: s,
        request: i,
        event: this.event
      }) || void 0;
    return s;
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Response} response The response to cache.
   * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
   * not be cached, and `true` otherwise.
   */
  async cachePut(e, t) {
    const s = P(e);
    await Ce(0);
    const r = await this.getCacheKey(s, "write");
    if (!t)
      throw new u("cache-put-with-no-response", {
        url: et(r.url)
      });
    const a = await this._ensureResponseSafeToCache(t);
    if (!a)
      return !1;
    const { cacheName: i, matchOptions: o } = this._strategy, c = await self.caches.open(i), h = this.hasCallback("cacheDidUpdate"), b = h ? await ct(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      c,
      r.clone(),
      ["__WB_REVISION__"],
      o
    ) : null;
    try {
      await c.put(r, h ? a.clone() : a);
    } catch (l) {
      if (l instanceof Error)
        throw l.name === "QuotaExceededError" && await ut(), l;
    }
    for (const l of this.iterateCallbacks("cacheDidUpdate"))
      await l({
        cacheName: i,
        oldResponse: b,
        newResponse: a.clone(),
        request: r,
        event: this.event
      });
    return !0;
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */
  async getCacheKey(e, t) {
    const s = `${e.url} | ${t}`;
    if (!this._cacheKeys[s]) {
      let r = e;
      for (const a of this.iterateCallbacks("cacheKeyWillBeUsed"))
        r = P(await a({
          mode: t,
          request: r,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[s] = r;
    }
    return this._cacheKeys[s];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */
  hasCallback(e) {
    for (const t of this._strategy.plugins)
      if (e in t)
        return !0;
    return !1;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */
  async runCallbacks(e, t) {
    for (const s of this.iterateCallbacks(e))
      await s(t);
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */
  *iterateCallbacks(e) {
    for (const t of this._strategy.plugins)
      if (typeof t[e] == "function") {
        const s = this._pluginStateMap.get(t);
        yield (a) => {
          const i = Object.assign(Object.assign({}, a), { state: s });
          return t[e](i);
        };
      }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * {@link workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */
  waitUntil(e) {
    return this._extendLifetimePromises.push(e), e;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * {@link workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread my be killed
   * prior to your work completing.
   */
  async doneWaiting() {
    let e;
    for (; e = this._extendLifetimePromises.shift(); )
      await e;
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */
  destroy() {
    this._handlerDeferred.resolve(null);
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */
  async _ensureResponseSafeToCache(e) {
    let t = e, s = !1;
    for (const r of this.iterateCallbacks("cacheWillUpdate"))
      if (t = await r({
        request: this.request,
        response: t,
        event: this.event
      }) || void 0, s = !0, !t)
        break;
    return s || t && t.status !== 200 && (t = void 0), t;
  }
}
class K {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(e = {}) {
    this.cacheName = N.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * {@link workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */
  handle(e) {
    const [t] = this.handleAll(e);
    return t;
  }
  /**
   * Similar to {@link workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of `[response, done]` promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */
  handleAll(e) {
    e instanceof FetchEvent && (e = {
      event: e,
      request: e.request
    });
    const t = e.event, s = typeof e.request == "string" ? new Request(e.request) : e.request, r = "params" in e ? e.params : void 0, a = new lt(this, { event: t, request: s, params: r }), i = this._getResponse(a, s, t), o = this._awaitComplete(i, a, s, t);
    return [i, o];
  }
  async _getResponse(e, t, s) {
    await e.runCallbacks("handlerWillStart", { event: s, request: t });
    let r;
    try {
      if (r = await this._handle(t, e), !r || r.type === "error")
        throw new u("no-response", { url: t.url });
    } catch (a) {
      if (a instanceof Error) {
        for (const i of e.iterateCallbacks("handlerDidError"))
          if (r = await i({ error: a, event: s, request: t }), r)
            break;
      }
      if (!r)
        throw a;
    }
    for (const a of e.iterateCallbacks("handlerWillRespond"))
      r = await a({ event: s, request: t, response: r });
    return r;
  }
  async _awaitComplete(e, t, s, r) {
    let a, i;
    try {
      a = await e;
    } catch {
    }
    try {
      await t.runCallbacks("handlerDidRespond", {
        event: r,
        request: s,
        response: a
      }), await t.doneWaiting();
    } catch (o) {
      o instanceof Error && (i = o);
    }
    if (await t.runCallbacks("handlerDidComplete", {
      event: r,
      request: s,
      response: a,
      error: i
    }), t.destroy(), i)
      throw i;
  }
}
class g extends K {
  /**
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor(e = {}) {
    e.cacheName = N.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(g.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, t) {
    const s = await t.cacheMatch(e);
    return s || (t.event && t.event.type === "install" ? await this._handleInstall(e, t) : await this._handleFetch(e, t));
  }
  async _handleFetch(e, t) {
    let s;
    const r = t.params || {};
    if (this._fallbackToNetwork) {
      const a = r.integrity, i = e.integrity, o = !i || i === a;
      s = await t.fetch(new Request(e, {
        integrity: e.mode !== "no-cors" ? i || a : void 0
      })), a && o && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await t.cachePut(e, s.clone()));
    } else
      throw new u("missing-precache-entry", {
        cacheName: this.cacheName,
        url: e.url
      });
    return s;
  }
  async _handleInstall(e, t) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const s = await t.fetch(e);
    if (!await t.cachePut(e, s.clone()))
      throw new u("bad-precaching-response", {
        url: e.url,
        status: s.status
      });
    return s;
  }
  /**
   * This method is complex, as there a number of things to account for:
   *
   * The `plugins` array can be set at construction, and/or it might be added to
   * to at any time before the strategy is used.
   *
   * At the time the strategy is used (i.e. during an `install` event), there
   * needs to be at least one plugin that implements `cacheWillUpdate` in the
   * array, other than `copyRedirectedCacheableResponsesPlugin`.
   *
   * - If this method is called and there are no suitable `cacheWillUpdate`
   * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
   *
   * - If this method is called and there is exactly one `cacheWillUpdate`, then
   * we don't have to do anything (this might be a previously added
   * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
   *
   * - If this method is called and there is more than one `cacheWillUpdate`,
   * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
   * we need to remove it. (This situation is unlikely, but it could happen if
   * the strategy is used multiple times, the first without a `cacheWillUpdate`,
   * and then later on after manually adding a custom `cacheWillUpdate`.)
   *
   * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
   *
   * @private
   */
  _useDefaultCacheabilityPluginIfNeeded() {
    let e = null, t = 0;
    for (const [s, r] of this.plugins.entries())
      r !== g.copyRedirectedCacheableResponsesPlugin && (r === g.defaultPrecacheCacheabilityPlugin && (e = s), r.cacheWillUpdate && t++);
    t === 0 ? this.plugins.push(g.defaultPrecacheCacheabilityPlugin) : t > 1 && e !== null && this.plugins.splice(e, 1);
  }
}
g.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: n }) {
    return !n || n.status >= 400 ? null : n;
  }
};
g.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: n }) {
    return n.redirected ? await ot(n) : n;
  }
};
class dt {
  /**
   * Create a new PrecacheController.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] The cache to use for precaching.
   * @param {string} [options.plugins] Plugins to use when precaching as well
   * as responding to fetch events for precached assets.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor({ cacheName: e, plugins: t = [], fallbackToNetwork: s = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new g({
      cacheName: N.getPrecacheName(e),
      plugins: [
        ...t,
        new at({ precacheController: this })
      ],
      fallbackToNetwork: s
    }), this.install = this.install.bind(this), this.activate = this.activate.bind(this);
  }
  /**
   * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
   * used to cache assets and respond to fetch events.
   */
  get strategy() {
    return this._strategy;
  }
  /**
   * Adds items to the precache list, removing any duplicates and
   * stores the files in the
   * {@link workbox-core.cacheNames|"precache cache"} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
   */
  precache(e) {
    this.addToCacheList(e), this._installAndActiveListenersAdded || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this._installAndActiveListenersAdded = !0);
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(e) {
    const t = [];
    for (const s of e) {
      typeof s == "string" ? t.push(s) : s && s.revision === void 0 && t.push(s.url);
      const { cacheKey: r, url: a } = st(s), i = typeof s != "string" && s.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(a) && this._urlsToCacheKeys.get(a) !== r)
        throw new u("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(a),
          secondEntry: r
        });
      if (typeof s != "string" && s.integrity) {
        if (this._cacheKeysToIntegrities.has(r) && this._cacheKeysToIntegrities.get(r) !== s.integrity)
          throw new u("add-to-cache-list-conflicting-integrities", {
            url: a
          });
        this._cacheKeysToIntegrities.set(r, s.integrity);
      }
      if (this._urlsToCacheKeys.set(a, r), this._urlsToCacheModes.set(a, i), t.length > 0) {
        const o = `Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(o);
      }
    }
  }
  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.InstallResult>}
   */
  install(e) {
    return de(e, async () => {
      const t = new rt();
      this.strategy.plugins.push(t);
      for (const [a, i] of this._urlsToCacheKeys) {
        const o = this._cacheKeysToIntegrities.get(i), c = this._urlsToCacheModes.get(a), h = new Request(a, {
          integrity: o,
          cache: c,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: i },
          request: h,
          event: e
        }));
      }
      const { updatedURLs: s, notUpdatedURLs: r } = t;
      return { updatedURLs: s, notUpdatedURLs: r };
    });
  }
  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.CleanupResult>}
   */
  activate(e) {
    return de(e, async () => {
      const t = await self.caches.open(this.strategy.cacheName), s = await t.keys(), r = new Set(this._urlsToCacheKeys.values()), a = [];
      for (const i of s)
        r.has(i.url) || (await t.delete(i), a.push(i.url));
      return { deletedURLs: a };
    });
  }
  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }
  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }
  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(e) {
    const t = new URL(e, location.href);
    return this._urlsToCacheKeys.get(t.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(e) {
    return this._cacheKeysToIntegrities.get(e);
  }
  /**
   * This acts as a drop-in replacement for
   * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(e) {
    const t = e instanceof Request ? e.url : e, s = this.getCacheKeyForURL(t);
    if (s)
      return (await self.caches.open(this.strategy.cacheName)).match(s);
  }
  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @return {workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(e) {
    const t = this.getCacheKeyForURL(e);
    if (!t)
      throw new u("non-precached-url", { url: e });
    return (s) => (s.request = new Request(e), s.params = Object.assign({ cacheKey: t }, s.params), this.strategy.handle(s));
  }
}
let Q;
const Te = () => (Q || (Q = new dt()), Q);
try {
  self["workbox:routing:7.0.0"] && _();
} catch {
}
const Se = "GET", q = (n) => n && typeof n == "object" ? n : { handle: n };
class d {
  /**
   * Constructor for Route class.
   *
   * @param {workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, t, s = Se) {
    this.handler = q(t), this.match = e, this.method = s;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(e) {
    this.catchHandler = q(e);
  }
}
class ft extends d {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * {@link workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, t, s) {
    const r = ({ url: a }) => {
      const i = e.exec(a.href);
      if (i && !(a.origin !== location.origin && i.index !== 0))
        return i.slice(1);
    };
    super(r, t, s);
  }
}
class ve {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = /* @__PURE__ */ new Map(), this._defaultHandlerMap = /* @__PURE__ */ new Map();
  }
  /**
   * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */
  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */
  addFetchListener() {
    self.addEventListener("fetch", (e) => {
      const { request: t } = e, s = this.handleRequest({ request: t, event: e });
      s && e.respondWith(s);
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */
  addCacheListener() {
    self.addEventListener("message", (e) => {
      if (e.data && e.data.type === "CACHE_URLS") {
        const { payload: t } = e.data, s = Promise.all(t.urlsToCache.map((r) => {
          typeof r == "string" && (r = [r]);
          const a = new Request(...r);
          return this.handleRequest({ request: a, event: e });
        }));
        e.waitUntil(s), e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0));
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */
  handleRequest({ request: e, event: t }) {
    const s = new URL(e.url, location.href);
    if (!s.protocol.startsWith("http"))
      return;
    const r = s.origin === location.origin, { params: a, route: i } = this.findMatchingRoute({
      event: t,
      request: e,
      sameOrigin: r,
      url: s
    });
    let o = i && i.handler;
    const c = e.method;
    if (!o && this._defaultHandlerMap.has(c) && (o = this._defaultHandlerMap.get(c)), !o)
      return;
    let h;
    try {
      h = o.handle({ url: s, request: e, event: t, params: a });
    } catch (l) {
      h = Promise.reject(l);
    }
    const b = i && i.catchHandler;
    return h instanceof Promise && (this._catchHandler || b) && (h = h.catch(async (l) => {
      if (b)
        try {
          return await b.handle({ url: s, request: e, event: t, params: a });
        } catch (oe) {
          oe instanceof Error && (l = oe);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: s, request: e, event: t });
      throw l;
    })), h;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {boolean} options.sameOrigin The result of comparing `url.origin`
   *     against the current origin.
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */
  findMatchingRoute({ url: e, sameOrigin: t, request: s, event: r }) {
    const a = this._routes.get(s.method) || [];
    for (const i of a) {
      let o;
      const c = i.match({ url: e, sameOrigin: t, request: s, event: r });
      if (c)
        return o = c, (Array.isArray(o) && o.length === 0 || c.constructor === Object && // eslint-disable-line
        Object.keys(c).length === 0 || typeof c == "boolean") && (o = void 0), { route: i, params: o };
    }
    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */
  setDefaultHandler(e, t = Se) {
    this._defaultHandlerMap.set(t, q(e));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(e) {
    this._catchHandler = q(e);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(e) {
    this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(e) {
    if (!this._routes.has(e.method))
      throw new u("unregister-route-but-not-found-with-method", {
        method: e.method
      });
    const t = this._routes.get(e.method).indexOf(e);
    if (t > -1)
      this._routes.get(e.method).splice(t, 1);
    else
      throw new u("unregister-route-route-not-registered");
  }
}
let M;
const yt = () => (M || (M = new ve(), M.addFetchListener(), M.addCacheListener()), M);
function F(n, e, t) {
  let s;
  if (typeof n == "string") {
    const a = new URL(n, location.href), i = ({ url: o }) => o.href === a.href;
    s = new d(i, e, t);
  } else if (n instanceof RegExp)
    s = new ft(n, e, t);
  else if (typeof n == "function")
    s = new d(n, e, t);
  else if (n instanceof d)
    s = n;
  else
    throw new u("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return yt().registerRoute(s), s;
}
function mt(n, e = []) {
  for (const t of [...n.searchParams.keys()])
    e.some((s) => s.test(t)) && n.searchParams.delete(t);
  return n;
}
function* pt(n, { ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/], directoryIndex: t = "index.html", cleanURLs: s = !0, urlManipulation: r } = {}) {
  const a = new URL(n, location.href);
  a.hash = "", yield a.href;
  const i = mt(a, e);
  if (yield i.href, t && i.pathname.endsWith("/")) {
    const o = new URL(i.href);
    o.pathname += t, yield o.href;
  }
  if (s) {
    const o = new URL(i.href);
    o.pathname += ".html", yield o.href;
  }
  if (r) {
    const o = r({ url: a });
    for (const c of o)
      yield c.href;
  }
}
class wt extends d {
  /**
   * @param {PrecacheController} precacheController A `PrecacheController`
   * instance used to both match requests and respond to fetch events.
   * @param {Object} [options] Options to control how requests are matched
   * against the list of precached URLs.
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URLs that should be checked for precache matches.
   */
  constructor(e, t) {
    const s = ({ request: r }) => {
      const a = e.getURLsToCacheKeys();
      for (const i of pt(r.url, t)) {
        const o = a.get(i);
        if (o) {
          const c = e.getIntegrityForCacheKey(o);
          return { cacheKey: o, integrity: c };
        }
      }
    };
    super(s, e.strategy);
  }
}
function gt(n) {
  const e = Te(), t = new wt(e, n);
  F(t);
}
function _t(n) {
  Te().precache(n);
}
function bt(n, e) {
  _t(n), gt(e);
}
class xe extends K {
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, t) {
    let s = await t.cacheMatch(e), r;
    if (!s)
      try {
        s = await t.fetchAndCachePut(e);
      } catch (a) {
        a instanceof Error && (r = a);
      }
    if (!s)
      throw new u("no-response", { url: e.url, error: r });
    return s;
  }
}
const Rt = {
  /**
   * Returns a valid response (to allow caching) if the status is 200 (OK) or
   * 0 (opaque).
   *
   * @param {Object} options
   * @param {Response} options.response
   * @return {Response|null}
   *
   * @private
   */
  cacheWillUpdate: async ({ response: n }) => n.status === 200 || n.status === 0 ? n : null
};
class j extends K {
  /**
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   * @param {number} [options.networkTimeoutSeconds] If set, any network requests
   * that fail to respond within the timeout will fallback to the cache.
   *
   * This option can be used to combat
   * "[lie-fi]{@link https://developers.google.com/web/fundamentals/performance/poor-connectivity/#lie-fi}"
   * scenarios.
   */
  constructor(e = {}) {
    super(e), this.plugins.some((t) => "cacheWillUpdate" in t) || this.plugins.unshift(Rt), this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0;
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, t) {
    const s = [], r = [];
    let a;
    if (this._networkTimeoutSeconds) {
      const { id: c, promise: h } = this._getTimeoutPromise({ request: e, logs: s, handler: t });
      a = c, r.push(h);
    }
    const i = this._getNetworkPromise({
      timeoutId: a,
      request: e,
      logs: s,
      handler: t
    });
    r.push(i);
    const o = await t.waitUntil((async () => await t.waitUntil(Promise.race(r)) || // If Promise.race() resolved with null, it might be due to a network
    // timeout + a cache miss. If that were to happen, we'd rather wait until
    // the networkPromise resolves instead of returning null.
    // Note that it's fine to await an already-resolved promise, so we don't
    // have to check to see if it's still "in flight".
    await i)());
    if (!o)
      throw new u("no-response", { url: e.url });
    return o;
  }
  /**
   * @param {Object} options
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs array
   * @param {Event} options.event
   * @return {Promise<Response>}
   *
   * @private
   */
  _getTimeoutPromise({ request: e, logs: t, handler: s }) {
    let r;
    return {
      promise: new Promise((i) => {
        r = setTimeout(async () => {
          i(await s.cacheMatch(e));
        }, this._networkTimeoutSeconds * 1e3);
      }),
      id: r
    };
  }
  /**
   * @param {Object} options
   * @param {number|undefined} options.timeoutId
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs Array.
   * @param {Event} options.event
   * @return {Promise<Response>}
   *
   * @private
   */
  async _getNetworkPromise({ timeoutId: e, request: t, logs: s, handler: r }) {
    let a, i;
    try {
      i = await r.fetchAndCachePut(t);
    } catch (o) {
      o instanceof Error && (a = o);
    }
    return e && clearTimeout(e), (a || !i) && (i = await r.cacheMatch(t)), i;
  }
}
class Et extends K {
  /**
   * @param {Object} [options]
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {number} [options.networkTimeoutSeconds] If set, any network requests
   * that fail to respond within the timeout will result in a network error.
   */
  constructor(e = {}) {
    super(e), this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0;
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, t) {
    let s, r;
    try {
      const a = [
        t.fetch(e)
      ];
      if (this._networkTimeoutSeconds) {
        const i = Ce(this._networkTimeoutSeconds * 1e3);
        a.push(i);
      }
      if (r = await Promise.race(a), !r)
        throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`);
    } catch (a) {
      a instanceof Error && (s = a);
    }
    if (!r)
      throw new u("no-response", { url: e.url, error: s });
    return r;
  }
}
try {
  self["workbox:cacheable-response:7.0.0"] && _();
} catch {
}
class Dt {
  /**
   * To construct a new CacheableResponse instance you must provide at least
   * one of the `config` properties.
   *
   * If both `statuses` and `headers` are specified, then both conditions must
   * be met for the `Response` to be considered cacheable.
   *
   * @param {Object} config
   * @param {Array<number>} [config.statuses] One or more status codes that a
   * `Response` can have and be considered cacheable.
   * @param {Object<string,string>} [config.headers] A mapping of header names
   * and expected values that a `Response` can have and be considered cacheable.
   * If multiple headers are provided, only one needs to be present.
   */
  constructor(e = {}) {
    this._statuses = e.statuses, this._headers = e.headers;
  }
  /**
   * Checks a response to see whether it's cacheable or not, based on this
   * object's configuration.
   *
   * @param {Response} response The response whose cacheability is being
   * checked.
   * @return {boolean} `true` if the `Response` is cacheable, and `false`
   * otherwise.
   */
  isResponseCacheable(e) {
    let t = !0;
    return this._statuses && (t = this._statuses.includes(e.status)), this._headers && t && (t = Object.keys(this._headers).some((s) => e.headers.get(s) === this._headers[s])), t;
  }
}
class ie {
  /**
   * To construct a new CacheableResponsePlugin instance you must provide at
   * least one of the `config` properties.
   *
   * If both `statuses` and `headers` are specified, then both conditions must
   * be met for the `Response` to be considered cacheable.
   *
   * @param {Object} config
   * @param {Array<number>} [config.statuses] One or more status codes that a
   * `Response` can have and be considered cacheable.
   * @param {Object<string,string>} [config.headers] A mapping of header names
   * and expected values that a `Response` can have and be considered cacheable.
   * If multiple headers are provided, only one needs to be present.
   */
  constructor(e) {
    this.cacheWillUpdate = async ({ response: t }) => this._cacheableResponse.isResponseCacheable(t) ? t : null, this._cacheableResponse = new Dt(e);
  }
}
try {
  self["workbox:background-sync:7.0.0"] && _();
} catch {
}
const ye = 3, Ct = "workbox-background-sync", f = "requests", k = "queueName";
class Tt {
  constructor() {
    this._db = null;
  }
  /**
   * Add QueueStoreEntry to underlying db.
   *
   * @param {UnidentifiedQueueStoreEntry} entry
   */
  async addEntry(e) {
    const s = (await this.getDb()).transaction(f, "readwrite", {
      durability: "relaxed"
    });
    await s.store.add(e), await s.done;
  }
  /**
   * Returns the first entry id in the ObjectStore.
   *
   * @return {number | undefined}
   */
  async getFirstEntryId() {
    const t = await (await this.getDb()).transaction(f).store.openCursor();
    return t == null ? void 0 : t.value.id;
  }
  /**
   * Get all the entries filtered by index
   *
   * @param queueName
   * @return {Promise<QueueStoreEntry[]>}
   */
  async getAllEntriesByQueueName(e) {
    const s = await (await this.getDb()).getAllFromIndex(f, k, IDBKeyRange.only(e));
    return s || new Array();
  }
  /**
   * Returns the number of entries filtered by index
   *
   * @param queueName
   * @return {Promise<number>}
   */
  async getEntryCountByQueueName(e) {
    return (await this.getDb()).countFromIndex(f, k, IDBKeyRange.only(e));
  }
  /**
   * Deletes a single entry by id.
   *
   * @param {number} id the id of the entry to be deleted
   */
  async deleteEntry(e) {
    await (await this.getDb()).delete(f, e);
  }
  /**
   *
   * @param queueName
   * @returns {Promise<QueueStoreEntry | undefined>}
   */
  async getFirstEntryByQueueName(e) {
    return await this.getEndEntryFromIndex(IDBKeyRange.only(e), "next");
  }
  /**
   *
   * @param queueName
   * @returns {Promise<QueueStoreEntry | undefined>}
   */
  async getLastEntryByQueueName(e) {
    return await this.getEndEntryFromIndex(IDBKeyRange.only(e), "prev");
  }
  /**
   * Returns either the first or the last entries, depending on direction.
   * Filtered by index.
   *
   * @param {IDBCursorDirection} direction
   * @param {IDBKeyRange} query
   * @return {Promise<QueueStoreEntry | undefined>}
   * @private
   */
  async getEndEntryFromIndex(e, t) {
    const r = await (await this.getDb()).transaction(f).store.index(k).openCursor(e, t);
    return r == null ? void 0 : r.value;
  }
  /**
   * Returns an open connection to the database.
   *
   * @private
   */
  async getDb() {
    return this._db || (this._db = await Ee(Ct, ye, {
      upgrade: this._upgradeDb
    })), this._db;
  }
  /**
   * Upgrades QueueDB
   *
   * @param {IDBPDatabase<QueueDBSchema>} db
   * @param {number} oldVersion
   * @private
   */
  _upgradeDb(e, t) {
    t > 0 && t < ye && e.objectStoreNames.contains(f) && e.deleteObjectStore(f), e.createObjectStore(f, {
      autoIncrement: !0,
      keyPath: "id"
    }).createIndex(k, k, { unique: !1 });
  }
}
class St {
  /**
   * Associates this instance with a Queue instance, so entries added can be
   * identified by their queue name.
   *
   * @param {string} queueName
   */
  constructor(e) {
    this._queueName = e, this._queueDb = new Tt();
  }
  /**
   * Append an entry last in the queue.
   *
   * @param {Object} entry
   * @param {Object} entry.requestData
   * @param {number} [entry.timestamp]
   * @param {Object} [entry.metadata]
   */
  async pushEntry(e) {
    delete e.id, e.queueName = this._queueName, await this._queueDb.addEntry(e);
  }
  /**
   * Prepend an entry first in the queue.
   *
   * @param {Object} entry
   * @param {Object} entry.requestData
   * @param {number} [entry.timestamp]
   * @param {Object} [entry.metadata]
   */
  async unshiftEntry(e) {
    const t = await this._queueDb.getFirstEntryId();
    t ? e.id = t - 1 : delete e.id, e.queueName = this._queueName, await this._queueDb.addEntry(e);
  }
  /**
   * Removes and returns the last entry in the queue matching the `queueName`.
   *
   * @return {Promise<QueueStoreEntry|undefined>}
   */
  async popEntry() {
    return this._removeEntry(await this._queueDb.getLastEntryByQueueName(this._queueName));
  }
  /**
   * Removes and returns the first entry in the queue matching the `queueName`.
   *
   * @return {Promise<QueueStoreEntry|undefined>}
   */
  async shiftEntry() {
    return this._removeEntry(await this._queueDb.getFirstEntryByQueueName(this._queueName));
  }
  /**
   * Returns all entries in the store matching the `queueName`.
   *
   * @param {Object} options See {@link workbox-background-sync.Queue~getAll}
   * @return {Promise<Array<Object>>}
   */
  async getAll() {
    return await this._queueDb.getAllEntriesByQueueName(this._queueName);
  }
  /**
   * Returns the number of entries in the store matching the `queueName`.
   *
   * @param {Object} options See {@link workbox-background-sync.Queue~size}
   * @return {Promise<number>}
   */
  async size() {
    return await this._queueDb.getEntryCountByQueueName(this._queueName);
  }
  /**
   * Deletes the entry for the given ID.
   *
   * WARNING: this method does not ensure the deleted entry belongs to this
   * queue (i.e. matches the `queueName`). But this limitation is acceptable
   * as this class is not publicly exposed. An additional check would make
   * this method slower than it needs to be.
   *
   * @param {number} id
   */
  async deleteEntry(e) {
    await this._queueDb.deleteEntry(e);
  }
  /**
   * Removes and returns the first or last entry in the queue (based on the
   * `direction` argument) matching the `queueName`.
   *
   * @return {Promise<QueueStoreEntry|undefined>}
   * @private
   */
  async _removeEntry(e) {
    return e && await this.deleteEntry(e.id), e;
  }
}
const vt = [
  "method",
  "referrer",
  "referrerPolicy",
  "mode",
  "credentials",
  "cache",
  "redirect",
  "integrity",
  "keepalive"
];
class I {
  /**
   * Converts a Request object to a plain object that can be structured
   * cloned or JSON-stringified.
   *
   * @param {Request} request
   * @return {Promise<StorableRequest>}
   */
  static async fromRequest(e) {
    const t = {
      url: e.url,
      headers: {}
    };
    e.method !== "GET" && (t.body = await e.clone().arrayBuffer());
    for (const [s, r] of e.headers.entries())
      t.headers[s] = r;
    for (const s of vt)
      e[s] !== void 0 && (t[s] = e[s]);
    return new I(t);
  }
  /**
   * Accepts an object of request data that can be used to construct a
   * `Request` but can also be stored in IndexedDB.
   *
   * @param {Object} requestData An object of request data that includes the
   *     `url` plus any relevant properties of
   *     [requestInit]{@link https://fetch.spec.whatwg.org/#requestinit}.
   */
  constructor(e) {
    e.mode === "navigate" && (e.mode = "same-origin"), this._requestData = e;
  }
  /**
   * Returns a deep clone of the instances `_requestData` object.
   *
   * @return {Object}
   */
  toObject() {
    const e = Object.assign({}, this._requestData);
    return e.headers = Object.assign({}, this._requestData.headers), e.body && (e.body = e.body.slice(0)), e;
  }
  /**
   * Converts this instance to a Request.
   *
   * @return {Request}
   */
  toRequest() {
    return new Request(this._requestData.url, this._requestData);
  }
  /**
   * Creates and returns a deep clone of the instance.
   *
   * @return {StorableRequest}
   */
  clone() {
    return new I(this.toObject());
  }
}
const me = "workbox-background-sync", xt = 60 * 24 * 7, $ = /* @__PURE__ */ new Set(), pe = (n) => {
  const e = {
    request: new I(n.requestData).toRequest(),
    timestamp: n.timestamp
  };
  return n.metadata && (e.metadata = n.metadata), e;
};
class Mt {
  /**
   * Creates an instance of Queue with the given options
   *
   * @param {string} name The unique name for this queue. This name must be
   *     unique as it's used to register sync events and store requests
   *     in IndexedDB specific to this instance. An error will be thrown if
   *     a duplicate name is detected.
   * @param {Object} [options]
   * @param {Function} [options.onSync] A function that gets invoked whenever
   *     the 'sync' event fires. The function is invoked with an object
   *     containing the `queue` property (referencing this instance), and you
   *     can use the callback to customize the replay behavior of the queue.
   *     When not set the `replayRequests()` method is called.
   *     Note: if the replay fails after a sync event, make sure you throw an
   *     error, so the browser knows to retry the sync event later.
   * @param {number} [options.maxRetentionTime=7 days] The amount of time (in
   *     minutes) a request may be retried. After this amount of time has
   *     passed, the request will be deleted from the queue.
   * @param {boolean} [options.forceSyncFallback=false] If `true`, instead
   *     of attempting to use background sync events, always attempt to replay
   *     queued request at service worker startup. Most folks will not need
   *     this, unless you explicitly target a runtime like Electron that
   *     exposes the interfaces for background sync, but does not have a working
   *     implementation.
   */
  constructor(e, { forceSyncFallback: t, onSync: s, maxRetentionTime: r } = {}) {
    if (this._syncInProgress = !1, this._requestsAddedDuringSync = !1, $.has(e))
      throw new u("duplicate-queue-name", { name: e });
    $.add(e), this._name = e, this._onSync = s || this.replayRequests, this._maxRetentionTime = r || xt, this._forceSyncFallback = !!t, this._queueStore = new St(this._name), this._addSyncListener();
  }
  /**
   * @return {string}
   */
  get name() {
    return this._name;
  }
  /**
   * Stores the passed request in IndexedDB (with its timestamp and any
   * metadata) at the end of the queue.
   *
   * @param {QueueEntry} entry
   * @param {Request} entry.request The request to store in the queue.
   * @param {Object} [entry.metadata] Any metadata you want associated with the
   *     stored request. When requests are replayed you'll have access to this
   *     metadata object in case you need to modify the request beforehand.
   * @param {number} [entry.timestamp] The timestamp (Epoch time in
   *     milliseconds) when the request was first added to the queue. This is
   *     used along with `maxRetentionTime` to remove outdated requests. In
   *     general you don't need to set this value, as it's automatically set
   *     for you (defaulting to `Date.now()`), but you can update it if you
   *     don't want particular requests to expire.
   */
  async pushRequest(e) {
    await this._addRequest(e, "push");
  }
  /**
   * Stores the passed request in IndexedDB (with its timestamp and any
   * metadata) at the beginning of the queue.
   *
   * @param {QueueEntry} entry
   * @param {Request} entry.request The request to store in the queue.
   * @param {Object} [entry.metadata] Any metadata you want associated with the
   *     stored request. When requests are replayed you'll have access to this
   *     metadata object in case you need to modify the request beforehand.
   * @param {number} [entry.timestamp] The timestamp (Epoch time in
   *     milliseconds) when the request was first added to the queue. This is
   *     used along with `maxRetentionTime` to remove outdated requests. In
   *     general you don't need to set this value, as it's automatically set
   *     for you (defaulting to `Date.now()`), but you can update it if you
   *     don't want particular requests to expire.
   */
  async unshiftRequest(e) {
    await this._addRequest(e, "unshift");
  }
  /**
   * Removes and returns the last request in the queue (along with its
   * timestamp and any metadata). The returned object takes the form:
   * `{request, timestamp, metadata}`.
   *
   * @return {Promise<QueueEntry | undefined>}
   */
  async popRequest() {
    return this._removeRequest("pop");
  }
  /**
   * Removes and returns the first request in the queue (along with its
   * timestamp and any metadata). The returned object takes the form:
   * `{request, timestamp, metadata}`.
   *
   * @return {Promise<QueueEntry | undefined>}
   */
  async shiftRequest() {
    return this._removeRequest("shift");
  }
  /**
   * Returns all the entries that have not expired (per `maxRetentionTime`).
   * Any expired entries are removed from the queue.
   *
   * @return {Promise<Array<QueueEntry>>}
   */
  async getAll() {
    const e = await this._queueStore.getAll(), t = Date.now(), s = [];
    for (const r of e) {
      const a = this._maxRetentionTime * 60 * 1e3;
      t - r.timestamp > a ? await this._queueStore.deleteEntry(r.id) : s.push(pe(r));
    }
    return s;
  }
  /**
   * Returns the number of entries present in the queue.
   * Note that expired entries (per `maxRetentionTime`) are also included in this count.
   *
   * @return {Promise<number>}
   */
  async size() {
    return await this._queueStore.size();
  }
  /**
   * Adds the entry to the QueueStore and registers for a sync event.
   *
   * @param {Object} entry
   * @param {Request} entry.request
   * @param {Object} [entry.metadata]
   * @param {number} [entry.timestamp=Date.now()]
   * @param {string} operation ('push' or 'unshift')
   * @private
   */
  async _addRequest({ request: e, metadata: t, timestamp: s = Date.now() }, r) {
    const i = {
      requestData: (await I.fromRequest(e.clone())).toObject(),
      timestamp: s
    };
    switch (t && (i.metadata = t), r) {
      case "push":
        await this._queueStore.pushEntry(i);
        break;
      case "unshift":
        await this._queueStore.unshiftEntry(i);
        break;
    }
    this._syncInProgress ? this._requestsAddedDuringSync = !0 : await this.registerSync();
  }
  /**
   * Removes and returns the first or last (depending on `operation`) entry
   * from the QueueStore that's not older than the `maxRetentionTime`.
   *
   * @param {string} operation ('pop' or 'shift')
   * @return {Object|undefined}
   * @private
   */
  async _removeRequest(e) {
    const t = Date.now();
    let s;
    switch (e) {
      case "pop":
        s = await this._queueStore.popEntry();
        break;
      case "shift":
        s = await this._queueStore.shiftEntry();
        break;
    }
    if (s) {
      const r = this._maxRetentionTime * 60 * 1e3;
      return t - s.timestamp > r ? this._removeRequest(e) : pe(s);
    } else
      return;
  }
  /**
   * Loops through each request in the queue and attempts to re-fetch it.
   * If any request fails to re-fetch, it's put back in the same position in
   * the queue (which registers a retry for the next sync event).
   */
  async replayRequests() {
    let e;
    for (; e = await this.shiftRequest(); )
      try {
        await fetch(e.request.clone());
      } catch {
        throw await this.unshiftRequest(e), new u("queue-replay-failed", { name: this._name });
      }
  }
  /**
   * Registers a sync event with a tag unique to this instance.
   */
  async registerSync() {
    if ("sync" in self.registration && !this._forceSyncFallback)
      try {
        await self.registration.sync.register(`${me}:${this._name}`);
      } catch {
      }
  }
  /**
   * In sync-supporting browsers, this adds a listener for the sync event.
   * In non-sync-supporting browsers, or if _forceSyncFallback is true, this
   * will retry the queue on service worker startup.
   *
   * @private
   */
  _addSyncListener() {
    "sync" in self.registration && !this._forceSyncFallback ? self.addEventListener("sync", (e) => {
      if (e.tag === `${me}:${this._name}`) {
        const t = async () => {
          this._syncInProgress = !0;
          let s;
          try {
            await this._onSync({ queue: this });
          } catch (r) {
            if (r instanceof Error)
              throw s = r, s;
          } finally {
            this._requestsAddedDuringSync && !(s && !e.lastChance) && await this.registerSync(), this._syncInProgress = !1, this._requestsAddedDuringSync = !1;
          }
        };
        e.waitUntil(t());
      }
    }) : this._onSync({ queue: this });
  }
  /**
   * Returns the set of queue names. This is primarily used to reset the list
   * of queue names in tests.
   *
   * @return {Set<string>}
   *
   * @private
   */
  static get _queueNames() {
    return $;
  }
}
class kt {
  /**
   * @param {string} name See the {@link workbox-background-sync.Queue}
   *     documentation for parameter details.
   * @param {Object} [options] See the
   *     {@link workbox-background-sync.Queue} documentation for
   *     parameter details.
   */
  constructor(e, t) {
    this.fetchDidFail = async ({ request: s }) => {
      await this._queue.pushRequest({ request: s });
    }, this._queue = new Mt(e, t);
  }
}
try {
  self["workbox:google-analytics:7.0.0"] && _();
} catch {
}
const At = "workbox-google-analytics", It = 60 * 48, Me = "www.google-analytics.com", ke = "www.googletagmanager.com", Nt = "/analytics.js", Pt = "/gtag/js", Lt = "/gtm.js", Ut = /^\/(\w+\/)?collect/, qt = (n) => async ({ queue: e }) => {
  let t;
  for (; t = await e.shiftRequest(); ) {
    const { request: s, timestamp: r } = t, a = new URL(s.url);
    try {
      const i = s.method === "POST" ? new URLSearchParams(await s.clone().text()) : a.searchParams, o = r - (Number(i.get("qt")) || 0), c = Date.now() - o;
      if (i.set("qt", String(c)), n.parameterOverrides)
        for (const h of Object.keys(n.parameterOverrides)) {
          const b = n.parameterOverrides[h];
          i.set(h, b);
        }
      typeof n.hitFilter == "function" && n.hitFilter.call(null, i), await fetch(new Request(a.origin + a.pathname, {
        body: i.toString(),
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: { "Content-Type": "text/plain" }
      }));
    } catch (i) {
      throw await e.unshiftRequest(t), i;
    }
  }
}, Ot = (n) => {
  const e = ({ url: s }) => s.hostname === Me && Ut.test(s.pathname), t = new Et({
    plugins: [n]
  });
  return [new d(e, t, "GET"), new d(e, t, "POST")];
}, Bt = (n) => {
  const e = ({ url: s }) => s.hostname === Me && s.pathname === Nt, t = new j({ cacheName: n });
  return new d(e, t, "GET");
}, Kt = (n) => {
  const e = ({ url: s }) => s.hostname === ke && s.pathname === Pt, t = new j({ cacheName: n });
  return new d(e, t, "GET");
}, Ft = (n) => {
  const e = ({ url: s }) => s.hostname === ke && s.pathname === Lt, t = new j({ cacheName: n });
  return new d(e, t, "GET");
}, jt = (n = {}) => {
  const e = N.getGoogleAnalyticsName(n.cacheName), t = new kt(At, {
    maxRetentionTime: It,
    onSync: qt(n)
  }), s = [
    Ft(e),
    Bt(e),
    Kt(e),
    ...Ot(t)
  ], r = new ve();
  for (const a of s)
    r.registerRoute(a);
  r.addFetchListener();
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var S = function() {
  return S = Object.assign || function(e) {
    for (var t, s = 1, r = arguments.length; s < r; s++) {
      t = arguments[s];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, S.apply(this, arguments);
}, ee;
(function(n) {
  n.np = "np", n.en = "en";
})(ee || (ee = {}));
var Ae = [
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
  [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]
], te = Ae.map(function(n) {
  var e = 0;
  return n.map(function(t) {
    var s = [t, e];
    return e += t, s;
  });
}, []), ne = 0, O = Ae.map(function(n) {
  var e = n.reduce(function(s, r) {
    return s + r;
  }, 0), t = [e, ne];
  return ne += e, t;
}), B = 33238;
if (ne !== B)
  throw new Error("Invalid constant initialization for Nepali Date.");
var se = 1;
function Wt(n) {
  return n - Ie;
}
function Ht(n) {
  return n + Ie;
}
var Ie = 2e3, m = 1, we = 0;
function Yt(n, e) {
  for (; e < 0; )
    e += n;
  return e % n;
}
var A = {
  en: {
    day: {
      short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    month: {
      short: ["Bai", "Jes", "Asa", "Shr", "Bhd", "Asw", "Kar", "Man", "Pou", "Mag", "Fal", "Cha"],
      long: [
        "Baisakh",
        "Jestha",
        "Asar",
        "Shrawan",
        "Bhadra",
        "Aswin",
        "Kartik",
        "Mangsir",
        "Poush",
        "Magh",
        "Falgun",
        "Chaitra"
      ]
    },
    date: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  },
  np: {
    day: {
      short: ["आइत", "सोम", "मंगल", "बुध", "बिहि", "शुक्र", "शनि"],
      long: ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"]
    },
    month: {
      short: ["बै", "जे", "अ", "श्रा", "भा", "आ", "का", "मं", "पौ", "मा", "फा", "चै"],
      long: [
        "बैशाख",
        "जेठ",
        "असार",
        "श्रावण",
        "भाद्र",
        "आश्विन",
        "कार्तिक",
        "मंसिर",
        "पौष",
        "माघ",
        "फाल्गुण",
        "चैत्र"
      ]
    },
    date: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
  }
}, J = {
  year: 1943,
  month: 3,
  date: 13,
  day: 3
};
function Gt(n, e, t) {
  try {
    var s = Wt(n), r = O[s][m], a = Yt(12, e), i = Math.floor(e / 12), o = O[s + i][m] - r + te[s + i][a][m], c = r + o + t;
    if (c < se || c > B)
      throw new Error();
    return c;
  } catch {
    throw new Error("The date doesn't fall within 2000/01/01 - 2090/12/30");
  }
}
function Ne(n) {
  if (n < se || n > B)
    throw new Error("The epoch difference is not within the boundaries " + se + " - " + B);
  var e = O.findIndex(function(a) {
    return n > a[m] && n <= a[m] + a[we];
  }), t = n - O[e][m], s = te[e].findIndex(function(a) {
    return t > a[m] && t <= a[m] + a[we];
  }), r = t - te[e][s][m];
  return {
    year: Ht(e),
    month: s,
    date: r
  };
}
function Qt(n, e, t) {
  var s = Math.abs(Date.UTC(n, e, t) - Date.UTC(J.year, J.month, J.date)), r = Math.ceil(s / (1e3 * 3600 * 24));
  return r;
}
function Pe(n) {
  var e = new Date(Date.UTC(1943, 3, 13 + n));
  return {
    year: e.getUTCFullYear(),
    month: e.getUTCMonth(),
    date: e.getUTCDate(),
    day: e.getUTCDay()
  };
}
function $t(n) {
  try {
    var e = Gt(n.year, n.month, n.date), t = Ne(e), s = Pe(e);
    return {
      AD: s,
      BS: S(S({}, t), { day: s.day })
    };
  } catch {
    throw new Error("The date doesn't fall within 2000/01/01 - 2090/12/30");
  }
}
function Jt(n) {
  try {
    var e = Qt(n.getFullYear(), n.getMonth(), n.getDate()), t = Ne(e), s = Pe(e);
    return {
      AD: s,
      BS: S(S({}, t), { day: s.day })
    };
  } catch {
    throw new Error("The date doesn't fall within 2000/01/01 - 2090/12/30");
  }
}
function w(n, e) {
  return n.split("").map(function(t) {
    return A[e].date[parseInt(t, 10)];
  }).join("");
}
function Vt(n, e, t) {
  return e.replace(/((\\[MDYd])|D{1,2}|M{1,4}|Y{2,4}|d{1,3})/g, function(s, r, a) {
    var i;
    switch (s) {
      case "D":
        return w(n.date.toString(), t);
      case "DD":
        return w(n.date.toString().padStart(2, "0"), t);
      case "M":
        return w((n.month + 1).toString(), t);
      case "MM":
        return w((n.month + 1).toString().padStart(2, "0"), t);
      case "MMM":
        return A[t].month.short[n.month];
      case "MMMM":
        return A[t].month.long[n.month];
      case "YY":
        return w(n.year.toString().slice(-2), t);
      case "YYY":
        return w(n.year.toString().slice(-3), t);
      case "YYYY":
        return w(n.year.toString(), t);
      case "d":
        return w(((i = n.day) === null || i === void 0 ? void 0 : i.toString()) || "0", t);
      case "dd":
        return A[t].day.short[n.day || 0];
      case "ddd":
        return A[t].day.long[n.day || 0];
      default:
        return a.replace("/", "");
    }
  }).replace(/\\/g, "");
}
function ge(n) {
  var e = /(\d{4})\s*([/-]|\s+)\s*(\d{1,2})\s*([/-]|\s+)\s*(\d{1,2})/, t = /(\d{1,2})\s*([/-]|\s+)\s*(\d{1,2})\s*([/-]|\s+)\s*(\d{4})/, s;
  if (s = n.match(e), s !== null)
    return {
      year: parseInt(s[1], 10),
      month: parseInt(s[3], 10) - 1,
      date: parseInt(s[5], 10)
    };
  if (s = n.match(t), s !== null)
    return {
      year: parseInt(s[5], 10),
      month: parseInt(s[3], 10) - 1,
      date: parseInt(s[1], 10)
    };
  throw new Error("Invalid date format");
}
var R = Symbol("Date"), V = Symbol("Day"), E = Symbol("Year"), D = Symbol("MonthIndex"), C = Symbol("JsDate"), L = Symbol("convertToBS()"), T = Symbol("convertToAD()"), z = Symbol("setADBS()"), U = Symbol("setDayYearMonth()"), zt = (
  /** @class */
  function() {
    function n() {
      var e = new Error("Invalid constructor arguments");
      if (arguments.length === 0)
        this[L](/* @__PURE__ */ new Date());
      else if (arguments.length === 1) {
        var t = arguments[0];
        switch (typeof t) {
          case "number":
            this[L](new Date(t));
            break;
          case "string":
            var s = ge(t), r = s.date, a = s.year, i = s.month;
            this[U](a, i, r), this[T]();
            break;
          case "object":
            if (t instanceof Date)
              this[L](t);
            else
              throw e;
            break;
          default:
            throw e;
        }
      } else if (arguments.length <= 3)
        this[U](arguments[0], arguments[1], arguments[2]), this[T]();
      else
        throw e;
    }
    return n.prototype[U] = function(e, t, s, r) {
      t === void 0 && (t = 0), s === void 0 && (s = 1), r === void 0 && (r = 0), this[E] = e, this[D] = t, this[R] = s, this[V] = r;
    }, n.prototype.toJsDate = function() {
      return this[C];
    }, n.prototype.getDate = function() {
      return this[R];
    }, n.prototype.getYear = function() {
      return this[E];
    }, n.prototype.getDay = function() {
      return this[V];
    }, n.prototype.getMonth = function() {
      return this[D];
    }, n.prototype.getDateObject = function() {
      return {
        BS: this.getBS(),
        AD: this.getAD()
      };
    }, n.prototype.getBS = function() {
      return {
        year: this[E],
        month: this[D],
        date: this[R],
        day: this[V]
      };
    }, n.prototype.getAD = function() {
      return {
        year: this[C].getFullYear(),
        month: this[C].getMonth(),
        date: this[C].getDate(),
        day: this[C].getDay()
      };
    }, n.prototype.setDate = function(e) {
      var t = this[R];
      try {
        this[R] = e, this[T]();
      } catch (s) {
        throw this[R] = t, s;
      }
    }, n.prototype.setMonth = function(e) {
      var t = this[D];
      try {
        this[D] = e, this[T]();
      } catch (s) {
        throw this[D] = t, s;
      }
    }, n.prototype.setYear = function(e) {
      var t = this[E];
      try {
        this[E] = e, this[T]();
      } catch (s) {
        throw this[E] = t, s;
      }
    }, n.prototype.format = function(e, t) {
      return t === void 0 && (t = n.language), Vt(this.getBS(), e, t);
    }, n.parse = function(e) {
      var t = ge(e), s = t.date, r = t.year, a = t.month;
      return new n(r, a, s);
    }, n.now = function() {
      return new n();
    }, n.fromAD = function(e) {
      return new n(e);
    }, n.prototype[L] = function(e) {
      var t = Jt(e), s = t.AD, r = t.BS;
      this[z](s, r);
    }, n.prototype[z] = function(e, t) {
      this[U](t.year, t.month, t.date, t.day), this[C] = new Date(e.year, e.month, e.date);
    }, n.prototype[T] = function() {
      var e = $t({
        year: this[E],
        month: this[D],
        date: this[R]
      }), t = e.AD, s = e.BS;
      this[z](t, s);
    }, n.prototype.valueOf = function() {
      return this[C].getTime();
    }, n.prototype.toString = function() {
      return this.format("ddd DD, MMMM YYYY");
    }, n.language = ee.en, n;
  }()
);
jt();
const Le = "UPDATE_CHECK", Ue = async () => {
  const { year: n, month: e } = new zt().getBS(), t = await fetch(`/data/${n}-calendar.json`).then((o) => o.json()), s = (e + 1).toString().padStart(2, "0"), r = t[s], a = r[0].AD_date.ad, i = r[r.length - 1].AD_date.ad;
  await fetch(`/api/events?timeMin=${a}&timeMax=${i}`), Promise.resolve();
};
bt([{"revision":null,"url":"assets/index-ea970b02.js"},{"revision":null,"url":"assets/index-f0e83a5b.css"},{"revision":"da29e0edc98d36c3b7ca4d841d5cad1c","url":"index.html"},{"revision":"54250155da21d518ae4a9c2c216319f6","url":"calendar.png"},{"revision":"80425677481cfb51e34c48d0716e8608","url":"logo.png"},{"revision":"73030b57cb4b1c4f97c727934d408510","url":"data/2075-calendar.json"},{"revision":"79e5436ec48eb17f5f57a7f36ab869cb","url":"data/2076-calendar.json"},{"revision":"b3b2ae5c2d0bc0e35fd64f6b44254bf5","url":"data/2077-calendar.json"},{"revision":"30d5fff2e5bd4c5d4a87e3962728cc7a","url":"data/2078-calendar.json"},{"revision":"c8e338246a329a42904f7191d9ec10b7","url":"data/2079-calendar.json"},{"revision":"9648df53065a7e2e94be04a7957c642d","url":"data/2080-calendar.json"},{"revision":"3734df5f8fa0a2152d57f806f1d996f1","url":"data/2081-calendar.json"},{"revision":"c80c3dd907861a1ef5750913c8186448","url":"data/2082-calendar.json"},{"revision":"8a2740202696d51f733bc73a728614e3","url":"locales/en/translation.json"},{"revision":"e9087567b88167c5c8453ba029a52a3a","url":"locales/ne/translation.json"},{"revision":"afc0d841308502cc32ad98e0fe33a114","url":"manifest.webmanifest"}] || []);
F(
  /^https:\/\/fonts\.googleapis\.com\/.*/i,
  new xe({
    cacheName: "google-fonts-cache",
    plugins: [
      new ae({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365
        // 365 days
      }),
      new ie({
        statuses: [0, 200]
      })
    ]
  })
);
F(
  /^https:\/\/fonts\.gstatic\.com\/.*/i,
  new xe({
    cacheName: "gstatic-fonts-cache",
    plugins: [
      new ae({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365
        // 365 days
      }),
      new ie({
        statuses: [0, 200]
      })
    ]
  })
);
F(
  /\/api\/.*/i,
  new j({
    cacheName: "events-cache",
    plugins: [
      new ae({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 10
        // 10 days
      }),
      new ie({
        statuses: [0, 200]
      })
    ]
  }),
  "GET"
);
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
self.addEventListener("notificationclick", (n) => {
  n.waitUntil(self.clients.openWindow(n.notification.tag)), n.notification.close();
});
self.addEventListener("periodicsync", (n) => {
  n.tag === Le && n.waitUntil(Ue());
});
self.addEventListener("message", (n) => {
  n.data === Le && n.waitUntil(Ue());
});
