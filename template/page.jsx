var Page = React.createClass({
    getInitialState: function () { return {} },
    componentWillMount: function () {
        var self = this;
        $.ajax({
            url: "session/get",
            dataType: "json"
        }).success(function (data, status, xhr) {
            console.log(data);
            self.setState(data);
        });
    },
    render: function() {
        var self = this;
        var page_title = document.getElementById('page_title');
        page_title.innerHTML = this.props.title;
        return (
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <header className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <div className="mdl-layout-spacer"></div>
              </div>
            </header>
            <div className="mdl-layout__drawer">
                  <span className="mdl-layout-title"><i>{self.state.name}</i></span>
                  <nav className="mdl-navigation">
                      <a className="mdl-navigation__link" href="/className/uid"><h6>Karl</h6></a>
                  </nav>
                  <span className="mdl-layout-title">Sign In</span>
                  <div className="mdl-grid">
                      <div className="mdl-cell mdl-cell--12-col">
                          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                              VK Login
                          </button>
                          &nbsp;
                      </div>
                  </div>
            </div>
            <main className="mdl-layout__content">
            </main>
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
