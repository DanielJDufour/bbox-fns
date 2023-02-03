"use_strict";

// check if two bounding boxes overlap at all
function booleanIntersects(
  [axmin, aymin, axmax, aymax],
  [bxmin, bymin, bxmax, bymax]
) {
  const yOverlaps = bymin <= aymax && bymax >= aymin;
  const xOverlaps = bxmin <= axmax && bxmax >= axmin;
  return xOverlaps && yOverlaps;
}

module.exports = booleanIntersects;
module.exports.default = booleanIntersects;
