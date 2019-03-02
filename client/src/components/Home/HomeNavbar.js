import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler
} from "reactstrap";
import "./HomeNavbar.css";
import ModalHome from "./ModalHome/ModalHome";

// La barre de navigation de la page d'accueil
export default class CustomNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      showAdminModal: false,
      showCandidatModal: false
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.openAdminModal = this.openAdminModal.bind(this);
    this.openCandidatModal = this.openCandidatModal.bind(this);
  }
  // Fonction pour dérouler la navbar quand on est sur smartphone
  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  // Fonction pour ouvrir le modal de connexion quand on clique sur espace candidat
  openCandidatModal() {
    this.setState({
      showAdminModal: false,
      showCandidatModal: !this.state.showCandidatModal
    });
  }
  // Fonction pour ouvrir le modal de connexion quand on clique sur espace admin
  openAdminModal() {
    this.setState({
      showAdminModal: !this.state.showAdminModal,
      showCandidatModal: false
    });
  }

  render() {
    return (
      <Navbar dark expand="md" fixed="top">
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink id="link" href="/SpaceAdmin" component={Link} to="/">
                Espace admin
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="link" href="/SpaceCandidat" component={Link} to="/">
                Espace candidat
              </NavLink>
            </NavItem>
            <NavItem>
              <button type="button" onClick={this.openCandidatModal}>
                Candidat
              </button>
            </NavItem>
            <NavItem>
              <button type="button" onClick={this.openAdminModal}>
                Admin
              </button>
            </NavItem>
          </Nav>
        </Collapse>
        <ModalHome
          isOpen={this.state.showCandidatModal}
          toggle={this.openCandidatModal}
          inscription="true"
        />
        <ModalHome
          isOpen={this.state.showAdminModal}
          toggle={this.openAdminModal}
          inscription="false"
        />
      </Navbar>
    );
  }
}
