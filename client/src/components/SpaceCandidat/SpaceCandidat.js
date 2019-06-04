import CandidatureForm from "./CandidatureForm/CandidatureForm";
import React from "react";
import SpaceNavbar from "../SpaceNavbar/SpaceNavbar";
import InformationForm from "../InformationForm/InformationForm";
import { MDBBtn, MDBCollapse } from "mdbreact";
import "./SpaceCandidat.css";
import DataTable from "./TableCandidat/DataTableCandidat";

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
    this.getCandidat = this.getCandidat.bind(this);
    this.setCandidat = this.setCandidat.bind(this);
    this.renderInformationForm = this.renderInformationForm.bind(this);
    this.checkBrouillon = this.checkBrouillon.bind(this);
    this.fetchCandidatures = this.fetchCandidatures.bind(this);
  }
  // Fonction pour récupérer les candidatures du candidat quand il se connecte
  componentDidMount() {
    propsUser = this.props.user;
    this.fetchCandidatures();
  }
  // Fonction qui vérifie que la variable brouillon n'est pas vide
  // Sinon il créé une candidature brouillon
  checkBrouillon(boolean) {
    const self = this;
    if (boolean === false) {
      fetch("/candidatures/saveCandidature", {
        method: "POST",
        body: JSON.stringify({
          etat: "brouillon",
          commentaire: "",
          date: new Date(),
          dateTraitement: "",
          cv: [],
          lm: [],
          releveNote: [],
          diplome: [],
          autresFichier: [],
          candidat: this.state.candidat
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(function(response) {
          return response;
        })
        .then(function(body) {
          self.setState(
            {
              fetchEnd: boolean
            },
            self.fetchCandidatures()
          );
        });
    }
    self.setState({
      fetchEnd: boolean
    });
  }
  // Fonction pour récupérer les candidatures et le brouillon
  fetchCandidatures() {
    fetch(`/candidatures/getCandidatures/${propsUser.id}`)
      .then(res => res.json())
      .then(data =>
        this.setState(
          state => {
            return {
              candidatures: data.text === "vide" ? "vide" : data,
              brouillon:
                data.text === "vide"
                  ? "vide"
                  : data.some(function(item) {
                      return item.etat.includes("brouillon");
                    })
                  ? data.filter(function(item) {
                      return item.etat.includes("brouillon");
                    })
                  : "vide",
              fetchEnd: this.state.fetchEnd,
              candidat: {
                ...state.candidat,
                id: propsUser.id,
                prenom: propsUser.prenom,
                nom: propsUser.nom,
                mail: propsUser.mail
              }
            };
          },
          () => {
            if (this.state.brouillon === "vide") {
              this.checkBrouillon(false);
            } else {
              this.checkBrouillon(true);
            }
          }
        )
      )
      .catch(error => {
        console.log(error);
      });
  }
  // Fonction pour récupérer les données du candidat pour les autres composants fils
  getCandidat() {
    return this.state.candidat;
  }
  // Fonction pour modifier les informations du candidat
  setCandidat(CandidatModif) {
    // on fait le setState avec le candidat modifié
    this.setState(state => {
      return {
        candidat: {
          ...state.candidat,
          id: CandidatModif.id,
          prenom: CandidatModif.prenom,
          nom: CandidatModif.nom,
          mail: CandidatModif.mail
        }
      };
    });
  }
  // Fonction pour afficher/masquer le div contenant les informations du candidat
  toggleInformationForm() {
    this.setState({
      toggleInformations: !this.state.toggleInformations
    });
  }
  // Fonction pour charger le composant CandidatureForm quand le fetch est fini
  renderCandidatureForm(boolean) {
    if (boolean === true) {
      return (
        <CandidatureForm
          candidatures={this.state.candidatures}
          brouillon={this.state.brouillon}
          get={() => this.getCandidat()}
          fetch={() => this.fetchCandidatures()}
        />
      );
    }
  }
  // Fonction pour afficher le composant InformationForm
  renderInformationForm(boolean) {
    if (boolean === true) {
      return (
        <InformationForm
          toggle={this.toggleInformationForm}
          props={this.props}
          get={() => this.getCandidat()}
          set={item => this.setCandidat(item)}
          type={"candidat"}
        />
      );
    }
  }
  // Fonction pour afficher la datatable de suivi des candidatures
  renderDataTableSuivi(boolean) {
    if (boolean === true) {
      return <DataTable candidatures={this.state.candidatures} />;
    }
  }
  // Fonction qui retourne le html du composant
  render() {
    return (
      <div className="Candidat">
        <SpaceNavbar props={this.props} />
        <div className="text-center">
          {this.renderDataTableSuivi(this.state.fetchEnd)}
          <MDBBtn
            onClick={this.toggleInformationForm}
            color="info"
            className="btnPerso"
          >
            Voir mes informations
          </MDBBtn>
        </div>
        <MDBCollapse isOpen={this.state.toggleInformations}>
          {this.renderInformationForm(this.state.fetchEnd)}
        </MDBCollapse>
        <div className="CandidatureForm">
          {this.renderCandidatureForm(this.state.fetchEnd)}
        </div>
      </div>
    );
  }
}

export default SpaceCandidat;
