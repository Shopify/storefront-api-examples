const ApiVersion = {
  "name": "ApiVersion",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "displayName": "String",
    "handle": "String",
    "supported": "Boolean"
  },
  "implementsNode": false
};

const AppliedGiftCard = {
  "name": "AppliedGiftCard",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "amountUsed": "Money",
    "amountUsedV2": "MoneyV2",
    "balance": "Money",
    "balanceV2": "MoneyV2",
    "id": "ID",
    "lastCharacters": "String",
    "presentmentAmountUsed": "MoneyV2"
  },
  "implementsNode": true
};

const Article = {
  "name": "Article",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "author": "ArticleAuthor",
    "authorV2": "ArticleAuthor",
    "blog": "Blog",
    "comments": "CommentConnection",
    "content": "String",
    "contentHtml": "HTML",
    "excerpt": "String",
    "excerptHtml": "HTML",
    "handle": "String",
    "id": "ID",
    "image": "Image",
    "publishedAt": "DateTime",
    "seo": "SEO",
    "tags": "String",
    "title": "String",
    "url": "URL"
  },
  "implementsNode": true
};

const ArticleAuthor = {
  "name": "ArticleAuthor",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "bio": "String",
    "email": "String",
    "firstName": "String",
    "lastName": "String",
    "name": "String"
  },
  "implementsNode": false
};

const ArticleConnection = {
  "name": "ArticleConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "ArticleEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const ArticleEdge = {
  "name": "ArticleEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Article"
  },
  "implementsNode": false
};

const ArticleSortKeys = {
  "name": "ArticleSortKeys",
  "kind": "ENUM"
};

const Attribute = {
  "name": "Attribute",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "key": "String",
    "value": "String"
  },
  "implementsNode": false
};

const AttributeInput = {
  "name": "AttributeInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "key": "String",
    "value": "String"
  }
};

const AutomaticDiscountApplication = {
  "name": "AutomaticDiscountApplication",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "allocationMethod": "DiscountApplicationAllocationMethod",
    "targetSelection": "DiscountApplicationTargetSelection",
    "targetType": "DiscountApplicationTargetType",
    "title": "String",
    "value": "PricingValue"
  },
  "implementsNode": false
};

const AvailableShippingRates = {
  "name": "AvailableShippingRates",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "ready": "Boolean",
    "shippingRates": "ShippingRate"
  },
  "implementsNode": false
};

const Blog = {
  "name": "Blog",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "articleByHandle": "Article",
    "articles": "ArticleConnection",
    "authors": "ArticleAuthor",
    "handle": "String",
    "id": "ID",
    "title": "String",
    "url": "URL"
  },
  "implementsNode": true
};

const BlogConnection = {
  "name": "BlogConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "BlogEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const BlogEdge = {
  "name": "BlogEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Blog"
  },
  "implementsNode": false
};

const BlogSortKeys = {
  "name": "BlogSortKeys",
  "kind": "ENUM"
};

const Boolean = {
  "name": "Boolean",
  "kind": "SCALAR"
};

const CardBrand = {
  "name": "CardBrand",
  "kind": "ENUM"
};

const Checkout = {
  "name": "Checkout",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "appliedGiftCards": "AppliedGiftCard",
    "availableShippingRates": "AvailableShippingRates",
    "completedAt": "DateTime",
    "createdAt": "DateTime",
    "currencyCode": "CurrencyCode",
    "customAttributes": "Attribute",
    "customer": "Customer",
    "discountApplications": "DiscountApplicationConnection",
    "email": "String",
    "id": "ID",
    "lineItems": "CheckoutLineItemConnection",
    "lineItemsSubtotalPrice": "MoneyV2",
    "note": "String",
    "order": "Order",
    "orderStatusUrl": "URL",
    "paymentDue": "Money",
    "paymentDueV2": "MoneyV2",
    "ready": "Boolean",
    "requiresShipping": "Boolean",
    "shippingAddress": "MailingAddress",
    "shippingDiscountAllocations": "DiscountAllocation",
    "shippingLine": "ShippingRate",
    "subtotalPrice": "Money",
    "subtotalPriceV2": "MoneyV2",
    "taxExempt": "Boolean",
    "taxesIncluded": "Boolean",
    "totalPrice": "Money",
    "totalPriceV2": "MoneyV2",
    "totalTax": "Money",
    "totalTaxV2": "MoneyV2",
    "updatedAt": "DateTime",
    "webUrl": "URL"
  },
  "implementsNode": true
};

const CheckoutAttributesUpdateInput = {
  "name": "CheckoutAttributesUpdateInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "note": "String",
    "customAttributes": "AttributeInput",
    "allowPartialAddresses": "Boolean"
  }
};

const CheckoutAttributesUpdatePayload = {
  "name": "CheckoutAttributesUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutAttributesUpdateV2Input = {
  "name": "CheckoutAttributesUpdateV2Input",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "note": "String",
    "customAttributes": "AttributeInput",
    "allowPartialAddresses": "Boolean"
  }
};

const CheckoutAttributesUpdateV2Payload = {
  "name": "CheckoutAttributesUpdateV2Payload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCompleteFreePayload = {
  "name": "CheckoutCompleteFreePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCompleteWithCreditCardPayload = {
  "name": "CheckoutCompleteWithCreditCardPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "payment": "Payment",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCompleteWithCreditCardV2Payload = {
  "name": "CheckoutCompleteWithCreditCardV2Payload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "payment": "Payment",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCompleteWithTokenizedPaymentPayload = {
  "name": "CheckoutCompleteWithTokenizedPaymentPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "payment": "Payment",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCompleteWithTokenizedPaymentV2Payload = {
  "name": "CheckoutCompleteWithTokenizedPaymentV2Payload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "payment": "Payment",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCreateInput = {
  "name": "CheckoutCreateInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "email": "String",
    "lineItems": "CheckoutLineItemInput",
    "shippingAddress": "MailingAddressInput",
    "note": "String",
    "customAttributes": "AttributeInput",
    "allowPartialAddresses": "Boolean",
    "presentmentCurrencyCode": "CurrencyCode"
  }
};

const CheckoutCreatePayload = {
  "name": "CheckoutCreatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCustomerAssociatePayload = {
  "name": "CheckoutCustomerAssociatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "customer": "Customer",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCustomerAssociateV2Payload = {
  "name": "CheckoutCustomerAssociateV2Payload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "customer": "Customer",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCustomerDisassociatePayload = {
  "name": "CheckoutCustomerDisassociatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutCustomerDisassociateV2Payload = {
  "name": "CheckoutCustomerDisassociateV2Payload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutDiscountCodeApplyPayload = {
  "name": "CheckoutDiscountCodeApplyPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutDiscountCodeApplyV2Payload = {
  "name": "CheckoutDiscountCodeApplyV2Payload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutDiscountCodeRemovePayload = {
  "name": "CheckoutDiscountCodeRemovePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutEmailUpdatePayload = {
  "name": "CheckoutEmailUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutEmailUpdateV2Payload = {
  "name": "CheckoutEmailUpdateV2Payload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutErrorCode = {
  "name": "CheckoutErrorCode",
  "kind": "ENUM"
};

