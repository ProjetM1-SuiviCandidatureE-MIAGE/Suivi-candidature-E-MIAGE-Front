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

      activeTab: "1"
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.LoginCandidat = this.LoginCandidat.bind(this);
    this.LoginAdmin = this.LoginAdmin.bind(this);
  }

  componentDidMount() {
    props = this.props;
  }

  // Fonction pour afficher l'autre contenu du Tabs
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  // Fonction pour modifier les valeurs des inputs
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  // Fonction pour s'inscrire
  SignUp = event => {
    event.preventDefault();
    const newCandidat = {
      nom: this.state.nomInscription,
      prenom: this.state.prenomInscription,
      mail: this.state.mailInscription,
      mdp: this.state.passwordInscription
    };

    console.log(JSON.stringify(newCandidat));
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
          Auth.loginCandidat();
          props.history.push("/SpaceCandidat");
        } else {
          alert(body.text);
        }
        console.log(body);
      })
      .catch(err => {
        console.error(err);
        alert("error !");
      });
  };

  // Fonction de connexion pour le candidat
  LoginCandidat = event => {
    event.preventDefault();
    const Candidat = {
      mail: this.state.mailConnexion,
      mdp: this.state.passwordConnexion
    };
    console.log(JSON.stringify(Candidat));

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
          Auth.loginCandidat();
          props.history.push("/SpaceCandidat");
        } else {
          alert(body.text);
        }
        console.log(body);
      })
      .catch(err => {
        console.error(err);
        alert("error !");
      });
  };
  // Fonction de connexion pour l'admin
  LoginAdmin = event => {
    event.preventDefault();
    const Admin = {
      mail: this.state.mailConnexionAdmin,
      mdp: this.state.passwordConnexionAdmin
    };
    console.log(JSON.stringify(Admin));

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
          Auth.loginAdmin();
          props.history.push("/SpaceAdmin");
        } else {
          alert(body.text);
        }
        console.log(body);
      })
      .catch(err => {
        console.error(err);
        alert("error !");
      });
  };
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
              <form method="POST" action="/candidats/login" autoComplete="on">
                <MDBModalBody>
                  <MDBInput
                    type="email"
                    name="mailConnexion"
                    label="E-mail"
                    icon="envelope"
                    onChange={this.handleInputChange}
                    value={this.state.mailConnexion}
                    autoComplete="username"
                    group
                    validate
                    required
                  />

                  <MDBInput
                    type="password"
                    name="passwordConnexion"
                    icon="lock"
                    label="Mot de passe"
                    onChange={this.handleInputChange}
                    value={this.state.passwordConnexion}
                    group
                    autoComplete="current-password"
                    validate
                    required
                  />
                  <div className="options text-center text-md-right mt-1">
                    <p>
                      <a href="/" className="blue-text">
                        Mot de passe oublié ?
                      </a>
                    </p>
                  </div>
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
              </form>
            </TabPane>

            {/* Panel avec le formulaire d'inscription */}
            <TabPane tabId="2">
              <form method="POST" action="/candidats/signup" autoComplete="on">
                <MDBModalBody>
                  <MDBInput
                    type="text"
                    name="prenomInscription"
                    icon="user"
                    label="Prénom"
                    onChange={this.handleInputChange}
                    value={this.state.prenomInscription}
                    autoComplete="given-name"
                    group
                    validate
                    required
                  />

                  <MDBInput
                    type="text"
                    name="nomInscription"
                    icon="user"
                    label="Nom"
                    onChange={this.handleInputChange}
                    value={this.state.nomInscription}
                    autoComplete="family-name"
                    group
                    validate
                    required
                  />

                  <MDBInput
                    type="email"
                    name="mailInscription"
                    label="E-mail"
                    icon="envelope"
                    onChange={this.handleInputChange}
                    value={this.state.mailInscription}
                    autoComplete="email"
                    group
                    validate
                    required
                  />

                  <MDBInput
                    type="password"
                    name="passwordInscription"
                    icon="lock"
                    label="Mot de passe"
                    group
                    onChange={this.handleInputChange}
                    value={this.state.passwordInscription}
                    autoComplete="new-password"
                    validate
                    required
                  />

                  <MDBInput
                    type="password"
                    name="passwordConfirm"
                    label="Confirmation"
                    icon="lock"
                    onChange={this.handleInputChange}
                    value={this.state.passwordConfirm}
                    autoComplete="new-password"
                    group
                    validate
                    required
                  />
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
                  <button
                    type="submit"
                    className="shadow-effect btnModal blue-gradient"
                    onClick={this.SignUp}
                  >
                    S'inscrire
                  </button>
                </MDBModalFooter>
              </form>
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
              <form method="POST" action="/candidats/login" autoComplete="on">
                <MDBModalBody>
                  <MDBInput
                    type="email"
                    name="mailConnexionAdmin"
                    label="E-mail"
                    icon="envelope"
                    onChange={this.handleInputChange}
                    value={this.state.mailConnexionAdmin}
                    autoComplete="username"
                    group
                    validate
                    required
                  />

                  <MDBInput
                    type="password"
                    name="passwordConnexionAdmin"
                    icon="lock"
                    label="Mot de passe"
                    onChange={this.handleInputChange}
                    value={this.state.passwordConnexionAdmin}
                    group
                    autoComplete="current-password"
                    validate
                    required
                  />
                  <div className="options text-center text-md-right mt-1">
                    <p>
                      <a href="/" className="blue-text">
                        Mot de passe oublié ?
                      </a>
                    </p>
                  </div>
                </MDBModalBody>
                <MDBModalFooter className="ModalFooter">
                  <button
                    type="button"
                    className="shadow-effect btnModal btnInfo"
                    onClick={() => this.props.toggleAutre()}
                  >
                    Je ne suis pas un administrateur
                  </button>
                  <button
                    type="submit"
                    className="shadow-effect btnModal blue-gradient"
                    onClick={this.LoginAdmin}
                  >
                    Se connecter
                  </button>
                </MDBModalFooter>
              </form>
            </TabPane>
          </TabContent>
        </MDBModal>
      );
    }
  }
}

export default withRouter(ModalHome);
