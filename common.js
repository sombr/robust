"use strict";

var MDLProgress = React.createClass({
    displayName: "MDLProgress",

    componentDidMount: function componentDidMount() {
        componentHandler.upgradeElement(this.getDOMNode(), "MaterialProgress");
    },
    render: function render() {
        return React.createElement("div", { className: "mdl-progress mdl-js-progress mdl-progress__indeterminate" });
    }
});