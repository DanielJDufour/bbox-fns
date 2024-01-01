"use_strict";

// check if the first bbox completely contains the second
function booleanContains([axmin, aymin, axmax, aymax], [bxmin, bymin, bxmax, bymax], { exclusive = false } = { exclusive: false }) {
  if (exclusive) {
    const xContained = bxmin > axmin && bxmax < axmax;
    const yContained = bymin > aymin && bymax < aymax;
    return xContained && yContained;
  } else {
    const xContained = bxmin >= axmin && bxmax <= axmax;
    const yContained = bymin >= aymin && bymax <= aymax;
    return xContained && yContained;
  }
}

module.exports = booleanContains;
module.exports.default = booleanContains;
