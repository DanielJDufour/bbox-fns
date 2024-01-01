"use strict";

const divide = require("preciso/divide.js");

/**
 * @name divide
 * @param {Array} bbox - bounding box in form [xmin, ymin, xmax, ymax]
 * @param {[number, number]} divisors - divisors in form [dx, dy] or [number] or just a number
 * @return {bbox} bbox
 */
function preciseDivide([xmin, ymin, xmax, ymax], div, { ellipsis = false, max_decimal_digits = 100 } = {}) {
  const [dx, dy] = typeof div === "string" || typeof div === "number" ? [div, div] : div.length === 1 ? [div[0].toString(), div[0].toString()] : div;
  const opts = { ellipsis, max_decimal_digits };
  const dxstr = dx.toString();
  const dystr = dy.toString();
  return [divide(xmin.toString(), dxstr, opts), divide(ymin.toString(), dystr, opts), divide(xmax.toString(), dxstr, opts), divide(ymax.toString(), dystr, opts)];
}

module.exports = preciseDivide;
module.exports.default = preciseDivide;
