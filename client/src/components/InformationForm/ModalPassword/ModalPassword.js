import React, { Component } from "react";
import "./ModalPassword.css";
import {
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
  MDBBtn
} from "mdbreact";

let toggle = "";
// La classe du modal pour modifier le mot de passe dans son espace
export default class ModalPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      newPassword: "",
      newPasswordConfirm: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // Fonction qui se lance à la création du composant pour récupèrer les props et les stocker
  componentDidMount() {
    toggle = this.props.toggle;
  }
  // Fonction pour modifier les valeurs des inputs
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
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
          <MDBIcon icon="lock" /> Modification du mot de passe
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label="Mot de passe actuel"
            icon="lock"
            type="password"
            name="password"
            onChange={this.handleInputChange}
            value={this.state.password}
            autoComplete="current-password"
          />
          <MDBInput
            label="Nouveau mot de passe"
            icon="lock"
            type="password"
            name="newPassword"
            onChange={this.handleInputChange}
            value={this.state.newPassword}
            autoComplete="new-password"
          />
          <MDBInput
            label="Confirmation"
            icon="lock"
            type="password"
            name="newPasswordConfirm"
            onChange={this.handleInputChange}
            value={this.state.newPasswordConfirm}
            autoComplete="off"
          />
        </MDBModalBody>
        <MDBModalFooter className="ModalFooter">
          <MDBBtn
            outline
            color="primary"
            className="CloseButton"
            onClick={() => this.props.toggle()}
          >
            Fermer
          </MDBBtn>
          <MDBBtn
            color="primary"
            className="SaveButton"
            onClick={() => this.props.toggle()}
          >
            Sauvegarder
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}
