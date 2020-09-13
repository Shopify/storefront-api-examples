import axios from 'axios';
import { Product, ProductImage, ProductVariant } from '@/store/modules/products.types';
import { LineItem } from '@/store/modules/cart.types';

// ALL DEFUALT CONFIGURATION HERE
// export default axios.create({
//   baseURL,
//   headers: {
//     // "Authorization": "Bearer xxxxx"
//     'X-Shopify-Storefront-Access-Token': shopifyToken,
//     'content-Type': 'application/graphql',
//   },
// });

const baseDomain = 'https://graphql.myshopify.com';
const apiVersion = '2020-07';
const shopifyToken = 'dd4d4dc146542ba7763305d71d1b3d38';
const baseURL = `${baseDomain}/api/${apiVersion}/graphql.json`;

export default class ShopifyClient {
  static query(gqlData: any, successCallback: any, errorCallback: any) {
    const config = {
      headers: {
        'X-Shopify-Storefront-Access-Token': shopifyToken,
        'content-Type': 'application/json',
      },
    };

    axios.post(baseURL, gqlData, config)
      .then((successResponse) => {
        successCallback(successResponse);
      })
      .catch((errorResponse) => {
        console.log('Error', errorResponse);
        errorCallback(errorResponse);
      });
  }

  // Get the products data
  static getAllProducts(successCallback: any, errorCallback: any) {
    const graphquery = `
      query {
        products(first:20) {
          edges {
            node {
              id
              title
              description
              productType
              images(first: 1) {
                edges {
                  node {
                    altText
                    originalSrc
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      originalSrc
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    ShopifyClient.query({ query: graphquery }, (responseSuccess: {data: any}) => {
      const products = responseSuccess.data.data.products.edges;
      const normalizedProducts:Product[] = [];

      products.forEach((element: any) => {
        // Get the product image info
        // and prep it for the product object
        const images:ProductImage[] = [];

        // Normalize each image attached to the product
        element.node.images.edges.forEach((imageElement: any) => {
          const normalizedProductImage: ProductImage = {
            id: imageElement.node.id,
            src: imageElement.node.originalSrc,
            altText: imageElement.node.altText,
          };
          images.push(normalizedProductImage);
        });

        const variants:ProductVariant[] = [];

        // Normalize each variant for the product
        element.node.variants.edges.forEach((variantElement: any) => {
          const normalizedProductVariant: ProductVariant = {
            id: variantElement.node.id,
            title: variantElement.node.title,
            price: variantElement.node.priceV2.amount,
            currencyCode: variantElement.node.priceV2.currencyCode,
            imageSrc: variantElement.node.image.originalSrc,
            imageAltText: variantElement.node.image.altText,
          };
          variants.push(normalizedProductVariant);
        });

        // Put the product object together based on our local type (not what came out of shopify)
        const normalizedProduct = {
          id: element.node.id,
          description: element.node.description !== '' ? element.node.description : null,
          title: element.node.title,
          type: element.node.productType,
          images,
          variants,
        };
        normalizedProducts[element.node.id] = normalizedProduct;
      });
      successCallback(normalizedProducts);
    }, (responseError: any) => {
      console.log('You such', responseError);
      errorCallback(responseError);
    });
  }

  // Get the cart data
  // If there is an ID than use it, other get a new cart from Shopify
  static createCheckout(successCallback: any, errorCallback: any) {
    const graphquery = `
      mutation {
        checkoutCreate(input: {}) {
          checkout {
            id
            webUrl
            subtotalPrice
            totalTax
            totalPrice
          }
        }
      }
    `;

    ShopifyClient.query({ query: graphquery }, (responseSuccess: {data: any}) => {
      // Successfull call back
      console.info(responseSuccess.data);
      const response = responseSuccess.data.data.checkoutCreate.checkout;
      // let normalizedCartData: CartData | undefined;
      const normalizedCartData = {
        id: response.id,
        webUrl: response.webUrl,
        subtotalPrice: response.subtotalPrice,
        totalTax: response.totalTax,
        totalPrice: response.totalPrice,
      };
      successCallback(normalizedCartData);
    }, (responseError: any) => {
      // Error handling
      console.error('Error while trying to fetch cart: ', responseError);
      errorCallback(responseError);
    });
  }

  // Get the cart data
  // If there is an ID than use it, other get a new cart from Shopify
  static fetchExistingCart(
    payload : {
      checkoutId: string,
    },
    successCallback: any,
    errorCallback: any,
  ) {
    console.log('FETCH EXISTING CART: Checkout Id', payload.checkoutId);
    const graphquery = `
      query ($checkoutId: ID!) {
        node(id: $checkoutId) {
          ... on Checkout {
            id
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems(first: 250) {
              edges {
                node {
                  id
                  quantity
                  variant {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Setup the variables for the graph mutation
    // GraphQL will replace these variables in the query above
    const variables = {
      checkoutId: payload.checkoutId,
    };

    // Create an object that encapsulates both the query
    // and the variables and then send the payload to Shopify
    const graphPayload = {
      query: graphquery,
      variables,
    };

    ShopifyClient.query(graphPayload, (responseSuccess: {data: any}) => {
      // Successfull call back
      console.info(responseSuccess.data);
      const response = responseSuccess.data.data.node;

      const normalizedLineItems:LineItem[] = [];

      response.lineItems.edges.forEach((element: any) => {
        const normalizedLineItem : LineItem = {
          id: element.node.id,
          variantId: element.node.variant.id,
          quantity: element.node.quantity,
        };
        normalizedLineItems.push(normalizedLineItem);
      });

      const normalizedCartData = {
        id: response.id,
        webUrl: response.webUrl,
        subtotalPrice: response.subtotalPrice,
        totalTax: response.totalTax,
        totalPrice: response.totalPrice,
        lineItems: normalizedLineItems,
      };
      successCallback(normalizedCartData);
    }, (responseError: any) => {
      // Error handling
      console.error('Error while trying to fetch cart: ', responseError);
      errorCallback(responseError);
    });
  }

  // Get the cart data
  // If there is an ID than use it, other get a new cart from Shopify
  static addVariantToCart(
    payload : {
      checkoutId: string,
      variantId: string,
      quantity: number,
    },
    successCallback: any,
    errorCallback: any,
  ) {
    console.log('Payload', payload);
    const graphquery = `
      mutation ($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
        checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
          checkout {
            id
            subtotalPrice
            totalTax
            totalPrice
            lineItems(first: 250) {
              edges {
                node {
                  id
                  quantity
                  variant {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Setup the variables for the graph mutation
    // GraphQL will replace these variables in the query above
    const variables = {
      lineItems: [
        {
          variantId: payload.variantId,
          quantity: payload.quantity,
        },
      ],
      checkoutId: payload.checkoutId,
    };

    // Create an object that encapsulates both the query
    // and the variables and then send the payload to Shopify
    const graphPayload = {
      query: graphquery,
      variables,
    };

    ShopifyClient.query(
      graphPayload,
      (responseSuccess: {data: any}) => {
        // Successfull call back
        // Here we are getting all of the line items in the shopping cart with
        // the specified checkoutID. So we need to normalise the line items data
        // that comes back into the structure that the app is expecting and
        // TODO: Add Error Checking, right now only dealing with positive response
        console.info(responseSuccess);

        const response = responseSuccess.data.data.checkoutLineItemsAdd.checkout;
        // let normalizedCartData: CartData | undefined;
        const normalizedLineItems:LineItem[] = [];

        response.lineItems.edges.forEach((element: any) => {
          const normalizedLineItem : LineItem = {
            id: element.node.id,
            variantId: element.node.variant.id,
            quantity: element.node.quantity,
          };
          normalizedLineItems.push(normalizedLineItem);
        });

        const normalizedCartData = {
          subtotalPrice: response.subtotalPrice,
          totalTax: response.totalTax,
          totalPrice: response.totalPrice,
          lineItems: normalizedLineItems,
        };
        successCallback(normalizedCartData);
      },
      (responseError: any) => {
        // Error handling
        console.error('Error while trying to fetch cart: ', responseError);
        errorCallback(responseError);
      },
    );
  }

  // Remove a line item from the Checkout Cart
  // Get a checkoutId and a lineItemId and pass those on
  // to the API
  // https://shopify.dev/docs/storefront-api/reference/mutation/checkoutlineitemsremove
  static removeCheckoutLineItem(
    payload : {
      checkoutId: string,
      lineItemId: string,
    },
    successCallback: any,
    errorCallback: any,
  ) {
    // Create the graph query
    const graphquery = `
      mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
        checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
          checkout {
            id
            subtotalPrice
            totalTax
            totalPrice
            lineItems(first: 250) {
              edges {
                node {
                  id
                  quantity
                  variant {
                    id
                  }
                }
              }
            }
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    // Setup the variables for the graph mutation
    // GraphQL will replace these variables in the query above
    const variables = {
      checkoutId: payload.checkoutId,
      lineItemIds: [
        payload.lineItemId,
      ],
    };

    // Create an object that encapsulates both the query
    // and the variables and then send the payload to Shopify
    const graphPayload = {
      query: graphquery,
      variables,
    };

    ShopifyClient.query(
      graphPayload,
      (responseSuccess: {data: any}) => {
        console.info(responseSuccess);

        const response = responseSuccess.data.data.checkoutLineItemsRemove.checkout;
        const normalizedLineItems:LineItem[] = [];

        response.lineItems.edges.forEach((element: any) => {
          const normalizedLineItem : LineItem = {
            id: element.node.id,
            variantId: element.node.variant.id,
            quantity: element.node.quantity,
          };
          normalizedLineItems.push(normalizedLineItem);
        });

        const normalizedCartData = {
          subtotalPrice: response.subtotalPrice,
          totalTax: response.totalTax,
          totalPrice: response.totalPrice,
          lineItems: normalizedLineItems,
        };
        successCallback(normalizedCartData);
      },
      (responseError: any) => {
        // Error handling
        console.error('Error while trying to remove checkout line item: ', responseError);
        errorCallback(responseError);
      },
    );
  }

  // Update a line item from the Checkout Cart
  // Get a checkoutId, lineItemId, variantId, new quantity
  // and pass those on to the API
  // https://shopify.dev/docs/storefront-api/reference/mutation/checkoutlineitemsupdate
  static updateCheckoutLineItem(
    payload : {
      checkoutId: string,
      lineItem: LineItem,
    },
    successCallback: any,
    errorCallback: any,
  ) {
    // Create the graph query
    const graphquery = `
      mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
        checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
          checkout {
            id
            subtotalPrice
            totalTax
            totalPrice
            lineItems(first: 250) {
              edges {
                node {
                  id
                  quantity
                  variant {
                    id
                  }
                }
              }
            }
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    // Setup the variables for the graph mutation
    // GraphQL will replace these variables in the query above
    const variables = {
      checkoutId: payload.checkoutId,
      lineItems: [
        payload.lineItem,
      ],
    };

    // Create an object that encapsulates both the query
    // and the variables and then send the payload to Shopify
    const graphPayload = {
      query: graphquery,
      variables,
    };

    ShopifyClient.query(
      graphPayload,
      (responseSuccess: {data: any}) => {
        console.info(responseSuccess);

        const response = responseSuccess.data.data.checkoutLineItemsUpdate.checkout;
        const normalizedLineItems:LineItem[] = [];

        response.lineItems.edges.forEach((element: any) => {
          const normalizedLineItem : LineItem = {
            id: element.node.id,
            variantId: element.node.variant.id,
            quantity: element.node.quantity,
          };
          normalizedLineItems.push(normalizedLineItem);
        });

        const normalizedCartData = {
          subtotalPrice: response.subtotalPrice,
          totalTax: response.totalTax,
          totalPrice: response.totalPrice,
          lineItems: normalizedLineItems,
        };
        successCallback(normalizedCartData);
      },
      (responseError: any) => {
        // Error handling
        console.error('Error while trying to updates checkout line item: ', responseError);
        errorCallback(responseError);
      },
    );
  }
}
