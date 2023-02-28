"use_strict";

const booleanIntersects = require("./boolean-intersects.js");
const intersect = require("./intersect.js");
const polygon = require("./polygon.js");
const densePolygon = require("./dense-polygon.js");
const reproject = require("./reproject.js");

const bboxfns = {
  booleanIntersects,
  densePolygon,
  intersect,
  polygon,
  reproject
};

if (typeof define === "function" && define.amd) {
  define(function () {
    return bboxfns;
  });
}

if (typeof module === "object") {
  module.exports = bboxfns;
}

if (typeof window === "object") {
  window.bboxfns = bboxfns;
}

if (typeof self === "object") {
  self.bboxfns = bboxfns;
}
