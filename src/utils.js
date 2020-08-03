import { hex2rgb, rgb2hsv, rgba } from '@swiftcarrot/color-fns';

export function hex2alpha(aa) {
  return Math.round((parseInt('0x' + aa, 16) / 255) * 100);
}

export function parseColor(hexColor) {
  hexColor = hexColor.toLowerCase();
  const hex = hexColor.substr(0, 7);
  const rgb = hex2rgb(hex);
  const { r, g, b } = rgb;
  const hsv = rgb2hsv(r, g, b);
  const a = hexColor.length > 7 ? hex2alpha(hexColor.substr(7)) : 100;

  return { ...hsv, r, g, b, a, hex, rgba: rgba(r, g, b, a) };
}

export {
  rgb2hsv,
  hsv2hex,
  hex2rgb,
  rgba,
  hsv2rgb,
} from '@swiftcarrot/color-fns';
