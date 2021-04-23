import React from 'react';

import Product from './Product';

function Products(props) {
  let products = props.products.map((product) => {
    return (
      <Product
        addVariantToCart={props.addVariantToCart}
        client={props.client}
        key={product.id.toString()}
        product={product}
      />
    );
  });

  return (
    <div className="Product-wrapper">
      {products}
    </div>
  );
}

export default Products;
