import React, {Component} from 'react';
import '../css/Product.css';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.buildSelectors = this.buildSelectors.bind(this);
    this.selectedOptions = this.selectedOptions.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  buildSelectors() {
    if (this.props.product.variants.length > 1) {
      return this.props.product.options.map(function (option) {
        return {
          id: option.id,
          name: option.name,
          options: this.props.product.variants.reduce(function (acc, variant) {
            debugger;
            variant.option_values.forEach(function (value) {
              if (acc.indexOf(value.value) < 0 && value.option_id === option.id) {
                acc.push(value.value);
              }
            });
            return acc;
          }, [])
        }
      }.bind(this));
    } else {
      return [];
    }
  }

  selectedOptions(selectors) {
    return selectors.map(function(selector) {
      return {
        id: selector.id,
        value: selector.options[0]
      }
    });
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  generateSelectors() {
    return this.props.product.options.map((option) => {
      return (
        <select
          className="Product__option"
          name={option.name}
          key={option.name}
          onChange={this.handleOptionChange}
        >
          {option.values.map((value) => {
            return (
              <option value={value} key={`${option.name}-${value}`}>{`${value}`}</option>
            )
          })}
        </select>
      );
    });
  }

  handleOptionChange() {

    const selectedOptions = {};

    Array.from(this.refs["variantSelectors"].children).forEach((selector) => {
      selectedOptions[selector.name] = selector.value;
    });

    const selectedVariant = this.props.product.variants.edges.find((variant) => {
      return variant.node.selectedOptions.every((selectedOption) => {
        return selectedOptions[selectedOption.name] === selectedOption.value;
      });
    }).node;

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.image.src
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images.edges[0].node.src
    let variant = this.state.selectedVariant || this.props.product.variants.edges[0].node
    let variantQuantity = this.state.selectedVariantQuantity || 1
    return (
      <div className="Product">
        {this.props.product.images.edges.length ? <img src={variantImage} alt={`${this.props.product.title} product shot`}/> : null}
        <h5 className="Product__title">{this.props.product.title}</h5>
        <span className="Product__price">${variant.price}</span>
        <div ref="variantSelectors">
          { this.generateSelectors() }
        </div>
        <label className="Product__option">
          Quantity
          <input min="1" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange}></input>
        </label>
        <button className="Product__buy button" onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
      </div>
    );
  }
}

export default Product;
