require('../lib/input-color.less');
require('./app.less');

var React = require('react');
var ReactDOM = require('react-dom');
var InputColor = require('../lib/input-color.js');
var packageJSON = require('../package.json');

var App = React.createClass({
  getInitialState() {
    return {
      color: '#3599db'
    };
  },

  render() {
    return (
      <div className="app">
        <div>
          {packageJSON.name}
          <small>{packageJSON.version}</small>
        </div>
        <div
          className="target"
          style={{ width: 100, height: 100, background: this.state.color }}
        />
        <span>{'color value: ' + this.state.color}</span>
        <br />
        <br />
        <input
          type="color"
          value={this.state.color}
          defaultValue="#345678"
          onChange={this._onColorChange}
        />
        <br />
        <br />
        <InputColor
          value={this.state.color}
          defaultValue="#345678"
          onChange={this._onChange}
        />
      </div>
    );
  },

  _onChange(color) {
    this.setState({
      color: color
    });
  },

  _onColorChange(e) {
    this.setState({
      color: e.target.value
    });
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
