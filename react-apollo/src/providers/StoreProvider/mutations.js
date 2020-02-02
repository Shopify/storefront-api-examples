import gql from 'graphql-tag';

const CheckoutFragment = gql`
  fragment CheckoutFragment on Checkout {
    id
    webUrl
    totalTax
    subtotalPrice
    totalPrice
    lineItems (first: 250) {
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
`;

export const createCheckout = gql`
  mutation checkoutCreate ($input: CheckoutCreateInput!){
    checkoutCreate(input: $input) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const checkoutLineItemsAdd = gql`
  mutation checkoutLineItemsAdd ($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const checkoutLineItemsUpdate = gql`
  mutation checkoutLineItemsUpdate ($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const checkoutLineItemsRemove = gql`
  mutation checkoutLineItemsRemove ($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const checkoutCustomerAssociate = gql`
  mutation checkoutCustomerAssociate($checkoutId: ID!, $customerAccessToken: String!) {
    checkoutCustomerAssociate(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
      userErrors {
        field
        message
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const customerCreate = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
      }
    }
  }
`;

export const customerAccessTokenCreate = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
			}
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export const customerAccessTokenDelete = gql`
	mutation customerAccessTokenDelete($customerAccessToken: String!) {
		customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
			deletedAccessToken
			deletedCustomerAccessTokenId
			userErrors {
				field
				message
			}
		}
	}
`;

export const customerUpdateInformation = gql`
	mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
		customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
			customer {
				id
			}
			customerAccessToken {
				accessToken
				expiresAt
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;

export const customerRecover = gql`
	mutation customerRecover($email: String!) {
		customerRecover(email: $email) {
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;

export const customerReset = gql`
	mutation customerReset($id: ID!, $input: CustomerResetInput!) {
		customerReset(id: $id, input: $input) {
			customer {
				id
			}
			customerAccessToken {
				accessToken
				expiresAt
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;
