import React from "react";

class NavbarHeader extends React.Component {
  render() {
    return (
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target=".navbar-collapse"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="/">
          Orúla
        </a>
      </div>
    );
  }
}

export default NavbarHeader;
