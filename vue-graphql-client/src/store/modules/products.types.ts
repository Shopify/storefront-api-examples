export interface ProductsState {
  all: { [key: string]: Product },
}

// Product Model
export interface Product {
  id: string,
  title: string,
  description: string,
  images: ProductImage[],
  variants: ProductVariant[],
  type: String,
}

// Product Image Model
export interface ProductImage {
  id: string,
  altText: string,
  src: string,
}

// Product Variant Model
export interface ProductVariant {
  readonly id: string,
  readonly title: string,
  readonly price: string
  readonly currencyCode: string,
  readonly imageSrc?: string,
  readonly imageAltText?: string,
}
