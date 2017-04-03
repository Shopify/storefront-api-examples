import Ember from 'ember';

const { Component, computed, guidFor, inject } = Ember;

// Unwraps the node
function unwrapNode(nodeObject) {
  return nodeObject ? nodeObject.node : nodeObject;
}

export default Component.extend({
  cart: inject.service(),

  product: null,

  variants: computed('product', {
    get() {
      return this.get('product.variants.edges');
    }
  }),

  options: computed('product', {
    get() {
      return this.get('product.options');
    }
  }),

  variantGroups: computed('variants', {
    get() {
      const options = this.get('options');
      let values;

      const variantOptionsGroups = options.map(option => {
        values = option.values.valueOf();

        const group = {
          name: option.name.valueOf(),
          values,
          noChoices: values.length === 1,
          selected: values[0].valueOf()
        };

        group.selectId = guidFor(group);

        return group;
      });

      return variantOptionsGroups;
    }
  }),

  currentVariant: computed('variantGroups.@each.selected', {
    get() {
      const groups = this.get('variantGroups');
      const selectedOptions = {};

      groups.forEach((group) => {
        selectedOptions[group.name] = group.selected;
      });

      return unwrapNode(this.get('variants').find((variant) => {
        return variant.node.selectedOptions.every((selectedOption) => {
          return selectedOptions[selectedOption.name] === selectedOption.value.valueOf();
        });
      }));
    }
  }),

  imageSrc: computed('currentVariant', {
    get() {
      const noImageSrc = 'https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif';
      const images = this.get('product.images.edges');
      const primaryImage = unwrapNode(images[0]);
      const currentVariant = this.get('currentVariant');
      const variantImage = currentVariant ? currentVariant.image : undefined;

      return variantImage || primaryImage ? (variantImage || primaryImage).src : noImageSrc;
    }
  }),

  price: computed('currentVariant', {
    get() {
      return this.get('currentVariant.price');
    }
  }),

  actions: {
    updateSelected(variantGroup) {
      const $select = this.$(`#${variantGroup.selectId}`);

      Ember.set(variantGroup, 'selected', $select.val());
    },

    addVariantToCart() {
      const variantId = this.get('currentVariant.id');

      this.get('cart').addVariants({ variantId, quantity: 1 });
    },
    open() {
      this.sendAction('open');
    }
  }
});

