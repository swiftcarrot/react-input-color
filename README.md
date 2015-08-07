# react-input-color
React input color component with hsv color picker

![screenshot](https://raw.githubusercontent.com/wangzuo/react-input-color/gh-pages/screenshot.png)
### Installation
``` sh
npm install react-input-color --save
```
### Demo
[https://wangzuo.github.io/react-input-color/example](https://wangzuo.github.io/react-input-color/example)
### Usage
``` javascript
var InputColor = require('react-input-color');

<InputColor
  value={this.state.color}
  defaultValue="#345678"
  onChange={this.handleChange} // change state.color in handleChange
/>
```
Check [app.js](https://github.com/wangzuo/react-input-color/blob/gh-pages/example/app.js) for a working example
### License
MIT
