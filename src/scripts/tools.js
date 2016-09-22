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

function getInfoCardObject(difficulty, groups, families, altitude_top, altitude_bottom) {
  'use strict';
  return {
    html: `<xtrm-info-card difficulty="${difficulty}" ${groups ? 'groups' : ''} ${families ? 'families' : ''} altitude_top="${altitude_top}" altitude_bottom="${altitude_bottom}"></xtrm-info-card>`,
    height: 120,
    importance: 2
  };
}

function getDescriptionCardObject(description) {
  'use strict';
  if (!description || description.length === 0) { return; }
  return {
    html: `<xtrm-description-card>${description}</xtrm-description-card>`,
    height: Infinity,
    importance: 6
  };
}

function getWeatherCardObject() {
  'use strict';
  return {
    html: `<xtrm-weather-card></xtrm-weather-card>`,
    height: Number.NaN,
    importance: 5
  };
}

function getMapCardObject(country, region, lat, lng, lat_parking, lng_parking) {
  'use strict';
  return {
    html: `<xtrm-map-card country="${country}" region="${region}" lat="${lat}" lng="${lng}" lat_parking="${lat_parking}" lng_parking="${lng_parking}"></xtrm-map-card>`,
    height: Number.NaN,
    importance: 6
  };
}

function getTopoCardObject(topo) {
  'use strict';
  if (!topo || topo.length === 0) { return; }
  return {
    html: `<xtrm-topo-card url="${topo}"></xtrm-topo-card>`,
    height: Infinity,
    importance: 4
  };
}