module.exports = function(r, g, b, hashtag) {
  return [
    _convert(r),
    _convert(g),
    _convert(b)
  ].join('');

  function _convert(num) {
    var hex = num.toString(16);
    return hex.length===1 ? '0'+hex : hex;
  }
};