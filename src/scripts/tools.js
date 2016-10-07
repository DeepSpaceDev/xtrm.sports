/**
 * Checks if given string is a valid URL
 * @param {string} str The string to validate
 * @returns {boolean} If the `str` is valid
 */
function isValidURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))|' + // OR ip (v4) address
    'localhost' + // OR localhost
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
  return pattern.test(str);
}

function encodeSearchURL(url) {
  url = url.replaceAll(' ', '+');
  url += '+';
  return encodeURI(url);
}

function decodeSearchURL(query) {
  if (query.endsWith('+')) {
    query = query.substr(0, query.length - 1);
  }
  query = query.replaceAll('+', ' ');
  return query;
}
function createSearchObjectFromQuery(query, language, location, token) {
  var MODE_QUERY = 0;
  var MODE_TAG_NAME = 1;
  var MODE_TAG_VAL = 2;

  var tags = [];
  var mode = MODE_QUERY;

  var queryString = '';
  var tagNameString = '';
  var tagValString = '';

  while (query.length > 0) {
    // Get and remove first char from query
    var char = query.charAt(0);
    query = query.slice(1);
    // Check if character is a special one
    // Start of tag
    if (char === TAG_NAME) {
      // jshint ignore:line
      mode = MODE_TAG_NAME;
      tagNameString = ''; // Clean up
    }
    // Start of tag value and previous mode: TAG_NAME
    else if (char === TAG_VAL_START && mode === MODE_TAG_NAME) {
      // jshint ignore:line
      mode = MODE_TAG_VAL;
      tagValString = ''; // Clean up
    }
    // End of tag value and previous mode: TAG_VAL
    else if (char === TAG_VAL_END && mode === MODE_TAG_VAL) {
      // jshint ignore:line
      // Add tag to tag array
      tags.push({ tag: tagNameString, value: tagValString });
      mode = MODE_QUERY; // Back to normal mode
    } else {
      // Add char to specific string based on current mode
      switch (mode) {
        case MODE_QUERY:
          queryString += char;break;
        case MODE_TAG_NAME:
          tagNameString += char;break;
        case MODE_TAG_VAL:
          tagValString += char;break;
        default:
          throw new Error('Unknown mode: ' + mode);
      }
    }
  }
  // Bundle tag with same tag name into one object in the array
  var bundledTags = [];
  // Loop over all possible tags
  for (var i = 0; i < TAGS.length; i++) {
    // jshint ignore:line
    // Bundle all values with this tag in the `values` array
    var bundledTag = {
      tag: TAGS[i], // jshint ignore:line
      values: []
    };
    // Loop over all input tags
    tags.forEach(function (tag, index, tagsArray) {
      // jshint ignore:line
      // If input tag is current bundle tag
      if (tag.tag === bundledTag.tag) {
        // Add tag to `values` array of the bundled tag
        bundledTag.values.push(tag.value);
      }
    });
    // If the bundled tag has a value
    if (bundledTag.values.length > 0) {
      // Add it to the bundled tags
      bundledTags.push(bundledTag);
    }
  }

  // Construct search object
  var searchObject = {};
  searchObject.search_query = queryString;
  if (language) {
    searchObject.language = language;
  }
  if (bundledTags.length > 0) {
    searchObject.tags = bundledTags;
  }
  if (location) {
    searchObject.location = location;
  }
  if (token) {
    searchObject.token = token;
  }
  return searchObject;
}

function getInfoCardObject(difficulty, groups, families, altitude_top, altitude_bottom) {
  return {
    html: '<xtrm-info-card difficulty="' + difficulty + '" ' + (groups ? 'groups' : '') + ' ' + (families ? 'families' : '') + ' altitude_top="' + altitude_top + '" altitude_bottom="' + altitude_bottom + '"></xtrm-info-card>',
    height: 120,
    importance: 2
  };
}

function getDescriptionCardObject(description) {
  if (!description || description.length === 0) {
    return;
  }
  return {
    html: '<xtrm-description-card>' + description + '</xtrm-description-card>',
    height: Infinity,
    importance: 6
  };
}

function getWeatherCardObject() {
  return {
    html: '<xtrm-weather-card></xtrm-weather-card>',
    height: Number.NaN,
    importance: 5
  };
}

function getMapCardObject(country, region, lat, lng, lat_parking, lng_parking) {
  return {
    html: '<xtrm-map-card country="' + country + '" region="' + region + '" lat="' + lat + '" lng="' + lng + '" lat_parking="' + lat_parking + '" lng_parking="' + lng_parking + '"></xtrm-map-card>',
    height: Number.NaN,
    importance: 6
  };
}

function getTopoCardObject(topo) {
  if (!topo || topo.length === 0) {
    return;
  }
  return {
    html: '<xtrm-topo-card url="' + topo + '"></xtrm-topo-card>',
    height: Infinity,
    importance: 4
  };
}