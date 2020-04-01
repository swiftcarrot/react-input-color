# react-input-color

[![npm](https://img.shields.io/npm/v/react-input-color.svg)](https://www.npmjs.com/package/react-input-color)
[![npm](https://img.shields.io/npm/dm/react-input-color.svg)](https://www.npmjs.com/package/react-input-color)
[![Build Status](https://travis-ci.org/swiftcarrot/react-input-color.svg?branch=master)](https://travis-ci.org/swiftcarrot/react-input-color)
[![codecov](https://codecov.io/gh/swiftcarrot/react-input-color/branch/master/graph/badge.svg)](https://codecov.io/gh/swiftcarrot/react-input-color)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

React input color component with hsv color picker

The color picker is inspired by the [sketch](https://www.sketchapp.com/) color picker

![screenshot](https://raw.githubusercontent.com/swiftcarrot/react-input-color/master/screenshot.png)

Starting from v2, this component is rewritten with [emotion](https://emotion.sh/) and it doesnot require any external css file.

### Installation

```sh
npm install react-input-color --save
yarn add react-input-color
```

### Demo

[https://swiftcarrot.dev/react-input-color](https://swiftcarrot.dev/react-input-color)

### Usage

The `initialValue` property supports 6 (`#RRGGBB`) and 8 (`#RRGGBBAA`) digits hex value.

```javascript
import React from 'react';
import InputColor from 'react-input-color';

function App() {
  const [color, setColor] = React.useState({});

  return (
    <div>
      <InputColor
        initialValue="#5e72e4"
        onChange={setColor}
        placement="right"
      />
      <div
        style={{
          width: 50,
          height: 50,
          marginTop: 20,
          backgroundColor: color.rgba
        }}
      />
    </div>
  );
}
```

- This component is built with [react-input-slider](https://github.com/swiftcarrot/react-input-slider) and [react-input-number](https://github.com/swiftcarrot/react-input-number).

### License

MIT
