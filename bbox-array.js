"use strict";

/**
 * @name bboxArray
 * @param {Array} points - an array (aka ring) of points
 * @return {bbox} bbox in form [xmin, ymin, xmax, ymax]
 */
function bboxArray(points, { nan_strategy = "throw" } = { nan_strategy: "throw" }) {
  const count = points.length;
  let xmin = null;
  let xmax = null;

  let ymin = null;
  let ymax = null;
  for (let i = 0; i < count; i++) {
    const [x, y] = points[i];
    if (isNaN(x)) {
      if (nan_strategy === "throw") {
        throw new Error("[bbox-fns/bbox-array] encountered point with a NaN value: [" + x + ", " + y + "]");
      }
    } else if (xmin === null) {
      xmin = x;
      xmax = x;
    } else {
      if (x < xmin) xmin = x;
      else if (x > xmax) xmax = x;
    }
    if (isNaN(y)) {
      if (nan_strategy === "throw") {
        throw new Error("[bbox-fns/bbox-array] encountered point with a NaN value: [" + x + ", " + y + "]");
      }
    } else if (ymin === null) {
      ymin = y;
      ymax = y;
    } else {
      if (y < ymin) ymin = y;
      else if (y > ymax) ymax = y;
    }
  }
  return [xmin, ymin, xmax, ymax];
}

module.exports = bboxArray;
module.exports.default = bboxArray;
