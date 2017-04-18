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

## Contributing
For help on setting up the repo locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/storefront-api-examples/blob/master/CONTRIBUTING.md).

## Code of Conduct
All developers who wish to contribute through code or issues, take a look at the
[CODE_OF_CONDUCT.md](https://github.com/Shopify/storefront-api-examples/blob/master/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](https://github.com/Shopify/storefront-api-examples/blob/master/LICENSE.txt) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