const CheckoutGiftCardApplyPayload = {
  "name": "CheckoutGiftCardApplyPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutGiftCardRemovePayload = {
  "name": "CheckoutGiftCardRemovePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutGiftCardRemoveV2Payload = {
  "name": "CheckoutGiftCardRemoveV2Payload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutGiftCardsAppendPayload = {
  "name": "CheckoutGiftCardsAppendPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutLineItem = {
  "name": "CheckoutLineItem",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customAttributes": "Attribute",
    "discountAllocations": "DiscountAllocation",
    "id": "ID",
    "quantity": "Int",
    "title": "String",
    "variant": "ProductVariant"
  },
  "implementsNode": true
};

const CheckoutLineItemConnection = {
  "name": "CheckoutLineItemConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "CheckoutLineItemEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const CheckoutLineItemEdge = {
  "name": "CheckoutLineItemEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "CheckoutLineItem"
  },
  "implementsNode": false
};

const CheckoutLineItemInput = {
  "name": "CheckoutLineItemInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "customAttributes": "AttributeInput",
    "quantity": "Int",
    "variantId": "ID"
  }
};

const CheckoutLineItemUpdateInput = {
  "name": "CheckoutLineItemUpdateInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "id": "ID",
    "variantId": "ID",
    "quantity": "Int",
    "customAttributes": "AttributeInput"
  }
};

const CheckoutLineItemsAddPayload = {
  "name": "CheckoutLineItemsAddPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutLineItemsRemovePayload = {
  "name": "CheckoutLineItemsRemovePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutLineItemsReplacePayload = {
  "name": "CheckoutLineItemsReplacePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "userErrors": "CheckoutUserError"
  },
  "implementsNode": false
};

const CheckoutLineItemsUpdatePayload = {
  "name": "CheckoutLineItemsUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutShippingAddressUpdatePayload = {
  "name": "CheckoutShippingAddressUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutShippingAddressUpdateV2Payload = {
  "name": "CheckoutShippingAddressUpdateV2Payload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutShippingLineUpdatePayload = {
  "name": "CheckoutShippingLineUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "checkoutUserErrors": "CheckoutUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CheckoutUserError = {
  "name": "CheckoutUserError",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "code": "CheckoutErrorCode",
    "field": "String",
    "message": "String"
  },
  "implementsNode": false
};

const Collection = {
  "name": "Collection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "description": "String",
    "descriptionHtml": "HTML",
    "handle": "String",
    "id": "ID",
    "image": "Image",
    "products": "ProductConnection",
    "title": "String",
    "updatedAt": "DateTime"
  },
  "implementsNode": true
};

const CollectionConnection = {
  "name": "CollectionConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "CollectionEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const CollectionEdge = {
  "name": "CollectionEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Collection"
  },
  "implementsNode": false
};

const CollectionSortKeys = {
  "name": "CollectionSortKeys",
  "kind": "ENUM"
};

const Comment = {
  "name": "Comment",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "author": "CommentAuthor",
    "content": "String",
    "contentHtml": "HTML",
    "id": "ID"
  },
  "implementsNode": true
};

const CommentAuthor = {
  "name": "CommentAuthor",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "email": "String",
    "name": "String"
  },
  "implementsNode": false
};

const CommentConnection = {
  "name": "CommentConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "CommentEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const CommentEdge = {
  "name": "CommentEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Comment"
  },
  "implementsNode": false
};

const CountryCode = {
  "name": "CountryCode",
  "kind": "ENUM"
};

const CreditCard = {
  "name": "CreditCard",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "brand": "String",
    "expiryMonth": "Int",
    "expiryYear": "Int",
    "firstDigits": "String",
    "firstName": "String",
    "lastDigits": "String",
    "lastName": "String",
    "maskedNumber": "String"
  },
  "implementsNode": false
};

const CreditCardPaymentInput = {
  "name": "CreditCardPaymentInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "amount": "Money",
    "idempotencyKey": "String",
    "billingAddress": "MailingAddressInput",
    "vaultId": "String",
    "test": "Boolean"
  }
};

const CreditCardPaymentInputV2 = {
  "name": "CreditCardPaymentInputV2",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "paymentAmount": "MoneyInput",
    "idempotencyKey": "String",
    "billingAddress": "MailingAddressInput",
    "vaultId": "String",
    "test": "Boolean"
  }
};

const CropRegion = {
  "name": "CropRegion",
  "kind": "ENUM"
};

const CurrencyCode = {
  "name": "CurrencyCode",
  "kind": "ENUM"
};

const Customer = {
  "name": "Customer",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "acceptsMarketing": "Boolean",
    "addresses": "MailingAddressConnection",
    "createdAt": "DateTime",
    "defaultAddress": "MailingAddress",
    "displayName": "String",
    "email": "String",
    "firstName": "String",
    "id": "ID",
    "lastIncompleteCheckout": "Checkout",
    "lastName": "String",
    "orders": "OrderConnection",
    "phone": "String",
    "tags": "String",
    "updatedAt": "DateTime"
  },
  "implementsNode": false
};

const CustomerAccessToken = {
  "name": "CustomerAccessToken",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "accessToken": "String",
    "expiresAt": "DateTime"
  },
  "implementsNode": false
};

const CustomerAccessTokenCreateInput = {
  "name": "CustomerAccessTokenCreateInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "email": "String",
    "password": "String"
  }
};

