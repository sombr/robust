var PageHeader = React.createClass({
    render: function () {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <div className="mdl-layout-spacer"></div>
                </div>
            </header>
        );
    }
});

var PageDrawerTop = React.createClass({
    render: function() {
        var text = "Loading...";
        if ( this.props.session ) {
            text = this.props.session.name || "Вход";
        }
        return (
            <span className="mdl-layout-title"><i>{text}</i></span>
        );
    }
});

var PageDrawerBottom = React.createClass({
    render: function() {
        if ( this.props.session ) {
            if ( this.props.session.name ) {
                return (
                    <ClassNav session={this.props.session} />
                );
            } else {
                return (
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--12-col">
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                                VK Login
                            </button>
                            &nbsp;
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <MDLProgress/>
            );
        }
    }
});

var PageDrawer = React.createClass({
    render: function () {
        var self = this;
        return (
            <div className="mdl-layout__drawer">
                <PageDrawerTop session={self.props.session} />
                <PageDrawerBottom session={self.props.session} />
            </div>
        );
    }
});

var PageMain = React.createClass({
    render: function () {
        return (
            <main className="mdl-layout__content">
            </main>
        );
    }
});

var Page = React.createClass({
    onClick: function (event) {
        console.log(event.target);
        if ( event.target.className == "class_nav_link" ) {
            self.setState({ active_class: event.target.data("class-uid") });
            event.preventDefault();
        }
    },
    componentWillMount: function () {
        var self = this;
        $.ajax({
            url: "session/get",
            dataType: "json"
        }).success(function (data, status, xhr) {
            self.setState({ session: (data || {}) });
        });
    },
    componentDidMount: function () {
        componentHandler.upgradeElement(this.getDOMNode(), "MaterialLayout");
    },
    render: function() {
        var self = this;
        var page_title = document.getElementById('page_title');
        page_title.innerHTML = this.props.title;

        var session;
        if ( this.state ) {
            session = this.state.session;
        }
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header" onClick={this.onClick}>
                <PageHeader />
                <PageDrawer session={session} />
                <PageMain session={session} />
            </div>
        );
    }
});
$(document).ready( function() {
    React.render(
      <Page title="Отмечатор" />,
      document.getElementById('page_content')
    );
});
