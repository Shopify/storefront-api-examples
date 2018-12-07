# VueShopify
A Vue.js application to interface with Shopify through the Storefront API.

## Getting Started

### Installing and Running Locally
Edit the following settings in `config.js`
* `shopifyDomain`
* `shopifyToken`

Then in your terminal, run the following commands
```
$ npm install 
$ npm install
$ npm run serve
```
Finally, visit [http://localhost:8080/](http://localhost:8080/) in your browser.

## Building For Production
```
$ npm run build
```

## Configuration Details
#### `config.js`
```
shopifyDomain: "YOUR_SHOPIFY_STORE_NAME.myshopify.com", // required

shopifyToken: "SHOPIFY_STOREFRONT_TOKEN", // required

collectionHandle: "SHOPIFY_COLLECTION_HANDLE", // optional, if not set it i will pull all products

localStorageKey: "FOO_BAR", // used as a key for local storage to remember a user's checkout ID

showUnavailableProducts: false, // if true, it will show products that are sold out

productListColumns: 3, // how many columns of products to show

productListColumnsMobile: 1, // how many columns of products to show on mobile

loadingColor: '#41b883', // color of the loading icon

googleAnalyticsId: 'UA-XXXXXXX-XX', // if unset, Google Analytics tracking will not fire
```

#### `environments.js`

Since this is a SPA (single page application) there are certain SEO/OpenGraph settings that need to be configured and compiled outside of the Vue.js application so web crawlers such as Facebook & Twitter can obtain the relevant data.

This file is used when rendering index.pug during the pre-build.js script (which is run when serving and building).

The default settings can be overriden by multiple environments as you will see in the file.
