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
    "url": "webpack-runtime-f910717efe46fb053412.js"
  },
  {
    "url": "styles.7113dbd1e5f10b5a31f8.css"
  },
  {
    "url": "framework-fed03e91cb6419513c09.js"
  },
  {
    "url": "40d06ed2-ad8b9704cb54691397d0.js"
  },
  {
    "url": "350b5eca-d9b1386004d4ad7e5c74.js"
  },
  {
    "url": "6dc89c5f-f223f65cc5929941b78a.js"
  },
  {
    "url": "c4f700ce-ce8304b4d08386165921.js"
  },
  {
    "url": "7e84ae97-fc651e561b544c0d3e05.js"
  },
  {
    "url": "23853818-b1178d3d3ec99bb8856a.js"
  },
  {
    "url": "d13c56ab-141e75295e1b747a6b4e.js"
  },
  {
    "url": "88172efb-2c14549e5c3515b32d89.js"
  },
  {
    "url": "d8c4841a-a2f2607a8bb370088993.js"
  },
  {
    "url": "3b947a06-6d143b6587c5dcb45432.js"
  },
  {
    "url": "43d8a0f5-64888e29e934dde433c3.js"
  },
  {
    "url": "f7eefb03-97af7c444d0583966703.js"
  },
  {
    "url": "02ea7815-5d957373e39656a68d6b.js"
  },
  {
    "url": "0c4ba425-4d1e32daa54a7bb147a6.js"
  },
  {
    "url": "a3ddd270-5d65f7201166db3cc6b3.js"
  },
  {
    "url": "19144ed2-39115cb4b7526e14b48c.js"
  },
  {
    "url": "32546919-04c3efcbb5d13ae52ff2.js"
  },
  {
    "url": "04194685-86007c9198b29bab5fe7.js"
  },
  {
    "url": "17df4d56-1481f4e606318cb909cf.js"
  },
  {
    "url": "c76f6b0c-fe375174d90d0224ea20.js"
  },
  {
    "url": "app-ecb13c9d89131d91e7fc.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "a6dc9954ab04a0de301eb64c98614d01"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-e6810afd44ace56b4a9b.js"
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
  if (!resources || !(await caches.match(`/app-ecb13c9d89131d91e7fc.js`))) {
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
