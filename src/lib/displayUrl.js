/**
 * Shorten a link target to the form shown on the page: drop the scheme
 * (`https://`, `mailto:`), a leading `www.`, and any trailing slashes.
 * Relative paths are returned unchanged.
 *
 * @param {string} href - Absolute URL, `mailto:` link, or relative path.
 * @returns {string} The display form, e.g. `linkedin.com/in/ericsayer`.
 */
export function displayUrl(href) {
  return href
    .replace(/^[a-z][a-z\d+.-]*:(\/\/)?/i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '');
}
