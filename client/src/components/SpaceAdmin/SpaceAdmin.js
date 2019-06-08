import React, { Component } from "react";
import { Collapse } from "reactstrap";
import SpaceNavbar from "../SpaceNavbar/SpaceNavbar";
import { MDBBadge, MDBBtn } from "mdbreact";
import "./SpaceAdmin.css";
import InformationForm from "../InformationForm/InformationForm";
import DataTableNT from "./DataTableAdmin/DataTableNT";
import DataTableEA from "./DataTableAdmin/DataTableEA";
import DataTableTr from "./DataTableAdmin/DataTableTr";
import MySnackBar from "../SnackBar/MySnackBar";
import ModalSignUp from "./ModalSignUp/ModalSignUp";

let propsUser = "";

// Le composant qui affiche la page de l'espace administrateur
export default class SpaceAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: {
        id: "",
        nom: "",
        prenom: "",
        mail: ""
      },
      // Les booléens pour les fonctions toggle des boutons
      boolMesInformations: false,
      boolCandNonTraitees: true,
      boolCandEnAttentes: false,
      boolCandTraitees: false,
      // Tableaux contenant les candidatures traitées, non traitées et en attentes
      candidaturesNonTraitees: [],
      candidaturesEnAttentes: [],
      candidaturesTraitees: [],

      NonTraitéesNumber: 0,
      EnAttentesNumber: 0,
      TraitéesNumber: 0,

      fetchEnd: false,
      openSnackBar: false,
      showAdminModal: false
    };
    this.toggleNonTraite = this.toggleNonTraite.bind(this);
    this.toggleAttente = this.toggleAttente.bind(this);
    this.toggleTraite = this.toggleTraite.bind(this);
    this.openAdminModal = this.openAdminModal.bind(this);
    this.toggleMesInformations = this.toggleMesInformations.bind(this);

    this.renderCandidaturesNonTraitees = this.renderCandidaturesNonTraitees.bind(
      this
    );
    this.renderCandidaturesEnAttentes = this.renderCandidaturesEnAttentes.bind(
      this
    );
    this.renderCandidaturesTraitees = this.renderCandidaturesTraitees.bind(
      this
    );
    this.acceptCandidature = this.acceptCandidature.bind(this);
    this.refuseCandidature = this.refuseCandidature.bind(this);
    this.enAttenteCandidature = this.enAttenteCandidature.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.getAdmin = this.getAdmin.bind(this);
    this.setAdmin = this.setAdmin.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.changeSnackBar = this.changeSnackBar.bind(this);
  }
  // s'exécute au lancement du composant
  componentDidMount() {
    propsUser = this.props.user;
    this.setState(state => {
      return {
        admin: {
          ...state.admin,
          id: propsUser.id,
          prenom: propsUser.prenom,
          nom: propsUser.nom,
          mail: propsUser.mail
        }
      };
    });
    this.fetchData();
  }
  // Fonction pour ouvrir le modal de connexion quand on clique sur espace admin
  openAdminModal() {
    this.setState({
      showAdminModal: !this.state.showAdminModal
    });
  }
  // Fonction pour récupérer les candidatures et les filtrer
  fetchData() {
    fetch("/candidatures/getAllCandidatures")
      .then(res => res.json())
      .then(data =>
        this.setState({
          candidaturesNonTraitees: data.filter(item => {
            return item.etat.includes("non traitée");
          }),
          candidaturesEnAttentes: data.filter(item => {
            return item.etat.includes("en attente");
          }),
          candidaturesTraitees: data.filter(item => {
            return (
              item.etat.includes("acceptée") || item.etat.includes("refusée")
            );
          }),
          fetchEnd: false
        })
      )
      .then(() => this.sortingArray())
      .catch(error => console.log(error));
  }
  // Fonction pour récupérer les informations de l'Admin
  getAdmin() {
    return this.state.admin;
  }
  // Fonction pour modifier les informations de l'admin
  setAdmin(AdminModif) {
    this.setState(state => {
      return {
        candidat: {
          ...state.admin,
          id: AdminModif.id,
          prenom: AdminModif.prenom,
          nom: AdminModif.nom,
          mail: AdminModif.mail
        }
      };
    });
  }
  ////////////////////////////////////////////////////////////
  ///// Fonction pour ouvrir le snackBar après la sauvegarde de la candidature
  changeSnackBar(boolean) {
    this.setState({
      openSnackBar: boolean
    });
  }
  // Fonction pour trier les candidatures
  sortingArray() {
    this.setState({
      NonTraitéesNumber:
        this.state.candidaturesNonTraitees === 0
          ? 0
          : this.state.candidaturesNonTraitees.length,
      EnAttentesNumber:
        this.state.candidaturesEnAttentes === 0
          ? 0
          : this.state.candidaturesEnAttentes.length,
      TraitéesNumber:
        this.state.candidaturesTraitees === 0
          ? 0
          : this.state.candidaturesTraitees.length,
      fetchEnd: true
    });
  }
  // Fonction pour afficher le div qui contient les candidatures non traitées
  toggleNonTraite() {
    this.setState({
      boolCandNonTraitees: !this.state.boolCandNonTraitees,
      boolMesInformations: false,
      boolCandEnAttentes: false,
      boolCandTraitees: false
    });
  }
  // Fonction pour afficher le div qui contient les candidatures en attentes
  toggleAttente() {
    this.setState({
      boolCandEnAttentes: !this.state.boolCandEnAttentes,
      boolMesInformations: false,
      boolCandNonTraitees: false,
      boolCandTraitees: false
    });
  }
  // Fonction pour afficher le div qui contient les candidatures traitées
  toggleTraite() {
    this.setState({
      boolCandTraitees: !this.state.boolCandTraitees,
      boolMesInformations: false,
      boolCandNonTraitees: false,
      boolCandEnAttentes: false
    });
  }
  // Fonction pour afficher le div qui contient les informations de l'admin
  toggleMesInformations() {
    this.setState({
      boolMesInformations: !this.state.boolMesInformations
    });
  }
  // Fonction pour envoyer un mail au candidat quand sa candidatue a été traité
  sendMail(candidat, statut) {
    fetch("/mail/send", {
      method: "POST",
      body: JSON.stringify({
        mail: candidat.mail,
        sujet: "Votre candidature a été traité",
        texte:
          "Bonjour " +
          candidat.prenom +
          " " +
          candidat.nom +
          ",<br /> votre candidature est " +
          statut +
          ".<br /><br />Pour plus de détails, vous pouvez consulter votre candidature dans votre espace personnel.<br /><br />Cordialement."
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function(response) {
        return response;
      })
      .then(function(body) {});
  }
  // Fonction pour accepter une candidature
  acceptCandidature(id, comm, candidat) {
    const self = this;
    fetch(`/candidatures/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        etat: "acceptée",
        commentaire: comm,
        dateTraitement: new Date()
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(function(body) {
        console.log("acceptée " + id);
        self.sendMail(candidat, "acceptée");
        self.changeSnackBar(true);
        self.fetchData();
      });
  }
  // Fonction pour refuser une candidature
  refuseCandidature(id, comm, candidat) {
    const self = this;
    fetch(`/candidatures/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        etat: "refusée",
        commentaire: comm,
        dateTraitement: new Date()
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log("refusée " + id);
        self.sendMail(candidat, "refusée");
        self.changeSnackBar(true);
        self.fetchData();
      });
  }
  enAttenteCandidature(id, comm, candidat) {
    const self = this;
    fetch(`/candidatures/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        etat: "en attente",
        commentaire: comm,
        dateTraitement: new Date()
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        console.log("en attente " + id);
        self.sendMail(candidat, "en attente");
        self.changeSnackBar(true);
        self.fetchData();
      });
  }
  // Fonction pour afficher les candidatures non traitées
  renderCandidaturesNonTraitees(boolean) {
    if (boolean === true) {
      return (
        <DataTableNT
          candidatures={this.state.candidaturesNonTraitees}
          accepter={(id, comm, candidat) =>
            this.acceptCandidature(id, comm, candidat)
          }
          refuser={(id, comm, candidat) =>
            this.refuseCandidature(id, comm, candidat)
          }
          attente={(id, comm, candidat) =>
            this.enAttenteCandidature(id, comm, candidat)
          }
        />
      );
    }
  }
  // Fonction pour afficher les candidatures en attentes
  renderCandidaturesEnAttentes(boolean) {
    if (boolean === true) {
      return (
        <DataTableEA
          candidatures={this.state.candidaturesEnAttentes}
          accepter={(id, comm, candidat) =>
            this.acceptCandidature(id, comm, candidat)
          }
          refuser={(id, comm, candidat) =>
            this.refuseCandidature(id, comm, candidat)
          }
        />
      );
    }
  }
  // Fonction pour afficher les candidatures traitées
  renderCandidaturesTraitees(boolean) {
    if (boolean === true) {
      return <DataTableTr candidatures={this.state.candidaturesTraitees} />;
    }
  }
  // Fonction pour afficher le composant InformationForm
  renderInformationForm(boolean) {
    if (boolean === true) {
      return (
        <InformationForm
          toggle={this.toggleMesInformations}
          props={this.props}
          get={() => this.getAdmin()}
          set={item => this.setAdmin(item)}
          type={"admin"}
        />
      );
    }
  }
  // Fonction qui affiche le code html du composant
  render() {
    return (
      <div className="Admin">
        <SpaceNavbar props={this.props} />
        <div className="text-center">
          <MDBBtn
            onClick={this.toggleMesInformations}
            color="info"
            className="btnPerso"
          >
            Voir mes informations
          </MDBBtn>
          <MDBBtn onClick={this.openAdminModal} className="btnPerso">
            Inscrire un nouvel enseignant
          </MDBBtn>
          <ModalSignUp
            isOpen={this.state.showAdminModal}
            toggle={this.openAdminModal}
          />
        </div>
        <Collapse isOpen={this.state.boolMesInformations}>
          {this.renderInformationForm(this.state.fetchEnd)}
        </Collapse>
        <div className="text-center">
          <MDBBtn
            onClick={this.toggleNonTraite}
            className="btnSA"
            color="light-blue"
          >
            Afficher les candidatures non traitées
            <MDBBadge color="primary" className="ml-3">
              {this.state.NonTraitéesNumber}
            </MDBBadge>
          </MDBBtn>
          <MDBBtn
            onClick={this.toggleAttente}
            className="btnSA"
            color="light-blue"
          >
            Afficher les candidatures en attentes
            <MDBBadge color="primary" className="ml-3">
              {this.state.EnAttentesNumber}
            </MDBBadge>
          </MDBBtn>
          <MDBBtn
            onClick={this.toggleTraite}
            className="btnSA"
            color="light-blue"
          >
            Afficher les candidatures traitées
            <MDBBadge color="primary" className="ml-3">
              {this.state.TraitéesNumber}
            </MDBBadge>
          </MDBBtn>
        </div>
        <Collapse isOpen={this.state.boolCandNonTraitees}>
          {this.renderCandidaturesNonTraitees(this.state.fetchEnd)}
        </Collapse>
        <Collapse isOpen={this.state.boolCandEnAttentes}>
          {this.renderCandidaturesEnAttentes(this.state.fetchEnd)}
        </Collapse>
        <Collapse isOpen={this.state.boolCandTraitees}>
          {this.renderCandidaturesTraitees(this.state.fetchEnd)}
        </Collapse>
        <MySnackBar
          message={"Candidature traitée."}
          open={this.state.openSnackBar}
          close={item => this.changeSnackBar(item)}
        />
      </div>
    );
  }
}
