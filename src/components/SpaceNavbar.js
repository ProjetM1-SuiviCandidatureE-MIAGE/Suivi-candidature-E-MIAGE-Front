import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button, NavbarBrand } from 'reactstrap';
import './SpaceNavbar.css'

export default class SpaceNavbar extends Component {
  render() {
    return (
        <Navbar light expand="md">
        <NavbarBrand>Mon espace personnel</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Link to="/">
                        <Button color="secondary" href="/">Déconnexion</Button>
                    </Link>
                </NavItem>
            </Nav>
        </Navbar>
    );
  }
}
