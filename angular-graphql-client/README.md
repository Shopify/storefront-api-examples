# SmallAwesomeShop

Example of [graphql-js-client](https://github.com/Shopify/graphql-js-client) usage build with Angular 4.
https://www.youtube.com/watch?v=aggRpY_5t1o - how it works.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2.


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)

## Installation

* `git clone git@github.com:Shopify/storefront-api-examples.git` this repository
* `cd angular-graphql-client`
* `npm install`

## Configuring

If you would like to connect your store to this example, open up `/src/environments/environment.ts` and `/src/environments/environment.prod.ts`, update the `url` and `shopifyaccesstoken` header:
```js
  url: 'https://your-shop-name.myshopify.com/api/graphql',
  shopifyaccesstoken: 'your-storefront-access-token'
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
