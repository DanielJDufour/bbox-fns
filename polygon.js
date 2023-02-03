// convert bbox in [xmin, ymin, xmax, ymax] format to a GeoJSON-like Polygon
function polygon([x0, y0, x1, y1]) {
  return [
    [
      [x0, y1], // top-left
      [x0, y0], // bottom-left
      [x1, y0], // bottom-right
      [x1, y1], // top-right
      [x0, y1] // top-left
    ]
  ];
}

module.exports = polygon;
module.exports.default = polygon;