const CustomerAccessTokenCreatePayload = {
  "name": "CustomerAccessTokenCreatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customerAccessToken": "CustomerAccessToken",
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerAccessTokenDeletePayload = {
  "name": "CustomerAccessTokenDeletePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "deletedAccessToken": "String",
    "deletedCustomerAccessTokenId": "String",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerAccessTokenRenewPayload = {
  "name": "CustomerAccessTokenRenewPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customerAccessToken": "CustomerAccessToken",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerActivateInput = {
  "name": "CustomerActivateInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "activationToken": "String",
    "password": "String"
  }
};

const CustomerActivatePayload = {
  "name": "CustomerActivatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customer": "Customer",
    "customerAccessToken": "CustomerAccessToken",
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerAddressCreatePayload = {
  "name": "CustomerAddressCreatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customerAddress": "MailingAddress",
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerAddressDeletePayload = {
  "name": "CustomerAddressDeletePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customerUserErrors": "CustomerUserError",
    "deletedCustomerAddressId": "String",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerAddressUpdatePayload = {
  "name": "CustomerAddressUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customerAddress": "MailingAddress",
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerCreateInput = {
  "name": "CustomerCreateInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "firstName": "String",
    "lastName": "String",
    "email": "String",
    "phone": "String",
    "password": "String",
    "acceptsMarketing": "Boolean"
  }
};

const CustomerCreatePayload = {
  "name": "CustomerCreatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customer": "Customer",
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerDefaultAddressUpdatePayload = {
  "name": "CustomerDefaultAddressUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customer": "Customer",
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerErrorCode = {
  "name": "CustomerErrorCode",
  "kind": "ENUM"
};

const CustomerRecoverPayload = {
  "name": "CustomerRecoverPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerResetByUrlPayload = {
  "name": "CustomerResetByUrlPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customer": "Customer",
    "customerAccessToken": "CustomerAccessToken",
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerResetInput = {
  "name": "CustomerResetInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "resetToken": "String",
    "password": "String"
  }
};

const CustomerResetPayload = {
  "name": "CustomerResetPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customer": "Customer",
    "customerAccessToken": "CustomerAccessToken",
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerUpdateInput = {
  "name": "CustomerUpdateInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "firstName": "String",
    "lastName": "String",
    "email": "String",
    "phone": "String",
    "password": "String",
    "acceptsMarketing": "Boolean"
  }
};

const CustomerUpdatePayload = {
  "name": "CustomerUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customer": "Customer",
    "customerAccessToken": "CustomerAccessToken",
    "customerUserErrors": "CustomerUserError",
    "userErrors": "UserError"
  },
  "implementsNode": false
};

const CustomerUserError = {
  "name": "CustomerUserError",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "code": "CustomerErrorCode",
    "field": "String",
    "message": "String"
  },
  "implementsNode": false
};

const DateTime = {
  "name": "DateTime",
  "kind": "SCALAR"
};

const Decimal = {
  "name": "Decimal",
  "kind": "SCALAR"
};

const DigitalWallet = {
  "name": "DigitalWallet",
  "kind": "ENUM"
};

const DiscountAllocation = {
  "name": "DiscountAllocation",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "allocatedAmount": "MoneyV2",
    "discountApplication": "DiscountApplication"
  },
  "implementsNode": false
};

const DiscountApplication = {
  "name": "DiscountApplication",
  "kind": "INTERFACE",
  "fieldBaseTypes": {
    "allocationMethod": "DiscountApplicationAllocationMethod",
    "targetSelection": "DiscountApplicationTargetSelection",
    "targetType": "DiscountApplicationTargetType",
    "value": "PricingValue"
  },
  "possibleTypes": ["AutomaticDiscountApplication", "DiscountCodeApplication", "ManualDiscountApplication", "ScriptDiscountApplication"]
};

const DiscountApplicationAllocationMethod = {
  "name": "DiscountApplicationAllocationMethod",
  "kind": "ENUM"
};

const DiscountApplicationConnection = {
  "name": "DiscountApplicationConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "DiscountApplicationEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const DiscountApplicationEdge = {
  "name": "DiscountApplicationEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "DiscountApplication"
  },
  "implementsNode": false
};

const DiscountApplicationTargetSelection = {
  "name": "DiscountApplicationTargetSelection",
  "kind": "ENUM"
};

const DiscountApplicationTargetType = {
  "name": "DiscountApplicationTargetType",
  "kind": "ENUM"
};

const DiscountCodeApplication = {
  "name": "DiscountCodeApplication",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "allocationMethod": "DiscountApplicationAllocationMethod",
    "applicable": "Boolean",
    "code": "String",
    "targetSelection": "DiscountApplicationTargetSelection",
    "targetType": "DiscountApplicationTargetType",
    "value": "PricingValue"
  },
  "implementsNode": false
};

const DisplayableError = {
  "name": "DisplayableError",
  "kind": "INTERFACE",
  "fieldBaseTypes": {
    "field": "String",
    "message": "String"
  },
  "possibleTypes": ["CheckoutUserError", "CustomerUserError", "UserError"]
};

const Domain = {
  "name": "Domain",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "host": "String",
    "sslEnabled": "Boolean",
    "url": "URL"
  },
  "implementsNode": false
};

const Float = {
  "name": "Float",
  "kind": "SCALAR"
};

const Fulfillment = {
  "name": "Fulfillment",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "fulfillmentLineItems": "FulfillmentLineItemConnection",
    "trackingCompany": "String",
    "trackingInfo": "FulfillmentTrackingInfo"
  },
  "implementsNode": false
};

const FulfillmentLineItem = {
  "name": "FulfillmentLineItem",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "lineItem": "OrderLineItem",
    "quantity": "Int"
  },
  "implementsNode": false
};

const FulfillmentLineItemConnection = {
  "name": "FulfillmentLineItemConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "FulfillmentLineItemEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const FulfillmentLineItemEdge = {
  "name": "FulfillmentLineItemEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "FulfillmentLineItem"
  },
  "implementsNode": false
};

const FulfillmentTrackingInfo = {
  "name": "FulfillmentTrackingInfo",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "number": "String",
    "url": "URL"
  },
  "implementsNode": false
};

const HTML = {
  "name": "HTML",
  "kind": "SCALAR"
};

const HasMetafields = {
  "name": "HasMetafields",
  "kind": "INTERFACE",
  "fieldBaseTypes": {
    "metafield": "Metafield",
    "metafields": "MetafieldConnection"
  },
  "possibleTypes": ["Product", "ProductVariant"]
};

const ID = {
  "name": "ID",
  "kind": "SCALAR"
};

const Image = {
  "name": "Image",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "altText": "String",
    "id": "ID",
    "originalSrc": "URL",
    "src": "URL",
    "transformedSrc": "URL"
  },
  "implementsNode": false
};

const ImageConnection = {
  "name": "ImageConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "ImageEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const ImageContentType = {
  "name": "ImageContentType",
  "kind": "ENUM"
};

const ImageEdge = {
  "name": "ImageEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Image"
  },
  "implementsNode": false
};

const Int = {
  "name": "Int",
  "kind": "SCALAR"
};

const MailingAddress = {
  "name": "MailingAddress",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "address1": "String",
    "address2": "String",
    "city": "String",
    "company": "String",
    "country": "String",
    "countryCode": "String",
    "countryCodeV2": "CountryCode",
    "firstName": "String",
    "formatted": "String",
    "formattedArea": "String",
    "id": "ID",
    "lastName": "String",
    "latitude": "Float",
    "longitude": "Float",
    "name": "String",
    "phone": "String",
    "province": "String",
    "provinceCode": "String",
    "zip": "String"
  },
  "implementsNode": true
};

const MailingAddressConnection = {
  "name": "MailingAddressConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "MailingAddressEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const MailingAddressEdge = {
  "name": "MailingAddressEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "MailingAddress"
  },
  "implementsNode": false
};

