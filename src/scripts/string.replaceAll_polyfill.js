String.prototype.replaceAll = function(search, replacement) {
  'use strict';
  return this.split(search).join(replacement);
};