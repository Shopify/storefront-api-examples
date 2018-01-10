# ember-graphql-client

An example using [graphql-js-client](https://github.com/Shopify/graphql-js-client) built with [Ember](https://www.emberjs.com/).
This example uses [babel-plugin-graphql-js-client-transform](https://github.com/Shopify/babel-plugin-graphql-js-client-transform) in conjunction with [graphql-js-client](https://github.com/Shopify/graphql-js-client) to build queries.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone git@github.com:Shopify/storefront-api-examples.git` this repository
* `cd storefront-api-examples`
* `cd ember-graphql-client`
* `yarn global add ember-cli`
* `yarn install`

## Configuring

If you would like to connect your store to this example, open up `app/initializers/graphql-js-client.js` and update the `url` and `Authorization` header:
```js
const client = new Client(typeBundle, {
  url: 'https://your-shop-name.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'your-storefront-access-token'
    }
  }
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

## Contributing
For help on setting up the repo locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/storefront-api-examples/blob/master/CONTRIBUTING.md).

## Code of Conduct
All developers who wish to contribute through code or issues, take a look at the
[CODE_OF_CONDUCT.md](https://github.com/Shopify/storefront-api-examples/blob/master/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](https://github.com/Shopify/storefront-api-examples/blob/master/LICENSE.txt) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
