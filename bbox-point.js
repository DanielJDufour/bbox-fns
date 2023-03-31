"use strict";

/**
 * @name bboxPoint
 * @param {Array} point - a point in form [x, y] or [longitude, latitude]
 * @return {bbox} a bbox of zero width and height in form [xmin, ymin, xmax, ymax]
 */
function bboxPoint([x, y]) {
  return [x, y, x, y];
}

module.exports = bboxPoint;
module.exports.default = bboxPoint;