const MailingAddressInput = {
  "name": "MailingAddressInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "address1": "String",
    "address2": "String",
    "city": "String",
    "company": "String",
    "country": "String",
    "firstName": "String",
    "lastName": "String",
    "phone": "String",
    "province": "String",
    "zip": "String"
  }
};

const ManualDiscountApplication = {
  "name": "ManualDiscountApplication",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "allocationMethod": "DiscountApplicationAllocationMethod",
    "description": "String",
    "targetSelection": "DiscountApplicationTargetSelection",
    "targetType": "DiscountApplicationTargetType",
    "title": "String",
    "value": "PricingValue"
  },
  "implementsNode": false
};

const Metafield = {
  "name": "Metafield",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "description": "String",
    "id": "ID",
    "key": "String",
    "namespace": "String",
    "parentResource": "MetafieldParentResource",
    "value": "String",
    "valueType": "MetafieldValueType"
  },
  "implementsNode": true
};

const MetafieldConnection = {
  "name": "MetafieldConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "MetafieldEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const MetafieldEdge = {
  "name": "MetafieldEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Metafield"
  },
  "implementsNode": false
};

const MetafieldParentResource = {
  "name": "MetafieldParentResource",
  "kind": "UNION"
};

const MetafieldValueType = {
  "name": "MetafieldValueType",
  "kind": "ENUM"
};

const Money = {
  "name": "Money",
  "kind": "SCALAR"
};

const MoneyInput = {
  "name": "MoneyInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "amount": "Decimal",
    "currencyCode": "CurrencyCode"
  }
};

const MoneyV2 = {
  "name": "MoneyV2",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "amount": "Decimal",
    "currencyCode": "CurrencyCode"
  },
  "implementsNode": false
};

const Mutation = {
  "name": "Mutation",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkoutAttributesUpdate": "CheckoutAttributesUpdatePayload",
    "checkoutAttributesUpdateV2": "CheckoutAttributesUpdateV2Payload",
    "checkoutCompleteFree": "CheckoutCompleteFreePayload",
    "checkoutCompleteWithCreditCard": "CheckoutCompleteWithCreditCardPayload",
    "checkoutCompleteWithCreditCardV2": "CheckoutCompleteWithCreditCardV2Payload",
    "checkoutCompleteWithTokenizedPayment": "CheckoutCompleteWithTokenizedPaymentPayload",
    "checkoutCompleteWithTokenizedPaymentV2": "CheckoutCompleteWithTokenizedPaymentV2Payload",
    "checkoutCreate": "CheckoutCreatePayload",
    "checkoutCustomerAssociate": "CheckoutCustomerAssociatePayload",
    "checkoutCustomerAssociateV2": "CheckoutCustomerAssociateV2Payload",
    "checkoutCustomerDisassociate": "CheckoutCustomerDisassociatePayload",
    "checkoutCustomerDisassociateV2": "CheckoutCustomerDisassociateV2Payload",
    "checkoutDiscountCodeApply": "CheckoutDiscountCodeApplyPayload",
    "checkoutDiscountCodeApplyV2": "CheckoutDiscountCodeApplyV2Payload",
    "checkoutDiscountCodeRemove": "CheckoutDiscountCodeRemovePayload",
    "checkoutEmailUpdate": "CheckoutEmailUpdatePayload",
    "checkoutEmailUpdateV2": "CheckoutEmailUpdateV2Payload",
    "checkoutGiftCardApply": "CheckoutGiftCardApplyPayload",
    "checkoutGiftCardRemove": "CheckoutGiftCardRemovePayload",
    "checkoutGiftCardRemoveV2": "CheckoutGiftCardRemoveV2Payload",
    "checkoutGiftCardsAppend": "CheckoutGiftCardsAppendPayload",
    "checkoutLineItemsAdd": "CheckoutLineItemsAddPayload",
    "checkoutLineItemsRemove": "CheckoutLineItemsRemovePayload",
    "checkoutLineItemsReplace": "CheckoutLineItemsReplacePayload",
    "checkoutLineItemsUpdate": "CheckoutLineItemsUpdatePayload",
    "checkoutShippingAddressUpdate": "CheckoutShippingAddressUpdatePayload",
    "checkoutShippingAddressUpdateV2": "CheckoutShippingAddressUpdateV2Payload",
    "checkoutShippingLineUpdate": "CheckoutShippingLineUpdatePayload",
    "customerAccessTokenCreate": "CustomerAccessTokenCreatePayload",
    "customerAccessTokenDelete": "CustomerAccessTokenDeletePayload",
    "customerAccessTokenRenew": "CustomerAccessTokenRenewPayload",
    "customerActivate": "CustomerActivatePayload",
    "customerAddressCreate": "CustomerAddressCreatePayload",
    "customerAddressDelete": "CustomerAddressDeletePayload",
    "customerAddressUpdate": "CustomerAddressUpdatePayload",
    "customerCreate": "CustomerCreatePayload",
    "customerDefaultAddressUpdate": "CustomerDefaultAddressUpdatePayload",
    "customerRecover": "CustomerRecoverPayload",
    "customerReset": "CustomerResetPayload",
    "customerResetByUrl": "CustomerResetByUrlPayload",
    "customerUpdate": "CustomerUpdatePayload"
  },
  "implementsNode": false,
  "relayInputObjectBaseTypes": {
    "checkoutAttributesUpdate": "CheckoutAttributesUpdateInput",
    "checkoutAttributesUpdateV2": "CheckoutAttributesUpdateV2Input",
    "checkoutCreate": "CheckoutCreateInput",
    "customerAccessTokenCreate": "CustomerAccessTokenCreateInput",
    "customerActivate": "CustomerActivateInput",
    "customerCreate": "CustomerCreateInput",
    "customerReset": "CustomerResetInput"
  }
};

const Node = {
  "name": "Node",
  "kind": "INTERFACE",
  "fieldBaseTypes": {
    "id": "ID"
  },
  "possibleTypes": ["AppliedGiftCard", "Article", "Blog", "Checkout", "CheckoutLineItem", "Collection", "Comment", "MailingAddress", "Metafield", "Order", "Page", "Payment", "Product", "ProductOption", "ProductVariant", "ShopPolicy"]
};

