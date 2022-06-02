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
    "url": "webpack-runtime-5cf45807d5a0cdb237db.js"
  },
  {
    "url": "styles.7565383a98b836a29626.css"
  },
  {
    "url": "framework-40c800c70e67c5272a6a.js"
  },
  {
    "url": "cfc6b023-6097cf607d61f739f227.js"
  },
  {
    "url": "43a99af2-f299072026930c5ae098.js"
  },
  {
    "url": "fc20e1c4-5f12df67e3b385a37b98.js"
  },
  {
    "url": "c2ec1d10-84507ebb3aaa956d0187.js"
  },
  {
    "url": "8f19d780-91abcd0046d53657e179.js"
  },
  {
    "url": "5ca00d41-e77b28cc3b6d1ff14a29.js"
  },
  {
    "url": "6e92790c-5e2be1e1cf8515337afb.js"
  },
  {
    "url": "5f6bb6fb-4a250961ff0479331b3a.js"
  },
  {
    "url": "ebd65826-b7766193582e4464b5d5.js"
  },
  {
    "url": "23420901-1104bb01c59e07b6b116.js"
  },
  {
    "url": "262b3caa-7b9c34bba80b762b363b.js"
  },
  {
    "url": "0e6451da-c51e44909eb711c5c76a.js"
  },
  {
    "url": "4119064d-ddc27c8402a35cb901ee.js"
  },
  {
    "url": "e51a3977-812ef77d6296962b39d1.js"
  },
  {
    "url": "439716bf-bda811f6621e70929caa.js"
  },
  {
    "url": "2fb713ed-217cc53169d0e674c7c4.js"
  },
  {
    "url": "1c920f04-fe747c2e59a333518cad.js"
  },
  {
    "url": "app-e93c85346285015cd217.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "07f5b2ae980c161523f94e74c9326c51"
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
  if (!resources || !(await caches.match(`/app-e93c85346285015cd217.js`))) {
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
