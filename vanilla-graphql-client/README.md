# vanilla-graphql-client

An example of calling the [Shopify Storefront GraphQL API](https://help.shopify.com/en/api/custom-storefronts/storefront-api) with no fluff, frameworks, or complexity. This is the simplest way to get started with GraphQL.

This example inspired from the [gist](https://gist.github.com/kellyvaughn/b4ba8017367456166bd340dff99ca2a5) shared by [@kellyvaughn](https://github.com/kellyvaughn). Thank you for contributing!

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone https://github.com/Shopify/storefront-api-examples.git`
* `cd storefront-api-examples`
* `cd vanilla-graphql-client`
* `yarn install`

## Running

Before running create a private app on your test shop and [generate a storefront access token](https://help.shopify.com/en/api/custom-storefronts/storefront-api/getting-started#authentication).

Pass the shop url and access token as parameters to the example.js script:

`$ node example.js https://yourshop.myshopify.com 0e3115ef504f08f57a748208e2833af9`

To discover more about our APIs and explore the schema and compose new queries try out the [graphiql explorer](https://help.shopify.com/en/api/custom-storefronts/storefront-api/graphql-explorer).

## Contributing
For help on setting up the repo locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/storefront-api-examples/blob/master/CONTRIBUTING.md).

## Code of Conduct
All developers who wish to contribute through code or issues, take a look at the
[CODE_OF_CONDUCT.md](https://github.com/Shopify/storefront-api-examples/blob/master/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](https://github.com/Shopify/storefront-api-examples/blob/master/LICENSE.txt) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
