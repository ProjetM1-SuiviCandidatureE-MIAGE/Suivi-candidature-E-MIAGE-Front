import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
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
      passwordConfirm: ""
    };
  }

  render() {
    // Modal pour accéder à l'espace candidat
    if (this.props.inscription === "true") {
      return (
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.props.toggle()}
          id="modalLRForm"
        >
          <div className="cascading-modal" role="document">
            <div className="modal-content">
              <div className="modal-c-tabs">
                <ModalHeader
                  toggle={() => this.props.toggle()}
                  className="modalHeader"
                >
                  <Nav
                    className="nav-tabs md-tabs tabs-2 light-blue darken-3"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        active
                        data-toggle="tab"
                        href="#panel7"
                        role="tab"
                      >
                        <i className="fa fa-user" />
                        Se connecter
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink data-toggle="tab" href="#panel8" role="tab">
                        <i className="fa fa-user-plus" />
                        S'inscrire
                      </NavLink>
                    </NavItem>
                  </Nav>
                </ModalHeader>

                <div className="tab-content">
                  {/* Panel avec le formulaire de connexion */}
                  <div
                    className="tab-pane fade in show active"
                    id="panel7"
                    role="tabpanel"
                  >
                    <ModalBody>
                      <Form autoComplete="on">
                        <FormGroup className="md-form form-sm mb-5">
                          <i className="fa fa-envelope prefix" />
                          <Input
                            type="email"
                            id="emailConnexion"
                            className="form-control form-control-sm validate"
                            autoComplete="on"
                            required
                          />
                          <Label htmlFor="emailConnexion">E-mail</Label>
                        </FormGroup>

                        <FormGroup className="md-form form-sm mb-4">
                          <i className="fa fa-lock prefix" />
                          <Input
                            type="password"
                            id="passwordConnexion"
                            autoComplete="on"
                            className="form-control form-control-sm validate"
                            required
                          />
                          <Label htmlFor="passwordConnexion">
                            Mot de passe
                          </Label>
                        </FormGroup>
                      </Form>
                      <div className="options text-center text-md-right mt-1">
                        <p>
                          <a href="/" className="blue-text">
                            Mot de passe oublié ?
                          </a>
                        </p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className="shadow-effect btnModal btnInfo"
                        onClick={() => this.props.toggle()}
                      >
                        Je ne suis pas un candidat
                      </button>
                      <button className="shadow-effect btnModal blue-gradient">
                        Se connecter
                      </button>
                    </ModalFooter>
                  </div>

                  {/* Panel avec le formulaire d'inscription */}
                  <div className="tab-pane fade" id="panel8" role="tabpanel">
                    <ModalBody>
                      <Form autoComplete="on">
                        <FormGroup className="md-form form-sm mb-5">
                          <i className="fa fa-user" />
                          <Input
                            type="text"
                            id="prenomInscription"
                            autoComplete="on"
                            className="form-control form-control-sm validate"
                            required
                          />
                          <Label htmlFor="prenomInscription">Prénom</Label>
                        </FormGroup>
                        <FormGroup className="md-form form-sm mb-5">
                          <i className="fa fa-user" />
                          <Input
                            type="text"
                            id="nomInscription"
                            autoComplete="on"
                            className="form-control form-control-sm validate"
                            required
                          />
                          <Label htmlFor="nomInscription">Nom</Label>
                        </FormGroup>
                        <FormGroup className="md-form form-sm mb-5">
                          <i className="fa fa-envelope prefix" />
                          <Input
                            type="email"
                            id="mailInscription"
                            autoComplete="on"
                            className="form-control form-control-sm validate"
                            required
                          />
                          <Label htmlFor="mailInscription">E-mail</Label>
                        </FormGroup>

                        <FormGroup className="md-form form-sm mb-5">
                          <i className="fa fa-lock prefix" />
                          <Input
                            type="password"
                            id="passwordInscription"
                            autoComplete="on"
                            className="form-control form-control-sm validate"
                            required
                          />
                          <Label htmlFor="passwordInscription">
                            Mot de passe
                          </Label>
                        </FormGroup>

                        <FormGroup className="md-form form-sm mb-4">
                          <i className="fa fa-lock prefix" />
                          <Input
                            type="password"
                            id="passwordConfirm"
                            className="form-control form-control-sm validate"
                            required
                          />
                          <Label htmlFor="passwordConfirm">Confirmation</Label>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    {/* Footer du modal des candidats */}
                    <ModalFooter>
                      <button
                        className="shadow-effect btnModal btnInfo"
                        onClick={() => this.props.toggle()}
                      >
                        Je ne suis pas un candidat
                      </button>
                      <button className="shadow-effect btnModal blue-gradient">
                        S'inscrire
                      </button>
                    </ModalFooter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      );
    }
    // Modal pour accéder à l'espace admin
    if (this.props.inscription === "false") {
      return (
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.props.toggle()}
          id="modalLRForm"
          tabindex="-1"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <ModalHeader toggle={() => this.props.toggle()}>
            Coucou header
          </ModalHeader>
          <ModalBody>Coucou body</ModalBody>
        </Modal>
      );
    }
  }
}
