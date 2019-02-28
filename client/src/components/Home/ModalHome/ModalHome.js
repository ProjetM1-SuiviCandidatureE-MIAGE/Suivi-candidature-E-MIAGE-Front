import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
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

    this.state = {};
  }

  render() {
    // Modal pour accéder à l'espace candidat
    if (this.props.inscription === "true") {
      return (
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.props.toggle()}
          id="modalLRForm"
          tabIndex="-1"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog cascading-modal" role="document">
            <div className="modal-content">
              <div className="modal-c-tabs">
                <Nav
                  className="nav-tabs md-tabs tabs-2 light-blue darken-3"
                  role="tablist"
                >
                  <NavItem>
                    <NavLink active data-toggle="tab" href="#panel7" role="tab">
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

                <div class="tab-content">
                  {/* Panel avec le formulaire de connexion */}
                  <div
                    className="tab-pane fade in show active"
                    id="panel7"
                    role="tabpanel"
                  >
                    <ModalBody>
                      <Form>
                        <FormGroup className="md-form form-sm mb-5">
                          <i className="fa fa-envelope prefix" />
                          <Input
                            type="email"
                            id="emailConnexion"
                            className="form-control form-control-sm validate"
                          />
                          <Label
                            data-error="wrong"
                            data-success="right"
                            htmlFor="emailConnexion"
                          >
                            E-mail
                          </Label>
                        </FormGroup>

                        <FormGroup className="md-form form-sm mb-4">
                          <i className="fa fa-lock prefix" />
                          <Input
                            type="password"
                            id="passwordConnexion"
                            class="form-control form-control-sm validate"
                          />
                          <Label
                            data-error="wrong"
                            data-success="right"
                            htmlFor="passwordConnexion"
                          >
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
                      <Button outline color="info" className="shadow-effect">
                        Je ne suis pas un candidat
                      </Button>
                      <Button color="info" className="shadow-effect">
                        Se connecter <i className="fa fa-sign-in" />
                      </Button>
                    </ModalFooter>
                  </div>

                  {/* Panel avec le formulaire d'inscription */}
                  <div className="tab-pane fade" id="panel8" role="tabpanel">
                    <ModalBody>
                      <div class="md-form form-sm mb-5">
                        <i className="fa fa-envelope prefix" />
                        <Input
                          type="email"
                          id="modalLRInput12"
                          className="form-control form-control-sm validate"
                        />
                        <Label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="modalLRInput12"
                        >
                          E-mail
                        </Label>
                      </div>

                      <FormGroup className="md-form form-sm mb-5">
                        <i className="fa fa-lock prefix" />
                        <Input
                          type="password"
                          id="modalLRInput13"
                          className="form-control form-control-sm validate"
                        />
                        <Label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="modalLRInput13"
                        >
                          Mot de passe
                        </Label>
                      </FormGroup>

                      <FormGroup className="md-form form-sm mb-4">
                        <i className="fa fa-lock prefix" />
                        <Input
                          type="password"
                          id="modalLRInput14"
                          className="form-control form-control-sm validate"
                        />
                        <Label
                          data-error="wrong"
                          data-success="right"
                          htmlFor="modalLRInput14"
                        >
                          Confirmation mot de passe
                        </Label>
                      </FormGroup>
                    </ModalBody>
                    {/* Footer du modal des candidats */}
                    <ModalFooter>
                      <Button outline color="info" className="shadow-effect">
                        Je ne suis pas un candidat
                      </Button>
                      <Button color="info" className="shadow-effect">
                        S'inscrire
                      </Button>
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