const Order = {
  "name": "Order",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "currencyCode": "CurrencyCode",
    "customerLocale": "String",
    "customerUrl": "URL",
    "discountApplications": "DiscountApplicationConnection",
    "email": "String",
    "id": "ID",
    "lineItems": "OrderLineItemConnection",
    "name": "String",
    "orderNumber": "Int",
    "phone": "String",
    "processedAt": "DateTime",
    "shippingAddress": "MailingAddress",
    "shippingDiscountAllocations": "DiscountAllocation",
    "statusUrl": "URL",
    "subtotalPrice": "Money",
    "subtotalPriceV2": "MoneyV2",
    "successfulFulfillments": "Fulfillment",
    "totalPrice": "Money",
    "totalPriceV2": "MoneyV2",
    "totalRefunded": "Money",
    "totalRefundedV2": "MoneyV2",
    "totalShippingPrice": "Money",
    "totalShippingPriceV2": "MoneyV2",
    "totalTax": "Money",
    "totalTaxV2": "MoneyV2"
  },
  "implementsNode": true
};

const OrderConnection = {
  "name": "OrderConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "OrderEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const OrderEdge = {
  "name": "OrderEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Order"
  },
  "implementsNode": false
};

const OrderLineItem = {
  "name": "OrderLineItem",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customAttributes": "Attribute",
    "discountAllocations": "DiscountAllocation",
    "quantity": "Int",
    "title": "String",
    "variant": "ProductVariant"
  },
  "implementsNode": false
};

const OrderLineItemConnection = {
  "name": "OrderLineItemConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "OrderLineItemEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const OrderLineItemEdge = {
  "name": "OrderLineItemEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "OrderLineItem"
  },
  "implementsNode": false
};

const OrderSortKeys = {
  "name": "OrderSortKeys",
  "kind": "ENUM"
};

const Page = {
  "name": "Page",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "body": "HTML",
    "bodySummary": "String",
    "createdAt": "DateTime",
    "handle": "String",
    "id": "ID",
    "title": "String",
    "updatedAt": "DateTime",
    "url": "URL"
  },
  "implementsNode": true
};

const PageConnection = {
  "name": "PageConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "PageEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const PageEdge = {
  "name": "PageEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Page"
  },
  "implementsNode": false
};

const PageInfo = {
  "name": "PageInfo",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "hasNextPage": "Boolean",
    "hasPreviousPage": "Boolean"
  },
  "implementsNode": false
};

const PageSortKeys = {
  "name": "PageSortKeys",
  "kind": "ENUM"
};

const Payment = {
  "name": "Payment",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "amount": "Money",
    "amountV2": "MoneyV2",
    "billingAddress": "MailingAddress",
    "checkout": "Checkout",
    "creditCard": "CreditCard",
    "errorMessage": "String",
    "id": "ID",
    "idempotencyKey": "String",
    "ready": "Boolean",
    "test": "Boolean",
    "transaction": "Transaction"
  },
  "implementsNode": true
};

const PaymentSettings = {
  "name": "PaymentSettings",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "acceptedCardBrands": "CardBrand",
    "cardVaultUrl": "URL",
    "countryCode": "CountryCode",
    "currencyCode": "CurrencyCode",
    "enabledPresentmentCurrencies": "CurrencyCode",
    "shopifyPaymentsAccountId": "String",
    "supportedDigitalWallets": "DigitalWallet"
  },
  "implementsNode": false
};

const PricingPercentageValue = {
  "name": "PricingPercentageValue",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "percentage": "Float"
  },
  "implementsNode": false
};

const PricingValue = {
  "name": "PricingValue",
  "kind": "UNION"
};

const Product = {
  "name": "Product",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "availableForSale": "Boolean",
    "collections": "CollectionConnection",
    "createdAt": "DateTime",
    "description": "String",
    "descriptionHtml": "HTML",
    "handle": "String",
    "id": "ID",
    "images": "ImageConnection",
    "metafield": "Metafield",
    "metafields": "MetafieldConnection",
    "onlineStoreUrl": "URL",
    "options": "ProductOption",
    "presentmentPriceRanges": "ProductPriceRangeConnection",
    "priceRange": "ProductPriceRange",
    "productType": "String",
    "publishedAt": "DateTime",
    "tags": "String",
    "title": "String",
    "updatedAt": "DateTime",
    "variantBySelectedOptions": "ProductVariant",
    "variants": "ProductVariantConnection",
    "vendor": "String"
  },
  "implementsNode": true
};

const ProductCollectionSortKeys = {
  "name": "ProductCollectionSortKeys",
  "kind": "ENUM"
};

const ProductConnection = {
  "name": "ProductConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "ProductEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const ProductEdge = {
  "name": "ProductEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Product"
  },
  "implementsNode": false
};

const ProductImageSortKeys = {
  "name": "ProductImageSortKeys",
  "kind": "ENUM"
};

const ProductOption = {
  "name": "ProductOption",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "id": "ID",
    "name": "String",
    "values": "String"
  },
  "implementsNode": true
};

const ProductPriceRange = {
  "name": "ProductPriceRange",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "maxVariantPrice": "MoneyV2",
    "minVariantPrice": "MoneyV2"
  },
  "implementsNode": false
};

const ProductPriceRangeConnection = {
  "name": "ProductPriceRangeConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "ProductPriceRangeEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const ProductPriceRangeEdge = {
  "name": "ProductPriceRangeEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "ProductPriceRange"
  },
  "implementsNode": false
};

const ProductSortKeys = {
  "name": "ProductSortKeys",
  "kind": "ENUM"
};

const ProductVariant = {
  "name": "ProductVariant",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "available": "Boolean",
    "availableForSale": "Boolean",
    "compareAtPrice": "Money",
    "compareAtPriceV2": "MoneyV2",
    "id": "ID",
    "image": "Image",
    "metafield": "Metafield",
    "metafields": "MetafieldConnection",
    "presentmentPrices": "ProductVariantPricePairConnection",
    "price": "Money",
    "priceV2": "MoneyV2",
    "product": "Product",
    "requiresShipping": "Boolean",
    "selectedOptions": "SelectedOption",
    "sku": "String",
    "title": "String",
    "weight": "Float",
    "weightUnit": "WeightUnit"
  },
  "implementsNode": true
};

const ProductVariantConnection = {
  "name": "ProductVariantConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "ProductVariantEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const ProductVariantEdge = {
  "name": "ProductVariantEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "ProductVariant"
  },
  "implementsNode": false
};

const ProductVariantPricePair = {
  "name": "ProductVariantPricePair",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "compareAtPrice": "MoneyV2",
    "price": "MoneyV2"
  },
  "implementsNode": false
};

const ProductVariantPricePairConnection = {
  "name": "ProductVariantPricePairConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "ProductVariantPricePairEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const ProductVariantPricePairEdge = {
  "name": "ProductVariantPricePairEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "ProductVariantPricePair"
  },
  "implementsNode": false
};

const ProductVariantSortKeys = {
  "name": "ProductVariantSortKeys",
  "kind": "ENUM"
};

