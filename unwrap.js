"use_strict";

const shift = require("./shift.js");
const sort = require("./sort.js");
const split = require("./split.js");
const union = require("./union.js");

function unwrap(bbox, container) {
  const [global_xmin, global_ymin, global_xmax, global_ymax] = container;

  const global_width = global_xmax - global_xmin;
  const global_height = global_ymax - global_ymin;

  const breakpoints = {
    x: [global_xmin - global_width, global_xmin, global_xmax, global_xmax + global_width],
    y: [global_ymin - global_height, global_ymin, global_ymax, global_ymax + global_height]
  };

  let bboxes = split(bbox, breakpoints);

  // normalize bboxes to world boundaries
  bboxes = bboxes.map(b => {
    const [xmin, ymin, xmax, ymax] = b;
    return shift(b, {
      x: Math.ceil((global_xmin - xmin) / global_width) * global_width,
      y: Math.ceil((global_ymin - ymin) / global_height) * global_height
    });
  });

  // combine bboxes if they overlap
  bboxes = union(bboxes);

  bboxes = sort(bboxes);

  return bboxes;
}

module.exports = unwrap;
module.exports.default = unwrap;
