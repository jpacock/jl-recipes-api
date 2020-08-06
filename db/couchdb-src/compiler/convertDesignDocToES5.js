const { transformSync } = require('@babel/core'); // eslint-disable-line import/no-extraneous-dependencies
const { isFunction, isObject, zipObject } = require('lodash');

const babelConfig = require('./babel.config');

function convertDesignDocToES5(designDoc) {
  const keys = Object.keys(designDoc);
  const values = keys
    .map(key => designDoc[key])
    .map((value) => {
      if (isObject(value)) return convertDesignDocToES5(value);
      try {
        if (isFunction(eval(value))) { // eslint-disable-line no-eval
          return transformSync(value, babelConfig()).code;
        }
      } catch (e) {} // eslint-disable-line no-empty
      return value;
    });
  return zipObject(keys, values);
}

module.exports = convertDesignDocToES5;
