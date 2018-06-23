import GraphQLJSClient from 'graphql-js-client';
import typeBundle from './types';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Product } from './../../shared';

@Injectable()
export class ShopifyService {

  client = new GraphQLJSClient(typeBundle, {
    url: environment.url,
    fetcherOptions: {
      headers: {
        'X-Shopify-Storefront-Access-Token': environment.shopifyaccesstoken
      }
    }
  });

  getCurrentShop(): Promise<any> {
    let client = this.client;

    let query = client.query((root) => {
      root.add('shop', (shop) => {
        shop.add('name')
      })
    });
    return client.send(query);
  }

  getProductById(_id): Promise<Product> {

    let client = this.client;

    let query = client.query((root) => {
      root.add('node', { args: { id: _id }, alias: 'product' }, (node) => {
        node.add('id');
        node.addInlineFragmentOn('Product', (Product) => {
          Product.add('title');
          Product.add('createdAt');
          Product.add('description');
          Product.add('productType');
          Product.add('publishedAt');
          Product.add('tags');
          Product.add('updatedAt');
          Product.add('vendor');
          Product.addConnection('images', { args: { first: 250 } }, (images) => {
            images.add('src');
            images.add('id');
            images.add('altText');
          })
          Product.addConnection('variants', { args: { first: 250 } }, (variants) => {
            variants.add('id');
            variants.add('product');
            variants.add('title');
            variants.add('price');
            variants.add('image', (image) => {
              image.add('src');
              image.add('id');
              image.add('altText');
            })
          })
        })
      })
    });

    return client.send(query).then(({ model, data }) => {
      return client.fetchAllPages(model.product, { pageSize: 250 })
    });

  }

  getProducts(): Promise<Product[]> {

    let query = this.client.query((root) => {
      root.add('shop', (shop) => {
        shop.addConnection('products', { args: { first: 250 } }, (products) => {
          products.add('id');
          products.add('title');
          products.addConnection('images', { args: { first: 250 } }, (images) => {
            images.add('src');
            images.add('id');
            images.add('altText');
          })
        })
      })
    });

    return this.client.send(query).then(({ model, data }) => {
      return this.client.fetchAllPages(model.shop.products, { pageSize: 20 })
    });

  }

