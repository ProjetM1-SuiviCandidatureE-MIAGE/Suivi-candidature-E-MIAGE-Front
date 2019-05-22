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
      mail: "",
      validMail: false,

      validForm: false
    };
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.forgetPassword = this.forgetPassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.checkValid = this.checkValid.bind(this);
  }
  componentDidMount() {
    type = this.props.type;
  }
  //////////////////////////////////////////////////////////////
  // Fonction qui vérifie que tout le formulaire est valide
  checkValid() {
    if (this.state.validMail) {
      if (this.state.validForm === false) {
        this.setState({
          validForm: true
        });
      }
    }
  }
  /////////////////////////////////////////////
  // fonction pour vérifier le format de l'email
  validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }
  ///////////////////////////////////////////////
  // Fonction pour modifier les valeurs des inputs
  handleMailChange = event => {
    const { value } = event.target;
    if (this.validateEmail(value) === true) {
      this.setState(
        {
          mail: value,
          validMail: true
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          mail: value,
          validMail: false,
          validForm: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  //////////////////////////////////////////////////////////////////
  // Fonction pour envoyer une requête de mot de passe oublié au back
  forgetPassword() {
    if (this.state.validForm === true) {
      if (type === "candidat") {
      }
      if (type === "admin") {
      }
    } else {
      alert("Mail invalide.");
    }
  }
  ///////////////////////////////////////////////////
  // Fonction pour reset les champs à vide
  handleReset() {
    this.setState({
      mail: "",
      validMail: false
    });
    this.props.toggle();
  }
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
          <p
            style={{
              fontSize: "20px",
              fontStyle: "oblique",
              fontWeight: "400",
              marginBottom: "3em"
            }}
          >
            Saississez l'adresse mail de votre compte pour qu'un mail de
            réinitialisation de votre mot de passe vous soit envoyé.
          </p>
          <MDBInput
            label="Adresse mail de votre compte"
            icon="envelope"
            type="mail"
            name="mail"
            style={{
              border: "none",
              borderBottom: "1px solid #ced4da"
            }}
            onChange={this.handleMailChange}
            value={this.state.mail}
            autoComplete="username"
            required
          />
          <br />
          <br />
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
            Envoyer
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}
