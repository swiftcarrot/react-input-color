import React, { useState } from 'react';
import InputColor from '../src';

export default {
  title: 'InputColor',
  component: InputColor
};

export const Demo = () => {
  const [initial, setInitial] = useState('#5e72e4');
  const [color, setColor] = useState({});

  function handleChange(color) {
    console.log('handleChange', color);
    setColor(color);
  }

  return (
    <div>
      <div
        style={{
          width: 50,
          height: 50,
          marginBottom: 20,
          backgroundColor: color.hex
        }}
      >
        {color.hex}
      </div>
      <input
        type="color"
        value={color.hex}
        onChange={e => setInitial(e.target.value)}
      />
      <br />
      <InputColor initialValue={initial} onChange={handleChange} />
    </div>
  );
};

export const Alpha = () => {
  const [color, setColor] = useState({});

  function handleChange(color) {
    console.log('handleChange', color);
    setColor(color);
  }

  return (
    <div>
      <div
        style={{
          width: 50,
          height: 50,
          marginBottom: 20,
          backgroundColor: color.rgba
        }}
      >
        {color.rgba}
      </div>
      <InputColor initialValue="#5e72e412" onChange={handleChange} />
    </div>
  );
};
