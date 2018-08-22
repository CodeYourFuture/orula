import React from "react";
import NavbarRight from "./NavbarRight";
import NavbarHeader from "./NavbarHeader";
import Menu from "../Menu/Menu";

class NavbarHEader extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-default navbar-static-top"
        style={{ marginBottom: 0 }}
      >
        <NavbarHeader />
        <NavbarRight />
        <Menu />
      </nav>
    );
  }
}

export default NavbarHEader;
