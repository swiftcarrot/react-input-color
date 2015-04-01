var React = require('react');
var objectAssign = require('object-assign');
var InputSlider = require('react-input-slider');
var InputNumber = require('react-input-number');

var rgbaColor = require('./rgba-color');
var rgb2hsv = require('./rgb2hsv');
var hsv2hex = require('./hsv2hex');
var hsv2rgb = require('./hsv2rgb');
var rgb2hex = require('./rgb2hex');
var hex2rgb = require('./hex2rgb');

var KEY_ENTER = 13;

module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return {
      hex: this.props.color.hex,
      hsvMode: false
    };
  },

  render: function () {
    var color = this.props.color;
    var r = color.r, g = color.g, b = color.b;
    var h = color.h, s = color.s, v = color.v;
    var a = color.a, hex = color.hex;

    var rgbaBackground = rgbaColor(r, g, b, a);
    var opacityGradient = 'linear-gradient(to right, '+
      rgbaColor(r, g, b, 0)+', '+
      rgbaColor(r, g, b, 100)+')';
    var hueBackground = '#'+hsv2hex(h, 100, 100);

    return (
      React.createElement("div", {className: "m-color-picker", style: {left: this.props.left}}, 
        React.createElement("div", {className: "selector", 
        style: {backgroundColor: hueBackground}}, 
          React.createElement("div", {className: "gradient white"}), 
          React.createElement("div", {className: "gradient dark"}), 
          React.createElement(InputSlider, {className: "slider-xy", 
            x: s, xmax: 100, 
            y: 100-v, ymax: 100, 
            onChange: this._onSVChange})
        ), 

        React.createElement("div", {className: "sliders"}, 
          React.createElement(InputSlider, {
            className: "slider-x hue", 
            axis: "x", x: h, xmax: 360, 
            onChange: this._onHueChange}), 

          React.createElement(InputSlider, {
            className: "slider-x opacity", 
            axis: "x", x: a, xmax: 100, 
            style: {background: opacityGradient}, 
            onChange: this._onAlphaChange}), 

          React.createElement("div", {className: "color", style: {backgroundColor: rgbaBackground}})
        ), 

        React.createElement("div", {className: "inputs"}, 
          React.createElement("div", {className: "input hex"}, 
            React.createElement("input", {type: "text", className: "value", value: this.state.hex, 
              onChange: this._onHexChange, onKeyUp: this._onHexKeyUp}), 
            React.createElement("span", {className: "label"}, "Hex")
          ), 

          !this.state.hsvMode ? (
          React.createElement("div", null, 
            React.createElement("div", {className: "input r"}, 
              React.createElement(InputNumber, {
                className: "value", value: r, 
                onChange: this.changeRGB.bind(null, 'r')}), 
              React.createElement("span", {className: "label"}, "R")
            ), 
            React.createElement("div", {className: "input g"}, 
              React.createElement(InputNumber, {
                className: "value", value: g, 
                onChange: this.changeRGB.bind(null, 'g')}), 
              React.createElement("span", {className: "label"}, "G")
            ), 
            React.createElement("div", {className: "input b"}, 
              React.createElement(InputNumber, {
                className: "value", value: b, 
                onChange: this.changeRGB.bind(null, 'b')}), 
              React.createElement("span", {className: "label"}, "B")
            )
          )
          ) : (
          React.createElement("div", null, 
            React.createElement("div", {className: "input h"}, 
              React.createElement(InputNumber, {
                className: "value", value: h, 
                onChange: this.changeHSV.bind(null, 'h')}), 
              React.createElement("span", {className: "label"}, "H")
            ), 
            React.createElement("div", {className: "input s"}, 
              React.createElement(InputNumber, {
                className: "value", value: s, 
                onChange: this.changeHSV.bind(null, 's')}), 
              React.createElement("span", {className: "label"}, "S")
            ), 
            React.createElement("div", {className: "input v"}, 
              React.createElement(InputNumber, {
                className: "value", value: v, 
                onChange: this.changeHSV.bind(null, 'v')}), 
              React.createElement("span", {className: "label"}, "V")
            )
          )
          ), 

          React.createElement("div", {className: "input a"}, 
            React.createElement(InputNumber, {
              className: "value", value: a, 
              onChange: this.changeAlpha}), 
            React.createElement("span", {className: "label"}, "A")
          )
        )
      )
    );
  },

  componentWillReceiveProps: function(nextProps) {
    var hex = nextProps.color.hex;
    this.setState({
      hex: hex
    });
  },

  changeHSV: function(p, val) {
    if(this.props.onChange) {
      var j = p; if(typeof j === 'string') { j = {}; j[p] = val; }
      var color = this.props.color;
      var rgb = hsv2rgb(j.h||color.h, j.s||color.s, j.v||color.v);
      var hex = rgb2hex(rgb.r, rgb.g, rgb.b);
      this.props.onChange(objectAssign(color, j, rgb, {hex: hex}));
    }
  },

  changeRGB: function(p, val) {
    if(this.props.onChange) {
      var j = p; if(typeof j === 'string') { j = {}; j[p] = val; }
      var color = this.props.color;
      var hsv = rgb2hsv(j.r||color.r, j.g||color.g, j.b||color.b);
      this.props.onChange(objectAssign(color, j, hsv, {
        hex: rgb2hex(j.r||color.r, j.g||color.g, j.b||color.b)
      }));
    }
  },

  changeAlpha: function(a) {
    if(this.props.onChange) {
      if(a <= 100 && a >= 0) {
        this.props.onChange(objectAssign(this.props.color, {a: a}));
      }
    }
  },

  _onSVChange: function(pos) {
    this.changeHSV({
      s: pos.x,
      v: 100-pos.y
    });
  },

  _onHueChange: function(pos) {
    this.changeHSV({
      h: pos.x
    });
  },

  _onAlphaChange: function(pos) {
    this.changeHSV({
      a: pos.x
    });
  },

  _onHexChange: function(e) {
    this.setState({
      hex: e.target.value.trim()
    });
  },

  _onHexKeyUp: function(e) {
    if(e.keyCode === KEY_ENTER) {
      var hex = e.target.value.trim();
      var rgb = hex2rgb(hex);
      this.changeRGB(objectAssign(rgb, {hex: hex}));
    }
  }
});