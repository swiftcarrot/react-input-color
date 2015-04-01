var cx = require('react/lib/cx');
var React = require('react');
var objectAssign = require('object-assign');
var colorParser = require('color-parser');

var ColorPicker = require('./color-picker.js');
var rgbaColor = require('./rgba-color');
var rgb2hsv = require('./rgb2hsv');
var rgb2hex = require('./rgb2hex');

var KEY_ENTER = 13;

function getColor(cssColor) {
  var rgba = colorParser(cssColor);
  var r = rgba.r, g = rgba.g, b = rgba.b, a = rgba.a*100;
  var hsv = rgb2hsv(r, g, b);

  return objectAssign(hsv, {
    r: r,
    g: g,
    b: b,
    a: a,
    hex: rgb2hex(r, g, b)
  });
}

module.exports = React.createClass({
  displayName: 'InputColor',

  getInitialState: function() {
    var cssColor = this.props.value;

    return {
      color: getColor(this.props.value),
      colorPicker: false,
      colorPickerPosition: 0
    };
  },

  render: function() {
    var color = this.state.color;
    var r = color.r, g = color.g, b = color.b, a = color.a;
    var rgbaBackground = rgbaColor(r, g, b, a);

    return (
      <span className={cx({
        'm-input-color':true,
        'color-picker-open': this.state.colorPicker
      })}>
        <span className="css-color"
          style={{background:rgbaBackground}}
          onClick={this._onClick}></span>
        {this.state.colorPicker ? <ColorPicker
          left={this.state.colorPickerPosition}
          color={this.state.color}
          onChange={this._onChange}/> : null}
      </span>
    );
  },

  componentWillReceiveProps: function(nextProps) {
    var cssColor = nextProps.value;

    // anti-pattern, maybe
    if(!this._updated) {
      this.setState({
        color: getColor(cssColor)
      });
    } else {
      this._updated = false;
    }
  },

  change: function(cssColor) {
    if(this.props.onChange) {
      this.props.onChange(cssColor);
    }
  },

  _onChange: function(color) {
    this.setState({
      cssColor: '#'+color.hex,
      color: color
    });
    this._updated = true;
    this.change('#'+color.hex);
  },

  _onClick: function() {
    var dom = React.findDOMNode(this);
    var rect = dom.getBoundingClientRect();
    var ww = window.innerWidth;

    var left = 0;
    if(rect.right+210 > ww) {
      left = -212;
    }

    this.setState({
      colorPicker: !this.state.colorPicker,
      colorPickerPosition: left
    });
  }
});