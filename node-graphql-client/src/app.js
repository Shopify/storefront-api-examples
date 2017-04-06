import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import client from './graphql-js-client';

function gql() {
  // do nothing
}

const app = express();
let cartPromise = client.send(gql`
  mutation {
    checkoutCreate(input: {}) {
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
`).then((result) => {
  return result.model.checkoutCreate.checkout;
});
const productsPromise = client.send(gql`
  query {
    shop {
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
  return result.model.shop.products;
});
const shopPromise = client.send(gql`
  {
    shop {
      name
    }
  }
`).then((result) => {
  return result.model.shop;
});

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../../shared')));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  return Promise.all([productsPromise, cartPromise, shopPromise]).then(([products, cart, shop]) => {
    res.render('index', {
      products,
      cart,
      shopName: shop.name,
      isCartOpen: req.query.cart
    });
  });
});

app.post('/line_item/:id', (req, res) => {
  const options = req.body;
  const productId = req.params.id;

  return Promise.all([productsPromise, cartPromise]).then(([products, cart]) => {
    // Find the product that is selected
    const targetProduct = products.find((product) => {
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
      checkoutId: cart.id,
      lineItems: [{variantId: selectedVariant.id, quantity: 1}]
    };

    cartPromise = client.send(gql`
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
      res.redirect('/?cart=true');

      return result.model.checkoutAddLineItems.checkout;
    });
  });
});

app.listen(4200, () => {
  console.log('Example app listening on port 4200!'); // eslint-disable-line no-console
});
