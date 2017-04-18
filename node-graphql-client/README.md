# node-graphql-client
An example using [graphql-js-client](https://github.com/Shopify/graphql-js-client) built with Node, Express and Pug.

## Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/en/)

## Installation

```bash
git clone git@github.com:Shopify/storefront-api-examples.git
cd node-js-buy
yarn install
```

## Configuring

If you would like to connect your store to this example, open up `src/graphql-js-client.js` and update the `url` and `Authorization` header:
```js
export default new Client(typeBundle, {
  url: 'https://your-shop-name.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'your-storefront-access-token'
    }
  }
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
