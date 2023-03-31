"use strict";

/**
 * @name bboxSize
 * @param {Array} bbox - bounding box in form [xmin, ymin, xmax, ymax]
 * @return {bbox} size of the bounding box in form [width, height]
 */
function bboxSize([xmin, ymin, xmax, ymax]) {
  return [xmax - xmin, ymax - ymin];
}

module.exports = bboxSize;
module.exports.default = bboxSize;
