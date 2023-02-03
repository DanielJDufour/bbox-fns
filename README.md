# bbox-fns: work in progress
Super Light-weight JavaScript Bounding Box Utility Functions

## usage

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


### projection support
If you are looking for a library with projection support, try [geo-extent](https://github.com/danieljdufour/geo-extent)!
