"use strict";

const compare = require("preciso/compare.js");

/**
 * @name bboxArray
 * @description assumes points are stringified as [string, string]
 * @param {Array} points - an array (aka ring) of points
 * @return {bbox} bbox in form [xmin, ymin, xmax, ymax]
 */
function bboxArray(points) {
  const count = points.length;
  const [x, y] = points[0];
  let xmin = x;
  let xmax = x;
  let ymin = y;
  let ymax = y;
  for (let i = 1; i < count; i++) {
    const [x, y] = points[i];
    if (compare(x, xmin) === "<") xmin = x;
    else if (compare(x, xmax) === ">") xmax = x;
    if (compare(y, ymin) === "<") ymin = y;
    else if (compare(y, ymax) === ">") ymax = y;
  }
  return [xmin, ymin, xmax, ymax];
}

module.exports = bboxArray;
module.exports.default = bboxArray;
