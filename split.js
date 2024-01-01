"use strict";

/**
 * @name split
 * @description break the given bounding box into pieces at given breakpoints
 * @example split(extent, { x: [-180, 180], y: [-90, 90] })
 * @param {Array} bbox - a bounding box in form [xmin, ymin, xmax, ymax]
 * @param {Object} breakpoints
 * @param {Array<Number>} breakpoints.x - array of x values to break on
 * @param {Array<Number>} breakpoints.y - array of y values to break on
 * @return {bbox} an array of bboxes in form [xmin, ymin, xmax, ymax]
 */
function split(bbox, breakpoints) {
  const [xmin, ymin, xmax, ymax] = bbox;
  if (!breakpoints) throw new Error("[bbox-fns/split.js] missing breakpoints");
  const xbrks = breakpoints.x || [];
  const ybrks = breakpoints.y || [];

  const xedges = [xmin].concat(xbrks.filter(x => x > xmin && x < xmax)).concat([xmax]);
  const yedges = [ymin].concat(ybrks.filter(y => y > ymin && y < ymax)).concat([ymax]);

  const bboxes = [];

  for (let i = 1; i < xedges.length; i++) {
    const xmin = xedges[i - 1];
    const xmax = xedges[i];
    for (let ii = 1; ii < yedges.length; ii++) {
      const ymin = yedges[ii - 1];
      const ymax = yedges[ii];
      bboxes.push([xmin, ymin, xmax, ymax]);
    }
  }

  return bboxes;
}

module.exports = split;
module.exports.default = split;
