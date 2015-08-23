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

var AttendanceTableBodyRowCellList = React.createClass({
    componentDidMount: function () {
        componentHandler.upgradeElement(this.getDOMNode(), "MaterialMenu");
    },
    render: function () {
        var self = this;
        return (
                <ul className="mdl-menu mdl-js-menu" htmlFor={self.props.htmlFor}>
                <li className="mdl-menu__item">Some Action</li>
                <li className="mdl-menu__item">Another Action</li>
                <li className="mdl-menu__item">Yet Another Action</li>
                </ul>
        );
    }
});

var AttendanceTableBodyRowCellButton = React.createClass({
    componentDidMount: function () {
        componentHandler.upgradeElement(this.getDOMNode(), "MaterialButton");
    },
    render: function () {
        var self = this;
        return (
            <button className="mdl-button mdl-js-button mdl-button--icon" id={self.props.hash}>
            <i className="material-icons">looks_8</i>
            </button>
        );
    }
});

var AttendanceTableBodyRowCell = React.createClass({
    render: function () {
        var self = this;
        return (
            <td className="mdl-data-table__cell--non-numeric">
                <AttendanceTableBodyRowCellButton hash={self.props.hash+"btn"} key={self.props.hash+"btn"}/>
                <AttendanceTableBodyRowCellList htmlFor={self.props.hash+"btn"} />
            </td>
        );
    }
});

var AttendanceTableBodyRow = React.createClass({
    render: function () {
        var self = this;
        var data = self.props.data || {};
        var dates = self.props.dates || [];

        return (
            <tr>
                <td className="mdl-data-table__cell--non-numeric" key={self.props.name}>{self.props.name}</td>
                {
                    dates.map( date => {
                        var hash = CryptoJS.MD5(self.props.name + date.getTime());
                        return (<AttendanceTableBodyRowCell key={hash} hash={hash} date={date}/>);
                    })
                }
            </tr>
        );
    }
});

var AttendanceTableBody = React.createClass({
    render: function () {
        var data = this.props.attendance || {};
        return (
            <tbody>
                {
                    Object.keys(data).map( name => {
                        return (<AttendanceTableBodyRow key={name} name={name} data={data[name]} dates={this.props.dates}/>)
                    })
                }
            </tbody>
        );
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
