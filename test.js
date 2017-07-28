import React from 'react';
import renderer from 'react-test-renderer';
import InputColor from './';

test('render', () => {
  const component = renderer.create(<InputColor value="#3498db" />);
  expect(component.toJSON()).toMatchSnapshot();
});
