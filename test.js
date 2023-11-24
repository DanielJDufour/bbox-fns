"use_strict";

const test = require("flug");
const subtract = require("preciso/subtract.js");

const polygons_split_across_antimeridian = [
  [
    [
      [-180, -18],
      [-178, -18],
      [-178, -20],
      [-180, -20],
      [-180, -18]
    ]
  ],
  [
    [
      [180, -20],
      [178, -20],
      [178, -18],
      [180, -18],
      [180, -20]
    ]
  ]
];

const {
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
  reproject,
  preciseReproject,
  scale,
  shift,
  split,
  preciseDivide,
  validate,
  preciseValidate,
  union,
  unwrap
} = require("./index.js");

const globe = [-180, -90, 180, 90];
const western_hemisphere = [-180, -90, 0, 90];
const eastern_hemisphere = [0, -90, 180, 90];

test("bboxPoint", ({ eq }) => {
  const point = [-180, 86.06126914660831];
  eq(bboxPoint(point), [-180, 86.06126914660831, -180, 86.06126914660831]);
});

test("bboxArea", ({ eq }) => {
  eq(bboxArea([2, 3, 8, 9]), 36);
  eq(
    bboxArea([-180, 84.48577680525165, -179, 86.06126914660831]),
    1.5754923413566644
  );
  eq(bboxArea([-540, -90, -180, 90]), 64800);
});

test("bboxArray", ({ eq }) => {
  const points = [
    [-180, 86.06126914660831],
    [-180, 85.66739606126914],
    [-179, 84.87964989059081],
    [-179, 84.48577680525165]
  ];
  eq(bboxArray(points), [-180, 84.48577680525165, -179, 86.06126914660831]);
});

test("bboxSize", ({ eq }) => {
  eq(bboxSize([-180, 84.48577680525165, -179, 86.06126914660831]), [
    1,
    1.5754923413566644
  ]);
  eq(bboxSize([-540, -90, -180, 90]), [360, 180]);
});

test("booleanContains", ({ eq }) => {
  const western_hemisphere = [-180, -90, 0, 90];
  const eastern_hemisphere = [0, -90, 180, 90];
  const northern_hemisphere = [-180, 0, 180, 90];
  const colorado = [-109.05378, 37.0057, -102.0665, 41.0443];
  const bbox_to_edge = [-10, -20, 0, 20];
  eq(booleanContains(western_hemisphere, colorado), true);
  eq(booleanContains(colorado, western_hemisphere), false);
  eq(booleanContains(eastern_hemisphere, colorado), false);
  eq(booleanContains(eastern_hemisphere, western_hemisphere), false);
  eq(booleanContains(western_hemisphere, bbox_to_edge), true);
  eq(
    booleanContains(western_hemisphere, bbox_to_edge, { exclusive: true }),
    false
  );
  eq(booleanContains(western_hemisphere, northern_hemisphere), false);
});

test("booleanContainsPoint", ({ eq }) => {
  const western_hemisphere = [-180, -90, 0, 90];
  const hawaii = [-155.844437, 19.741755];
  const null_island = [0, 0];
  eq(booleanContainsPoint(western_hemisphere, hawaii), true);
  eq(booleanContainsPoint(western_hemisphere, null_island), true);
  eq(
    booleanContainsPoint(western_hemisphere, null_island, { exclusive: true }),
    false
  );
});

test("booleanIntersects", ({ eq }) => {
  eq(booleanIntersects(western_hemisphere, eastern_hemisphere), true); // overlap on prime meridian
});

