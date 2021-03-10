import Vue from 'vue';
import store from '../store';
import { mapActions, mapGetters, mapState } from 'vuex';
import * as currency from '@shopify/theme-currency';
import '../../styles/templates/cart.scss';

/*----------------------------
Cart - Vue Instance
---
Separate instance from Main because sometimes want a mini cart and ability to have some other Vue logic
in a different part of the page.
----------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#cart-vue')) {
    new Vue({
      el: '#cart-vue',
      delimiters: ['${', '}'],
      store,
      mounted: function() {
        this.hydrateCartItems();
      },
      methods: {
        ...mapActions('cart', ['hydrateCartItems', 'toggleMiniCart']),
      },
      computed: {
        ...mapState('cart', {
          checkoutUrl: state => state.checkoutUrl,
        }),
        ...mapGetters('cart', ['cartSubtotal', 'cartCount']),
      },
      filters: {
        money(number) {
          return currency.formatMoney(number);
        }
      }
    });
  }
});
