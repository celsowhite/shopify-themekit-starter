import Vue from 'vue';
import store from '../store';
import { mapActions, mapGetters } from 'vuex';
import * as currency from '@shopify/theme-currency';

/*----------------------------
Main - Vue Instance
---
Ensures any liquid template with a #main-vue id wrapper can have access to vuex store and methods.
----------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#main-vue')) {
    new Vue({
      el: '#main-vue',
      delimiters: ['${', '}'],
      store,
      mounted: function() {
        this.hydrateCartItems();
      },
      methods: {
        ...mapActions('cart', [
          'hydrateCartItems',
          'removeCartItem',
          'toggleMiniCart',
        ]),
        resizeShopifyImageUrl(url, size) {
          return resizeShopifyImageUrl(url, size);
        },
      },
      computed: mapGetters('cart', ['cartSubtotal', 'checkoutUrl']),
    });
  }
});
