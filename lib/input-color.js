var cx = require('classnames');
var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var assign = require('object-assign');
var cssColor = require('color-functions/dist/css-color');
var rgbaColor = require('color-functions/dist/rgba');
var rgb2hsv = require('color-functions/dist/rgb2hsv');
var rgb2hex = require('color-functions/dist/rgb2hex');
var rgba2hex = require('color-functions/dist/rgba2hex');

var ColorPicker = require('./color-picker.js');

var KEY_ENTER = 13;

class InputColor extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          color: this.getColor(this.props.value),
          colorPicker: false,
          colorPickerPosition: 0
      };

      this.getColor = this.getColor.bind(this);
      this.getRgbaBackground = this.getRgbaBackground.bind(this);
      this.closeColorPicker = this.closeColorPicker.bind(this);
      this.change = this.change.bind(this);
      this._onChange = this._onChange.bind(this);
      this._onClick = this._onClick.bind(this);
      this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  getColor(color) {
    color = color || this.props.defaultValue;

    var rgba = cssColor(color);
    var r = rgba.r,
      g = rgba.g,
      b = rgba.b,
      a = rgba.a;
    var hsv = rgb2hsv(r, g, b);

    return assign(hsv, {
      r: r,
      g: g,
      b: b,
      a: a,
      hex: rgb2hex(r, g, b)
    });
  }

  getRgbaBackground() {
    var color = this.state.color;
    var r = color.r;
    var g = color.g;
    var b = color.b;
    var a = color.a;
    return rgbaColor(r, g, b, a);
  }

  render() {
    var color = this.state.color;
    var rgbaBackground = this.getRgbaBackground();

    return (
      <span
        className={cx('m-input-color', {
          'color-picker-open': this.state.colorPicker
        })}
      >
        <span
          className="css-color"
          style={{ background: rgbaBackground }}
          onClick={this._onClick}
        />

        <span className="remove" onClick={this.handleClickRemove}>
          &times;
        </span>
        {this.state.colorPicker ? (
          <ColorPicker
            left={this.state.colorPickerPosition}
            color={this.state.color}
            onChange={this._onChange}
          />
        ) : null}
      </span>
    );
  }

  componentDidMount() {
    document.addEventListener('click', this.closeColorPicker, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeColorPicker);
  }

  closeColorPicker() {
    this.setState({ colorPicker: false });
  }

  componentWillReceiveProps(nextProps) {
    var cssColor = nextProps.value;

    // anti-pattern, maybe
    if (!this._updated) {
      this.setState({
        color: this.getColor(cssColor)
      });
    } else {
      this._updated = false;
    }
  }

  change(cssColor) {
    if (this.props.onChange) {
      this.props.onChange(cssColor);
    }
  }

  _onChange(color) {
    this.setState({
      cssColor: '#' + color.hex,
      color: color
    });

    this._updated = true;
    this.change('#' + rgba2hex(color.r, color.g, color.b, color.a));
  }

  _onClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    var dom = ReactDOM.findDOMNode(this);
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
  }

  handleClickRemove(e) {
    this.change('');
  }
};

InputColor.displayName = 'InputColor';

InputColor.defaultProps = {
    defaultValue: '#000000'
};

InputColor.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string
}

module.exports = InputColor;
