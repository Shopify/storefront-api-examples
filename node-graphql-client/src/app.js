import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import client from './graphql-js-client';
import {gql} from 'babel-plugin-graphql-js-client-transform';

const app = express();

const shopNameAndProductsPromise = client.send(gql(client)`
    query {
      shop {
        name
        description
        products(first:20) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              options {
                name
                values
              }
              variants(first: 250) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  node {
                    title
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      src
                    }
                    price
                  }
                }
              }
              images(first: 250) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  node {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  `).then((result) => {
    return result.model.shop;
  });

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../../shared')));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  const checkoutId = req.query.checkoutId;

  // Create a checkout if it doesn't exist yet
  if (!checkoutId) {
    return client.send(gql(client)`
      mutation {
        checkoutCreate(input: {allowPartialAddresses: true, shippingAddress: {city: "Toronto", province: "ON", country: "Canada"}}) {
          userErrors {
            message
            field
          }
          checkout {
            id
          }
        }
      }
    `).then((result) => {
      res.redirect(`/?checkoutId=${result.model.checkoutCreate.checkout.id}`);
    });
  }

  // Fetch the checkout
  const cartPromise = client.send(gql(client)`
    query ($checkoutId: ID!) {
      node(id: $checkoutId) {
        ... on Checkout {
          webUrl
          subtotalPrice
          totalTax
          totalPrice
          lineItems (first:250) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                title
                variant {
                  title
                  image {
                    src
                  }
                  price
                }
                quantity
              }
            }
          }
        }
      }
    }
  `, {checkoutId}).then((result) => {
    return result.model.node;
  });


  return Promise.all([shopNameAndProductsPromise, cartPromise]).then(([shop, cart]) => {
    res.render('index', {
      products: shop.products,
      cart,
      shop,
      isCartOpen: req.query.cart
    });
  });
});

app.post('/add_line_item/:id', (req, res) => {
  const options = req.body;
  const productId = req.params.id;
  const checkoutId = options.checkoutId;
  const quantity = parseInt(options.quantity, 10);

  delete options.quantity;
  delete options.checkoutId;

  return shopNameAndProductsPromise.then((shop) => {
    // Find the product that is selected
    const targetProduct = shop.products.find((product) => {
      return product.id === productId;
    });

    // Find the corresponding variant
    const selectedVariant = targetProduct.variants.find((variant) => {
      return variant.selectedOptions.every((selectedOption) => {
        return options[selectedOption.name] === selectedOption.value.valueOf();
      });
    });

    // Add the variant to our cart
    const input = {
      checkoutId,
      lineItems: [{variantId: selectedVariant.id, quantity}]
    };

    return client.send(gql(client)`
      mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]) {
        checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
          userErrors {
            message
            field
          }
          checkout {
            id
          }
        }
      }
    `, input).then((result) => {
      res.redirect(`/?cart=true&checkoutId=${result.model.checkoutLineItemsAdd.checkout.id}`);
    });
  });
});

app.post('/remove_line_item/:id', (req, res) => {
  const checkoutId = req.body.checkoutId;
  const input = {
    checkoutId,
    lineItemIds: [req.params.id]
  };

  return client.send(gql(client)`
     mutation ($checkoutId: ID!, $lineItemIds: [ID!]!) {
        checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
        userErrors {
          message
          field
        }
        checkout {
          id
        }
      }
    }
  `, input).then((result) => {
    res.redirect(`/?cart=true&checkoutId=${result.model.checkoutLineItemsRemove.checkout.id}`);
  });
});

function updateLineItem(checkoutId, quantity, id) {
  const input = {
    checkoutId,
    lineItems: [{id, quantity}]
  };

  return client.send(gql(client)`
    mutation ($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
      checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
        userErrors {
          message
          field
        }
        checkout {
          id
        }
      }
    }
  `, input);
}

app.post('/decrement_line_item/:id', (req, res) => {
  return updateLineItem(req.body.checkoutId, parseInt(req.body.currentQuantity, 10) - 1, req.params.id).then((result) => {
    res.redirect(`/?cart=true&checkoutId=${result.model.checkoutLineItemsUpdate.checkout.id}`);
  });
});

app.post('/increment_line_item/:id', (req, res) => {
  return updateLineItem(req.body.checkoutId, parseInt(req.body.currentQuantity, 10) + 1, req.params.id).then((result) => {
    res.redirect(`/?cart=true&checkoutId=${result.model.checkoutLineItemsUpdate.checkout.id}`);
  });
});

app.listen(4200, () => {
  console.log('Example app listening on port 4200!'); // eslint-disable-line no-console
});
