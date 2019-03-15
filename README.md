# react-input-color

React input color component with hsv color picker

The color picker is inspired by the [sketch](https://www.sketchapp.com/) color picker

![screenshot](https://raw.githubusercontent.com/wangzuo/react-input-color/master/screenshot.png)

### Installation

```sh
npm install react-input-color --save
yarn add react-input-color
```

### Demo

[https://code.swiftcarrot.com/react-input-color](https://code.swiftcarrot.com/react-input-color)

### Usage

Check [app.js](https://github.com/wangzuo/react-input-color/blob/master/example/app.js) for a working example.

```javascript
import React from 'react';
import { ColorPicker } from 'react-input-color';

function App() {
  const [color, setColor] = React.useState({});

  return (
    <div>
      <ColorPicker initialHexColor="#5e72e4" onChange={setColor} />
      <div
        style={{
          width: 50,
          height: 50,
          marginTop: 20,
          backgroundColor: color.hex
        }}
      />
    </div>
  );
}
```

- This component is built with [react-input-slider](https://github.com/wangzuo/react-input-slider) and [react-input-number](https://github.com/wangzuo/react-input-number).

### License

MIT
