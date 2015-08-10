"use strict";

var ClassNavLink = React.createClass({
    displayName: "ClassNavLink",

    render: function render() {
        var dclass = this.props.dclass;
        return React.createElement(
            "a",
            { className: "mdl-navigation__link", href: "#" },
            React.createElement(
                "h6",
                null,
                dclass.name
            )
        );
    }
});

var ClassNav = React.createClass({
    displayName: "ClassNav",

    componentWillMount: function componentWillMount() {
        var self = this;
        $.ajax({
            url: "classes",
            dataType: "json"
        }).success(function (data, status, xhr) {
            self.setState({ classes: data || [] });
        });
    },
    componentDidMount: function componentDidMount() {
        componentHandler.upgradeElement(this.getDOMNode(), "MaterialProgress");
    },
    render: function render() {
        var self = this;
        if (self.state) {
            var class_links = self.state.classes.map(function (cl) {
                var key = cl.name + "|" + cl.start;
                React.createElement(ClassNavLink, { key: key, dclass: cl });
            });
            return React.createElement(
                "nav",
                { className: "mdl-navigation" },
                class_links
            );
        } else {
            return React.createElement("div", { className: "mdl-progress mdl-js-progress mdl-progress__indeterminate" });
        }
    }
});