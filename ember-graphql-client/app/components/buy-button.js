import Ember from 'ember';

const { Component, computed, guidFor, inject } = Ember;

export default Component.extend({
  cart: inject.service(),

  product: null,

  quantity: 1,

  variants: computed('product', {
    get() {
      return this.get('product.variants');
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

      return this.get('variants').find((variant) => {
        return variant.selectedOptions.every((selectedOption) => {
          return selectedOptions[selectedOption.name] === selectedOption.value.valueOf();
        });
      });
    }
  }),

  imageSrc: computed('currentVariant', {
    get() {
      const images = this.get('product.images');
      const [primaryImage] = images;
      const currentVariant = this.get('currentVariant');
      const variantImage = currentVariant ? currentVariant.image : undefined;

      return (variantImage || primaryImage).src;
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
      const quantity = parseInt(this.get('quantity'));

      this.get('cart').addVariants({ variantId, quantity });
    },
    open() {
      this.sendAction('open');
    }
  }
});
