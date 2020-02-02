import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStoreContext from '../withStoreContext';
import VariantSelector from './VariantSelector';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: {}
    };
  }

  componentDidMount() {
    const {
      product,
    } = this.props;

    product.options.forEach((selector) => {
      this.setState((prevState) => ({
        selectedOptions:{
          ...prevState.selectedOptions,
          [selector.name]: selector.values[0]
        }
      }));
    });
  }

  findImage = (images, variantId) => {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange = (event) => {
    const {
      product
    } = this.props;

    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = product.variants.edges.find((variant) => {
      return variant.node.selectedOptions.every((selectedOption) => {
        return selectedOptions[selectedOption.name] === selectedOption.value;
      });
    }).node;

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.image.src
    });
  }

  handleQuantityChange = (event) => {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    const {
      storeContext: {
        addVariantToCart,
      },
      product,
    } = this.props;

    let variantImage = this.state.selectedVariantImage || product.images.edges[0].node.src
    let variant = this.state.selectedVariant || product.variants.edges[0].node
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variant_selectors = product.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    return (
      <div className="Product">
        {product.images.edges.length ? <img src={variantImage} alt={`${product.title} product shot`}/> : null}
        <h5 className="Product__title">{product.title}</h5>
        <span className="Product__price">${variant.price}</span>
        {variant_selectors}
        <label className="Product__option">
          Quantity
          <input min="1" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange}></input>
        </label>
        <button className="Product__buy button" onClick={() => addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
      </div>
    );
  }
}

Product.propTypes = {
  storeContext: PropTypes.shape({
    addVariantToCart: PropTypes.func,
  }).isRequired,
  product: PropTypes.shape({}).isRequired,
}

export default withStoreContext(Product);
