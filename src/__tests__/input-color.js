import React from 'react';
import renderer from 'react-test-renderer';
import InputColor from '../';

test('render', () => {
  const component = renderer.create(<InputColor initialHexColor="#3498db" />);
  expect(component.toJSON()).toMatchInlineSnapshot(`
<span
  className="css-1hot2pi-InputColor"
>
  <span
    className="css-gmziuu-InputColor"
    onClick={[Function]}
    style={
      Object {
        "backgroundColor": "#3498db",
      }
    }
  />
  <span
    className="css-4g3q2b-InputColor"
    onClick={[Function]}
  >
    ×
  </span>
</span>
`);
});
