function shift([xmin, ymin, xmax, ymax], dist) {
  const x = Array.isArray(dist) && dist.length >= 1 ? dist[0] : typeof dist.x === "number" ? dist.x : 0;
  const y = Array.isArray(dist) && dist.length >= 2 ? dist[1] : typeof dist.y === "number" ? dist.y : 0;

  return [xmin + x, ymin + y, xmax + x, ymax + y];
}

module.exports = shift;
module.exports.default = shift;
