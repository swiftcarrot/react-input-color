module.exports = function(rgb, a) {
  return 'rgba('+
    [rgb.r, rgb.g, rgb.b, a/100].join(',')+')';
};