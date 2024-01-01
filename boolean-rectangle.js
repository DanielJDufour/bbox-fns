const VALID_ORDERING = [
  // clockwise
  "right -> down -> left -> up",
  "down -> left -> up -> right",
  "left -> up -> right -> down",
  "up -> right -> down -> left",

  // counter-clockwise
  "down -> right -> up -> left",
  "right -> up -> left -> down",
  "up -> left -> down -> right",
  "left -> down -> right -> up"
];

function booleanRectangle(coords, { debug = 0 } = { debug: 0 }) {
  if (!Array.isArray(coords)) {
    if (debug) {
      console.log("[bbox-fns/booleanRectangle] coords is not an array");
    }
    return false;
  }

  // unwrap ring from polygon
  if (coords.length === 1) coords = coords[0];

  // if multi-polygon, may need to unwrap twice
  if (coords.length === 1) coords = coords[0];

  if (!coords.every(pt => Array.isArray(pt) && pt.every(n => typeof n === "number"))) {
    if (debug) console.log("[bbox-fns/booleanRectangle] invalid points");
    return false;
  }

  // first and last coordinate should be the same
  if (JSON.stringify(coords[0]) !== JSON.stringify(coords[coords.length - 1])) {
    if (debug) console.log("[bbox-fns/booleanRectangle] first and last coordinates not equal");
    return false;
  }

  let order = [];
  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1];
    const [x1, y1] = coords[i];
    const vertical = x0 === x1;
    const horizontal = y0 === y1;

    // if both true or both false
    if (vertical === horizontal) {
      if (debug) console.log("[bbox-fns/booleanRectangle] invalid angle");
      return false;
    }

    let direction;
    if (vertical) {
      direction = y1 > y0 ? "up" : "down";
    } else if (horizontal) {
      direction = x1 > x0 ? "right" : "left";
    }

    if (direction !== order[order.length - 1]) {
      if (order.length === 4) {
        if (debug) console.log("[bbox-fns/booleanRectangle] more than 4 turns");
        return false;
      }
      order.push(direction);
    }
  }

  order = order.join(" -> ");
  if (debug) console.log("[bbox-fns/booleanRectangle] order: " + order);

  if (VALID_ORDERING.indexOf(order) === -1) {
    if (debug) console.log("[bbox-fns/booleanRectangle] invalid order");
    return false;
  }

  return true;
}

module.exports = booleanRectangle;
module.exports.default = booleanRectangle;
