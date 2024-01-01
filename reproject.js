"use_strict";

const bboxArray = require("./bbox-array.js");
const densePolygon = require("./dense-polygon.js");

function reproject(bbox, reproject, { async = false, density, nan_strategy = "throw" } = {}) {
  const polygon = densePolygon(bbox, { density });
  const ring = polygon[0];
  const reprojected = ring.map(pt => reproject(pt));
  if (async) {
    return Promise.all(reprojected).then(points => bboxArray(points, { nan_strategy }));
  } else {
    return bboxArray(reprojected, { nan_strategy });
  }
}

module.exports = reproject;
module.exports.default = reproject;
