import Vue from 'vue';
import store from '../store';
import { mapActions, mapGetters, mapState } from 'vuex';
import * as currency from '@shopify/theme-currency';

/*----------------------------
Header - Vue Instance
----------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#header-vue')) {
    new Vue({
      el: '#header-vue',
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
    });
  }
});
