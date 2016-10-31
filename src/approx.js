var assert = require('assert');

var EPSILON = 0.0001;

/**
 * Test whether a value is a number
 * @param {*} value
 * @returns {boolean}
 */
function isNumber (value) {
  return (value instanceof Number || typeof value === 'number');
}

/**
 * Test whether two values are approximately equal. Tests whether the difference
 * between the two numbers is smaller than a fraction of their max value.
 * @param {Number} a
 * @param {Number} b
 * @param {Number} [epsilon]
 */
exports.equal = function equal(a, b, epsilon) {
  if (epsilon === undefined) {
    epsilon = EPSILON;
  }

  if (isNumber(a) && isNumber(b)) {
    if (a === b) {
      // great, we're done :)
    }
    else if (isNaN(a)) {
      assert.equal(a.toString(), b.toString());
    }
    else if (a === 0) {
      assert.ok(Math.abs(b) < epsilon, (a + ' ~= ' + b));
    }
    else if (b === 0) {
      assert.ok(Math.abs(a) < epsilon, (a + ' ~= ' + b));
    }
    else {
      var diff = Math.abs(a - b);
      var max = Math.max(a, b);
      var max_diff = Math.abs(max * epsilon);
      assert.ok(diff <= max_diff, (a + ' ~= ' + b));
    }
  }
  else {
    assert.equal(a, b);
  }
};

