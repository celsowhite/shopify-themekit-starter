import Vue from 'vue';
import axios from 'axios';
import resizeShopifyImageUrl from '../helpers/resize-shopify-image-url';
import * as currency from '@shopify/theme-currency';
import { mapActions } from 'vuex';

/*----------------------------
Cart Item - Vue Component
---
Used as an inline-template within our app instance.
Holds local state for the cart item functionality and enables interacting with the vuex store.
----------------------------*/

Vue.component('cart-item', {
  props: {
    item: Object,
  },
  data() {
    return {
      quantity: this.item.quantity,
      feedbackMessage: '',
      loading: false,
    };
  },
  mounted: function() {},
  methods: {
    ...mapActions('cart', ['removeCartItem', 'changeCartItem']),

    // Change Quantity

    changeQuantity(newQuantity) {
      this.loading = true;

      // Normalize the quantity so users can't input negative numbers or decimals.
      newQuantity = Math.max(Math.round(newQuantity), 1);

      this.changeCartItem({
        id: this.item.key,
        quantity: Number(newQuantity),
      })
        .then(() => {
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          // On error show the error message under the cart item.
          this.feedbackMessage = error;
          window.setTimeout(() => {
            this.feedbackMessage = '';
          }, 3000);
        });
    },

    // Format Money

    formatMoney(price) {
      return currency.formatMoney(price);
    },

    // Resize Shopify Image URL

    resizeShopifyImageUrl(url, size) {
      return resizeShopifyImageUrl(url, size);
    },
  },
  computed: {
    // Has Selling Plan
    hasSellingPlan: function() {
      return this.item.selling_plan_allocation ? true : false;
    },
  },
  watch: {
    // Watch for item quantity changes and set them in local state.
    // Need to watch because the main item itself won't be reactive if it is already in the cart. We need to react to its deep property for quantity.
    item: {
      handler: function(val) {
        this.quantity = val.quantity;
      },
      deep: true,
    },
  },
});
