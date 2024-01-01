"use_strict";

const dedupe = require("./dedupe.js");

function flatten(arr) {
  const out = [];
  for (let a = 0; a < arr.length; a++) {
    const it = arr[a];
    for (let i = 0; i < it.length; i++) {
      out.push(it[i]);
    }
  }
  return out;
}

function calcAll(geom) {
  if (geom.geometry) geom = geom.geometry;
  if (geom.coordinates) geom = geom.coordinates;

  if (geom.paths) geom = geom.paths; // ArcGIS Polyline
  if (geom.points) geom = geom.points; // ArcGIS Multipoint
  if (geom.rings) geom = geom.rings; // ArcGIS Polygon

  // GeoJSON FeatureCollection
  if (Array.isArray(geom.features)) {
    return dedupe(flatten(geom.features.map(calcAll)));
  }

  // GeoJSON GeometryCollection
  if (Array.isArray(geom.geometries)) {
    return dedupe(flatten(geom.geometries.map(calcAll)));
  }

  if (Array.isArray(geom) && Array.isArray(geom[0]) && Array.isArray(geom[0][0])) {
    return dedupe(flatten(geom.map(calcAll)));
  }

  // array of [x, y] coordinate pairs
  if (Array.isArray(geom) && Array.isArray(geom[0]) && typeof geom[0][0] === "number") {
    const [x, y] = geom[0];
    let xmin = x;
    let ymin = y;
    let xmax = x;
    let ymax = y;
    geom.forEach(([px, py]) => {
      if (px < xmin) xmin = px;
      if (px > xmax) xmax = px;
      if (py < ymin) ymin = py;
      if (py > ymax) ymax = py;
    });
    return [[xmin, ymin, xmax, ymax]];
  }

  // point
  if (Array.isArray(geom) && (geom.length === 2 || geom.length === 3) && typeof geom[0] === "number") {
    const [x, y] = geom;
    return [[x, y, x, y]];
  }

  // ArcGIS Point
  if (typeof geom.x === "number" && typeof geom.y === "number") {
    const { x, y } = geom;
    return [[x, y, x, y]];
  }

  if (["xmin", "xmax", "ymin", "ymax"].every(k => typeof geom[k] === "number")) {
    return [[geom.xmin, geom.ymin, geom.xmax, geom.ymax]];
  }
}

module.exports = calcAll;
module.exports.default = calcAll;
