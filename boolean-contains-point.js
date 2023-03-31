"use_strict";

// check if a bounding box contains a point
function booleanContainsPoint(
  [xmin, ymin, xmax, ymax],
  [x, y],
  { exclusive = false } = { exclusive: false }
) {
  if (exclusive) {
    // exclude points on an exact edge of the bounding box
    return y < ymax && y > ymin && x < xmax && x > xmin;
  } else {
    return y >= ymin && y <= ymax && x >= xmin && x <= xmax;
  }
}

module.exports = booleanContainsPoint;
module.exports.default = booleanContainsPoint;
