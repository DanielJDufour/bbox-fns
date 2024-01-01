"use_strict";

function densePolygon([xmin, ymin, xmax, ymax], { density = 0 } = { density: 0 }) {
  if (typeof density === "number") density = [density, density];

  const [x_density, y_density] = density;

  const height = ymax - ymin;
  const width = xmax - xmin;

  const ring = [];

  // left-side, bottom-side, right-side, top-side
  const x_distance = width / (x_density + 1);
  const y_distance = height / (y_density + 1);

  // add top left corner
  ring.push([xmin, ymax]);

  // left-edge
  for (let i = 1; i <= y_density; i++) ring.push([xmin, ymax - i * y_distance]);

  // add bottom left corner
  ring.push([xmin, ymin]);

  // bottom-edge
  for (let i = 1; i <= x_density; i++) ring.push([xmin + i * x_distance, ymin]);

  // add bottom right corner
  ring.push([xmax, ymin]);

  // right-edge
  for (let i = 1; i <= y_density; i++) ring.push([xmax, ymin + i * y_distance]);

  // add top right corner
  ring.push([xmax, ymax]);

  // top-edge
  for (let i = 1; i <= x_density; i++) ring.push([xmax - i * x_distance, ymax]);

  // add top left corner (repeats according to GeoJSON spec)
  ring.push([xmin, ymax]);

  return [ring];
}

module.exports = densePolygon;
module.exports.default = densePolygon;
