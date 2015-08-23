var AttendanceTableHeader = React.createClass({
    render: function () {
        var self = this;
        var fields = self.props.dates || [];

        return (
            <thead>
                <tr key={this.props.hkey + "TR"}>
                    <th className="mdl-data-table__cell--non-numeric" key={"name"}>Имя</th>
                    {
                        fields.map( x => {
                            var date_str = Util.format_date(x,true);
                            return (
                                <th className="mdl-data-table__cell--non-numeric" key={date_str}>{date_str}</th>
                            )
                        })
                    }
                </tr>
            </thead>
        );
    }
});

var AttendanceTableBody = React.createClass({
    render: function () {
        return (<tbody></tbody>);
    }
});

var AttendanceTable = React.createClass({
    getInitialState: function() {
        return {
            days: [2,4],
            month: (new Date()).getMonth(),
            year: (new Date()).getFullYear(),
        };
    },
    componentWillMount: function () {
        var self = this;
        if ( self.props && self.props.group ) {
            $.ajax({
                url: "classes/" + self.props.group,
                dataType: "json"
            }).success(function (data, status, xhr) {
                self.setState({ data: (data || []) });
            });
        }
    },
    componentDidMount: function () {
        if ( this.state && this.state.data ) {
            componentHandler.upgradeElement(this.getDOMNode(), "MaterialDataTable");
        }
    },
    render: function() {
        var self = this;

        if ( self.props.group ) {
            if ( self.state && self.state.data ) {
                var data = self.state.data;
                var dates = [];
                var date_map = {};
                for ( var day in this.state.days ) {
                    date_map[this.state.days[day]] = true;
                }
                for ( var i = 1; i <= 35; i++ ) {
                    var date = new Date(this.state.year, this.state.month, i);
                    if ( date_map[ date.getDay() ] ) {
                        dates.push(date);
                    }
                }

                var hkey = CryptoJS.MD5(dates.map(x=>{return x.getTime();}).join("|"));
                var bkey = CryptoJS.MD5(hkey + Object.keys(data).join("|"));

                return (
                    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                        <AttendanceTableHeader dates={dates} key={hkey} hkey={hkey}/>
                        <AttendanceTableBody dates={dates} attendance={data} key={bkey}/>
                    </table>
                );
            }

            return (<MDLProgress/>);
        } else {
            return (<span></span>);
        }
    }
});
