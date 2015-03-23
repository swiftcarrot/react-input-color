var hsv2rgb = require('./hsv2rgb');
var rgb2hex = require('./rgb2hex');

module.exports = function(hsv) {
  var rgb = hsv2rgb(hsv);
  return rgb2hex(rgb);
}