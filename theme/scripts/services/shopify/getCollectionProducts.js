import axios from 'axios';

/**
 * Get Collection JSON
 *
 * @param   string   collectionHandle - The handle of the collection we want to pull products from.
 *
 * resolve  array    The products in the collection.
 */

export default function getCollectionProducts(collectionHandle) {
  return new Promise(function(resolve, reject) {
    const collectionProductsUrl = `/collections/${collectionHandle}/products.json`;
    axios.get(collectionProductsUrl).then(response => {
      resolve(response.data.products);
    });
  });
}