test("booleanRectangle", ({ eq }) => {
  const bbox = [-180, -90, 0, 90];

  // example
  eq(booleanRectangle(densePolygon(bbox, { density: 1 })), true);

  eq(booleanRectangle(bbox), false); // invalid input

  const poly = polygon(bbox);
  const densePoly = densePolygon(bbox, { density: 10 });
  eq(booleanRectangle(poly), true);
  eq(booleanRectangle(poly[0]), true);
  eq(booleanRectangle([poly]), true);
  eq(booleanRectangle(densePoly), true);
  eq(booleanRectangle(densePoly[0]), true);
  eq(booleanRectangle([densePoly]), true);

  const triangle = [
    [8.9257, 25.4035],
    [25.625, 12.6403],
    [32.1289, 23.8054],
    [8.9257, 25.4035]
  ];
  eq(booleanRectangle(triangle), false);

  const quadrilateral = [
    [-9, 22],
    [-9, -22],
    [58, -30],
    [58, 22],
    [-9, 22]
  ];
  eq(booleanRectangle(quadrilateral, { debug: false }), false);
});

test("calc: GeoJSON Point", ({ eq }) => {
  eq(
    calc({
      type: "Point",
      coordinates: [30, 10]
    }),
    [30, 10, 30, 10]
  );
});

test("calc: GeoJSON LineString", ({ eq }) => {
  eq(
    calc({
      type: "LineString",
      coordinates: [
        [30, 10],
        [10, 30],
        [40, 40]
      ]
    }),
    [10, 10, 40, 40]
  );
});

test("calc: GeoJSON Polygon", ({ eq }) => {
  const geojson = {
    type: "Polygon",
    coordinates: [
      [
        [30, 10],
        [40, 40],
        [20, 40],
        [10, 20],
        [30, 10]
      ]
    ]
  };
  eq(calc(geojson), [10, 10, 40, 40]);
  eq(calc(geojson.coordinates), [10, 10, 40, 40]);
});

test("calc: GeoJSON Polygon with hole", ({ eq }) => {
  eq(
    calc({
      type: "Polygon",
      coordinates: [
        [
          [35, 10],
          [45, 45],
          [15, 40],
          [10, 20],
          [35, 10]
        ],
        [
          [20, 30],
          [35, 35],
          [30, 20],
          [20, 30]
        ]
      ]
    }),
    [10, 10, 45, 45]
  );
});

test("calc: GeoJSON MultiPoint", ({ eq }) => {
  eq(
    calc({
      type: "MultiPoint",
      coordinates: [
        [10, 40],
        [40, 30],
        [20, 20],
        [30, 10]
      ]
    }),
    [10, 10, 40, 40]
  );
});

test("calc: GeoJSON MultiLineString", ({ eq }) => {
  eq(
    calc({
      type: "MultiLineString",
      coordinates: [
        [
          [10, 10],
          [20, 20],
          [10, 40]
        ],
        [
          [40, 40],
          [30, 30],
          [40, 20],
          [30, 10]
        ]
      ]
    }),
    [10, 10, 40, 40]
  );
});

test("calc: GeoJSON MultiPolygon", ({ eq }) => {
  const geojson = {
    type: "MultiPolygon",
    coordinates: [
      [
        [
          [30, 20],
          [45, 40],
          [10, 40],
          [30, 20]
        ]
      ],
      [
        [
          [15, 5],
          [40, 10],
          [10, 20],
          [5, 10],
          [15, 5]
        ]
      ]
    ]
  };
  eq(calc(geojson), [5, 5, 45, 40]);
  eq(calc(geojson.coordinates), [5, 5, 45, 40]);
});

test("calc: GeoJSON MultiPolygon with hole", ({ eq }) => {
  eq(
    calc({
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [40, 40],
            [20, 45],
            [45, 30],
            [40, 40]
          ]
        ],
        [
          [
            [20, 35],
            [10, 30],
            [10, 10],
            [30, 5],
            [45, 20],
            [20, 35]
          ],
          [
            [30, 20],
            [20, 15],
            [20, 25],
            [30, 20]
          ]
        ]
      ]
    }),
    [10, 5, 45, 45]
  );
});

