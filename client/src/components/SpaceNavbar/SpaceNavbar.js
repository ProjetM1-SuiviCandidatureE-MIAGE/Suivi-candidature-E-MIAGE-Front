import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Button, NavbarBrand } from "reactstrap";
import "./SpaceNavbar.css";

export default class SpaceNavbar extends Component {
  render() {
    return (
      <Navbar light expand="md" className="customNavbar">
        <i className="material-icons">account_box</i>
        <NavbarBrand className="brand">
          <b>Mon espace personnel</b>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link to="/">
              <Button
                color="primary"
                href="/"
                className="btnPerso shadow-effect"
              >
                Déconnexion
              </Button>
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
