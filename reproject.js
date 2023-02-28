"use_strict";

const bboxArray = require("./bbox-array.js");
const densePolygon = require("./dense-polygon.js");

function reproject(bbox, reproject, { async = false, density } = {}) {
  const polygon = densePolygon(bbox, { density });
  const ring = polygon[0];
  const reprojected = ring.map(pt => reproject(pt));
  if (async) {
    return Promise.all(reprojected).then(points => bboxArray(points));
  } else {
    return bboxArray(reprojected);
  }
}

module.exports = reproject;
module.exports.default = reproject;
