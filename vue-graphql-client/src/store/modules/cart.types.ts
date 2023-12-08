export interface CartState {
  visibility: boolean,
  id: string,
  webUrl: string,
  subtotalPrice: string,
  totalTax: string,
  totalPrice: string,
  items: LineItem[],
}

// Line Item Model
export interface LineItem {
  id: string,
  variantId: string,
  quantity: number,
}
