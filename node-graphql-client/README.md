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
const client = new Client(typeBundle, {
  url: 'https://your-shop-name.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: {
      Authorization: 'Basic your-base64-encoded-storefront-access-token'
    }
  }
});
```

## Running

* `yarn start`
* View the example at [http://localhost:4200](http://localhost:4200).

## License

MIT, see [LICENSE.md](http://github.com/Shopify/node-graphql-client/blob/master/LICENSE.md) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
