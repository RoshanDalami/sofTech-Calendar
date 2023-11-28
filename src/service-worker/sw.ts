declare const self : ServiceWorkerGlobalScope;

// interface PeriodicBackgroundSyncEvent extends ExtendableEvent {
//   tag: string;
// }

import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import * as googleAnalytics from "workbox-google-analytics";
import NepaliDate from "nepali-date-converter";

googleAnalytics.initialize();

const UPDATE_CHECK = "UPDATE_CHECK";

const checkForUpdates = async () => {
  const { year, month } = new NepaliDate().getBS();
  const yearData = await fetch(`/data/${year}-calendar.json`).then((res) => res.json());
  const currentMonthInHumanForm = (month + 1).toString().padStart(2, "0");
  const monthData = yearData[currentMonthInHumanForm];
  const startDate = monthData[0].AD_date.ad;
  const endDate = monthData[monthData.length - 1].AD_date.ad;
  await fetch(`/api/events?timeMin=${startDate}&timeMax=${endDate}`);
  Promise.resolve();
};
precacheAndRoute((self as any).__WB_MANIFEST || []);

registerRoute(
  /^https:\/\/fonts\.googleapis\.com\/.*/i,
  new CacheFirst({
    cacheName: "google-fonts-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  /^https:\/\/fonts\.gstatic\.com\/.*/i,
  new CacheFirst({
    cacheName: "gstatic-fonts-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  /\/api\/.*/i,
  new NetworkFirst({
    cacheName: "events-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 10, // 10 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
  "GET"
);
(self as any).addEventListener("install", () =>  ((self as any) as any).skipWaiting());
(self as any).addEventListener("activate", () => ((self as any) as any).clients.claim());

(self as any).addEventListener("notificationclick", (event:any) => {
  event.waitUntil((self as any).clients.openWindow(event.notification.tag));
  event.notification.close();
});

(self as any).addEventListener("periodicsync", (event: any) => {
  if (event.tag === UPDATE_CHECK) {
    event.waitUntil(checkForUpdates());
  }
});

((self as any) as any).addEventListener("message", (event:any) => {
  if (event.data === UPDATE_CHECK) {
    event.waitUntil(checkForUpdates());
  }
});
