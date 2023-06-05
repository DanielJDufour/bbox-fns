"use_strict";

const booleanIntersects = require("./boolean-intersects.js");
const calc = require("./calc.js");
const intersect = require("./intersect.js");
const polygon = require("./polygon.js");
const densePolygon = require("./dense-polygon.js");
const reproject = require("./reproject.js");
const scale = require("./scale.js");

const bboxfns = {
  booleanIntersects,
  calc,
  densePolygon,
  intersect,
  polygon,
  reproject,
  scale
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
