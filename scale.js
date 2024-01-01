"use strict";

/**
 * @name scale
 * @param {Array} bbox - bounding box in form [xmin, ymin, xmax, ymax]
 * @param {[number, number]} scale - scale factor in form [sx, sy] or [number] or just a number
 * @return {bbox} bbox
 */
function scale([xmin, ymin, xmax, ymax], scl) {
  const [sx, sy] = typeof scl === "number" ? [scl, scl] : scl.length === 1 ? [scl[0], scl[0]] : scl;
  return [xmin * sx, ymin * sy, xmax * sx, ymax * sy];
}

module.exports = scale;
module.exports.default = scale;
