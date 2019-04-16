import { hex2rgb, rgb2hsv } from 'color-functions';

export function parseColor(hexColor) {
  const rgb = hex2rgb(hexColor);
  const { r, g, b } = rgb;
  const hsv = rgb2hsv(r, g, b);

  return { ...hsv, r, g, b, a: 100, hex: hexColor };
}

export {
  rgb2hsv,
  hsv2hex,
  rgba2hex,
  hex2rgb,
  rgba,
  hsv2rgb
} from 'color-functions';
