"use strict";

/**
 * @name bboxes
 * @param {Array} bboxes - an array of bounding boxes
 * @return {bbox} a bbox in form [xmin, ymin, xmax, ymax] that covers the extent of all bboxes
 */
function merge(bboxes) {
  if (bboxes.length === 0) return;

  if (bboxes.length === 1) return bboxes[0];

  let [xmin, ymin, xmax, ymax] = bboxes[0];

  for (let i = 1; i < bboxes.length; i++) {
    const bbox = bboxes[i];
    if (bbox[0] < xmin) xmin = bbox[0];
    if (bbox[1] < ymin) ymin = bbox[1];
    if (bbox[2] > xmax) xmax = bbox[2];
    if (bbox[3] > ymax) ymax = bbox[3];
  }
  return [xmin, ymin, xmax, ymax];
}

module.exports = merge;
module.exports.default = merge;