  createCheckout(_lineItems): Promise<any> {

    const _lineItemsForCheckout = _lineItems.map(item => { return { 'variantId': item.variantId, 'quantity': item.quantity } })

    const input = this.client.variable('input', 'CheckoutCreateInput!');

    const mutation = this.client.mutation('myMutation', [input], (root) => {
      root.add('checkoutCreate', { args: { input } }, (checkoutCreate) => {
        checkoutCreate.add('userErrors', (userErrors) => {
          userErrors.add('message'),
            userErrors.add('field')
        })
        checkoutCreate.add('checkout', (checkout) => {
          checkout.add('id'),
            checkout.add('webUrl'),
            checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {

              lineItems.add('variant', (variant) => {
                variant.add('title')
              }),
                lineItems.add('quantity')
            }
            )
        })
      })
    })
    return this.client.send(mutation, { 'input': { lineItems: _lineItemsForCheckout } });
  }

  fetchCheckout(_checkoutid): Promise<any> {

    const id = this.client.variable('checkoutId', 'ID!');

    let query = this.client.query((root) => {
      root.add('node', { args: { id: _checkoutid }, alias: 'checkout' }, (node) => {
        node.add('id');
        node.addInlineFragmentOn('Checkout', (Checkout) => {
          Checkout.add('webUrl');
          Checkout.add('subtotalPrice'),
            Checkout.add('totalTax'),
            Checkout.add('totalPrice'),
            Checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {
              lineItems.add('variant', (variant) => {
                variant.add('title'),
                  variant.add('image', (image) => image.add('src')),
                  variant.add('price')
              }),
                lineItems.add('quantity')
            })
        })
      })
    });

    return this.client.send(query, { checkoutId: _checkoutid })
  }

  addVariantsToCheckout(_checkoutid, _lineItems): Promise<any> {

    const checkoutId = this.client.variable('checkoutId', 'ID!');
    const _lineItemsForCheckout = _lineItems.map(item => { return { 'id': item.id, 'variantId': item.variantId, 'quantity': item.quantity } })
    const lineItems = this.client.variable('lineItems', '[CheckoutLineItemInput!]!');

    const mutation = this.client.mutation('myMutation', [checkoutId, lineItems], (root) => {
      root.add('checkoutLineItemsAdd', { args: { checkoutId, lineItems } }, (checkoutLineItemsAdd) => {

        checkoutLineItemsAdd.add('userErrors', (userErrors) => {
          userErrors.add('message'),
            userErrors.add('field');
        });

        checkoutLineItemsAdd.add('checkout', (checkout) => {
          checkout.add('webUrl'),
            checkout.add('subtotalPrice'),
            checkout.add('totalTax'),
            checkout.add('totalPrice'),
            checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {
              lineItems.add('variant', (variant) => {
                variant.add('title'),
                  variant.add('image', (image) => image.add('src')),
                  variant.add('price')
              }),
                lineItems.add('quantity')
            })
        })
      })
    });

    return this.client.send(mutation, { checkoutId: _checkoutid, lineItems: _lineItemsForCheckout });

  }

  removeLineItem(_checkoutid, _lineItemId): Promise<any> {

    const checkoutId = this.client.variable('checkoutId', 'ID!');
    const lineItemIds = this.client.variable('lineItemIds', '[ID!]!');

    const mutation = this.client.mutation('myMutation', [checkoutId, lineItemIds], (root) => {
      root.add('checkoutLineItemsRemove', { args: { checkoutId, lineItemIds } }, (checkoutLineItemsRemove) => {

        checkoutLineItemsRemove.add('userErrors', (userErrors) => {
          userErrors.add('message'),
            userErrors.add('field');
        }),

          checkoutLineItemsRemove.add('checkout', (checkout) => {
            checkout.add('webUrl'),
              checkout.add('subtotalPrice'),
              checkout.add('totalTax'),
              checkout.add('totalPrice'),
              checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {
                lineItems.add('variant', (variant) => {
                  variant.add('title'),
                    variant.add('image', (image) => image.add('src')),
                    variant.add('price')
                }),
                  lineItems.add('quantity')
              })
          })
      })
    });

    return this.client.send(mutation, { checkoutId: _checkoutid, lineItemIds: [_lineItemId] });

  }

  updateLineItem(_checkoutid, _lineItems): Promise<any> {

    const _lineItemsForCheckout = _lineItems.map(item => { return { 'id': item.id, 'variantId': item.variantId, 'quantity': item.quantity } })

    const checkoutId = this.client.variable('checkoutId', 'ID!');
    const lineItems = this.client.variable('lineItems', '[CheckoutLineItemUpdateInput!]!');

    const mutation = this.client.mutation('myMutation', [checkoutId, lineItems], (root) => {
      root.add('checkoutLineItemsUpdate', { args: { checkoutId, lineItems } }, (checkoutLineItemsUpdate) => {

        checkoutLineItemsUpdate.add('userErrors', (userErrors) => {
          userErrors.add('message'),
            userErrors.add('field');
        });

        checkoutLineItemsUpdate.add('checkout', (checkout) => {
          checkout.add('webUrl'),
            checkout.add('subtotalPrice'),
            checkout.add('totalTax'),
            checkout.add('totalPrice'),
            checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {
              lineItems.add('variant', (variant) => {
                variant.add('title'),
                  variant.add('image', (image) => image.add('src')),
                  variant.add('price')
              }),
                lineItems.add('quantity')
            })
        })
      })
    });

    return this.client.send(mutation, { checkoutId: _checkoutid, lineItems: _lineItemsForCheckout });
  }

}
