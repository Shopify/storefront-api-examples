# node-js-buy
An example using [js-buy-sdk](https://github.com/Shopify/js-buy-sdk) built with Node, Express and Pug.

## Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone git@github.com:Shopify/storefront-api-examples.git` this repository
* `cd node-js-buy`
* `yarn install`

## Configuring

If you would like to connect your store to this example, open up `src/js-buy-sdk.js` and update the `domain` and `storefrontAccessToken`:
```js
const config = new Config({
  storefrontAccessToken: 'your-storefront-access-token',
  domain: 'your-shop-name.myshopify.com',
});
```

## Running

* `yarn start`
* View the example at [http://localhost:4200](http://localhost:4200).

## License

MIT, see [LICENSE.md](http://github.com/Shopify/node-graphql-client/blob/master/LICENSE.md) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
