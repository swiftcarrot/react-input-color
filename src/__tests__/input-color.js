import React from 'react';
import renderer from 'react-test-renderer';
import InputColor from '../';

test('render', () => {
  expect(() =>
    renderer.create(<InputColor initialHexColor="#3498db" />)
  ).not.toThrow();
});
