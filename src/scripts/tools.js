/**
 * Checks if given string is a valid URL
 * @param {string} str The string to validate
 * @returns {boolean} If the `str` is valid
 */
function isValidURL(str) {
  'use strict';
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))|' + // OR ip (v4) address
    'localhost' + // OR localhost
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
  return pattern.test(str);
}