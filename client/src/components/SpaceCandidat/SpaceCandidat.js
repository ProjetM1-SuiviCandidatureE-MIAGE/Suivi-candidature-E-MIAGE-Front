import CandidatureForm from "./CandidatureForm/CandidatureForm";
import React from "react";
import SpaceNavbar from "../SpaceNavbar/SpaceNavbar";
import InformationForm from "../InformationForm/InformationForm";
import { MDBBtn, MDBCollapse } from "mdbreact";
import "./SpaceCandidat.css";

let propsUser = "";

// Le composant qui contient tout l'espace candidat
class SpaceCandidat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      candidat: {
        id: "",
        nom: "",
        prenom: "",
        mail: ""
      },
      candidatures: "",
      brouillon: "",
      fetchEnd: false,

      toggleInformations: false
    };
    // Fonctions pour toggle les différents éléments de la page
    this.toggleInformationForm = this.toggleInformationForm.bind(this);
    this.renderCandidatureForm = this.renderCandidatureForm.bind(this);
  }
  // Fonction pour récupérer les candidatures du candidat quand il se connecte
  componentDidMount() {
    propsUser = this.props.user;
    console.log("récupération des candidatures du candidat");
    fetch(`/candidatures/getCandidatures/${propsUser.id}`)
      .then(res => res.json())
      .then(data =>
        this.setState(state => {
          return {
            candidatures: data === undefined ? "vide" : data,
            brouillon:
              data === undefined
                ? "vide"
                : data.etat.includes("brouillon")
                ? data
                : "vide",
            candidat: {
              ...state.candidat,
              id: propsUser.id,
              prenom: propsUser.prenom,
              nom: propsUser.nom,
              mail: propsUser.mail
            },
            fetchEnd: true
          };
        })
      )
      .catch(error =>
        this.setState(state => {
          return {
            candidatures: "vide",
            brouillon: "vide",
            candidat: {
              ...state.candidat,
              id: propsUser.id,
              prenom: propsUser.prenom,
              nom: propsUser.nom,
              mail: propsUser.mail
            },
            fetchEnd: true
          };
        })
      );
  }
  // Fonction pour afficher/masquer le div contenant les informations du candidat
  toggleInformationForm() {
    this.setState({
      toggleInformations: !this.state.toggleInformations
    });
  }
  renderCandidatureForm(boolean) {
    if (boolean === true) {
      return (
        <CandidatureForm
          props={this.props}
          candidatures={this.state.candidatures}
          brouillon={this.state.brouillon}
        />
      );
    } else {
      console.log("En Attente du fetch");
    }
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
          {this.renderCandidatureForm(this.state.fetchEnd)}
        </div>
      </div>
    );
  }
}

export default SpaceCandidat;
