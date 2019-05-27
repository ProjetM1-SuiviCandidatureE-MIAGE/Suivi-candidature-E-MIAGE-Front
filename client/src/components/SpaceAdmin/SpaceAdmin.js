import React from "react";
import { Button, Collapse } from "reactstrap";
import SpaceNavbar from "../SpaceNavbar/SpaceNavbar";
import { MDBBadge } from "mdbreact";
import "./SpaceAdmin.css";
import Moment from "react-moment";
import InformationForm from "../InformationForm/InformationForm";
import DataTableAdmin from "./DataTableAdmin/DataTableAdmin";

let propsUser = "";

// Le composant qui affiche la page de l'espace administrateur
class SpaceAdmin extends React.Component {
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
      boolCandNonTraitees: false,
      boolCandEnAttentes: false,
      boolCandTraitees: false,
      // Tableaux contenant les candidatures traitées, non traitées et en attentes
      candidaturesNonTraitees: [],
      candidaturesEnAttentes: [],
      candidaturesTraitees: [],

      NonTraitéesNumber: 0,
      EnAttentesNumber: 0,
      TraitéesNumber: 0,

      fetchEnd: false
    };
    this.toggleNonTraite = this.toggleNonTraite.bind(this);
    this.toggleAttente = this.toggleAttente.bind(this);
    this.toggleTraite = this.toggleTraite.bind(this);
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
  }
  // s'exécute au lancement du composant
  componentDidMount() {
    propsUser = this.props.user;
    console.log(propsUser);
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
          })
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
      boolMesInformations: !this.state.boolMesInformations,
      boolCandTraitees: false,
      boolCandNonTraitees: false,
      boolCandEnAttentes: false
    });
  }
  // Fonction pour accepter une candidature
  acceptCandidature(item) {
    fetch(`/candidatures/edit/${item._id}`, {
      method: "PUT",
      body: JSON.stringify({
        etat: "acceptée",
        commentaire: "",
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
        console.log(body);
      });
    this.fetchData();
  }
  // Fonction pour refuser une candidature
  refuseCandidature(item) {
    fetch(`/candidatures/edit/${item._id}`, {
      method: "PUT",
      body: JSON.stringify({
        etat: "refusée",
        commentaire: "",
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
        console.log(body);
      });
    this.fetchData();
  }
  enAttenteCandidature(item) {
    fetch(`/candidatures/edit/${item._id}`, {
      method: "PUT",
      body: JSON.stringify({
        etat: "en attente",
        commentaire: "",
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
        console.log(body);
      });
    this.fetchData();
  }
  // Fonction pour afficher les candidatures non traitées
  renderCandidaturesNonTraitees() {
    if (this.state.candidaturesNonTraitees.length !== 0) {
      /*
      return (
        <div id="accordion">
          <h1 style={{ color: "black" }}>
            Liste des candidatures non traitées :
          </h1>
          {this.state.candidaturesNonTraitees.map((item, index) => (
            <div key={index} className="card">
              <div
                className="card-header"
                id={"heading" + index}
                role="button"
                data-toggle="collapse"
                data-target={"#collapse" + index}
                aria-expanded="false"
                aria-controls={"collapse" + index}
              >
                <div className="nameCand">
                  Candidature de {item.candidat.prenom} {item.candidat.nom}{" "}
                </div>
                <div className="dateCand">
                  <Moment format="DD/MM/YYYY">{item.date}</Moment>
                </div>
              </div>
              <div
                id={"collapse" + index}
                className="collapse"
                aria-labelledby={"heading" + index}
                data-parent="#accordion"
              >
                <div className="card-body">
                  <h2>Etat candidature : {item.etat}</h2>
                  <p>email candidat : {item.candidat.mail} </p>
                  <p>
                    candidature créée le :{" "}
                    <Moment format=" DD/MM/YYYY">{item.date}</Moment>{" "}
                  </p>
                </div>
                <form
                  action={`/candidatures/edit/${item}?_method=PUT`}
                  method="POST"
                >
                  <Button
                    onClick={() => this.refuseCandidature(item)}
                    color="danger"
                    data-toggle="collapse"
                    data-target={"#collapse" + index}
                    className="btnCandidature"
                  >
                    REFUSER
                  </Button>
                  <Button
                    onClick={() => this.enAttenteCandidature(item)}
                    color="warning"
                    data-toggle="collapse"
                    data-target={"#collapse" + index}
                    className="btnCandidature"
                  >
                    METTRE EN ATTENTE
                  </Button>
                  <Button
                    onClick={() => this.acceptCandidature(item)}
                    color="success"
                    data-toggle="collapse"
                    data-target={"#collapse" + index}
                    className="btnCandidature"
                  >
                    ACCEPTER
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      );
      */
      return (
        <DataTableAdmin candidatures={this.state.candidaturesNonTraitees} />
      );
    }
  }
  // Fonction pour afficher les candidatures en attentes
  renderCandidaturesEnAttentes() {
    if (this.state.candidaturesEnAttentes.length !== 0) {
      return (
        <div id="accordionAttentes">
          <h1 style={{ color: "black" }}>
            Liste des candidatures en attentes :
          </h1>
          {this.state.candidaturesEnAttentes.map((item, index) => (
            <div key={index} className="card">
              <div
                className="card-header"
                id={"headingAttentes" + index}
                role="button"
                data-toggle="collapse"
                data-target={"#collapseAttentes" + index}
                aria-expanded="false"
                aria-controls={"collapseAttentes" + index}
              >
                <div className="nameCand">
                  Candidature de {item.candidat.prenom} {item.candidat.nom}{" "}
                </div>
                <div className="dateCand">
                  {" "}
                  en attente depuis le
                  <Moment format=" DD/MM/YYYY">{item.dateTraitement}</Moment>
                </div>
              </div>
              <div
                id={"collapseAttentes" + index}
                className="collapse"
                aria-labelledby={"headingAttentes" + index}
                data-parent="#accordionAttentes"
              >
                <div className="card-body">
                  <h2>Etat candidature : {item.etat}</h2>
                  <p>email candidat : {item.candidat.mail} </p>
                  <p>
                    candidature créée le :{" "}
                    <Moment format=" DD/MM/YYYY">{item.date}</Moment>{" "}
                  </p>
                </div>
                <form
                  action={`/candidatures/edit/${item}?_method=PUT`}
                  method="POST"
                >
                  <Button
                    onClick={() => this.refuseCandidature(item)}
                    color="danger"
                    data-toggle="collapse"
                    data-target={"#collapseAttentes" + index}
                    className="btnCandidature"
                  >
                    REFUSER
                  </Button>
                  <Button
                    onClick={() => this.acceptCandidature(item)}
                    color="success"
                    data-toggle="collapse"
                    data-target={"#collapseAttentes" + index}
                    className="btnCandidature"
                  >
                    ACCEPTER
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
  // Fonction pour afficher les candidatures traitées
  renderCandidaturesTraitees() {
    if (this.state.candidaturesTraitees.length !== 0) {
      return (
        <div id="accordionTraitees">
          <h1 style={{ color: "black" }}>Liste des candidatures traitées :</h1>
          {this.state.candidaturesTraitees.map((item, index) => (
            <div key={index} className="card">
              <div
                className="card-header"
                id={"headingTraitees" + index}
                role="button"
                data-toggle="collapse"
                data-target={"#collapseTraitees" + index}
                aria-expanded="false"
                aria-controls={"collapseTraitees" + index}
              >
                <div className="nameCand">
                  Candidature de {item.candidat.prenom} {item.candidat.nom}{" "}
                </div>
                <div className="dateCand">
                  {item.etat} le
                  <Moment format=" DD/MM/YYYY">{item.dateTraitement}</Moment>
                </div>
              </div>
              <div
                id={"collapseTraitees" + index}
                className="collapse"
                aria-labelledby={"headingTraitees" + index}
                data-parent="#accordionTraitees"
              >
                <div className="card-body">
                  <h2>Etat candidature : {item.etat}</h2>
                  <p>email candidat : {item.candidat.mail} </p>
                  <p>
                    candidature créée le :{" "}
                    <Moment format=" DD/MM/YYYY">{item.date}</Moment>{" "}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
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
          <Button
            onClick={this.toggleMesInformations}
            color="info"
            className="btnPerso"
          >
            Voir mes informations
          </Button>
        </div>
        <Collapse isOpen={this.state.boolMesInformations}>
          {this.renderInformationForm(this.state.fetchEnd)}
        </Collapse>
        <div className="text-center">
          <Button onClick={this.toggleNonTraite} className="btnSA">
            Afficher les candidatures non traitées
            <MDBBadge color="primary" className="ml-3">
              {this.state.NonTraitéesNumber}
            </MDBBadge>
          </Button>
          <Button onClick={this.toggleAttente} className="btnSA">
            Afficher les candidatures en attentes
            <MDBBadge color="primary" className="ml-3">
              {this.state.EnAttentesNumber}
            </MDBBadge>
          </Button>
          <Button onClick={this.toggleTraite} className="btnSA">
            Afficher les candidatures traitées
            <MDBBadge color="primary" className="ml-3">
              {this.state.TraitéesNumber}
            </MDBBadge>
          </Button>
        </div>
        <Collapse isOpen={this.state.boolCandNonTraitees}>
          {this.renderCandidaturesNonTraitees()}
        </Collapse>
        <Collapse isOpen={this.state.boolCandEnAttentes}>
          {this.renderCandidaturesEnAttentes()}
        </Collapse>
        <Collapse isOpen={this.state.boolCandTraitees}>
          {this.renderCandidaturesTraitees()}
        </Collapse>
      </div>
    );
  }
}

export default SpaceAdmin;
