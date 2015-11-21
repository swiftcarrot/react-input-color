# react-input-color
React input color component with hsv color picker

The color picker is inspired by the [sketch](http://bohemiancoding.com/sketch/) color picker

![screenshot](https://raw.githubusercontent.com/wangzuo/react-input-color/master/screenshot.png)
### Installation
``` sh
npm install react-input-color --save
```
### Demo
[https://wangzuo.github.io/react-input-color](https://wangzuo.github.io/react-input-color)
### Usage

Check [app.js](https://github.com/wangzuo/react-input-color/blob/master/example/app.js) for a working example.

``` javascript
var InputColor = require('react-input-color');

<InputColor
  value={this.state.color}
  defaultValue="#345678"
  onChange={this.handleChange} // change state.color in handleChange
/>
```

+ The color property can be any valid css color value, check
[color-functions](https://github.com/pqx/color-functions) for more details.
+ This component is built with [react-input-slider](https://github.com/wangzuo/react-input-slider) and [react-input-number](https://github.com/wangzuo/react-input-number).

### License
MIT
