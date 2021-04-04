const allCollectionsQuery = ` {
    shop {
    collections(first:20) {
      edges{
        node {
          id
          handle
          title
        }
      }
    }
  }
}`;

const productsFromCollectionQuery = `query {
  shop {
    name
    description
    collectionByHandle(handle: "$collectionHandle") {
      products(first:20) {
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
                  id
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
}`;

const allProductsQuery = `query {
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
            description
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
                  id
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
}`;


const createCheckoutIdQuery = `mutation {
    checkoutCreate(input: {}) {
      userErrors {
        message
        field
      }
      checkout {
        id
      }
    }
}`;

const addToCartQuery = `mutation {
    checkoutLineItemsAdd(lineItems: [{ variantId: "$variantId", quantity: 1 }], checkoutId: "$checkoutId") {,
      checkout {
         id
         lineItems(first:2) {
           edges {
             node {
               id
               title
               quantity
             }
           }
         }
      }
    }
  }`;

  const productDetailsQuery = `query {
    node(id: "$productId") {
      id
      ... on Product {
        id
        title
        description
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
              id
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
  }`;

const cartQuery = `{
  node(id: "$checkoutId") {
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
            id
            title
            variant {
              id
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
`;

const removeFromCartQuery = `mutation {
  checkoutLineItemsRemove(lineItemIds: [$lineItemId], checkoutId: "$checkoutId") {,
    userErrors {
      message
      field
    }
    checkout {
      id
    }
  }
}`;

const updateQuantityQuery = ` mutation  {
  checkoutLineItemsUpdate(checkoutId: "$checkoutId", lineItems: [{ id: "$lineItemId", variantId: "$variantId", quantity: $quantity }]) {
    userErrors {
      message
      field
    }
    checkout {
      id
    }
  }
}`;


export default class GraphSql {

    construct() { }

    replaceAll(string, find, replace){
        return string.replace(
            new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"),
            replace
        );
    }

    allProductsQuery() {
        return allProductsQuery;
    }

    productsFromCollectionQuery(collectionHandle) {
      let string = productsFromCollectionQuery
      string = this.replaceAll(string, '$collectionHandle', collectionHandle)

      return string
    }

    addToCartQuery(variantId, checkoutId) {
        let string = addToCartQuery;
        string = this.replaceAll(string, '$variantId', variantId);
        string = this.replaceAll(string, '$checkoutId', checkoutId);

        return string
    }

    createCheckoutIdQuery() {
        return createCheckoutIdQuery;
    }

    productDetailsQuery(productId) {
      let string = productDetailsQuery;
      string = this.replaceAll(string, '$productId', productId);

      return string
    }

    cartQuery(checkoutId) {
      let string = cartQuery;
      string = this.replaceAll(string, '$checkoutId', checkoutId);
      return string;
    }

    removeFromCartQuery(lineItemId, checkoutId) {
      let string = removeFromCartQuery;
      string = this.replaceAll(string, '$lineItemId', lineItemId);
      string = this.replaceAll(string, '$checkoutId', checkoutId);

      return string;
      
    }

    updateQuantityQuery(lineItemId, variantId, quantity, checkoutId) {
      let string = updateQuantityQuery;
      string = this.replaceAll(string, '$lineItemId', lineItemId);
      string = this.replaceAll(string, '$variantId', variantId);
      string = this.replaceAll(string, '$quantity', quantity);
      string = this.replaceAll(string, '$checkoutId', checkoutId);

      return string
    }


    allCollectionsQuery() {
      return allCollectionsQuery;
    }

}