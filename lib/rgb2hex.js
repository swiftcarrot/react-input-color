module.exports = function(rgb) {
  return [
    '#',
    _convert(rgb.r),
    _convert(rgb.g),
    _convert(rgb.b)
  ].join('');

  function _convert(num) {
    var hex = num.toString(16);
    return hex.length===1 ? '0'+hex : hex;
  }
};