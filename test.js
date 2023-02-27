const test = require("flug");

const booleanIntersects = require("./boolean-intersects.js");
const intersect = require("./intersect.js");
const polygon = require("./polygon.js");
const densePolygon = require("./dense-polygon.js");

const globe = [-180, -90, 180, 90];
const western_hemisphere = [-180, -90, 0, 90];
const eastern_hemisphere = [0, -90, 180, 90];

test("booleanIntersects", ({ eq }) => {
  eq(booleanIntersects(western_hemisphere, eastern_hemisphere), true); // overlap on prime meridian
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
