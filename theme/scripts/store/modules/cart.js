import axios from 'axios';
import { axiosShopifyPostConfig } from '../../helpers/configs';

/*----------------------------
State
---
Root state object that holds the global state for the site.
----------------------------*/

const state = {
  cartItems: [],
  miniCartIsOpen: false,
  checkoutUrl: `${window.theme.shopifySecureUrl}/checkout`,
};

/*----------------------------
Mutations
---
Operations that are responsible for mutating the state.
Each mutation handler gets the entire state tree as the
first argument, followed by additional payload arguments.
Mutations must be synchronous and can be recorded by plugins for debugging purposes.
----------------------------*/

const mutations = {
  /**
   * Set Cart Items
   *
   * @param   array   newCartItems - Array of cart items. Should be passed in the same format as returned from the Shopify api.
   */

  setCartItems(state, newCartItems) {
    state.cartItems = newCartItems;
  },

  /**
   * Toggle Mini Cart
   */

  toggleMiniCart(state) {
    state.miniCartIsOpen = !state.miniCartIsOpen;
  },
};

/*----------------------------
Actions
---
Functions that cause side effects and can involve asynchronous operations.
Actions are normally responsible for committing mutations.
----------------------------*/

const actions = {
  /**
   * Hydrate Cart Items
   */

  hydrateCartItems({ commit }) {
    // Refresh the list of items in a users cart from the Shopify api.

    axios.get('/cart.js').then(function(response) {
      const cartData = response.data;
      // Set the cart items in store.
      const cartItems = cartData.items;
      commit('setCartItems', cartItems);
    });
  },

  /**
   * Remove Cart Item
   *
   * @param   int   itemKey - The unique line item key.
   */

  removeCartItem({ dispatch, commit }, lineItemKey) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/cart/change.js',
          {
            id: lineItemKey,
            quantity: 0,
          },
          axiosShopifyPostConfig,
        )
        .then(function(response) {
          dispatch('hydrateCartItems');
          resolve();
        });
    });
  },

  /**
   * Add Cart Items
   *
   * @param   array   cartItems - Pass the quantity and variant id for each product we want to add to cart. { id: '', quantity: ''}.
   */

  addCartItems({ dispatch, commit }, cartItems) {
    return new Promise((resolve, reject) => {
      axios
        .post('/cart/add.js', { items: cartItems }, axiosShopifyPostConfig)
        .then(response => {
          dispatch('hydrateCartItems');
          resolve();
        })
        .catch(error => {
          // Could not add product to cart. Likely because no more product in stock.
          reject(error.response.data.description);
        });
    });
  },

  /**
   * Change Cart Item
   *
   * @param   object   productData - Pass the line item id and quantity of the product in a single object. {line: number, quantity: Number}
   */

  changeCartItem({ dispatch, commit }, productData) {
    return new Promise((resolve, reject) => {
      axios
        .post('/cart/change.js', productData, axiosShopifyPostConfig)
        .then(response => {
          dispatch('hydrateCartItems');
          resolve();
        })
        .catch(error => {
          // Could not add product to cart. Likely because no more product in stock.
          reject(error.response.data.description);
        });
    });
  },

  /**
   * Toggle Mini Cart
   */

  toggleMiniCart({ commit }) {
    commit('toggleMiniCart');
  },
};

/*----------------------------
Getters
---
Functions that can grab, alter and return data from state.
These are reactive. When the state changes these values will change.
----------------------------*/

const getters = {
  /**
   * Cart Subtotal
   */

  cartSubtotal(state) {
    // Save each items total price (unit x quantity) in an array. Then reduce the array down to get the total price.
    // Price will be returned in cents. Need to use a money formatter to adjust in the liquid template.

    return state.cartItems
      .map(item => {
        return item.price * item.quantity;
      })
      .reduce((a, b) => a + b, 0);
  },

  /**
   * Cart Count
   */

  cartCount(state) {
    // Save each items quantity in an array. Then reduce the array down to get the total quantity.
    return state.cartItems
      .map(item => {
        return item.quantity;
      })
      .reduce((a, b) => a + b, 0);
  },
};

/*----------------------------
Cart Vuex Data
---
Export state, getters, actions and mutations so they can be used by vue instances and components.
----------------------------*/

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