const QueryRoot = {
  "name": "QueryRoot",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "articles": "ArticleConnection",
    "blogByHandle": "Blog",
    "blogs": "BlogConnection",
    "collectionByHandle": "Collection",
    "collections": "CollectionConnection",
    "customer": "Customer",
    "node": "Node",
    "nodes": "Node",
    "pageByHandle": "Page",
    "pages": "PageConnection",
    "productByHandle": "Product",
    "productRecommendations": "Product",
    "productTags": "StringConnection",
    "productTypes": "StringConnection",
    "products": "ProductConnection",
    "publicApiVersions": "ApiVersion",
    "shop": "Shop"
  },
  "implementsNode": false
};

const SEO = {
  "name": "SEO",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "description": "String",
    "title": "String"
  },
  "implementsNode": false
};

const ScriptDiscountApplication = {
  "name": "ScriptDiscountApplication",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "allocationMethod": "DiscountApplicationAllocationMethod",
    "description": "String",
    "targetSelection": "DiscountApplicationTargetSelection",
    "targetType": "DiscountApplicationTargetType",
    "title": "String",
    "value": "PricingValue"
  },
  "implementsNode": false
};

const SelectedOption = {
  "name": "SelectedOption",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "name": "String",
    "value": "String"
  },
  "implementsNode": false
};

const SelectedOptionInput = {
  "name": "SelectedOptionInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "name": "String",
    "value": "String"
  }
};

const ShippingRate = {
  "name": "ShippingRate",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "handle": "String",
    "price": "Money",
    "priceV2": "MoneyV2",
    "title": "String"
  },
  "implementsNode": false
};

const Shop = {
  "name": "Shop",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "articles": "ArticleConnection",
    "blogs": "BlogConnection",
    "collectionByHandle": "Collection",
    "collections": "CollectionConnection",
    "currencyCode": "CurrencyCode",
    "description": "String",
    "moneyFormat": "String",
    "name": "String",
    "paymentSettings": "PaymentSettings",
    "primaryDomain": "Domain",
    "privacyPolicy": "ShopPolicy",
    "productByHandle": "Product",
    "productTags": "StringConnection",
    "productTypes": "StringConnection",
    "products": "ProductConnection",
    "refundPolicy": "ShopPolicy",
    "shipsToCountries": "CountryCode",
    "shopifyPaymentsAccountId": "String",
    "termsOfService": "ShopPolicy"
  },
  "implementsNode": false
};

const ShopPolicy = {
  "name": "ShopPolicy",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "body": "String",
    "handle": "String",
    "id": "ID",
    "title": "String",
    "url": "URL"
  },
  "implementsNode": true
};

const String = {
  "name": "String",
  "kind": "SCALAR"
};

const StringConnection = {
  "name": "StringConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "StringEdge",
    "pageInfo": "PageInfo"
  },
  "implementsNode": false
};

const StringEdge = {
  "name": "StringEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "String"
  },
  "implementsNode": false
};

const TokenizedPaymentInput = {
  "name": "TokenizedPaymentInput",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "amount": "Money",
    "idempotencyKey": "String",
    "billingAddress": "MailingAddressInput",
    "type": "String",
    "paymentData": "String",
    "test": "Boolean",
    "identifier": "String"
  }
};

const TokenizedPaymentInputV2 = {
  "name": "TokenizedPaymentInputV2",
  "kind": "INPUT_OBJECT",
  "inputFieldBaseTypes": {
    "paymentAmount": "MoneyInput",
    "idempotencyKey": "String",
    "billingAddress": "MailingAddressInput",
    "paymentData": "String",
    "test": "Boolean",
    "identifier": "String",
    "type": "String"
  }
};

const Transaction = {
  "name": "Transaction",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "amount": "Money",
    "amountV2": "MoneyV2",
    "kind": "TransactionKind",
    "status": "TransactionStatus",
    "statusV2": "TransactionStatus",
    "test": "Boolean"
  },
  "implementsNode": false
};

const TransactionKind = {
  "name": "TransactionKind",
  "kind": "ENUM"
};

const TransactionStatus = {
  "name": "TransactionStatus",
  "kind": "ENUM"
};

const URL = {
  "name": "URL",
  "kind": "SCALAR"
};

const UserError = {
  "name": "UserError",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "field": "String",
    "message": "String"
  },
  "implementsNode": false
};

const WeightUnit = {
  "name": "WeightUnit",
  "kind": "ENUM"
};

const __Directive = {
  "name": "__Directive",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "args": "__InputValue",
    "description": "String",
    "locations": "__DirectiveLocation",
    "name": "String",
    "onField": "Boolean",
    "onFragment": "Boolean",
    "onOperation": "Boolean"
  },
  "implementsNode": false
};

const __DirectiveLocation = {
  "name": "__DirectiveLocation",
  "kind": "ENUM"
};

const __EnumValue = {
  "name": "__EnumValue",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "deprecationReason": "String",
    "description": "String",
    "isDeprecated": "Boolean",
    "name": "String"
  },
  "implementsNode": false
};

const __Field = {
  "name": "__Field",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "accessRestricted": "Boolean",
    "accessRestrictedReason": "String",
    "args": "__InputValue",
    "deprecationReason": "String",
    "description": "String",
    "isDeprecated": "Boolean",
    "name": "String",
    "requiredAccess": "String",
    "type": "__Type"
  },
  "implementsNode": false
};

const __InputValue = {
  "name": "__InputValue",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "defaultValue": "String",
    "deprecationReason": "String",
    "description": "String",
    "isDeprecated": "Boolean",
    "name": "String",
    "type": "__Type"
  },
  "implementsNode": false
};

const __Schema = {
  "name": "__Schema",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "directives": "__Directive",
    "mutationType": "__Type",
    "queryType": "__Type",
    "subscriptionType": "__Type",
    "types": "__Type"
  },
  "implementsNode": false
};

const __Type = {
  "name": "__Type",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "accessRestricted": "Boolean",
    "accessRestrictedReason": "String",
    "componentName": "String",
    "description": "String",
    "enumValues": "__EnumValue",
    "fields": "__Field",
    "inputFields": "__InputValue",
    "interfaces": "__Type",
    "kind": "__TypeKind",
    "name": "String",
    "ofType": "__Type",
    "possibleTypes": "__Type",
    "requiredAccess": "String"
  },
  "implementsNode": false
};

const __TypeKind = {
  "name": "__TypeKind",
  "kind": "ENUM"
};