test("calc: GeoJSON GeometryCollection", ({ eq }) => {
  eq(
    calc({
      type: "GeometryCollection",
      geometries: [
        {
          type: "Point",
          coordinates: [40, 10]
        },
        {
          type: "LineString",
          coordinates: [
            [10, 10],
            [20, 20],
            [10, 40]
          ]
        },
        {
          type: "Polygon",
          coordinates: [
            [
              [40, 40],
              [20, 45],
              [45, 30],
              [40, 40]
            ]
          ]
        }
      ]
    }),
    [10, 10, 45, 45]
  );
});

test("calc: ArcGIS Point in 2D", ({ eq }) => {
  eq(
    calc({
      x: -118.15,
      y: 33.8,
      spatialReference: {
        wkid: 4326
      }
    }),
    [-118.15, 33.8, -118.15, 33.8]
  );
});

test("calc: ArcGIS Point in 3D", ({ eq }) => {
  eq(
    calc({
      x: -118.15,
      y: 33.8,
      z: 10.0,
      spatialReference: {
        wkid: 4326
      }
    }),
    [-118.15, 33.8, -118.15, 33.8]
  );
});

test("calc: ArcGIS MultiPoint", ({ eq }) => {
  eq(
    calc({
      points: [
        [-97.06138, 32.837],
        [-97.06133, 32.836],
        [-97.06124, 32.834],
        [-97.06127, 32.832]
      ],
      spatialReference: {
        wkid: 4326
      }
    }),
    [-97.06138, 32.832, -97.06124, 32.837]
  );
});

test("calc: ArcGIS Polyline", ({ eq }) => {
  eq(
    calc({
      paths: [
        [
          [-97.06138, 32.837],
          [-97.06133, 32.836],
          [-97.06124, 32.834],
          [-97.06127, 32.832]
        ],
        [
          [-97.06326, 32.759],
          [-97.06298, 32.755]
        ]
      ],
      spatialReference: { wkid: 4326 }
    }),
    [-97.06326, 32.755, -97.06124, 32.837]
  );
});

test("calc: ArcGIS Polygon in 2D", ({ eq }) => {
  eq(
    calc({
      rings: [
        [
          [-97.06138, 32.837],
          [-97.06133, 32.836],
          [-97.06124, 32.834],
          [-97.06127, 32.832],
          [-97.06138, 32.837]
        ],
        [
          [-97.06326, 32.759],
          [-97.06298, 32.755],
          [-97.06153, 32.749],
          [-97.06326, 32.759]
        ]
      ],
      spatialReference: {
        wkid: 4326
      }
    }),
    [-97.06326, 32.749, -97.06124, 32.837]
  );
});

test("calc: ArcGIS Polygon in 3D", ({ eq }) => {
  eq(
    calc({
      hasZ: true,
      hasM: true,
      rings: [
        [
          [-97.06138, 32.837, 35.1, 4],
          [-97.06133, 32.836, 35.2, 4.1],
          [-97.06124, 32.834, 35.3, 4.2],
          [-97.06127, 32.832, 35.2, 44.3],
          [-97.06138, 32.837, 35.1, 4]
        ],
        [
          [-97.06326, 32.759, 35.4],
          [-97.06298, 32.755, 35.5],
          [-97.06153, 32.749, 35.6],
          [-97.06326, 32.759, 35.4]
        ]
      ],
      spatialReference: { wkid: 4326 }
    }),
    [-97.06326, 32.749, -97.06124, 32.837]
  );
});

test("calc: ArcGIS Envelope in 2D", ({ eq }) => {
  eq(
    calc({
      xmin: -109.55,
      ymin: 25.76,
      xmax: -86.39,
      ymax: 49.94,
      spatialReference: {
        wkid: 4326
      }
    }),
    [-109.55, 25.76, -86.39, 49.94]
  );
});

