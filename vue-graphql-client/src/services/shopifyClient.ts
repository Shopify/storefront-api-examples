import axios from 'axios';
import { Product, ProductImage } from '@/store/modules/products.types';

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
        shop {
          name
          description
          products(first:10, query:"product_type:Dress") {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                id
                title
                description
                availableForSale
                images(first: 10) {
                  edges {
                    node {
                      id
                      src
                      altText
                    }
                  }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      price
                      title
                      image {
                        src
                        id
                        altText
                      }
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
      const products = responseSuccess.data.data.shop.products.edges;
      const normalizedProducts:Product[] = [];

      products.forEach((element: any) => {
        // Get the product image info
        // and prep it for the product object
        const images:ProductImage[] = [];

        element.node.images.edges.forEach((imageElement: any) => {
          const normalizedProductImage = {
            id: imageElement.node.id,
            src: imageElement.node.src,
            altText: imageElement.node.altText,
          };
          images.push(normalizedProductImage);
        });

        const normalizedProduct = {
          id: element.node.id,
          description: element.node.description !== '' ? element.node.description : null,
          title: element.node.title,
          images,
          variants: [],
        };
        normalizedProducts[element.node.id] = normalizedProduct;
      });
      successCallback(normalizedProducts);
    }, (responseError: any) => {
      console.log('You such', responseError);
    });
  }
}
