import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import client from './graphql-js-client';

function gql() {
  // do nothing
}

const app = express();

const shopNameAndProductsPromise = client.send(gql`
    query {
      shop {
        name
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
    return client.send(gql`
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
  const cartPromise = client.send(gql`
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
      shopName: shop.name,
      isCartOpen: req.query.cart
    });
  });
});

app.post('/line_item/:productId', (req, res) => {
  const options = req.body;
  const productId = req.params.productId;
  const checkoutId = options.checkoutId;
  const quantity = parseInt(options.quantity, 10);

  delete options.quantity;
  delete options.checkoutId;

  return shopNameAndProductsPromise.then((shop) => {
    // Find the product that is selected
    const targetProduct = shop.products.find((product) => {
      return product.id.substring(product.id.lastIndexOf('/')) === `/${productId}`;
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

    return client.send(gql`
      mutation ($input: CheckoutAddLineItemsInput!) {
        checkoutAddLineItems(input: $input) {
          userErrors {
            message
            field
          }
          checkout {
            webUrl
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
                  }
                  quantity
                }
              }
            }
          }
        }
      }
    `, {input}).then((result) => {
      res.redirect(`/?cart=true&checkoutId=${result.model.checkoutAddLineItems.checkout.id}`);
    });
  });
});

app.listen(4200, () => {
  console.log('Example app listening on port 4200!'); // eslint-disable-line no-console
});
