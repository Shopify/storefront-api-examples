# react-js-buy-sdk

An example using [js-buy-sdk](https://github.com/Shopify/js-buy-sdk) built with [React](https://facebook.github.io/react/). This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone https://github.com/Shopify/storefront-api-examples.git` this repository
* `cd storefront-api-examples`
* `cd react-js-buy`
* `yarn install`

## Configuring

If you would like to connect your store to this example, open up `src/index.js` and update the `domain` and `storefrontAccessToken`:

```js
const config = new Config({
  storefrontAccessToken: 'your-storefront-access-token',
  domain: 'your-shop-name.myshopify.com',
});
```

## Running

Start a local server:

```
yarn start
```

* Visit your app at [http://localhost:3000](http://localhost:3000).

## Further Reading / Useful Links

* [React](https://facebook.github.io/react/)
* [JS Buy SDK](https://github.com/Shopify/js-buy-sdk)

## Contributing
For help on setting up the repo locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/storefront-api-examples/blob/master/CONTRIBUTING.md).

## Code of Conduct
All developers who wish to contribute through code or issues, take a look at the
[CODE_OF_CONDUCT.md](https://github.com/Shopify/storefront-api-examples/blob/master/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](https://github.com/Shopify/storefront-api-examples/blob/master/LICENSE.txt) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
