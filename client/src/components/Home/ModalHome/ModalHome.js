import React, { Component } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon
} from "mdbreact";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import "./ModalHome.css";

export default class ModalHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        console.log(body);
      })
      .catch(err => {
        console.error(err);
        alert("Error sign up please try again");
      });
  };
  // Fonction pour se connecter
  Login = event => {
    event.preventDefault();
    const Candidat = {
      mail: this.state.mailConnexion,
      mdp: this.state.passwordConnexion
    };
    alert("Authentication coming soon!");
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
        console.log(body);
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

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
              <form method="POST" action="/candidats/login" autoComplete>
                <MDBModalBody>
                  <MDBInput
                    type="email"
                    name="mailConnexion"
                    label="E-mail"
                    icon="envelope"
                    onChange={this.handleInputChange}
                    value={this.state.mailConnexion}
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
                    className="shadow-effect btnModal btnInfo"
                    onClick={() => this.props.toggle()}
                  >
                    Je ne suis pas un candidat
                  </button>
                  <button
                    type="submit"
                    className="shadow-effect btnModal blue-gradient"
                    onClick={this.Login}
                  >
                    Se connecter
                  </button>
                </MDBModalFooter>
              </form>
            </TabPane>

            {/* Panel avec le formulaire d'inscription */}
            <TabPane tabId="2">
              <form method="POST" action="/candidats/signup" autoComplete>
                <MDBModalBody>
                  <MDBInput
                    type="text"
                    name="prenomInscription"
                    icon="user"
                    label="Prénom"
                    onChange={this.handleInputChange}
                    value={this.state.prenomInscription}
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
                    group
                    validate
                    required
                  />
                </MDBModalBody>
                {/* Footer du modal des candidats */}
                <MDBModalFooter className="ModalFooter">
                  <button
                    className="shadow-effect btnModal btnInfo"
                    onClick={() => this.props.toggle()}
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
          cascading
        >
          <MDBModalHeader
            toggle={() => this.props.toggle()}
            titleClass="d-inline title"
            className="text-center light-blue darken-3 white-text"
          >
            <MDBIcon icon="pencil-alt" className="whiteCol" /> Contact From
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput label="Your name" icon="user" />
            <MDBInput
              label="Your email"
              iconClass="dark-grey"
              icon="envelope"
            />
            <MDBInput
              label="Your message"
              type="textarea"
              rows="2"
              icon="pencil-alt"
              iconClass="dark-grey"
            />
            <div className="text-center mt-1-half">
              <MDBBtn
                color="info"
                className="mb-2"
                onClick={() => this.props.toggle()}
              >
                send
                <MDBIcon icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </MDBModalBody>
        </MDBModal>
      );
    }
  }
}
