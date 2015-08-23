var GroupNavLink = React.createClass({
    render: function () {
        var group = this.props.group;
        var anchor = "/classes/" + group.id;
        return (
            <a className="mdl-navigation__link class_nav_link" href={anchor} data-class-id={group.id}>
                {group.name}
            </a>
        );
    }
});

var GroupNav = React.createClass({
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
            var group_links = self.state.classes.sort(function (a,b) {
                return a.name.localeCompare(b.name);
            }).map(cl => {
                var key = cl.name + "|" + cl.start;
                return (
                    <GroupNavLink key={key} group={cl} />
                );
            });
            return (
                <nav className="mdl-navigation">
                    {group_links}
                </nav>
            );
        } else {
            return (
                <MDLProgress/>
            );
        }
    }
});
