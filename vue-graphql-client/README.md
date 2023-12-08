# vue-graphql-client

A [VueJS](https://v3.vuejs.org/guide/introduction.html) application that leverages the [Shopify Storefront API](https://shopify.dev/docs/storefront-api) to display products and allow users to populate a shopping cart.

## Table of contents 

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Configuring](#configuring)
* [Running](#running)
* [Notes on Development](#notes-on-development)
* [Further Reading / Useful Links](#further-reading-useful-links)
* [Contributing](#contributing)
* [Code of Conduct](#code-of-conduct)
* [License](http://github.com/Shopify/graphql-js-client/blob/master/LICENSE.md)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [NPM](https://www.npmjs.com/)

## Installation

* `git clone https://github.com/Shopify/storefront-api-examples.git` this repository
* `cd storefront-api-examples`
* `cd vue-graphql-client`
* `npm install`

## Configuring

The project is already configured out of the box to use the [GraphQL Demo store](https://graphql.myshopify.com/) leveraging an API key that was found in other project repos.

TO DO: Add instructions on how to hook up the example site to your own store (hint: checkout the `ShopifyClient.ts` file)

## Running

### Development

Start a local server for development which compiles the source code and also has hot-reloads: 

```
npm run serve
```

### Production

Compiles and minifies production files for deployment:

```
npm run build
```

## Notes on Development

This single page application (SPA) written in some TypeScript uses the [VueJS](https://v3.vuejs.org/guide/introduction.html) framework to present the user with a list of products pulled from the Shopify Storefront API. Users can can add the products to their cart and then proceed to a checkout page which is hosted on the GraphQl Shopify store. 

### Vue 3

This app uses Vue 3 and the [Vue CLI](https://cli.vuejs.org/) standard command line tools to bootstrap and build the project. The components are written using Vue 3's composition api. 

### State Management

Central state management of the app is done using [Vuex](https://vuex.vuejs.org/). There are debates out there that challenge the relevance of Vuex in light of the new composition api, but in my opinion Vuex and central state management is still valuable.

For this app, two Vuex modules were written, one to manage product data and one to manage the cart data.

### ShopifyClient.ts

In the `services` folder, you will find custom `ShopifyClient` static class that is responsible for calls to the Shopify API.

The `ShopifyClient` uses `axios` for the API calls and then normalises the data and returns the data back to our vuex store. 

The app by default connects to Shopify's sample GraphQL store which has a few different products already setup in the catalogue. 

One problem with this setup is that the `ShopifyClient` is tightly coupled to how the data is stored in vuex. There must be a better way to do this?

### Known Issues

* If products fail to load from the api, and a users' cart has products in it, since the cart pulls data from the products store, as that store is empty the cart doesn't display properly - perhaps the cart should pull data by itself and not rely on the products data store
* Error handling needs to be added
* Product and Cart empty states need to be added to the UI
* Types could be centralised into one types file and not scattered over the project

## Further Reading / Useful Links

* [VueJS](https://v3.vuejs.org/guide/introduction.html)
* [Vuex](https://vuex.vuejs.org/)
* [Axios](https://github.com/axios/axios)
* [GraphQL](https://graphql.org/)
* [TypeScript](https://www.typescriptlang.org/)

## Contributing

For help on setting up the repo locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/storefront-api-examples/blob/master/CONTRIBUTING.md).

## Code of Conduct

All developers who wish to contribute through code or issues, take a look at the
[CODE_OF_CONDUCT.md](https://github.com/Shopify/storefront-api-examples/blob/master/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](https://github.com/Shopify/storefront-api-examples/blob/master/LICENSE.txt) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
