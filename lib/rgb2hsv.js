// http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
module.exports = function(rgb) {
  var r = rgb.r, g = rgb.g, b = rgb.b;
  var h, s, v;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var delta = max - min;

  // hue
  if(r === max) {
    h = ((g-b)/delta) % 6;
  } else if(g === max) {
    h = (b-r)/delta + 2;
  } else if(b === max) {
    h = (r-g)/delta + 4;
  }

  h = Math.round(h*60);
  if(h < 0) h += 360;

  // saturation
  s = Math.round((max === 0 ? 0 : (delta/max)) * 100);

  // value
  v = Math.round(max/255*100);

  return {
    h: h,
    s: s,
    v: v
  };
};