import React, { useState } from 'react';
import InputColor from '../src';

export default {
  title: 'InputColor',
  component: InputColor,
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
      <pre
        style={{
          marginBottom: 20,
          backgroundColor: color.hex,
        }}
      >
        {JSON.stringify(color, null, 2)}
      </pre>
      <pre
        style={{
          marginBottom: 20,
          backgroundColor: color.rgba,
        }}
      >
        {JSON.stringify(color, null, 2)}
      </pre>
      <input
        type="color"
        value={color.hex}
        onChange={(e) => setInitial(e.target.value)}
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
      <pre
        style={{
          marginBottom: 20,
          backgroundColor: color.hex,
        }}
      >
        {JSON.stringify(color, null, 2)}
      </pre>
      <pre
        style={{
          marginBottom: 20,
          backgroundColor: color.rgba,
        }}
      >
        {JSON.stringify(color, null, 2)}
      </pre>
      <InputColor initialValue="#5e72e412" onChange={handleChange} />
    </div>
  );
};
