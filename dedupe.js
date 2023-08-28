function dedupe(arr) {
  const strs = [];
  for (let i = 0; i < arr.length; i++) {
    const it = arr[i];
    const s = JSON.stringify(it);
    if (strs.indexOf(s) === -1) {
      strs.push(s);
    }
  }
  return strs.map(s => JSON.parse(s));
}

module.exports = dedupe;
module.exports.default = dedupe;
