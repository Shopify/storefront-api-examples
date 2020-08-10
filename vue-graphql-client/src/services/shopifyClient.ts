import axios from 'axios';
import { Product, ProductImage, ProductVariant } from '@/store/modules/products.types';

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
  static query(gqlData: string, successCallback: any, errorCallback: any) {
    const config = {
      headers: {
        'X-Shopify-Storefront-Access-Token': shopifyToken,
        'content-Type': 'application/graphql',
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

  static getAllProducts(successCallback: any, errorCallback: any) {
    const graphquery = `
      query {
        products(first: 2) {
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

    ShopifyClient.query(graphquery, (responseSuccess: {data: any}) => {
      console.info(responseSuccess.data);
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
    });
  }
}
