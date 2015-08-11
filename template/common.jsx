var MDLProgress = React.createClass({
    componentDidMount: function () {
        componentHandler.upgradeElement(this.getDOMNode(), "MaterialProgress");
    },
    render: function () {
        return (
            <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
        );
    }
});
