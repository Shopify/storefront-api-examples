export interface CartState {
  visibility: boolean,
  checkoutId: string,
  items: LineItem[],
}

// Product Model
export interface LineItem {
  productId: string,
  variantId: string,
  quantity: number,
}
