# react-graphql-client

An example using [graphql-js-client](https://github.com/Shopify/graphql-js-client) built with [React](https://facebook.github.io/react/). This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone git@github.com:Shopify/storefront-api-examples.git` this repository
* `cd react-graphql-js-client`
* `yarn install`

## Configuring

If you would like to connect your store to this example, open up `src/config.js` and update the `domain` and `storefrontAccessToken`:

```js
  const client = new GraphQLClient(types, {
    url: 'https://your-shop-name.myshopify.com/api/graphql',
    fetcherOptions: {
      headers: `Authorization: Basic your-storefront-access-token=`
    }
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
* [Apollo Client](http://dev.apollodata.com/)

## Contributing
For help on setting up the repo locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/storefront-api-examples/blob/master/CONTRIBUTING.md).

## Code of Conduct
All developers who wish to contribute through code or issues, take a look at the
[CODE_OF_CONDUCT.md](https://github.com/Shopify/storefront-api-examples/blob/master/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](https://github.com/Shopify/storefront-api-examples/blob/master/LICENSE.txt) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
