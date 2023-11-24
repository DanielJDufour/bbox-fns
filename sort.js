function sort(bboxes) {
  return bboxes.sort((a, b) => {
    const [axmin, aymin, axmax, aymax] = a;
    const [bxmin, bymin, bxmax, bymax] = b;

    if (axmin < bxmin) return -1;
    if (axmin > bxmin) return 1;
    if (aymin < bymin) return 1;
    if (aymin > bymin) return -1;

    return 0;
  });
}

module.exports = sort;
module.exports.default = sort;
