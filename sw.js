/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-1e449a9f46b34883d1a5.js"
  },
  {
    "url": "styles.7113dbd1e5f10b5a31f8.css"
  },
  {
    "url": "framework-61238facb6c180b3db8b.js"
  },
  {
    "url": "cfc6b023-67029f88433cfd504d7d.js"
  },
  {
    "url": "43a99af2-c00d26fcbb8e3bd216ab.js"
  },
  {
    "url": "fc20e1c4-b79d4ea858b2ccc51e76.js"
  },
  {
    "url": "8edc3fe5-61b62e1cc872dba6a415.js"
  },
  {
    "url": "5ca00d41-e8113a070af4b853d0e1.js"
  },
  {
    "url": "b16bd182-39fbf6f48052483fe2fe.js"
  },
  {
    "url": "a45cf4d1-ad94e2bb8545d1e6b892.js"
  },
  {
    "url": "79eb02f1-8f1120d0d01dfd4307e2.js"
  },
  {
    "url": "2f37a77d-ba6a8556b23e6d286746.js"
  },
  {
    "url": "23420901-ebf9501f65b1de8f7b73.js"
  },
  {
    "url": "0e6451da-042c6273f1eca7485c19.js"
  },
  {
    "url": "4119064d-ab1253f8d8630917f269.js"
  },
  {
    "url": "e51a3977-0a34bc92996cfe23793a.js"
  },
  {
    "url": "6e2d9d0a-483f8fc24413dbd532ec.js"
  },
  {
    "url": "2fb713ed-6c0b3667ed0a7ee86f6e.js"
  },
  {
    "url": "1c920f04-21832a2e1f9522bc0fbf.js"
  },
  {
    "url": "app-55eb01f7939097127229.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "1d9e150305ac0790a568f463353a7507"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-f3379629a74460c91fab.js"
  },
  {
    "url": "polyfill-cc1e3535dc4c6612dcf8.js"
  },
  {
    "url": "manifest.json",
    "revision": "78024be4523b4f9cbbf094ca30beb0b3"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "4a3a3cb1b08be82dd2d47c2e039ee9a4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-55eb01f7939097127229.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
