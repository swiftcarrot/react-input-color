var cx = require('react/lib/cx');
var React = require('react');
var objectAssign = require('object-assign');
var colorParser = require('color-parser');

var ColorPicker = require('./color-picker.jsx');
var rgbaColor = require('./rgba-color');
var rgb2hsv = require('./rgb2hsv');
var rgb2hex = require('./rgb2hex');

module.exports = React.createClass({
  displayName: 'InputColor',

  getInitialState: function () {
    var cssColor = this.props.color;
    var rgba = colorParser(cssColor);
    var r = rgba.r, g = rgba.g, b = rgba.b, a = rgba.a*100;
    var hsv = rgb2hsv(r, g, b);
    var color = objectAssign(hsv, {
      r: r,
      g: g,
      b: b,
      a: a,
      hex: rgb2hex(r, g, b)
    });

    return {
      color: color,
      colorPicker: true
    };
  },

  render: function () {
    var color = this.state.color;
    var r = color.r, g = color.g, b = color.b, a = color.a;
    var rgbaBackground = rgbaColor(r, g, b, a);

    return (
      <div className="m-input-color">
        {this.state.colorPicker ? <ColorPicker color={color} onChange={this._onChange}/> : null}
        <div className="css-input-box">
          <div className="css-color"
            style={{background:rgbaBackground}}
            onClick={this._onClick}></div>
          <input className="css-input" type="text" value={'#'+color.hex}/>
        </div>
      </div>
    );
  },

  _onChange: function(color) {
    this.setState({color: color});
  },

  _onClick: function() {
    this.setState({colorPicker: !this.state.colorPicker});
  }
});