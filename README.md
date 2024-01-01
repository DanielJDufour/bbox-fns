# bbox-fns: work in progress
Super Light-weight JavaScript Bounding Box Utility Functions

### the bounding box
Bounding boxes, or rectangular extents, are represented as an array of 4 numbers:
```js
[xmin, ymin, xmax, ymax]
```

## functions
- [bboxArea](#bboxArea)
- [bboxArray](#bboxArray)
- [bboxPoint](#bboxPoint)
- [bboxSize](#bboxSize)
- [booleanContains](#booleanContains)
- [booleanContainsPoint](#booleanContainsPoint)
- [booleanIntersects](#booleanIntersects)
- [booleanRectangle](#booleanRectangle)
- [calc](#calc)
- [calcAll](#calcAll)
- [densePolygon](#densePolygon)
- [grid](#grid)
- [intersect](#intersect)
- [merge](#merge)
- [polygon](#polygon)
- [reproject](#reproject)
- [scale](#scale)
- [shift](#shift)
- [sort](#sort)
- [split](#split)
- [union](#union)
- [unwrap](#unwrap)
- [validate](#validate)

### bboxArea
Calculate the area of a bounding box
```js
import bboxArea from "bbox-fns/bbox-area.js";

bboxArea([2, 3, 8, 9])
36 // (8 - 2) * (9 - 3)
```

### bboxArray
Calculate the bounding box of an array of points (aka "a polygon ring")
```js
import bboxArray from "bbox-fns/bbox-array.js";

bboxArray([
  [ -180, 86.06126914660831 ],
  [ -180, 85.66739606126914 ],
  [ -179, 84.87964989059081 ],
  [ -179, 84.48577680525165 ]
]);
[-180, 84.48577680525165, -179, 86.06126914660831]

// throws because of the NaN value
bboxArray([ -180, 86.06 ], [NaN, NaN], [ -179, 84.48 ]);

// skip NaN values (don't throw)
bboxArray(points, { nan_strategy: "skip" })
[-180, 84.48, -179, 86.06]
```

### bboxPoint
Convert a single [x, y] point into a bounding box of zero width and height;
```js
import bboxPoint from "bbox-fns/bbox-point.js";

bboxPoint([-180, 86.06126914660831]);
[-180, 86.06126914660831, -180, 86.06126914660831]
```

### bboxSize
Calculate the width and height of a bounding box
```js
import bboxSize from "bbox-fns/bbox-size.js";

bboxSize([-180, 84.48577680525165, -179, 86.06126914660831]);
[1, 1.5754923413566644]
```

### booleanContains
Check if a bounding box contains another
```js
import booleanContains from "bbox-fns/boolean-contains.js";

const western_hemisphere = [-180, -90, 0, 90];
const colorado = [-109.05378, 37.0057, -102.0665, 41.0443];

booleanContains(western_hemisphere, colorado);
true

// exclude bbox that extends to the exact edge
booleanContains(western_hemisphere, [-10, -20, 0, 20], { exclusive: true });
false
```

### booleanContainsPoint
Check if a bounding box contains a point
```js
import booleanContainsPoint from "bbox-fns/boolean-contains-point.js";

const western_hemisphere = [-180, -90, 0, 90];
const eastern_hemisphere = [0, -90, 180, 90];
const hawaii = [-155.844437, 19.741755];

booleanContainsPoint(western_hemisphere, hawaii);
true

// point on boundary
booleanContainsPoint(western_hemisphere, [0, 0]);
true

// ignoring points on the exact edge
booleanContainsPoint(western_hemisphere, [0, 0], { exclusive: true });
false
```

### booleanIntersects
Checks if two bounding boxes have any intersection at all.
```js
import booleanIntersects from "bbox-fns/boolean-intersects.js";

const western_hemisphere = [-180, -90, 0, 90];
const eastern_hemisphere = [0, -90, 180, 90];

booleanIntersects(western_hemisphere, eastern_hemisphere);
true
```

### booleanRectangle
Checks if coordinates represent a rectangular bounding box
```js
import booleanRectangle from "bbox-fns/boolean-rectangle.js";

// rectangle for the globe bbox [-180, -90, 180, 90]
const coords = [
  [ -180, 90 ],
  [ -180, -90 ],
  [ 0, -90 ],
  [ 0, 90 ],
  [ -180, 90 ]
];
booleanRectangle(coords);
true

// extra points that don't affect shape
const denseCoords = [
  [ -180, 90 ],
  [ -180, 0 ],
  [ -180, -90 ],
  [ -90, -90 ],
  [ 0, -90 ],
  [ 0, 0 ],
  [ 0, 90 ],
  [ -90, 90 ],
  [ -180, 90 ]
];
booleanRectangle(denseCoords);
true
```

### intersect
```js
import intersect from "bbox-fns/intersect.js";
const western_hemisphere = [-180, -90, 0, 90];
const eastern_hemisphere = [0, -90, 180, 90];

intersect(western_hemisphere, eastern_hemisphere);
[0, -90, 0, 90] // prime meridian
```

### merge
```js
import merge from "bbox-fns/merge.js";

const western_hemisphere = [-180, -90, 0, 90];
const eastern_hemisphere = [0, -90, 180, 90];
const bboxes = [western_hemisphere, eastern_hemisphere];
merge(bboxes);
[-180, -90, 180, 90] // bbox for the whole globe
```

### polygon
Create GeoJSON-Like Polygon from a Bounding Box
```js
import polygon from "bbox-fns/polygon.js";

polygon([-180, -90, 180, 90]);

// polygon is in counter-clockwise order
[
  [
    [-180, 90],  // top-left
    [-180, -90], // bottom-left
    [180, -90],  // bottom-right
    [180, 90],   // top-right 
    [-180, 90]   // top-left
  ]
]
```

### calc
Calculate the bounding box of a geometry in either GeoJSON or ArcGIS JSON.
```js
import calc from "bbox-fns/calc.js";

calc({
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
});
[10, 10, 40, 40]
```

### calcAll
Calculate an array of bounding boxes for all the input geometries.
For example, a multipolygon will return multiple bounding boxes.
```js
import calcAll from "bbox-fns/calc-all.js";

calcAll({
  type: "MultiPolygon",
  coordinates: [ ... ]
});
[bbox1, bbox2, ...]
```

### densePolygon
A more advanced version of polygon.  Create a polygon
while adding points to each side of the rectangle.
```js
import polygon from "bbox-fns/dense-polygon.js";

// add 100 points along each side
densePolygon(bbox, { density: 100 });

// add 100 points along the top and bottom edge (x-axis)
// and 400 points along the left and right edge (y-axis)
densePolygon(bbox, { density: [100, 400] });
```

### grid
Chop bounding box up into multiple smaller bounding boxes.
```js
import grid from "bbox-fns/grid.js";

const globe = [-180, -90, 180, 90];
const number_of_columns = 2; // how many grid cells left to right
const number_of_rows = 2; // how many grid cells top to bottom
const quadrants = grid(globe, [number_of_columns, number_of_rows]);
[
  [-180, -90, 0, 0], // south-western
  [0, -90, 180, 0], // south-eastern
  [-180, 0, 0, 90], // north-western
  [0, 0, 180, 90]  // north-eastern
]
```

### scale
Multiply x and y values by the given scale values
```js
import scale from "bbox-fns/scale.js";

// shrink the grid by 50%
scale([0, 9, 50, 200], 0.5);
[0, 4.5, 25, 100];

// scale x and y values by different factors
// same as [0 * 2, 9 * 10, 50 * 2, 200 * 10]
scale([0, 9, 50, 200], [2, 10]);
[0, 90, 100, 2000]
```

### shift
Shift bounding box horizontally and/or vertically
```js
// shift bounding box overlapping left "edge"
// to the right, so it overlaps the right "edge"
shift([-200, 40, -160, 90], { x: 360 })
[160,40,200,90];

// shift horizontally and vertically
shift([-185, 90, -180, 95], [360, -90])
[175, 0, 180, 5]

// same as above
shift([-185, 90, -180, 95], { x: 360, y: -90 });
```

### split
Split bounding box that crosses given x or y boundaries.  For example, split a bbox that crosses the antimeridian into two bounding boxes.
```js
import split from "bbox-fns/split.js";

// split across the antimeridian
split([-200, -90, 160, 90], { x: [-180, 180] })
[
  [-200, -90, -180, 90], // overflow, left of antimeridian
  [-180, -90, 160, 90] // right of antimeridian
]

// split across the antimeridian and the poles
split([-200, -90, 160, 100], { x: [-180, 180], y: [-90, 90] })
[
  [-200,-90,-180,90],
  [-200,90,-180,100],
  [-180,-90,160,90],
  [-180,90,160,100]
]
```

### reproject
Reproject a bounding box using the given reprojection function
```js
import reproject from "bbox-fns/reproject.js";
import proj4 from "proj4-fully-loaded";

// convert a bounding box from 4326 to a UTM projection
const { forward } = proj4("EPSG:4326", "EPSG:32610");
reproject(bbox, forward);

// you can also pass in an async reprojection function
reproject(bbox, forwardAsync, { async: true })

// you can also control the point density of the intermediate polygon
reproject(bbox, forward, { density: 99 })

// skip (don't throw error) when forward returns a NaN value
reproject(bbox, forward, { nan_strategy: "skip" })
```

### sort
```js
import sort from "bbox-fns/sort.js";

const bboxes = [
  [175, -85, 180, 90],
  [-180, -85, -175, 90]
];
sort(bboxes)
[[-180,-85,-175,90],[175,-85,180,90]]
```

### union
Combine all bounding boxes that intersect.
This is different from merge, which will combine bounding boxes even if they don't intersect.
```js
import union from "bbox-fns/union.js";

const wyoming = [-110.99, 40.97, -104.08, 45.03];
const usa = [-125.10, 24.75, -66, 49.54];
const iceland = [-24.40,  63.29, -13.16, 66.73];

union([wyoming, usa, iceland]);

// only includes usa and iceland, because wyoming merged into usa
[[-125.10, 24.75, -66, 49.54], [-24.40,  63.29, -13.16, 66.73]]
```

### unwrap
Un-wrap an extent that overflows the edge of the earth, returning an array of one or more bounding boxes.
```js
import unwrap from "bbox-fns/unwrap.js";

const earth = [-180, -90, 180, 90];
const bbox = [-200, -21, -160, 87]; // extends over "left edge" of the earth

unwrap(bbox, earth);

// bounding box unwrapped and normalized within the bounds of the earth
[
  [-180, -21, -160, 87],
  [160, -21, 180, 87]
]
```

### validate
```js
import validate from "bbox-fns/validate.js";

validate([-180, 0, 180, 45])
true

// invalid length
validate([-180, 0, 0, 180, 45, 0])
false

// xmin greater than xmax
validate([-45, 10, -90, 20])
false
```

### projection support
If you are looking for a library with greater projection support and a class-based approach, try [geo-extent](https://github.com/danieljdufour/geo-extent)!

### nomenclature
This library borrows the names of some similar [Turf.js](https://turfjs.org/) functions, but it does not borrow the internal code.

### advanced usage
#### precise functions
In order to avoid floating point arithmetic errors, you can use the precise version of these functions where numbers are represented as strings.
```js
import preciseBboxArray from "bbox-fns/precise/bbox-array.js";
import preciseDensePolygon from "bbox-fns/precise/dense-polygon.js";
import preciseDivide from "bbox-fns/precise/divide.js";
import preciseReproject from "bbox-fns/precise/reproject.js";

preciseDensePolygon(bbox, { density: [359, 179] }); // add 359 points to top and bottom, and 179 points to the left and right
[
  [ '-180', '80' ],  [ '-180', '79' ],  [ '-180', '78' ],  [ '-180', '77' ], /* ... */, [ '-180', '80' ]
]

preciseDivide([0, 9, 50, 200], [3, 4], { ellipsis: true })
["0", "2.25", "16.666...", "50"]
```
