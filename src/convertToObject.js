'use strict';

/**
 * @param {string} sourceString
 *
 * @return {object}
 */
function convertToObject(styleString) {
  if (typeof styleString !== 'string') {
    return {};
  }

  const result = {};
  const lines = styleString
    .split(';')
    .map((line) => line.replace(/\t/g, '').trim())
    .filter(Boolean);

  let currentProperty = null;
  let currentValue = '';

  for (const line of lines) {
    if (line.includes(':')) {
      if (currentProperty !== null) {
        result[currentProperty] = currentValue;
      }

      const [prop, ...valueParts] = line.split(':');

      currentProperty = prop.trim();
      currentValue = valueParts.join(':').trim();
    } else if (currentProperty !== null) {
      currentValue += ';\n' + line;
    }
  }

  if (currentProperty !== null) {
    result[currentProperty] = currentValue;
  }

  return result;
}

module.exports = convertToObject;
