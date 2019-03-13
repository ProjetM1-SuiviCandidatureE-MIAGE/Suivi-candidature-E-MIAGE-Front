import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Button, NavbarBrand } from "reactstrap";
import "./SpaceNavbar.css";
import Auth from "../../Auth";
import { withRouter } from "react-router-dom";

let props = {};

class SpaceNavbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    props = this.props;
  }

  logout() {
    Auth.logout();
    props.history.push("/");
  }

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
                type="button"
                color="primary"
                className="btnPerso shadow-effect"
                onClick={this.logout}
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

export default withRouter(SpaceNavbar);
