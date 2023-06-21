"use strict";

/**
 * @name validate
 * @param {Array} bbox - bounding box in form [xmin, ymin, xmax, ymax]
 * @return {Boolean} valid - true or false
 */
function validate(bbox) {
  if (!Array.isArray(bbox)) return false;

  if (bbox.length !== 4) return false;

  if (bbox.some(n => typeof n !== "number")) return false;

  const [xmin, ymin, xmax, ymax] = bbox;
  if (xmin > xmax) return false;
  if (ymin > ymax) return false;

  return true;
}

module.exports = validate;
module.exports.default = validate;
