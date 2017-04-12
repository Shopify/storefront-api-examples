import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import client from './js-buy-sdk';

const app = express();
const productsPromise = client.fetchAllProducts();
const shopPromise = client.fetchShopInfo();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../../shared')));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  const checkoutId = req.query.checkoutId;

  // Create a checkout if it doesn't exist yet
  if (!checkoutId) {
    return client.createCheckout({allowPartialAddresses: true, shippingAddress: {city: 'Toronto', province: 'ON', country: 'Canada'}}).then((checkout) => {
      res.redirect(`/?checkoutId=${checkout.id.substring(checkout.id.lastIndexOf('/') + 1)}`);
    });
  }

  // Fetch the checkout
  const cartPromise = client.fetchCheckout(checkoutId);

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
  const checkoutId = options.checkoutId;
  const quantity = parseInt(options.quantity, 10);

  delete options.quantity;
  delete options.checkoutId;

  return productsPromise.then((products) => {
    // Find the product that is selected
    const targetProduct = products.find((product) => {
      return product.id.substring(product.id.lastIndexOf('/')) === `/${productId}`;
    });

    // Find the corresponding variant
    const selectedVariant = client.Product.Helpers.variantForOptions(targetProduct, options);

    // Add the variant to our cart
    const input = {
      checkoutId,
      lineItems: [{variantId: selectedVariant.id, quantity}]
    };

    return client.addLineItems(input).then((checkout) => {
      res.redirect(`/?cart=true&checkoutId=${checkout.id.substring(checkout.id.lastIndexOf('/') + 1)}`);
    });
  });
});

app.listen(4200, () => {
  console.log('Example app listening on port 4200!'); // eslint-disable-line no-console
});
