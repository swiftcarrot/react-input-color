var cx = require('react/lib/cx');
var React = require('react');
var objectAssign = require('object-assign');

var InputSlider = require('react-input-slider');

var rgba = require('./rgba');
var rgb2hsv = require('./rgb2hsv');
var hsv2hex = require('./hsv2hex');

function parse(str, alpha) {
  var hex = str.substr(1);
  var parts = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var rgb = {
    r: parseInt(parts[1], 16),
    g: parseInt(parts[2], 16),
    b: parseInt(parts[3], 16),
  };

  var color = {
    hex: hex,
    rgb: rgb,
    alpha: alpha
  };

  color.rgba = rgba(color.rgb, color.alpha);

  objectAssign(color, {
    hsv: rgb2hsv(rgb)
  });

  color.hue = hsv2hex({
    h: color.hsv.h,
    s: 100,
    v: 100
  });

  return color;
}


module.exports = React.createClass({
  displayName: 'InputColor',

  render: function () {
    var color = parse(this.props.color, this.props.alpha);

    var opacityGradient = 'linear-gradient(to right, '+
      rgba(color.rgb, 0)+', '+
      rgba(color.rgb, 100)+')';

    var hsv = color.hsv;

    this.color = color;

    return (
      <div className="m-color-picker">
        <div className="selector"
        style={{backgroundColor: color.hue}}>
          <div className="gradient white"></div>
          <div className="gradient dark"></div>
          <InputSlider className="slider-xy"
            x={color.hsv.s} xmax={100}
            y={100-color.hsv.v} ymax={100}
            onChange={this._onSVChange}/>
        </div>

        <div className="sliders">
          <InputSlider className="slider-x hue"
            axis="x" x={color.hsv.h} xmax={360}
            onChange={this._onHueChange}/>

          <InputSlider className="slider-x opacity"
            axis="x" x={color.alpha} xmax={100}
            style={{background: opacityGradient}}
            onChange={this._onAlphaChange}/>

          <div className="color" style={{backgroundColor: color.rgba}}></div>
        </div>

        <div className="inputs">
          <div className="input hex">
            <input className="value" type="text" value={color.hex}/>
            <span className="label">Hex</span>
          </div>

          <div className="input r">
            <input className="value" type="text" value={color.rgb.r}/>
            <span className="label">R</span>
          </div>
          <div className="input g">
            <input className="value" type="text" value={color.rgb.g}/>
            <span className="label">G</span>
          </div>
          <div className="input b">
            <input className="value" type="text" value={color.rgb.b}/>
            <span className="label">B</span>
          </div>

          <div className="input h">
            <input className="value" type="text" value={color.hsv.h}/>
            <span className="label">H</span>
          </div>
          <div className="input s">
            <input className="value" type="text" value={color.hsv.s}/>
            <span className="label">S</span>
          </div>
          <div className="input v">
            <input className="value" type="text" value={color.hsv.v}/>
            <span className="label">B</span>
          </div>

          <div className="input a">
            <input className="value" type="text" value={color.alpha}/>
            <span className="label">A</span>
          </div>
        </div>
      </div>
    );
  },

  _onSVChange: function(pos) {
    var s = pos.x;
    var v = 100 - pos.y;
    var color = this.color;

    this.props.onChange(hsv2hex({
      h: color.hsv.h,
      s: s,
      v: v
    }), color.alpha);
  },

  _onHueChange: function(pos) {
    var hue = pos.x;
    var color = this.color;
    this.props.onChange(hsv2hex({
      h: hue,
      s: color.hsv.s,
      v: color.hsv.v
    }), color.alpha);
  },

  _onAlphaChange: function(pos) {
    var alpha = pos.x;
    this.props.onChange('#'+this.color.hex, alpha);
  }
});