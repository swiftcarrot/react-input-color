'use strict';

var cx = require('classnames');
var React = require('react');
var assign = require('object-assign');
var colorParser = require('color-parser');
var rgbaColor = require('color-functions/lib/rgba');
var rgb2hsv = require('color-functions/lib/rgb2hsv');
var rgb2hex = require('color-functions/lib/rgb2hex');

var ColorPicker = require('./color-picker.js');

var KEY_ENTER = 13;

module.exports = React.createClass({
  displayName: 'InputColor',

  propTypes: {
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultValue: '#000000'
    };
  },

  getInitialState: function getInitialState() {
    var cssColor = this.props.value;

    return {
      color: this.getColor(this.props.value),
      colorPicker: false,
      colorPickerPosition: 0
    };
  },

  getColor: function getColor(cssColor) {
    cssColor = cssColor || this.props.defaultValue;

    var rgba = colorParser(cssColor);
    var r = rgba.r,
        g = rgba.g,
        b = rgba.b,
        a = rgba.a * 100;
    var hsv = rgb2hsv(r, g, b);

    return assign(hsv, {
      r: r,
      g: g,
      b: b,
      a: a,
      hex: rgb2hex(r, g, b)
    });
  },

  getRgbaBackground: function getRgbaBackground() {
    var color = this.state.color;
    var r = color.r;
    var g = color.g;
    var b = color.b;
    var a = color.a;
    return rgbaColor(r, g, b, a);
  },

  render: function render() {
    var color = this.state.color;
    var rgbaBackground = this.getRgbaBackground();

    return React.createElement(
      'span',
      { className: cx({
          'm-input-color': true,
          'color-picker-open': this.state.colorPicker
        }) },
      React.createElement('span', {
        className: 'css-color',
        style: { background: rgbaBackground },
        onClick: this._onClick }),
      React.createElement(
        'span',
        {
          className: 'remove',
          onClick: this.handleClickRemove },
        '×'
      ),
      this.state.colorPicker ? React.createElement(ColorPicker, {
        left: this.state.colorPickerPosition,
        color: this.state.color,
        onChange: this._onChange }) : null
    );
  },

  componentDidMount: function componentDidMount() {
    document.addEventListener('click', this.closeColorPicker, false);
  },

  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('click', this.closeColorPicker);
  },

  closeColorPicker: function closeColorPicker() {
    this.setState({ colorPicker: false });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var cssColor = nextProps.value;

    // anti-pattern, maybe
    if (!this._updated) {
      this.setState({
        color: this.getColor(cssColor)
      });
    } else {
      this._updated = false;
    }
  },

  change: function change(cssColor) {
    if (this.props.onChange) {
      this.props.onChange(cssColor);
    }
  },

  _onChange: function _onChange(color) {
    this.setState({
      cssColor: '#' + color.hex,
      color: color
    });
    this._updated = true;
    this.change('#' + color.hex);
  },

  _onClick: function _onClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    var dom = React.findDOMNode(this);
    var rect = dom.getBoundingClientRect();
    var ww = window.innerWidth;

    var left = -105;
    if (rect.right + 105 > ww) {
      left = -210 + ww - rect.right;
    } else if (rect.left - 105 < 0) {
      left = -rect.left;
    }

    this.setState({
      colorPicker: !this.state.colorPicker,
      colorPickerPosition: left
    });
  },

  handleClickRemove: function handleClickRemove(e) {
    this.change('');
  }
});