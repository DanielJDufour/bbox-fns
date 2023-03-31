"use strict";

/**
 * @name bboxArea
 * @param {Array} bbox - bounding box in form [xmin, ymin, xmax, ymax]
 * @return {Number} area of the bounding box
 */
function bboxArea([xmin, ymin, xmax, ymax]) {
  return (xmax - xmin) * (ymax - ymin);
}

module.exports = bboxArea;
module.exports.default = bboxArea;
