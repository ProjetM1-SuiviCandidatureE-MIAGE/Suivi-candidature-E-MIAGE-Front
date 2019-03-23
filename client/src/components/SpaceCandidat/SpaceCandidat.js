import CandidatureForm from "./CandidatureForm/CandidatureForm";
import React from "react";
import SpaceNavbar from "../SpaceNavbar/SpaceNavbar";
import InformationForm from "../InformationForm/InformationForm";
import { MDBBtn, MDBCollapse } from "mdbreact";

// Le composant qui contient tout l'espace candidat
class SpaceCandidat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Booléens pour le toggle des boutons
      toggleCandidature: false,
      toggleInformations: false
    };
    // Fonctions pour toggle les différents éléments de la page
    this.toggleCandidatureForm = this.toggleCandidatureForm.bind(this);
    this.toggleInformationForm = this.toggleInformationForm.bind(this);
  }
  // Fonction pour afficher/masquer le div pour créer une candidature
  toggleCandidatureForm() {
    this.setState({
      toggleCandidature: !this.state.toggleCandidature,
      toggleInformations: false
    });
  }
  // Fonction pour afficher/masquer le div contenant les informations du candidat
  toggleInformationForm() {
    this.setState({
      toggleInformations: !this.state.toggleInformations,
      toggleCandidature: false
    });
  }
  // Fonction qui retourne le html du composant
  render() {
    return (
      <div>
        <SpaceNavbar props={this.props} />
        <div className="text-center">
          <MDBBtn
            onClick={this.toggleInformationForm}
            color="info"
            size="lg"
            className="btnPerso"
          >
            Mes informations
          </MDBBtn>
        </div>
        <MDBCollapse isOpen={this.state.toggleInformations}>
          <InformationForm
            toggle={this.toggleInformationForm}
            props={this.props}
          />
        </MDBCollapse>
        <div className="text-center">
          <MDBBtn
            onClick={this.toggleCandidatureForm}
            size="lg"
            color="primary"
            className="btnPerso"
          >
            Créer une candidature
          </MDBBtn>
        </div>
        <MDBCollapse isOpen={this.state.toggleCandidature}>
          <CandidatureForm
            toggle={this.toggleCandidatureForm}
            props={this.props}
          />
        </MDBCollapse>
      </div>
    );
  }
}

export default SpaceCandidat;
