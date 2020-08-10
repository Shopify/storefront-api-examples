export interface CartState {
  checkoutId: string,
  items: LineItem[],
}

// Product Model
export interface LineItem {
  productId: string,
  variantId: string,
  quantity: number,
}

