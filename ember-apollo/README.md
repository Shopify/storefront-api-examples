# ember-apollo

An example using [Apollo](http://www.apollodata.com/) built with [Ember](https://www.emberjs.com/).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone git@github.com:Shopify/storefront-api-examples.git` this repository
* `cd ember-apollo`
* `yarn global add ember-cli`
* `yarn install`

## Configuring

If you would like to connect your store to this example, open up `config/environment.js` and update the `apiURL`:
```js
var ENV = {
  ...
  apollo: {
    apiURL: 'https://your-shop-name.myshopify/api/graphql'
  },
  ...
}
```
Then, add your storefront access token to `app/services/apollo.js`:
```js
_runAuthorize(req, next) {
  ...
  req.options.headers['X-Shopify-Storefront-Access-Token']= 'your-storefront-access-token';
  ...
}
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
