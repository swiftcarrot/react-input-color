var React = require('react');
var objectAssign = require('object-assign');
var InputSlider = require('react-input-slider');
var InputNumber = require('react-input-number');

var rgb2hsv = require('color-functions/dist/rgb2hsv');
var hsv2hex = require('color-functions/dist/hsv2hex');
var hsv2rgb = require('color-functions/dist/hsv2rgb');
var rgb2hex = require('color-functions/dist/rgb2hex');
var hex2rgb = require('color-functions/dist/hex2rgb');
var rgba = require('color-functions/dist/rgba');

var KEY_ENTER = 13;

module.exports = React.createClass({
  displayName: 'ColorPicker',

  getInitialState() {
    return {
      hex: this.props.color.hex,
      hsvMode: false
    };
  },

  render() {
    var color = this.props.color;
    var r = color.r, g = color.g, b = color.b;
    var h = color.h, s = color.s, v = color.v;
    var a = color.a, hex = color.hex;

    var rgbaBackground = rgba(r, g, b, a);
    var opacityGradient = 'linear-gradient(to right, '+
      rgba(r, g, b, 0)+', '+
      rgba(r, g, b, 100)+')';
    var hueBackground = '#'+hsv2hex(h, 100, 100);

    return (
      <div className="m-color-picker" style={{left: this.props.left}} onClick={this._onClick}>
        <div className="selector"
        style={{backgroundColor: hueBackground}}>
          <div className="gradient white"></div>
          <div className="gradient dark"></div>
          <InputSlider
            className="slider slider-xy"
            axis="xy"
            x={s} xmax={100}
            y={100-v} ymax={100}
            onChange={this._onSVChange}
          />
        </div>

        <div className="sliders">
          <InputSlider
            className="slider slider-x hue"
            axis="x" x={h} xmax={359}
            onChange={this._onHueChange}
          />
          <InputSlider
            className="slider slider-x opacity"
            axis="x" x={a} xmax={100}
            style={{background: opacityGradient}}
            onChange={this._onAlphaChange}
          />
          <div className="color" style={{backgroundColor: rgbaBackground}}></div>
        </div>

        <div className="inputs">
          <div className="input hex">
            <input type="text" className="value" value={this.state.hex}
              onChange={this._onHexChange} onKeyUp={this._onHexKeyUp}/>
            <span className="label">Hex</span>
          </div>

          {!this.state.hsvMode ? (
          <div>
            <div className="input r">
              <InputNumber
                className="value" value={r}
                onChange={this.changeRGB.bind(null, 'r')}/>
              <span className="label">R</span>
            </div>
            <div className="input g">
              <InputNumber
                className="value" value={g}
                onChange={this.changeRGB.bind(null, 'g')}/>
              <span className="label">G</span>
            </div>
            <div className="input b">
              <InputNumber
                className="value" value={b}
                onChange={this.changeRGB.bind(null, 'b')}/>
              <span className="label">B</span>
            </div>
          </div>
          ) : (
          <div>
            <div className="input h">
              <InputNumber
                className="value" value={h}
                onChange={this.changeHSV.bind(null, 'h')}/>
              <span className="label">H</span>
            </div>
            <div className="input s">
              <InputNumber
                className="value" value={s}
                onChange={this.changeHSV.bind(null, 's')}/>
              <span className="label">S</span>
            </div>
            <div className="input v">
              <InputNumber
                className="value" value={v}
                onChange={this.changeHSV.bind(null, 'v')}/>
              <span className="label">V</span>
            </div>
          </div>
          )}

          <div className="input a">
            <InputNumber
              className="value" value={a}
              onChange={this.changeAlpha}/>
            <span className="label">A</span>
          </div>
        </div>
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    var hex = nextProps.color.hex;
    this.setState({
      hex: hex
    });
  },

  changeHSV(p, val) {
    if(this.props.onChange) {
      var j = p; if(typeof j === 'string') { j = {}; j[p] = val; }
      var color = this.props.color;
      var rgb = hsv2rgb(j.h||color.h, j.s||color.s, j.v||color.v);
      var hex = rgb2hex(rgb.r, rgb.g, rgb.b);
      this.props.onChange(objectAssign(color, j, rgb, {hex: hex}));
    }
  },

  changeRGB(p, val) {
    if(this.props.onChange) {
      var j = p; if(typeof j === 'string') { j = {}; j[p] = val; }

      var color = this.props.color;
      var rgb = [
        j.r !== void 0 ? j.r : color.r,
        j.g !== void 0 ? j.g : color.g,
        j.b !== void 0 ? j.b : color.b
      ];

      var hsv = rgb2hsv.apply(null, rgb);
      var hex = rgb2hex.apply(null, rgb);

      this.props.onChange(objectAssign(color, j, hsv, {hex: hex}));
    }
  },

  changeAlpha(a) {
    if(this.props.onChange) {
      if(a <= 100 && a >= 0) {
        this.props.onChange(objectAssign(this.props.color, {a: a}));
      }
    }
  },

  _onSVChange(pos) {
    this.changeHSV({
      s: pos.x,
      v: 100-pos.y
    });
  },

  _onHueChange(pos) {
    this.changeHSV({
      h: pos.x
    });
  },

  _onAlphaChange(pos) {
    this.changeHSV({
      a: parseInt(pos.x, 10)
    });
  },

  _onHexChange(e) {
    this.setState({
      hex: e.target.value.trim()
    });
  },

  _onHexKeyUp(e) {
    if(e.keyCode === KEY_ENTER) {
      var hex = e.target.value.trim();
      var rgb = hex2rgb(hex);
      this.changeRGB(objectAssign(rgb, {hex: hex}));
    }
  },

  _onClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
});
