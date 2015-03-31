var React = require('react');
var InputColor = require('../lib/input-color.js');
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
        <span>{'color value: ' + this.state.color}</span>
        <br/><br/>
        <input type="color" value={this.state.color} onChange={this._onColorChange}/>
        <br/><br/>
        <InputColor value={this.state.color} onChange={this._onChange}/>
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