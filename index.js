"use_strict";

const bboxArea = require("./bbox-area.js");
const bboxArray = require("./bbox-array.js");
const bboxPoint = require("./bbox-point.js");
const bboxSize = require("./bbox-size.js");
const booleanContains = require("./boolean-contains.js");
const booleanContainsPoint = require("./boolean-contains-point.js");
const booleanIntersects = require("./boolean-intersects.js");
const booleanRectangle = require("./boolean-rectangle.js");
const calc = require("./calc.js");
const calcAll = require("./calc-all.js");
const densePolygon = require("./dense-polygon.js");
const grid = require("./grid.js");
const intersect = require("./intersect.js");
const merge = require("./merge.js");
const polygon = require("./polygon.js");
const preciseDensePolygon = require("./precise/dense-polygon.js");
const preciseDivide = require("./precise/divide.js");
const preciseReproject = require("./precise/reproject.js");
const reproject = require("./reproject.js");
const scale = require("./scale.js");
const shift = require("./shift.js");
const sort = require("./sort.js");
const split = require("./split.js");
const validate = require("./validate.js");
const preciseValidate = require("./precise/validate.js");
const union = require("./union.js");
const unwrap = require("./unwrap.js");

const bboxfns = {
  bboxArea,
  bboxArray,
  bboxPoint,
  bboxSize,
  booleanContains,
  booleanContainsPoint,
  booleanIntersects,
  booleanRectangle,
  calc,
  calcAll,
  densePolygon,
  grid,
  intersect,
  merge,
  polygon,
  preciseDensePolygon,
  preciseDivide,
  preciseReproject,
  reproject,
  scale,
  shift,
  split,
  validate,
  preciseValidate,
  sort,
  union,
  unwrap
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
