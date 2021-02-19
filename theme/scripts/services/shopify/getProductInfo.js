import axios from 'axios';

/**
 * Get Product Info
 *
 * @param   string   productHandle - The handle of the product.
 *
 * resolve  array    The product data.
 */

export default function getProductInfo(productHandle) {
  return new Promise(function(resolve, reject) {
    const productUrl = `/products/${productHandle}.js`;
    axios.get(productUrl).then(response => {
      resolve(response.data);
    });
  });
}
