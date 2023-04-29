"use_strict";

const preciseBboxArray = require("./bbox-array.js");
const preciseDensePolygon = require("./dense-polygon.js");

function preciseReproject(bbox, reproject, { async = false, density } = {}) {
  const polygon = preciseDensePolygon(bbox, { density });
  const ring = polygon[0];
  const reprojected = ring.map(pt => reproject(pt));
  if (async) {
    return Promise.all(reprojected).then(points => preciseBboxArray(points));
  } else {
    return preciseBboxArray(reprojected);
  }
}

module.exports = preciseReproject;
module.exports.default = preciseReproject;
