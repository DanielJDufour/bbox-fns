"use_strict";

const test = require("flug");

const bboxArray = require("./bbox-array.js");
const booleanIntersects = require("./boolean-intersects.js");
const intersect = require("./intersect.js");
const polygon = require("./polygon.js");
const densePolygon = require("./dense-polygon.js");
const reproject = require("./reproject.js");

const globe = [-180, -90, 180, 90];
const western_hemisphere = [-180, -90, 0, 90];
const eastern_hemisphere = [0, -90, 180, 90];

test("bboxArray", ({ eq }) => {
  const points = [
    [-180, 86.06126914660831],
    [-180, 85.66739606126914],
    [-179, 84.87964989059081],
    [-179, 84.48577680525165]
  ];
  eq(bboxArray(points), [-180, 84.48577680525165, -179, 86.06126914660831]);
});

test("booleanIntersects", ({ eq }) => {
  eq(booleanIntersects(western_hemisphere, eastern_hemisphere), true); // overlap on prime meridian
});

test("densePolygon", ({ eq }) => {
  eq(densePolygon(globe, { density: 1 }), [
    [
      [-180, 90],
      [-180, 0],
      [-180, -90],
      [0, -90],
      [180, -90],
      [180, 0],
      [180, 90],
      [0, 90],
      [-180, 90]
    ]
  ]);

  eq(densePolygon(globe, { density: [1, 0] }), [
    [
      [-180, 90],
      [-180, -90],
      [0, -90],
      [180, -90],
      [180, 90],
      [0, 90],
      [-180, 90]
    ]
  ]);

  const result = densePolygon(globe, { density: [123, 456] });
  eq(result[0].length, 5 + 2 * 123 + 2 * 456);
});

test("intersect", ({ eq }) => {
  // intersection is the prime meridian
  eq(intersect(western_hemisphere, eastern_hemisphere), [0, -90, 0, 90]);

  eq(intersect([-180, 1, -1, 90], [1, 1, 180, 90]), null);
});

test("polygon", ({ eq }) => {
  eq(polygon(globe), [
    [
      [-180, 90],
      [-180, -90],
      [180, -90],
      [180, 90],
      [-180, 90]
    ]
  ]);
});

test("reproject: sync", ({ eq }) => {
  const shiftLeft = ([x, y]) => [x - 360, y];
  eq(reproject(globe, shiftLeft), [-540, -90, -180, 90]);
});

test("reproject: async", async ({ eq }) => {
  const shiftLeft = async ([x, y]) => [x - 360, y];
  const result = await reproject(globe, shiftLeft, { async: true });
  eq(result, [-540, -90, -180, 90]);
});
