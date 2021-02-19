/**
 * Resize Shopify Image URL
 *
 * @param   string   url   - The full original (non transformed) url for the image.
 * @param   string   size  - The preformatted size and crop we want to use. Shopify follows a url format
 *                           when pulling a specific image size. See here for reference https://help.shopify.com/en/themes/liquid/filters/url-filters#size-parameters.
 *                           Crop is not required but if using a crop then it needs to be appended to the size using an underscore. Two word crops are also separated by an underscore.
 */

export default function resizeShopifyImageUrl(url, size) {
  if (url) {
    // Grab the base of the url without the extension and query params.
    const base = url.substring(0, url.lastIndexOf('.'));

    // Grab the extension and anything following the extension such as query params.

    const extension = url.substring(url.lastIndexOf('.') + 1, url.length);

    // Reconstruct the url with the size injected.

    return `${base}_${size}.${extension}`;
  }
}
