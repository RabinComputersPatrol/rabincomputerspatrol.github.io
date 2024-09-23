'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "573fc59070fd0e0198ce7a473cad24b4",
"index.html": "51d9b0420b3e122de51a6543c00db13e",
"/": "51d9b0420b3e122de51a6543c00db13e",
"version.json": "7a22b448a145bc6234925566d659cca7",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"assets/fonts/MaterialIcons-Regular.otf": "b844e32ef9fc3139676fee734ce643ed",
"assets/AssetManifest.json": "5240d3157aeb3197d11fead0e7768a31",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "5b4e6a13c260fdd6fcf0c4fc2719d4ad",
"assets/AssetManifest.bin.json": "81ca216176e5479e6d1907e92851e220",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/assets/rabin-logo.png": "f1edcfabe56dab2161cf9ed416633e74",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/NOTICES": "e4262b80632d0dbb7500c0017efd9a42",
"main.dart.js": "aa9e7758212eba2b1a83fc6c2a84ae37",
"flutter.js": "f31737fb005cd3a3c6bd9355efd33061",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "87325e67bf77a9b483250e1fb1b54677",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.js": "9fa2ffe90a40d062dd2343c7b84caf01",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/canvaskit.js": "5fda3f1af7d6433d53b24083e2219fa0",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
".git/HEAD": "978cf7ce582a3595b9d4daf7cc63115a",
".git/index": "60a0502aa64a193c51780e90ff24e813",
".git/COMMIT_EDITMSG": "655d242e09a0059e6c1fb1b459626ad7",
".git/config": "035eec507fc932df45d2386ea09e9035",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/refs/remotes/origin/ghpages": "e48a135d20fda83100c6d9185230d778",
".git/refs/heads/ghpages": "e48a135d20fda83100c6d9185230d778",
".git/logs/HEAD": "80912bf67b21180e3becb3123cc2a573",
".git/logs/refs/remotes/origin/ghpages": "3b2e2e54624905d08c0c770cde6d0d5e",
".git/logs/refs/heads/ghpages": "e1671775d7b0af9b7ab4122ca16f48fe",
".git/objects/2e/6d708ffa65e9318433f3484e4e4e3c368267c6": "dc41564a6978ce448baa67926a035324",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/85/f47d6c18f8548f2c517fe14063f69a2ed3e5d7": "f1d945eb749d4920a8dcd76482331dea",
".git/objects/e7/4940e24389c921433e28e5927562e67460bd5a": "caeda771011fc98b1bc4f220a169aedf",
".git/objects/e0/85d07813c3d369b5f4bf86a2e94ee8be7dbfd0": "40938735b3329c55ea067b66083f2cad",
".git/objects/4f/ae5f3fc5554abe971f6dbd8df2e3ea444f2c9f": "933b1425b6e6e468a540b2ee8b26c1d7",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/6b/e909fbf40b23748412f0ea89bf0fae827ed976": "5f118419157d9534688915220cc803f7",
".git/objects/f5/010cda95492006dae3638dfb01a8d0822a1e6a": "04eb9fcdf209b67f396e5ab84cb956e2",
".git/objects/f0/4edb7a8b7d3f272bb71bdf49f38d785d556ec2": "104e8aa6ccfda988bb326d696a47ec1b",
".git/objects/5d/15fadf1864d70c7184fca7d3efde79cdf68af5": "79a44d8578cc18e3add64aa6a97f0da0",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/92/c641123d077d5fb754313a0eeba8ccd5dca2b5": "c1df0f3804ef43bef904bdc31f9c8b88",
".git/objects/e2/635e6e7b0d9455499c30def20a0195252918d9": "3d0350e8fb438ffdad3316a316ef024d",
".git/objects/21/5f46705c55b5452b515b7eb09bd3534f6ea8cb": "f03ac8e37dca1981ad58b149ed9039f4",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/71/067b272943d4a16c1ab3106773f486f47e5d73": "7844583f620978121f6e3a5ff1da53ad",
".git/objects/71/a2922bec591e5c2344f5f1eeac9b9562988145": "1c69895b57873fc9f21363f1a34035a7",
".git/objects/cb/4c7b63b0aaa9deb7c8d312d71c7cb4360f16ff": "442214a2ffcd9b72362efab0361c88fa",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/79/d6f1f5f950286c6490caa6e41f0525ac462905": "bffd29445d86ce26cc001723f477ecda",
".git/objects/ab/8846bdd75e9ce29a5184d7c652f1cf172c5470": "a218223a64520ce6aa62b96c6a70639d",
".git/objects/74/aeff844244dcb136a67b4f30f72f0640d3c4f3": "39963d38bf7d30d4a62f29d089133616",
".git/objects/16/5da67191b73406e15fc3e6cf7cda3c195dc735": "86cfac30d97fb45bba2f4417782645d6",
".git/objects/b3/23387a0a95e1df74134f494f45c44566e1598e": "09e9db4c35ac561eead2c1795eb7f538",
".git/objects/b3/7a8ae7c5758724488192751ed8b6e3de126385": "a5722f026e63c5d1a92dc03444ea9726",
".git/objects/42/c1d7220fecfadbd180575e3dd170a88ec1e65f": "7f14dc0cf95ee5037147209411536767",
".git/objects/a5/887ee44fdc171574257624551ebcada07dfd08": "9b5f9e9043821434694083075d60b3df",
".git/objects/a5/3efdf92300d180241adcd14d81d15a734c4e08": "cdce04155deb291d95d5b2a8a45a186e",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/32/aa3cae58a7432051fc105cc91fca4d95d1d011": "4f8558ca16d04c4f28116d3292ae263d",
".git/objects/9a/ee486560ad2cf9bed179d69319a9109346fea4": "a6fef9f401fead5e24dd2fa45e2f4035",
".git/objects/9a/0d94f5893b06a840e3ade9328bb492e16c9ecd": "65158292696271a83617bcc2f30ae25c",
".git/objects/2a/c601edf396212a58341e78d0a8407c597e411b": "9d561b595eaac2699a1b024d812570df",
".git/objects/fd/a0f53f861bfef5edf08abf5304ddc0fec02a83": "cb66058ea105bd57fc004786624c96f7",
".git/objects/41/a4e6ce64af65139a47b44bbee591ac935595f9": "7217ee9b2694e3e9c497d2751ca56ba4",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/25/8b3eee70f98b2ece403869d9fe41ff8d32b7e1": "05e38b9242f2ece7b4208c191bc7b258",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/7b/96f53e6a28b8cae9b6ae358aa148b1e5d54a51": "4d7221d0b5088c41fa21f64701617f95",
".git/objects/1a/402cc32cdf67e6400a3d989c40faef97b68edb": "0d18efb9eea9c0d0e95c93e15e6771fe",
".git/objects/20/1afe538261bd7f9a38bed0524669398070d046": "82a4d6c731c1d8cdc48bce3ab3c11172",
".git/objects/1e/25fb4841dbfcbc6e4fa75d9417a4113ba250bc": "e91280155bc02e320c2a664e7fefc7b5",
".git/objects/76/396788c09b44de6e99f7b5efa5d212afa2eccc": "3dec40d0efb4b885f4f876c714a22a12",
".git/objects/37/4514729743e26ee9d315f25b0d78320a7231b7": "7fe8986dd7b8f65f5466b063233f51e7",
".git/objects/0c/28a995e4cd1e54492a3d1a6d870221000f041e": "ecac299693a9ac3ba1866968a9f65dca",
".git/objects/0e/7eab2d324ce06b726fe512e2349b7e18c9602c": "a372eff8a80a2ee5570789ed694e57be",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/35/3bc446503d2659c83465c6d80a3497c9883e04": "7c0903db815b0929971e6e91e6c6f40d",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/db/d80375c3ad8b5aee5b809ae15b55c0a54eb9db": "9d7d6129afd9e487b20e3d3497f77d47",
".git/objects/90/bcfcf0a77ab618a826db0fd8b0942963b653af": "fc109675cdf1233dd6599a4c3c0a7a69",
".git/objects/90/9df021907d9563947cf815578e9a7ee1979381": "7bba99b1c382e93d9fdbbbf502da600f",
".git/objects/62/0733cd2af116eb661457e4b3ffad7deef72bfb": "62ee2339d8ba039e0972691dead89671",
".git/objects/39/f8545f0928d0e5c1f3197b31e1f660713f2f7b": "bd027d735ab22378ad2cd26eac304dbd",
".git/objects/84/0516208d35dcb4298847ab835e2ef84ada92fa": "36a4a870d8d9c1c623d8e1be329049da",
".git/objects/e4/2d69976f53ada85cc51ad7619df1ee51fab0f1": "164c3bdcd84112ca93846db0a9bced44",
".git/objects/e4/5a760d34ec38ee230590043d093e7bf730a3f0": "748ca78eb99d9878338736e31bfdd4f7",
".git/objects/a3/feef56e7a3aa63288769b779154827f64d42e2": "4aacb1f87e9ed989d51dafe4ea5e2c8b",
".git/objects/a2/c2c501d92cade4609fbff2a20d058036a0f07d": "5799cad65f96fe00122233a5625d5041",
".git/objects/a2/ce0a7689817d2e3177ea3e696b595da8bfc334": "3eb01c31ca75ade3a5f6b05f17b2069c",
".git/objects/c6/9a8e185948e5b8aeab129f50d7f77bb8938864": "35d146eb2bcab3a9d2defaac8565c86a",
".git/objects/0f/63760e47bc9a24be1230c924fa7dec518bbdf9": "d362a67cf952339dcae08a20d373407f",
".git/objects/68/5e44896ca9378cc2cf623760f80572705f4713": "9ae0737c2a1c7cb746192dbac76f1379",
".git/objects/70/8b98164cae0e7618b85d185612d6a4748b918f": "4d74f5b3809190294a83e7f4cea40836",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/6d/c66914c86453814a4e0bf01d2359f598186b90": "67b0cf99eb1cfcfe65d2a94693318919",
".git/objects/b4/65634c9ad1b710b26afcad37733a638c50d90c": "bc014e2b6fc7114e470d928b88990758",
".git/objects/3a/7525f2996a1138fe67d2a0904bf5d214bfd22c": "ab6f2f6356cba61e57d5c10c2e18739d",
".git/objects/66/c19545468ae9b94709b8f52460d0e19ebf7326": "f1406f4f833fb5303d4200e5a68c0469",
".git/objects/e1/adddb3dc8879a23514a2afc04f1b882aa01b2e": "cf674817cfe9305df9cc67bc2e83f167",
".git/objects/53/47ce8ee0b42faf315e02bc7c44e0c5d3875ba5": "cac1d245ef47d8487667dbd664019505",
".git/objects/3e/0e94a2d18e452ad139e13c8edad6b12da1a390": "87687e2a9636fc88c572e3c7fa14ab79",
".git/objects/98/57c9b3b0448c92818efc5fda0f206b21914168": "ecbde07c564dabbec0f249821051b8af",
".git/objects/be/feec8fd95c411e9fd970e1a4c802e58cb44e27": "f6cf4f60d7c28eed7613b44c70572d42",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
"manifest.json": "721641e76f6b0a635660430bad4022c8"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
