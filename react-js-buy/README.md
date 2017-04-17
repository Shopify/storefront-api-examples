# React App Using js-buy-sdk

An example using [js-buy-sdk](https://github.com/Shopify/js-buy-sdk) built with [React](https://facebook.github.io/react/).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Yarn](https://yarnpkg.com/en/)

## Installation

```
yarn install
```

## Configure

If you would like to connect your store to this example, open up `config.js` and update the `domain` and `storefrontAccessToken`:

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
