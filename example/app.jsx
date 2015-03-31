var React = require('react');
var InputColor = require('../lib/input-color.jsx');
require('!style!css!less!../lib/input-color.less');

var App = React.createClass({
  getInitialState: function() {
    return {
      color: '#3599db'
    };
  },

  render: function() {
    return (
      <div>
        <input type="color" value={this.state.color} onChange={this._onColorChange}/>
        <div>Mattis Mollis Euismod Pellentesque Condimentum</div>
        <div>{'color value: ' + this.state.color}</div>
        <InputColor
          value={this.state.color}
          onChange={this._onChange}/>
        <div>Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo.</div>
      </div>
    );
  },

  _onChange: function(color) {
    this.setState({
      color: color
    });
  },

  _onColorChange: function(e) {
    this.setState({
      color: e.target.value
    });
  }
});

React.render(<App/>, document.body);