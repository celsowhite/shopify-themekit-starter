import Vue from 'vue';
import isEqual from 'lodash/isEqual';
import * as currency from '@shopify/theme-currency';

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
      purchaseTypes: ['Single Purchase', 'Subscription'],
      selectedPurchaseType: 'Subscription',
      selectedSellingPlan: '',
    };
  },
  mounted: function() {
    // Set Initial Options
    this.setInitialOptions();

    // Set Initial Subscription Data
    this.setInitialSubscriptionData();
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
    Set Initial Subscription Data
    ---------------*/
    setInitialSubscriptionData() {
      // If there is a selling plan then set it.
      if (this.hasSellingPlan) {
        this.selectedSellingPlan = this.product.selling_plan_groups[0].selling_plans[0];
      }
      // Else set the selected purchase type to single.
      else {
        this.selectedPurchaseType = 'Single Purchase';
      }
    },

    /*---------------
    Set Purchase Type
    ---------------*/
    setPurchaseType(type) {
      this.selectedPurchaseType = type;
    },

    /*---------------
    Set Selling Plan
    ---------------*/
    setSellingPlan(plan) {
      this.selectedSellingPlan = plan;
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

    /*---------------
    Format Money
    ---------------*/

    formatMoney(amount) {
      return currency.formatMoney(amount);
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
    Has Selling Plan
    ---------------*/

    hasSellingPlan() {
      return this.product.selling_plan_groups.length > 0;
    },

    /*---------------
    Product Cart Item
    ---------------*/

    productCartItem() {
      const cartItemData = {
        id: this.selectedVariant.id,
        quantity: this.quantity,
      };

      // If there is a selling plan then attach the plan data.
      if (this.hasSellingPlan) {
        cartItemData.selling_plan = this.selectedSellingPlan.id;
      }

      return cartItemData;
    },
  },
});
