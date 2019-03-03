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
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

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
                <MDBInput
                  type="email"
                  id="emailConnexion"
                  label="E-mail"
                  icon="envelope"
                  group
                  validate
                />

                <MDBInput
                  type="password"
                  id="passwordConnexion"
                  icon="lock"
                  label="Mot de passe"
                  group
                  validate
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
                <button className="shadow-effect btnModal blue-gradient">
                  Se connecter
                </button>
              </MDBModalFooter>
            </TabPane>

            {/* Panel avec le formulaire d'inscription */}
            <TabPane tabId="2">
              <MDBModalBody>
                <MDBInput
                  type="text"
                  id="prenomInscription"
                  icon="user"
                  label="Prénom"
                  group
                  validate
                />

                <MDBInput
                  type="text"
                  id="nomInscription"
                  icon="user"
                  label="Nom"
                  group
                  validate
                />

                <MDBInput
                  type="email"
                  id="mailInscription"
                  label="E-mail"
                  icon="envelope"
                  group
                  validate
                />

                <MDBInput
                  type="password"
                  id="passwordInscription"
                  icon="lock"
                  label="Mot de passe"
                  group
                  validate
                />

                <MDBInput
                  type="password"
                  id="passwordConfirm"
                  label="Confirmation"
                  icon="lock"
                  group
                  validate
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
                <button className="shadow-effect btnModal blue-gradient">
                  S'inscrire
                </button>
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
