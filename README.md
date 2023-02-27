# bbox-fns: work in progress
Super Light-weight JavaScript Bounding Box Utility Functions

## usage

### the bounding box
Bounding boxes, or rectangular extents, are represented as an array of 4 numbers:
```js
[xmin, ymin, xmax, ymax]
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

### intersect
```js
import intersect from "bbox-fns/intersect.js";
const western_hemisphere = [-180, -90, 0, 90];
const eastern_hemisphere = [0, -90, 180, 90];

intersect(western_hemisphere, eastern_hemisphere);
[0, -90, 0, 90] // prime meridian
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

### projection support
If you are looking for a library with projection support, try [geo-extent](https://github.com/danieljdufour/geo-extent)!

### nomenclature
This library borrows the names of some similar [Turf.js](https://turfjs.org/) functions, but it does not borrow the internal code.
