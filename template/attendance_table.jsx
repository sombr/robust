var AttendanceTable = React.createClass({
    componentWillMount: function () {
        var self = this;
        console.log(">>> props group " + self.props.group);
        if ( self.props.group ) {
            $.ajax({
                url: "classes/" + self.group,
                dataType: "json"
            }).success(function (data, status, xhr) {
                self.setState({ data: (data || []) });
            });
        }
    },
    render: function() {
        return (<p>test</p>);
    }
});
