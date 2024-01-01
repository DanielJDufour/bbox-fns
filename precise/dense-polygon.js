"use_strict";

const add = require("preciso/add.js");
const divide = require("preciso/divide.js");
const multiply = require("preciso/multiply.js");
const subtract = require("preciso/subtract.js");

/**
 *
 * @param {Array<String>} bbox - [xmin, ymin, xmax, ymax]
 * @param {Object} options
 * @param {Number|[Number,Number]} options.density - number of points to add to each side
 * @returns Array<String> polygon in form [ring]
 */
function preciseDensePolygon(bbox, { density = 0 } = { density: 0 }) {
  bbox = bbox.map(n => n.toString());

  let [xmin, ymin, xmax, ymax] = bbox;

  if (typeof density === "number" || typeof density === "string") density = [density, density];

  density = density.map(n => n.toString());

  const [x_density, y_density] = density;

  const height = subtract(ymax, ymin);
  const width = subtract(xmax, xmin);

  const ring = [];

  // left-side, bottom-side, right-side, top-side
  const x_distance = divide(width, add(x_density, "1"));
  const y_distance = divide(height, add(y_density, "1"));

  // add top left corner
  ring.push([xmin, ymax]);

  // left-edge
  for (let i = 1; i <= y_density; i++) {
    ring.push([xmin, subtract(ymax, multiply(i.toString(), y_distance))]);
  }

  // add bottom left corner
  ring.push([xmin, ymin]);

  // bottom-edge
  for (let i = 1; i <= x_density; i++) {
    ring.push([add(xmin, multiply(i.toString(), x_distance)), ymin]);
  }

  // add bottom right corner
  ring.push([xmax, ymin]);

  // right-edge
  for (let i = 1; i <= y_density; i++) {
    ring.push([xmax, add(ymin, multiply(i.toString(), y_distance))]);
  }

  // add top right corner
  ring.push([xmax, ymax]);

  // top-edge
  for (let i = 1; i <= x_density; i++) {
    ring.push([subtract(xmax, multiply(i.toString(), x_distance)), ymax]);
  }

  // add top left corner (repeats according to GeoJSON spec)
  ring.push([xmin, ymax]);

  return [ring];
}

module.exports = preciseDensePolygon;
module.exports.default = preciseDensePolygon;
