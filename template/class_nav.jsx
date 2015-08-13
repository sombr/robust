var ClassNavLink = React.createClass({
    render: function () {
        var dclass = this.props.dclass;
        var anchor = "/class/" + dclass.uid;
        return (
            <a className="mdl-navigation__link" href={anchor}>
                <h6 className="class_nav_link" data-class-uid={dclass.uid}>{dclass.name}</h6>
            </a>
        );
    }
});

var ClassNav = React.createClass({
    componentWillMount: function () {
        var self = this;
        $.ajax({
            url: "classes",
            method: "get",
            data: {
                rsid: self.props.session.rsid
            },
            dataType: "json"
        }).success(function (data, status, xhr) {
            self.setState({ classes: (data || []) });
        });
    },
    render: function () {
        var self = this;
        if ( self.state ) {
            console.log( self.state.classes );
            var class_links = self.state.classes.map(cl => {
                var key = cl.name + "|" + cl.start;
                return (
                    <ClassNavLink key={key} dclass={cl} />
                );
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
