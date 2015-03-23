// http://www.rapidtables.com/convert/color/hsv-to-rgb.htm
module.exports = function(hsv) {
  var h = hsv.h, s = hsv.s/100, v = hsv.v/100;
  var rgb = [];

  var c = v * s;
  var x = c * (1 - Math.abs(h/60%2-1));
  var m = v - c;

  if(h >= 0 && h < 60) {
    rgb = [c, x, 0];
  } else if(h >= 60 && h < 120) {
    rgb = [x, c, 0];
  } else if(h >= 120 && h < 180) {
    rgb = [0, c, x];
  } else if(h >= 180 && h < 240) {
    rgb = [0, x, c];
  } else if(h >= 240 && h < 300) {
    rgb = [x, 0, c];
  } else if(h >= 300 && h <= 360) {
    rgb = [c, 0, x];
  }

  return {
    r: parseInt((rgb[0]+m)*255, 10),
    g: parseInt((rgb[1]+m)*255, 10),
    b: parseInt((rgb[2]+m)*255, 10),
  };
}

