const compare = require("preciso/compare.js");

function preciseValidate(bbox) {
  if (!Array.isArray(bbox)) return false;

  if (bbox.length !== 4) return false;

  if (bbox.some(n => typeof n !== "string")) return false;

  const [xmin, ymin, xmax, ymax] = bbox;
  if (compare(xmin, xmax) === ">") return false;
  if (compare(ymin, ymax) === ">") return false;

  return true;
}

module.exports = preciseValidate;
module.exports.default = preciseValidate;
