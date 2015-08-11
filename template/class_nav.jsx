var ClassNavLink = React.createClass({
    render: function () {
        var dclass = this.props.dclass;
        return (
            <a className="mdl-navigation__link" href="#"><h6>{dclass.name}</h6></a>
        );
    }
});

var ClassNav = React.createClass({
    componentWillMount: function () {
        var self = this;
        $.ajax({
            url: "classes",
            dataType: "json"
        }).success(function (data, status, xhr) {
            self.setState({ classes: (data || []) });
        });
    },
    render: function () {
        var self = this;
        if ( self.state ) {
            var class_links = self.state.classes.map(cl => {
                var key = cl.name + "|" + cl.start;
                <ClassNavLink key={key} dclass={cl} />
            });
            return (
                <nav className="mdl-navigation">
                    {class_links}
                </nav>
            );
        } else {
            return (
                <MDLProgress/>
            );
        }
    }
});
