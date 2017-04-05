import React, {Component} from 'react';
import '../css/Product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    // this.generateSelectors = this.generateSelectors.bind(this);
    // this.handleOptionChange = this.handleOptionChange.bind(this);

    this.buildSelectors = this.buildSelectors.bind(this);
    this.selectedOptions = this.selectedOptions.bind(this);
    this.getVariantForOptions = this.getVariantForOptions.bind(this);
    this.findImage = this.findImage.bind(this);

    // const selectors = this.buildSelectors();
    // let selectedOptions = this.selectedOptions(selectors);
    // let selectedVariant = this.getVariantForOptions(selectedOptions);
    // let selectedImage = this.findImage(this.props.product.images, 0);
    //
    // this.state = {
    //   selectors: selectors,
    //   selectedOptions: selectedOptions,
    //   selectedVariant: selectedVariant,
    //   variantImage: selectedImage
    // }
  }

  // getInitialState() {
  //   const selectors = this.buildSelectors();
  //   let selectedOptions = this.selectedOptions(selectors);
  //   let selectedVariant = this.getVariantForOptions(selectedOptions);
  //   let selectedImage = this.findImage(this.props.product.images, 0);
  //
  //   return {
  //     selectors: selectors,
  //     selectedOptions: selectedOptions,
  //     selectedVariant: selectedVariant,
  //     variantImage: selectedImage
  //   };
  // }

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

  getVariantForOptions(selectedOptions) {
    if (this.props.product.variants.length > 1) {
      return this.props.product.variants.filter(function (variant) {
        var matches = true;
        selectedOptions.forEach(function (selectedOption) {
          var matching_option = variant.option_values.filter(function (value) {
            return value.option_id === selectedOption.id;
          })[0];
          if (!(matching_option.value === selectedOption.value)) {
            matches = false;
          }
        }.bind(this));
        return matches;
      }.bind(this))[0];
    } else {
      return this.props.product.variants[0];
    }
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  // generateSelectors() {
  //   return this.props.product.options.map((option) => {
  //     return (
  //       <select
  //         className="Product__option"
  //         name={option.name}
  //         key={option.name}
  //         onChange={this.handleOptionChange}
  //       >
  //         {option.values.map((value) => {
  //           return (
  //             <option value={value} key={`${option.name}-${value}`}>{`${value}`}</option>
  //           )
  //         })}
  //       </select>
  //     );
  //   });
  // }

  // handleOptionChange() {
  //   console.log('omg');
  // }

  render() {
    console.log(this.props.product);
    return (
      <div className="Product">
        {this.props.product.images.length ? <img src={this.props.product.images[0].src} alt={`${this.props.product.title} product shot`}/> : null}
        <h5 className="Product__title">{this.props.product.title}</h5>
        <span className="Product__price">${this.props.product.variants[0].price}</span>
        {/* {this.generateSelectors()} */}
        <button className="Product__buy button">Add to Cart</button>
      </div>
    );
  }
}

export default Product;
