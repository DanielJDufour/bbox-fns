const booleanIntersects = require("./boolean-intersects.js");
const intersection = require("./intersect.js");
const polygon = require("./polygon.js");

const bboxfns = { booleanIntersects, intersection, polygon };

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
