import Vue from 'vue';
import isEqual from 'lodash/isEqual';

/*----------------------------
Add To Cart - Vue Component
----------------------------*/

Vue.component('add-to-cart', {
  props: {
    product: Object,
    options: Array,
    variants: Array,
    productHasOnlyDefaultVariant: Boolean,
  },
  data() {
    return {
      selectedOptions: {},
      addToCartStatus: 'idle',
      feedbackMessage: '',
      quantity: 1,
    };
  },
  mounted: function() {
    // Set Initial Options
    this.setInitialOptions();
  },
  methods: {
    /*---------------
    Increment Quantity
    ---------------*/
    incrementQuantity() {
      this.quantity++;
    },

    /*---------------
    Decrement Quantity
    ---------------*/
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    /*---------------
    Set option value
    ---------------*/
    setOptionValue(optionName, value) {
      // Set the option
      Vue.set(this.selectedOptions, optionName, value);
      // Update the url to reflect the current variant selection.
      this.updateProductURL();
    },

    /*---------------
    Update Product URL
    ---------------*/
    updateProductURL() {
      // Save the updated product url with the variant id appended as a query string.
      const updatedURL =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?variant=' +
        this.selectedVariant.id;
      // Replace the url without refreshing the page.
      window.history.replaceState({ path: updatedURL }, '', updatedURL);
    },

    /*---------------
    Set initial options
    ---------------*/
    setInitialOptions() {
      // Get the query string parameters from the url.
      const urlParams = new URLSearchParams(window.location.search);
      const initialVariantId = Number(urlParams.get('variant'));

      // If a variant ID is set then get the initial options from that variant.
      if (initialVariantId) {
        // Find the variant
        const initialVariant = this.variants.find(variant => {
          return variant.id === initialVariantId;
        });
        // Loop through each of the variants options
        initialVariant.options.forEach((option, index) => {
          // Set the option in state with its corresponding option name.
          Vue.set(this.selectedOptions, this.options[index].name, option);
        });
      }
      // Else populate the initial options based on the first value for each option.
      else {
        this.options.forEach(option => {
          Vue.set(this.selectedOptions, option.name, option.values[0]);
        });
      }
    },

    /*---------------
    Add Product To Cart
    ---------------*/
    addProductToCart() {
      // Indicate that the product is being added.
      this.addToCartStatus = 'loading';

      // Send the product to the cart
      this.$store
        .dispatch('cart/addCartItems', [this.productCartItem])
        .then(() => {
          // On success indicate it and show the mini cart.
          this.$store.dispatch('cart/toggleMiniCart');
          this.addToCartStatus = 'done';
          window.setTimeout(() => {
            this.addToCartStatus = 'idle';
          }, 2000);
        })
        .catch(error => {
          // On error show the error message on the page

          this.feedbackMessage = error;
          this.addToCartStatus = 'idle';
          window.setTimeout(() => {
            this.feedbackMessage = '';
          }, 3000);
        });
    },
  },
  computed: {
    /*---------------
    Selected Variant
    ---------------*/

    selectedVariant() {
      // Get the variant that matches our currently selected options.
      return this.variants.find(variant => {
        return isEqual(variant.options, Object.values(this.selectedOptions));
      });
    },

    /*---------------
    Product Cart Item
    ---------------*/

    productCartItem() {
      const cartItemData = {
        id: this.selectedVariant.id,
        quantity: this.quantity,
      };

      return cartItemData;
    },
  },
});
