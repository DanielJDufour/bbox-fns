"use strict";

/**
 * @name grid
 * @param {Array} bbox - bounding box in form [xmin, ymin, xmax, ymax]
 * @return {Array<bbox>} array of bounding boxes
 */
function grid([xmin, ymin, xmax, ymax], div) {
  if (typeof div === "number") div = [div, div];
  else if (typeof div === "undefined") div = [2, 2];

  const [columns, rows] = div;

  const height = ymax - ymin;
  const width = xmax - xmin;

  const cells = [];

  const cell_width = width / columns;
  const cell_height = height / rows;

  for (let r = 0; r < rows; r++) {
    const cell_ymin = ymin + r * cell_height;
    const cell_ymax = r === rows.length - 1 ? ymax : cell_ymin + cell_height;
    for (let c = 0; c < columns; c++) {
      const cell_xmin = xmin + c * cell_width;
      const cell_xmax = c === columns.length - 1 ? xmax : cell_xmin + cell_width;
      cells.push([cell_xmin, cell_ymin, cell_xmax, cell_ymax]);
    }
  }

  return cells;
}

module.exports = grid;
module.exports.default = grid;
