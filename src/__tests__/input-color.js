import React from 'react';
import renderer from 'react-test-renderer';
import InputColor from '../';
import { parseColor, hex2alpha, rgba2hex, alpha2hex } from '../utils';

test('render', () => {
  expect(() =>
    renderer.create(<InputColor initialValue="#3498db" />)
  ).not.toThrow();
});

test('parseColor', () => {
  expect(parseColor('#3498db')).toEqual({
    r: 52,
    g: 152,
    b: 219,
    h: 204,
    s: 76,
    v: 86,
    a: 100,
    hex: '#3498db',
    rgba: 'rgba(52,152,219,1)',
  });
  expect(parseColor('#3498db32')).toEqual({
    r: 52,
    g: 152,
    b: 219,
    h: 204,
    s: 76,
    v: 86,
    a: 20,
    hex: '#3498db32',
    rgba: 'rgba(52,152,219,0.2)',
  });
});

test('hex2alpha', () => {
  expect(hex2alpha('ff')).toEqual(100);
  expect(hex2alpha('f7')).toEqual(97);
  expect(hex2alpha('38')).toEqual(22);
  expect(hex2alpha('00')).toEqual(0);
});

test('alpha2hex', () => {
  expect(alpha2hex(100)).toEqual('ff');
  expect(alpha2hex(97)).toEqual('f7');
  expect(alpha2hex(22)).toEqual('38');
  expect(alpha2hex(0)).toEqual('00');
});

test('rgba2hex', () => {
  expect(rgba2hex(255, 255, 255, 50)).toEqual(`#ffffff80`);
});