const Types = {
  types: {}
};
Types.types["ApiVersion"] = ApiVersion;
Types.types["AppliedGiftCard"] = AppliedGiftCard;
Types.types["Article"] = Article;
Types.types["ArticleAuthor"] = ArticleAuthor;
Types.types["ArticleConnection"] = ArticleConnection;
Types.types["ArticleEdge"] = ArticleEdge;
Types.types["ArticleSortKeys"] = ArticleSortKeys;
Types.types["Attribute"] = Attribute;
Types.types["AttributeInput"] = AttributeInput;
Types.types["AutomaticDiscountApplication"] = AutomaticDiscountApplication;
Types.types["AvailableShippingRates"] = AvailableShippingRates;
Types.types["Blog"] = Blog;
Types.types["BlogConnection"] = BlogConnection;
Types.types["BlogEdge"] = BlogEdge;
Types.types["BlogSortKeys"] = BlogSortKeys;
Types.types["Boolean"] = Boolean;
Types.types["CardBrand"] = CardBrand;
Types.types["Checkout"] = Checkout;
Types.types["CheckoutAttributesUpdateInput"] = CheckoutAttributesUpdateInput;
Types.types["CheckoutAttributesUpdatePayload"] = CheckoutAttributesUpdatePayload;
Types.types["CheckoutAttributesUpdateV2Input"] = CheckoutAttributesUpdateV2Input;
Types.types["CheckoutAttributesUpdateV2Payload"] = CheckoutAttributesUpdateV2Payload;
Types.types["CheckoutCompleteFreePayload"] = CheckoutCompleteFreePayload;
Types.types["CheckoutCompleteWithCreditCardPayload"] = CheckoutCompleteWithCreditCardPayload;
Types.types["CheckoutCompleteWithCreditCardV2Payload"] = CheckoutCompleteWithCreditCardV2Payload;
Types.types["CheckoutCompleteWithTokenizedPaymentPayload"] = CheckoutCompleteWithTokenizedPaymentPayload;
Types.types["CheckoutCompleteWithTokenizedPaymentV2Payload"] = CheckoutCompleteWithTokenizedPaymentV2Payload;
Types.types["CheckoutCreateInput"] = CheckoutCreateInput;
Types.types["CheckoutCreatePayload"] = CheckoutCreatePayload;
Types.types["CheckoutCustomerAssociatePayload"] = CheckoutCustomerAssociatePayload;
Types.types["CheckoutCustomerAssociateV2Payload"] = CheckoutCustomerAssociateV2Payload;
Types.types["CheckoutCustomerDisassociatePayload"] = CheckoutCustomerDisassociatePayload;
Types.types["CheckoutCustomerDisassociateV2Payload"] = CheckoutCustomerDisassociateV2Payload;
Types.types["CheckoutDiscountCodeApplyPayload"] = CheckoutDiscountCodeApplyPayload;
Types.types["CheckoutDiscountCodeApplyV2Payload"] = CheckoutDiscountCodeApplyV2Payload;
Types.types["CheckoutDiscountCodeRemovePayload"] = CheckoutDiscountCodeRemovePayload;
Types.types["CheckoutEmailUpdatePayload"] = CheckoutEmailUpdatePayload;
Types.types["CheckoutEmailUpdateV2Payload"] = CheckoutEmailUpdateV2Payload;
Types.types["CheckoutErrorCode"] = CheckoutErrorCode;
Types.types["CheckoutGiftCardApplyPayload"] = CheckoutGiftCardApplyPayload;
Types.types["CheckoutGiftCardRemovePayload"] = CheckoutGiftCardRemovePayload;
Types.types["CheckoutGiftCardRemoveV2Payload"] = CheckoutGiftCardRemoveV2Payload;
Types.types["CheckoutGiftCardsAppendPayload"] = CheckoutGiftCardsAppendPayload;
Types.types["CheckoutLineItem"] = CheckoutLineItem;
Types.types["CheckoutLineItemConnection"] = CheckoutLineItemConnection;
Types.types["CheckoutLineItemEdge"] = CheckoutLineItemEdge;
Types.types["CheckoutLineItemInput"] = CheckoutLineItemInput;
Types.types["CheckoutLineItemUpdateInput"] = CheckoutLineItemUpdateInput;
Types.types["CheckoutLineItemsAddPayload"] = CheckoutLineItemsAddPayload;
Types.types["CheckoutLineItemsRemovePayload"] = CheckoutLineItemsRemovePayload;
Types.types["CheckoutLineItemsReplacePayload"] = CheckoutLineItemsReplacePayload;
Types.types["CheckoutLineItemsUpdatePayload"] = CheckoutLineItemsUpdatePayload;
Types.types["CheckoutShippingAddressUpdatePayload"] = CheckoutShippingAddressUpdatePayload;
Types.types["CheckoutShippingAddressUpdateV2Payload"] = CheckoutShippingAddressUpdateV2Payload;
Types.types["CheckoutShippingLineUpdatePayload"] = CheckoutShippingLineUpdatePayload;
Types.types["CheckoutUserError"] = CheckoutUserError;
Types.types["Collection"] = Collection;
Types.types["CollectionConnection"] = CollectionConnection;
Types.types["CollectionEdge"] = CollectionEdge;
Types.types["CollectionSortKeys"] = CollectionSortKeys;
Types.types["Comment"] = Comment;
Types.types["CommentAuthor"] = CommentAuthor;
Types.types["CommentConnection"] = CommentConnection;
Types.types["CommentEdge"] = CommentEdge;
Types.types["CountryCode"] = CountryCode;
Types.types["CreditCard"] = CreditCard;
Types.types["CreditCardPaymentInput"] = CreditCardPaymentInput;
Types.types["CreditCardPaymentInputV2"] = CreditCardPaymentInputV2;
Types.types["CropRegion"] = CropRegion;
Types.types["CurrencyCode"] = CurrencyCode;
Types.types["Customer"] = Customer;
Types.types["CustomerAccessToken"] = CustomerAccessToken;
Types.types["CustomerAccessTokenCreateInput"] = CustomerAccessTokenCreateInput;
Types.types["CustomerAccessTokenCreatePayload"] = CustomerAccessTokenCreatePayload;
Types.types["CustomerAccessTokenDeletePayload"] = CustomerAccessTokenDeletePayload;
Types.types["CustomerAccessTokenRenewPayload"] = CustomerAccessTokenRenewPayload;
Types.types["CustomerActivateInput"] = CustomerActivateInput;
Types.types["CustomerActivatePayload"] = CustomerActivatePayload;
Types.types["CustomerAddressCreatePayload"] = CustomerAddressCreatePayload;
Types.types["CustomerAddressDeletePayload"] = CustomerAddressDeletePayload;
Types.types["CustomerAddressUpdatePayload"] = CustomerAddressUpdatePayload;
Types.types["CustomerCreateInput"] = CustomerCreateInput;
Types.types["CustomerCreatePayload"] = CustomerCreatePayload;
Types.types["CustomerDefaultAddressUpdatePayload"] = CustomerDefaultAddressUpdatePayload;
Types.types["CustomerErrorCode"] = CustomerErrorCode;
Types.types["CustomerRecoverPayload"] = CustomerRecoverPayload;
Types.types["CustomerResetByUrlPayload"] = CustomerResetByUrlPayload;
Types.types["CustomerResetInput"] = CustomerResetInput;
Types.types["CustomerResetPayload"] = CustomerResetPayload;
Types.types["CustomerUpdateInput"] = CustomerUpdateInput;
Types.types["CustomerUpdatePayload"] = CustomerUpdatePayload;
Types.types["CustomerUserError"] = CustomerUserError;
Types.types["DateTime"] = DateTime;
Types.types["Decimal"] = Decimal;
Types.types["DigitalWallet"] = DigitalWallet;
Types.types["DiscountAllocation"] = DiscountAllocation;
Types.types["DiscountApplication"] = DiscountApplication;
Types.types["DiscountApplicationAllocationMethod"] = DiscountApplicationAllocationMethod;
Types.types["DiscountApplicationConnection"] = DiscountApplicationConnection;
Types.types["DiscountApplicationEdge"] = DiscountApplicationEdge;
Types.types["DiscountApplicationTargetSelection"] = DiscountApplicationTargetSelection;
Types.types["DiscountApplicationTargetType"] = DiscountApplicationTargetType;
Types.types["DiscountCodeApplication"] = DiscountCodeApplication;
Types.types["DisplayableError"] = DisplayableError;
Types.types["Domain"] = Domain;
Types.types["Float"] = Float;
Types.types["Fulfillment"] = Fulfillment;
Types.types["FulfillmentLineItem"] = FulfillmentLineItem;
Types.types["FulfillmentLineItemConnection"] = FulfillmentLineItemConnection;
Types.types["FulfillmentLineItemEdge"] = FulfillmentLineItemEdge;
Types.types["FulfillmentTrackingInfo"] = FulfillmentTrackingInfo;
Types.types["HTML"] = HTML;
Types.types["HasMetafields"] = HasMetafields;
Types.types["ID"] = ID;
Types.types["Image"] = Image;
Types.types["ImageConnection"] = ImageConnection;
Types.types["ImageContentType"] = ImageContentType;
Types.types["ImageEdge"] = ImageEdge;
Types.types["Int"] = Int;
Types.types["MailingAddress"] = MailingAddress;
Types.types["MailingAddressConnection"] = MailingAddressConnection;
Types.types["MailingAddressEdge"] = MailingAddressEdge;
Types.types["MailingAddressInput"] = MailingAddressInput;
Types.types["ManualDiscountApplication"] = ManualDiscountApplication;
Types.types["Metafield"] = Metafield;
Types.types["MetafieldConnection"] = MetafieldConnection;
Types.types["MetafieldEdge"] = MetafieldEdge;
Types.types["MetafieldParentResource"] = MetafieldParentResource;
Types.types["MetafieldValueType"] = MetafieldValueType;
Types.types["Money"] = Money;
Types.types["MoneyInput"] = MoneyInput;
Types.types["MoneyV2"] = MoneyV2;
Types.types["Mutation"] = Mutation;
Types.types["Node"] = Node;
Types.types["Order"] = Order;
Types.types["OrderConnection"] = OrderConnection;
Types.types["OrderEdge"] = OrderEdge;
Types.types["OrderLineItem"] = OrderLineItem;
Types.types["OrderLineItemConnection"] = OrderLineItemConnection;
Types.types["OrderLineItemEdge"] = OrderLineItemEdge;
Types.types["OrderSortKeys"] = OrderSortKeys;
Types.types["Page"] = Page;
Types.types["PageConnection"] = PageConnection;
Types.types["PageEdge"] = PageEdge;
Types.types["PageInfo"] = PageInfo;
Types.types["PageSortKeys"] = PageSortKeys;
Types.types["Payment"] = Payment;
Types.types["PaymentSettings"] = PaymentSettings;
Types.types["PricingPercentageValue"] = PricingPercentageValue;
Types.types["PricingValue"] = PricingValue;
Types.types["Product"] = Product;
Types.types["ProductCollectionSortKeys"] = ProductCollectionSortKeys;
Types.types["ProductConnection"] = ProductConnection;
Types.types["ProductEdge"] = ProductEdge;
Types.types["ProductImageSortKeys"] = ProductImageSortKeys;
Types.types["ProductOption"] = ProductOption;
Types.types["ProductPriceRange"] = ProductPriceRange;
Types.types["ProductPriceRangeConnection"] = ProductPriceRangeConnection;
Types.types["ProductPriceRangeEdge"] = ProductPriceRangeEdge;
Types.types["ProductSortKeys"] = ProductSortKeys;
Types.types["ProductVariant"] = ProductVariant;
Types.types["ProductVariantConnection"] = ProductVariantConnection;
Types.types["ProductVariantEdge"] = ProductVariantEdge;
Types.types["ProductVariantPricePair"] = ProductVariantPricePair;
Types.types["ProductVariantPricePairConnection"] = ProductVariantPricePairConnection;
Types.types["ProductVariantPricePairEdge"] = ProductVariantPricePairEdge;
Types.types["ProductVariantSortKeys"] = ProductVariantSortKeys;
Types.types["QueryRoot"] = QueryRoot;
Types.types["SEO"] = SEO;
Types.types["ScriptDiscountApplication"] = ScriptDiscountApplication;
Types.types["SelectedOption"] = SelectedOption;
Types.types["SelectedOptionInput"] = SelectedOptionInput;
Types.types["ShippingRate"] = ShippingRate;
Types.types["Shop"] = Shop;
Types.types["ShopPolicy"] = ShopPolicy;
Types.types["String"] = String;
Types.types["StringConnection"] = StringConnection;
Types.types["StringEdge"] = StringEdge;
Types.types["TokenizedPaymentInput"] = TokenizedPaymentInput;
Types.types["TokenizedPaymentInputV2"] = TokenizedPaymentInputV2;
Types.types["Transaction"] = Transaction;
Types.types["TransactionKind"] = TransactionKind;
Types.types["TransactionStatus"] = TransactionStatus;
Types.types["URL"] = URL;
Types.types["UserError"] = UserError;
Types.types["WeightUnit"] = WeightUnit;
Types.types["__Directive"] = __Directive;
Types.types["__DirectiveLocation"] = __DirectiveLocation;
Types.types["__EnumValue"] = __EnumValue;
Types.types["__Field"] = __Field;
Types.types["__InputValue"] = __InputValue;
Types.types["__Schema"] = __Schema;
Types.types["__Type"] = __Type;
Types.types["__TypeKind"] = __TypeKind;
Types.queryType = "QueryRoot";
Types.mutationType = "Mutation";
Types.subscriptionType = null;

function recursivelyFreezeObject(structure) {
  Object.getOwnPropertyNames(structure).forEach(key => {
    const value = structure[key];
    if (value && typeof value === 'object') {
      recursivelyFreezeObject(value);
    }
  });
  Object.freeze(structure);
  return structure;
}

var types = recursivelyFreezeObject(Types);

export default types;
