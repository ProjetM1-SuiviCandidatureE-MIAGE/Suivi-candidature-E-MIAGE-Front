import React, { Component } from "react";
import {
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
  MDBBtn
} from "mdbreact";

let type = "";

// La classe du modal pour mot de passe oublié dans le modal de connexion
export default class ModalForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    type = this.props;
    console.log(type);
  }
  // Fonction pour modifier les valeurs des inputs
  handleInputChange = event => {
    const { value } = event.target;
    this.setState({
      mail: value
    });
  };
  // Fonction qui affiche le code HTML du composant
  render() {
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
          <MDBIcon icon="lock" /> Mot de passe oublié
        </MDBModalHeader>
        <MDBModalBody>
          <form>
            <MDBInput
              label="Adresse mail de votre compte"
              icon="envelop"
              type="mail"
              name="mail"
              onChange={this.handleMailChange}
              value={this.state.mail}
              autoComplete="mail"
            />
          </form>
        </MDBModalBody>
        <MDBModalFooter className="ModalFooter">
          <MDBBtn
            outline
            color="primary"
            className="CloseButton"
            onClick={this.handleReset}
          >
            Fermer
          </MDBBtn>
          <MDBBtn
            color="primary"
            className="SaveButton"
            onClick={this.forgetPassword}
            disabled={!this.state.validForm}
          >
            Sauvegarder
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}
