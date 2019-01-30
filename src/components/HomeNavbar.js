import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink, Collapse, NavbarToggler } from 'reactstrap';
import './HomeNavbar.css';

// La barre de navigation de la page d'accueil
export default class CustomNavbar extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      render() {
        return (
            <Navbar dark expand="md" fixed="top">
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink id="link" href="/SpaceAdmin" component={Link} to="/">Espace admin</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink id="link" href="/SpaceCandidat" component={Link} to="/">Espace candidat</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
        );
    }
}
