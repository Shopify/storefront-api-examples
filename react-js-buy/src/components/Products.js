import React, { Component } from 'react';
import Product from './Product';
import './../css/Product.css';


class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentWillMount() {
    this.props.client.fetchAllProducts()
      .then((res) => {
        this.setState({
          products: res,
        });
      });
  }

  render() {
    let products = this.state.products.map((product) => {
      return (
        <Product
          addVariantToCart={this.props.addVariantToCart}
          checkout={this.props.checkout}
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
}

export default Products;