test("polygons split across antimeridian", ({ eq }) => {
  eq(calc(polygons_split_across_antimeridian), [-180, -20, 180, -18]);
  eq(calcAll(polygons_split_across_antimeridian), [
    [-180, -20, -178, -18],
    [178, -20, 180, -18]
  ]);
  eq(
    calcAll(
      polygons_split_across_antimeridian.concat(
        polygons_split_across_antimeridian
      )
    ),
    [
      [-180, -20, -178, -18],
      [178, -20, 180, -18]
    ]
  );
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

test("preciseDensePolygon", ({ eq }) => {
  eq(preciseDensePolygon(globe, { density: 1 }), [
    [
      ["-180", "90"],
      ["-180", "0"],
      ["-180", "-90"],
      ["0", "-90"],
      ["180", "-90"],
      ["180", "0"],
      ["180", "90"],
      ["0", "90"],
      ["-180", "90"]
    ]
  ]);

  eq(preciseDensePolygon(globe, { density: [1, 0] }), [
    [
      ["-180", "90"],
      ["-180", "-90"],
      ["0", "-90"],
      ["180", "-90"],
      ["180", "90"],
      ["0", "90"],
      ["-180", "90"]
    ]
  ]);

  const result = preciseDensePolygon(globe, { density: [359, 179] });
  eq(result[0].length, 5 + 2 * 359 + 2 * 179);
});

test("intersect", ({ eq }) => {
  // intersection is the prime meridian
  eq(intersect(western_hemisphere, eastern_hemisphere), [0, -90, 0, 90]);

  eq(intersect([-180, 1, -1, 90], [1, 1, 180, 90]), null);
});

test("grid", ({ eq }) => {
  eq(grid(globe, [2, 1]), [western_hemisphere, eastern_hemisphere]);
  eq(grid(globe, [2, 2]), [
    [-180, -90, 0, 0],
    [0, -90, 180, 0],
    [-180, 0, 0, 90],
    [0, 0, 180, 90]
  ]);
});

test("merge", ({ eq }) => {
  const bboxes = [western_hemisphere, eastern_hemisphere];
  eq(merge(bboxes), [-180, -90, 180, 90]);
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

test("reproject: sync + precise", ({ eq }) => {
  const shiftLeft = ([x, y]) => [subtract(x, "360"), y];
  eq(preciseReproject(globe, shiftLeft), ["-540", "-90", "-180", "90"]);
});

test("reproject: async + precise", async ({ eq }) => {
  const shiftLeft = async ([x, y]) => [subtract(x, "360"), y];
  const result = await preciseReproject(globe, shiftLeft, { async: true });
  eq(result, ["-540", "-90", "-180", "90"]);
});

test("scale", async ({ eq }) => {
  eq(scale([0, 9, 50, 200], 0.5), [0, 4.5, 25, 100]);
  eq(scale([0, 9, 50, 200], [0.5]), [0, 4.5, 25, 100]);
  eq(scale([0, 9, 50, 200], [2, 10]), [0, 90, 100, 2000]);
});

test("shift", async ({ eq }) => {
  eq(shift([-200, 40, -160, 90], { x: 360 }), [160, 40, 200, 90]);
  eq(shift([-185, 40, -180, 90], { x: 360 }), [175, 40, 180, 90]);
  eq(shift([-185, 40, -180, 90], [360, 0]), [175, 40, 180, 90]);
  eq(shift([-185, 90, -180, 95], [360, -90]), [175, 0, 180, 5]);
  eq(shift([-185, 90, -180, 95], { x: 360, y: -90 }), [175, 0, 180, 5]);
  eq(shift([-185, 90, -180, 95], {}), [-185, 90, -180, 95]);
  eq(shift([-185, 90, -180, 95], []), [-185, 90, -180, 95]);
});

test("split", async ({ eq }) => {
  eq(split([-180, -90, 180, 90], { x: [-180, 180], y: [-90, 90] }), [
    [-180, -90, 180, 90]
  ]);
  eq(split([-200, -90, 160, 90], { x: [-180, 180] }), [
    [-200, -90, -180, 90],
    [-180, -90, 160, 90]
  ]);
  eq(split([-200, -90, 160, 90], { x: [-180, 180], y: [-90, 90] }), [
    [-200, -90, -180, 90],
    [-180, -90, 160, 90]
  ]);
  eq(split([-200, -90, 220, 90], { x: [-180, 180], y: [-90, 90] }), [
    [-200, -90, -180, 90],
    [-180, -90, 180, 90],
    [180, -90, 220, 90]
  ]);
  eq(split([-185, 40, -70, 90], { x: [-180, 180], y: [-90, 90] }), [
    [-185, 40, -180, 90],
    [-180, 40, -70, 90]
  ]);
  eq(split([-200, -90, 160, 100], { x: [-180, 180], y: [-90, 90] }), [
    [-200, -90, -180, 90],
    [-200, 90, -180, 100],
    [-180, -90, 160, 90],
    [-180, 90, 160, 100]
  ]);
  eq(split([-185, 40, -70, 95], { x: [-180, 180], y: [-90, 90] }), [
    [-185, 40, -180, 90],
    [-185, 90, -180, 95],
    [-180, 40, -70, 90],
    [-180, 90, -70, 95]
  ]);
  eq(
    split([-185, 40, -70, 95], {
      x: [-360, -180, 180, 360],
      y: [-180, -90, 90, 180]
    }),
    [
      [-185, 40, -180, 90],
      [-185, 90, -180, 95],
      [-180, 40, -70, 90],
      [-180, 90, -70, 95]
    ]
  );
});

test("preciseDivide", ({ eq }) => {
  eq(preciseDivide([0, 9, 50, 200], 2), ["0", "4.5", "25", "100"]);
  eq(preciseDivide([0, 9, 50, 200], [2]), ["0", "4.5", "25", "100"]);
  eq(preciseDivide([0, 9, 50, 200], [3, 4], { ellipsis: true }), [
    "0",
    "2.25",
    "16.666...",
    "50"
  ]);
});

test("validate", ({ eq }) => {
  eq(validate([-180, 0, 180, 45]), true);
  eq(validate([-180, 0, 0, 180, 45, 0]), false);
  eq(validate([-45, 10, -90, 20]), false);
});

test("preciseValidate", ({ eq }) => {
  eq(preciseValidate(["-180", "0", "180", "45"]), true);
  eq(preciseValidate(["-180", "0", "0", "180", "45", "0"]), false);
  eq(preciseValidate(["-45", "10", "-90", "20"]), false);
});

test("union", ({ eq }) => {
  const wyoming = [-110.99, 40.97, -104.08, 45.03];
  const usa = [-125.1, 24.75, -66, 49.54];
  const iceland = [-24.4, 63.29, -13.16, 66.73];

  eq(union([]), []);
  eq(union([iceland]), [iceland]);
  eq(union([wyoming, usa]), [usa]);
  eq(union([wyoming, usa, iceland]), [iceland, usa]);
  eq(union([wyoming, iceland]), [iceland, wyoming]);
});

test("unwrap EPSG:4326", ({ eq }) => {
  const earth = [-180, -90, 180, 90];
  eq(unwrap([-180, -90, 180, 90], earth), [[-180, -90, 180, 90]]);
  eq(unwrap([-200, -90, -160, 90], earth), [
    [-180, -90, -160, 90],
    [160, -90, 180, 90]
  ]);
  eq(unwrap([-200, -90, -180, 90], earth), [[160, -90, 180, 90]]);
  eq(unwrap([-200, -90, -185, 90], earth), [[160, -90, 175, 90]]);
  eq(unwrap([180, -90, 200, 90], earth), [[-180, -90, -160, 90]]);
  eq(unwrap([170, -90, 210, 90], earth), [
    [-180, -90, -150, 90],
    [170, -90, 180, 90]
  ]);
  eq(unwrap([170, -90, 180, 90], earth), [[170, -90, 180, 90]]);
  eq(unwrap([-200, -21, -160, 87], earth), [
    [-180, -21, -160, 87],
    [160, -21, 180, 87]
  ]);
});
