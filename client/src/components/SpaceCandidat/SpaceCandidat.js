import CandidatureForm from "./CandidatureForm/CandidatureForm";
import React from "react";
import SpaceNavbar from "../SpaceNavbar/SpaceNavbar";
import InformationForm from "../InformationForm/InformationForm";
import { MDBBtn, MDBCollapse } from "mdbreact";
import "./SpaceCandidat.css";

// Le composant qui contient tout l'espace candidat
class SpaceCandidat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Booléens pour le toggle des boutons
      toggleInformations: false
    };
    // Fonctions pour toggle les différents éléments de la page
    this.toggleInformationForm = this.toggleInformationForm.bind(this);
  }
  // Fonction pour afficher/masquer le div contenant les informations du candidat
  toggleInformationForm() {
    this.setState({
      toggleInformations: !this.state.toggleInformations
    });
  }
  // Fonction qui retourne le html du composant
  render() {
    return (
      <div className="Candidat">
        <SpaceNavbar props={this.props} />
        <div className="text-center">
          <MDBBtn
            onClick={this.toggleInformationForm}
            color="info"
            className="btnPerso"
          >
            Voir mes informations
          </MDBBtn>
        </div>
        <MDBCollapse isOpen={this.state.toggleInformations}>
          <InformationForm
            toggle={this.toggleInformationForm}
            props={this.props}
          />
        </MDBCollapse>
        <div className="CandidatureForm">
          <CandidatureForm props={this.props} />
        </div>
      </div>
    );
  }
}

export default SpaceCandidat;
