import React from "react";
import Sidebar from "./Sidebar";
import NavbarHeader from "./NavbarHeader";
import Menu from "../Menu/Menu";

class NavbarHEader extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
        <NavbarHeader />
        <Sidebar />
        <Menu />
      </nav>
    );
  }
}

export default NavbarHEader;
