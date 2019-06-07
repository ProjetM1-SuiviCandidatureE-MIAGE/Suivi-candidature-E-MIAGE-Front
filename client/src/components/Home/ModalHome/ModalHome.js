import React, { Component } from "react";
import {
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon
} from "mdbreact";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import "./ModalHome.css";
import Auth from "../../../Auth";
import ModalForgetPassword from "./ModalForgetPassword/ModalForgetPassword";
import Tooltip from "@material-ui/core/Tooltip";

let props = {};

class ModalHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mailConnexionAdmin: "",
      passwordConnexionAdmin: "",

      mailConnexion: "",
      passwordConnexion: "",

      prenomInscription: "",
      nomInscription: "",
      mailInscription: "",
      passwordInscription: "",
      passwordConfirm: "",

      activeTab: "1",

      prenomInscriptionValid: false,
      nomInscriptionValid: false,
      mailInscriptionValid: false,
      passwordInscriptionValid: false,
      passwordConfirmValid: false,

      isOpen: false,
      loadEnd: false,
      validForm: false
    };
    this.openModal = this.openModal.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.LoginCandidat = this.LoginCandidat.bind(this);
    this.LoginAdmin = this.LoginAdmin.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  // Fonction qui se lance à la création du composant pour récupèrer les props et les stocker
  componentDidMount() {
    props = this.props;
    this.setState({
      loadEnd: true
    });
  }
  //////////////////////////////////////////////////////////////
  // Fonction pour ouvrir le modal d'oubli de mot de passe
  openModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  //////////////////////////////////////////////////////
  // Fonction pour afficher l'autre contenu du Tabs
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  ///////////////////////////////////////////////////////////////////
  // Fonction regex pour valider un mot de passe de plus de 8 caractères
  validatePassword(mdp) {
    const regex = /^.{8,}$/;
    return regex.test(mdp);
  }
  /////////////////////////////////////////////
  // fonction pour vérifier le format de l'email
  validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }
  /////////////////////////////////////////////
  // fonction pour vérifier le format du nom et prénom
  validateName(name) {
    const regex = /^[a-zA-Zéèàêùîô ]{2,}$/;
    return regex.test(String(name).toLowerCase());
  }
  //////////////////////////////////////////////////////
  // Fonction pour modifier les valeurs des inputs de connexion
  handleInputChange = event => {
    let { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  ////////////////////////////////////////////////////////////////
  // Fonction qui vérifie que tout le formulaire est valide
  checkValid() {
    if (
      this.state.prenomInscriptionValid &&
      this.state.nomInscriptionValid &&
      this.state.mailInscriptionValid &&
      this.state.passwordConfirmValid &&
      this.state.passwordInscriptionValid
    ) {
      if (this.state.passwordConfirm === this.state.passwordInscription) {
        this.setState({
          validForm: true
        });
      } else {
        this.setState({
          validForm: false
        });
      }
    }
  }
  //////////////////////////////////////////////////////
  // Fonction pour modifier les valeurs des inputs de l'inscription et leur vérification
  handleNameChange = event => {
    let { value, name } = event.target;
    if (this.validateName(value) === true) {
      this.setState(
        {
          [name]: value,
          [name + "Valid"]: true
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          [name]: value,
          [name + "Valid"]: false,
          validForm: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  handleMailChange = event => {
    let { value, name } = event.target;
    if (this.validateEmail(value) === true) {
      this.setState(
        {
          [name]: value,
          [name + "Valid"]: true
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          [name]: value,
          [name + "Valid"]: false,
          validForm: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  handlePasswordChange = event => {
    let { value, name } = event.target;
    if (this.validatePassword(value) === true) {
      this.setState(
        {
          [name]: value,
          [name + "Valid"]: true,
          validForm: false
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          [name]: value,
          [name + "Valid"]: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  ///////////////////////////////////
  // Fonction pour s'inscrire (candidat)
  SignUp = event => {
    event.preventDefault();
    if (this.state.validForm === true) {
      const newCandidat = {
        nom: this.state.nomInscription,
        prenom: this.state.prenomInscription,
        mail: this.state.mailInscription,
        mdp: this.state.passwordInscription,
        mdpConfirmation: this.state.passwordConfirm
      };
      fetch("/candidats/signup", {
        method: "POST",
        body: JSON.stringify(newCandidat),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(body) {
          if (body.text === "Succès") {
            const User = {
              prenom: newCandidat.prenom,
              nom: newCandidat.nom,
              mail: newCandidat.mail,
              token: body.token,
              id: body.id
            };
            if (props.props.get().mail === "") {
              // On change les informations de l'utilisateur
              props.props.change(User);
            }
            fetch("/mail/send", {
              method: "POST",
              body: JSON.stringify({
                mail: User.mail,
                sujet: "Bienvenue sur la plateforme de candidature E-MIAGE",
                texte:
                  "Bonjour " +
                  User.prenom +
                  " " +
                  User.nom +
                  ",<br />La création de votre compte est achevée, vous pouvez dès à présent compléter votre candidature et la soumettre quand elle sera complète.<br /><br />Cordialement"
              }),
              headers: { "Content-Type": "application/json" }
            })
              .then(function(response) {
                return response;
              })
              .then(function(body) {
                Auth.loginCandidat();
                props.history.push("/SpaceCandidat");
              });
          } else {
            alert(body.text);
          }
        })
        .catch(err => {
          console.error(err);
          alert("error !");
        });
    } else {
      alert("Formulaire invalide.");
    }
  };
  //////////////////////////////////////////////
  // Fonction de connexion pour le candidat
  LoginCandidat = event => {
    event.preventDefault();
    const Candidat = {
      mail: this.state.mailConnexion,
      mdp: this.state.passwordConnexion
    };
    fetch("/candidats/login", {
      method: "POST",
      body: JSON.stringify(Candidat),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        if (body.text === "Authentification réussi") {
          const User = {
            prenom: body.prenom,
            nom: body.nom,
            mail: Candidat.mail,
            token: body.token,
            id: body.id
          };
          while (props.props.get().mail === "") {
            // On change les informations de l'utilisateur
            props.props.change(User);
          }
          // On connecte le candidat et on le redirige vers l'espace candidat
          Auth.loginCandidat();
          props.history.push("/SpaceCandidat");
        } else {
          alert(body.text);
        }
      })
      .catch(err => {
        console.error(err);
        alert("error !");
      });
  };
  ////////////////////////////////////////
  // Fonction de connexion pour l'admin
  LoginAdmin = event => {
    event.preventDefault();
    const Admin = {
      mail: this.state.mailConnexionAdmin,
      mdp: this.state.passwordConnexionAdmin
    };
    fetch("/admins/login", {
      method: "POST",
      body: JSON.stringify(Admin),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        if (body.text === "Authentification réussi") {
          const User = {
            prenom: body.prenom,
            nom: body.nom,
            mail: Admin.mail,
            token: body.token,
            id: body.id
          };
          while (props.props.get().mail === "") {
            // On change les informations de l'utilisateur
            props.props.change(User);
          }
          Auth.loginAdmin();
          props.history.push("/SpaceAdmin");
        } else {
          alert(body.text);
        }
      })
      .catch(err => {
        console.error(err);
        alert("error !");
      });
  };
  //// Fonction pour chargé le composant fils quand celui-ci a fini de chargé
  renderPasswordModal(bool, fonction) {
    if (bool === true) {
      return (
        <ModalForgetPassword
          isOpen={this.state.isOpen}
          toggle={this.openModal}
          type={fonction}
        />
      );
    } else {
      return <div />;
    }
  }
  // Fonction qui retourne le code html du composant
  // Le render est appelé à chaque fois que l'état du composant change
  render() {
    // Modal pour accéder à l'espace candidat
    if (this.props.inscription === "true") {
      return (
        <MDBModal
          isOpen={this.props.isOpen}
          toggle={() => this.props.toggle()}
          id="modalLRForm"
          cascading
        >
          <MDBModalHeader
            toggle={() => this.props.toggle()}
            titleClass="d-inline title"
            className="text-center light-blue darken-3 white-text"
          >
            <Nav className="nav-tabs nav-fill">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggleTab("1");
                  }}
                >
                  <MDBIcon icon="user" /> Se connecter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggleTab("2");
                  }}
                >
                  <MDBIcon icon="user-plus" /> S'inscrire
                </NavLink>
              </NavItem>
            </Nav>
          </MDBModalHeader>
          {/* Le composant qui contient la page connexion et inscription */}
          <TabContent activeTab={this.state.activeTab}>
            {/* Panel avec le formulaire de connexion */}
            <TabPane tabId="1">
              <MDBModalBody>
                <form autoComplete="on">
                  <MDBInput
                    type="email"
                    name="mailConnexion"
                    label="E-mail*"
                    icon="envelope"
                    onChange={this.handleInputChange}
                    value={this.state.mailConnexion}
                    autoComplete="username"
                    group
                    required
                  />
                  <MDBInput
                    type="password"
                    name="passwordConnexion"
                    icon="lock"
                    label="Mot de passe*"
                    onChange={this.handleInputChange}
                    value={this.state.passwordConnexion}
                    group
                    autoComplete="current-password"
                    required
                  />{" "}
                </form>
                <div className="options text-center text-md-right mt-1">
                  <p>
                    <button
                      className="blue-text buttonLinkable"
                      onClick={this.openModal}
                    >
                      Mot de passe oublié ?
                    </button>
                  </p>
                </div>
                {this.renderPasswordModal(this.state.loadEnd, "candidat")}
              </MDBModalBody>
              <MDBModalFooter className="ModalFooter">
                <button
                  type="button"
                  className="shadow-effect btnModal btnInfo"
                  onClick={() => this.props.toggleAutre()}
                >
                  Je ne suis pas un candidat
                </button>
                <button
                  type="submit"
                  className="shadow-effect btnModal blue-gradient"
                  onClick={this.LoginCandidat}
                >
                  Se connecter
                </button>
              </MDBModalFooter>
            </TabPane>

            {/* Panel avec le formulaire d'inscription */}
            <TabPane tabId="2">
              <MDBModalBody>
                <form autoComplete="on">
                  <MDBInput
                    type="text"
                    name="prenomInscription"
                    icon="user"
                    label={"Prénom*"}
                    onChange={this.handleNameChange}
                    value={this.state.prenomInscription}
                    autoComplete="given-name"
                    group
                    required
                  />
                  <MDBInput
                    type="text"
                    name="nomInscription"
                    icon="user"
                    label="Nom*"
                    onChange={this.handleNameChange}
                    value={this.state.nomInscription}
                    autoComplete="family-name"
                    group
                    required
                  />
                  <MDBInput
                    type="email"
                    name="mailInscription"
                    label="E-mail*"
                    icon="envelope"
                    onChange={this.handleMailChange}
                    value={this.state.mailInscription}
                    autoComplete="email"
                    group
                    required
                  />
                  <MDBInput
                    type="password"
                    name="passwordInscription"
                    icon="lock"
                    label="Mot de passe* (8 caractères minimum)"
                    group
                    onChange={this.handlePasswordChange}
                    value={this.state.passwordInscription}
                    autoComplete="new-password"
                    required
                  />
                  <MDBInput
                    type="password"
                    name="passwordConfirm"
                    label="Confirmation mot de passe*"
                    icon="lock"
                    onChange={this.handlePasswordChange}
                    value={this.state.passwordConfirm}
                    autoComplete="new-password"
                    group
                    required
                  />
                </form>
              </MDBModalBody>
              {/* Footer du modal des candidats */}
              <MDBModalFooter className="ModalFooter">
                <button
                  type="button"
                  className="shadow-effect btnModal btnInfo"
                  onClick={() => this.props.toggleAutre()}
                >
                  Je ne suis pas un candidat
                </button>
                <Tooltip
                  title={
                    this.state.validForm === true
                      ? ""
                      : "Au moins 1 champ est invalide."
                  }
                  placement="top"
                >
                  <span>
                    <button
                      type="submit"
                      className="shadow-effect btnModal blue-gradient"
                      onClick={this.SignUp}
                      disabled={!this.state.validForm}
                    >
                      S'inscrire
                    </button>
                  </span>
                </Tooltip>
              </MDBModalFooter>
            </TabPane>
          </TabContent>
        </MDBModal>
      );
    }
    // Modal pour accéder à l'espace admin
    if (this.props.inscription === "false") {
      return (
        <MDBModal
          isOpen={this.props.isOpen}
          toggle={() => this.props.toggle()}
          id="modalLRForm"
          cascading
        >
          <MDBModalHeader
            toggle={() => this.props.toggle()}
            titleClass="d-inline title"
            className="text-center light-blue darken-3 white-text"
          >
            <Nav className="nav-tabs nav-fill">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggleTab("1");
                  }}
                >
                  <MDBIcon icon="user" /> Se connecter
                </NavLink>
              </NavItem>
              <NavItem />
            </Nav>
          </MDBModalHeader>
          {/* Le composant qui contient la page connexion et inscription */}
          <TabContent activeTab={this.state.activeTab}>
            {/* Panel avec le formulaire de connexion */}
            <TabPane tabId="1">
              <MDBModalBody>
                <form autoComplete="on">
                  <MDBInput
                    type="email"
                    name="mailConnexionAdmin"
                    label="E-mail*"
                    icon="envelope"
                    onChange={this.handleInputChange}
                    value={this.state.mailConnexionAdmin}
                    autoComplete="username"
                    group
                    required
                  />
                  <MDBInput
                    type="password"
                    name="passwordConnexionAdmin"
                    icon="lock"
                    label="Mot de passe*"
                    onChange={this.handleInputChange}
                    value={this.state.passwordConnexionAdmin}
                    group
                    autoComplete="current-password"
                    required
                  />
                </form>
                <div className="options text-center text-md-right mt-1">
                  <p>
                    <button
                      className="blue-text buttonLinkable"
                      onClick={this.openModal}
                    >
                      Mot de passe oublié ?
                    </button>
                  </p>
                </div>
                {this.renderPasswordModal(this.state.loadEnd, "admin")}
              </MDBModalBody>
              <MDBModalFooter className="ModalFooter">
                <button
                  type="button"
                  className="shadow-effect btnModal btnInfo"
                  onClick={() => this.props.toggleAutre()}
                >
                  Je ne suis pas un enseignant
                </button>
                <button
                  type="submit"
                  className="shadow-effect btnModal blue-gradient"
                  onClick={this.LoginAdmin}
                >
                  Se connecter
                </button>
              </MDBModalFooter>
            </TabPane>
          </TabContent>
        </MDBModal>
      );
    }
  }
}

export default withRouter(ModalHome);
