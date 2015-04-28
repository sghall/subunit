import React from 'react';
import { Selection } from 'src/core/Selection';
import { Transition } from 'src/core/Transition';
import { EnterSelection } from 'src/core/EnterSelection';
import { SubUnitArray } from 'src/core/SubUnitArray';

console.log("Selection", window.Selection = Selection);
console.log("Transition", window.Transition = Transition);
console.log("EnterSelection", window.EnterSelection = EnterSelection);
console.log("SubUnitArray", window.SubUnitArray = SubUnitArray);

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var TickTock = React.createClass({displayName: "TickTock",
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      React.createElement("p", null,
        "React has been running for ", this.state.seconds, " seconds."
      )
    );
  }
});

React.render(
  React.createElement(TickTock, null),
  document.getElementById('msg')
);
