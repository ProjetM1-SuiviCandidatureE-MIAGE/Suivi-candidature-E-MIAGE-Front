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
                    <NavLink id="link" eventKey={1} href="/SpaceAdmin" componentClass={Link} to="/">Espace admin</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink id="link" eventKey={2} href="/SpaceCandidat"componentClass={Link} to="/">Espace candidat</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
        );
    }
}
