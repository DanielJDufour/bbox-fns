"use strict";

const booleanIntersects = require("./boolean-intersects.js");
const merge = require("./merge.js");

/**
 * @name bboxes
 * @param {Array} bboxes - an array of bounding boxes
 * @return {bbox} an array of bboxes in form [xmin, ymin, xmax, ymax]
 */
function union(bboxes) {
  if (bboxes.length === 0) return [];

  if (bboxes.length === 1) return [bboxes[0]];

  let results = [bboxes[0]];

  for (let i = 1; i < bboxes.length; i++) {
    const bbox = bboxes[i];
    const matches = results.filter(it => booleanIntersects(bbox, it));
    const merged = merge(matches.concat([bbox]));
    const unmatched = results.filter(it => !matches.includes(it));
    results = [merged].concat(unmatched);
  }

  return results;
}

module.exports = union;
module.exports.default = union;
