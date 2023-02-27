"use_strict";

const booleanIntersects = require("./boolean-intersects.js");

function intersect(a, b) {
  const [axmin, aymin, axmax, aymax] = a;
  const [bxmin, bymin, bxmax, bymax] = b;

  if (!booleanIntersects(a, b)) return null;

  return [
    Math.max(axmin, bxmin),
    Math.max(aymin, bymin),
    Math.min(axmax, bxmax),
    Math.min(aymax, bymax)
  ];
}

module.exports = intersect;
module.exports.default = intersect;
