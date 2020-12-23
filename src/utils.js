import { hex2rgb, rgb2hsv, rgba } from '@swiftcarrot/color-fns';

export function hex2alpha(aa) {
  return Math.round((parseInt('0x' + aa, 16) / 255) * 100);
}

export function parseColor(hexColor) {
  hexColor = hexColor.toLowerCase();
  const hex = hexColor;
  const rgb = hex2rgb(hex);
  const { r, g, b } = rgb;
  const hsv = rgb2hsv(r, g, b);
  const a = hexColor.length > 7 ? hex2alpha(hexColor.substr(7)) : 100;

  return { ...hsv, r, g, b, a, hex, rgba: rgba(r, g, b, a) };
}

export function trim(str) {
  return str.replace(/^\s+|\s+$/gm, '');
}

export function rgbaToHex(rgba) {
  let inParts = rgba.substring(rgba.indexOf('(')).split(','),
    r = parseInt(trim(inParts[0].substring(1)), 10),
    g = parseInt(trim(inParts[1]), 10),
    b = parseInt(trim(inParts[2]), 10),
    a = parseFloat(
      trim(inParts[3].substring(0, inParts[3].length - 1)),
    ).toFixed(2);
  let outParts = [
    r.toString(16),
    g.toString(16),
    b.toString(16),
    Math.round(a * 255)
      .toString(16)
      .substring(0, 2),
  ];
  outParts.forEach(function (part, i) {
    if (part.length === 1) {
      outParts[i] = '0' + part;
    }
  });
  return '#' + outParts.join('');
}

export {
  rgb2hsv,
  hsv2hex,
  hex2rgb,
  rgba,
  hsv2rgb,
} from '@swiftcarrot/color-fns';
