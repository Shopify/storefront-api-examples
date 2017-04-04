import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import client from './js-buy-sdk';

const app = express();
let cartPromise = client.createCheckout();
const productsPromise = client.fetchAllProducts();
const shopPromise = client.fetchShopInfo();

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
    const selectedVariant = client.Product.Helpers.variantForOptions(targetProduct, options);

    // Add the variant to our cart
    const input = {
      checkoutId: cart.id,
      lineItems: [{variantId: selectedVariant.id, quantity: 1}]
    };

    cartPromise = client.addLineItems(input).then((checkout) => {
      res.redirect('/?cart=true');

      return checkout;
    });
  });
});

app.listen(4200, () => {
  console.log('Example app listening on port 4200!'); // eslint-disable-line no-console
});
