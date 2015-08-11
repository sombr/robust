"use strict";

var PageHeader = React.createClass({
    displayName: "PageHeader",

    render: function render() {
        return React.createElement(
            "header",
            { className: "mdl-layout__header" },
            React.createElement(
                "div",
                { className: "mdl-layout__header-row" },
                React.createElement("div", { className: "mdl-layout-spacer" })
            )
        );
    }
});

var PageDrawerTop = React.createClass({
    displayName: "PageDrawerTop",

    render: function render() {
        var text = "Loading...";
        if (this.props.session) {
            text = this.props.session.name || "Вход";
        }
        return React.createElement(
            "span",
            { className: "mdl-layout-title" },
            React.createElement(
                "i",
                null,
                text
            )
        );
    }
});

var PageDrawerBottom = React.createClass({
    displayName: "PageDrawerBottom",

    render: function render() {
        if (this.props.session) {
            if (this.props.session.name) {
                return React.createElement(ClassNav, null);
            } else {
                return React.createElement(
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
                );
            }
        } else {
            return React.createElement(MDLProgress, null);
        }
    }
});

var PageDrawer = React.createClass({
    displayName: "PageDrawer",

    render: function render() {
        var self = this;
        return React.createElement(
            "div",
            { className: "mdl-layout__drawer" },
            React.createElement(PageDrawerTop, { session: self.props.session }),
            React.createElement(PageDrawerBottom, { session: self.props.session })
        );
    }
});

var PageMain = React.createClass({
    displayName: "PageMain",

    render: function render() {
        return React.createElement("main", { className: "mdl-layout__content" });
    }
});

var Page = React.createClass({
    displayName: "Page",

    onClick: function onClick(event) {
        console.log(event.target);
    },
    componentWillMount: function componentWillMount() {
        var self = this;
        $.ajax({
            url: "session/get",
            dataType: "json"
        }).success(function (data, status, xhr) {
            self.setState({ session: data || {} });
        });
    },
    componentDidMount: function componentDidMount() {
        componentHandler.upgradeElement(this.getDOMNode(), "MaterialLayout");
    },
    render: function render() {
        var self = this;
        var page_title = document.getElementById('page_title');
        page_title.innerHTML = this.props.title;

        var session;
        if (this.state) {
            session = this.state.session;
        }
        return React.createElement(
            "div",
            { className: "mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header", onClick: this.onClick },
            React.createElement(PageHeader, null),
            React.createElement(PageDrawer, { session: session }),
            React.createElement(PageMain, { session: session })
        );
    }
});
$(document).ready(function () {
    React.render(React.createElement(Page, { title: "Отмечатор" }), document.getElementById('page_content'));
});