import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler
} from "reactstrap";
import "./HomeNavbar.css";
import { withRouter } from "react-router-dom";
import ModalHome from "../ModalHome/ModalHome";

// La barre de navigation de la page d'accueil
class CustomNavbar extends Component {
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
              <NavLink id="link" onClick={this.openAdminModal}>
                Espace admin
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="link" onClick={this.openCandidatModal}>
                Espace candidat
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <ModalHome
          isOpen={this.state.showCandidatModal}
          toggle={this.openCandidatModal}
          toggleAutre={this.openAdminModal}
          inscription="true"
        />
        <ModalHome
          isOpen={this.state.showAdminModal}
          toggle={this.openAdminModal}
          toggleAutre={this.openCandidatModal}
          inscription="false"
        />
      </Navbar>
    );
  }
}

export default withRouter(CustomNavbar);
