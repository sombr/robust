"use strict";

var Page = React.createClass({
    displayName: "Page",

    getInitialState: function getInitialState() {
        return {};
    },
    componentWillMount: function componentWillMount() {
        var self = this;
        $.ajax({
            url: "session/get",
            dataType: "json"
        }).success(function (data, status, xhr) {
            console.log(data);
            self.setState(data);
        });
    },
    render: function render() {
        var self = this;
        var page_title = document.getElementById('page_title');
        page_title.innerHTML = this.props.title;
        return React.createElement(
            "div",
            { className: "mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header" },
            React.createElement(
                "header",
                { className: "mdl-layout__header" },
                React.createElement(
                    "div",
                    { className: "mdl-layout__header-row" },
                    React.createElement("div", { className: "mdl-layout-spacer" })
                )
            ),
            React.createElement(
                "div",
                { className: "mdl-layout__drawer" },
                React.createElement(
                    "span",
                    { className: "mdl-layout-title" },
                    React.createElement(
                        "i",
                        null,
                        self.state.name
                    )
                ),
                React.createElement(
                    "nav",
                    { className: "mdl-navigation" },
                    React.createElement(
                        "a",
                        { className: "mdl-navigation__link", href: "/className/uid" },
                        React.createElement(
                            "h6",
                            null,
                            "Karl"
                        )
                    )
                ),
                React.createElement(
                    "span",
                    { className: "mdl-layout-title" },
                    "Sign In"
                ),
                React.createElement(
                    "div",
                    { className: "mdl-grid" },
                    React.createElement(
                        "div",
                        { className: "mdl-cell mdl-cell--12-col" },
                        React.createElement(
                            "button",
                            { className: "mdl-button mdl-js-button mdl-button--raised mdl-button--colored" },
                            "VK Login"
                        ),
                        " "
                    )
                )
            ),
            React.createElement("main", { className: "mdl-layout__content" })
        );
    }
});
$(document).ready(function () {
    React.render(React.createElement(Page, { title: "Отмечатор" }), document.getElementById('page_content'));
});

