# ember-js-buy

An example using [js-buy-sdk](https://github.com/Shopify/js-buy-sdk) built with Ember.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone git@github.com:Shopify/storefront-api-examples.git` this repository
* `cd ember-js-buy`
* `npm install`

## Configuring

If you would like to connect your store to this example, open up `app/initializers/js-buy-sdk.js` and update the `domain` and `storefrontAccessToken`:
```js
const config = new Config({
    storefrontAccessToken: 'your-storefront-access-token',
    domain: 'your-shop-name.myshopify.com',
  });
```

## Running

* `ember s`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
