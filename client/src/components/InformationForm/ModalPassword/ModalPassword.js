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

let type = "";
let getUser = "";

// La classe du modal pour modifier le mot de passe dans son espace
export default class ModalPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      newPassword: "",
      newPasswordConfirm: "",

      validPassword: true,
      validNewPassword: false,
      validNewPasswordConfirm: false,

      validForm: false
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleNewPasswordConfirmChange = this.handleNewPasswordConfirmChange.bind(
      this
    );
    this.handleReset = this.handleReset.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkValid = this.checkValid.bind(this);
  }
  componentDidMount() {
    type = this.props.type;
    getUser = this.props.get;
    console.log("type : " + type);
  }
  // Fonction qui vérifie que tout le formulaire est valide
  checkValid() {
    if (
      this.state.validPassword &&
      this.state.validNewPassword &&
      this.state.validNewPasswordConfirm
    ) {
      if (this.state.newPassword === this.state.newPasswordConfirm) {
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
  // Fonction pour modifier les valeurs du password
  handlePasswordChange = event => {
    const { value } = event.target;
    if (this.checkPassword(value) === true) {
      this.setState(
        {
          password: value,
          validPassword: true
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          password: value,
          validPassword: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  // Fonction pour modifier les valeurs du nouveau password
  handleNewPasswordChange = event => {
    const { value } = event.target;
    if (this.checkPassword(value) === true) {
      this.setState(
        {
          newPassword: value,
          validNewPassword: true
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          newPassword: value,
          validNewPassword: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  // Fonction pour modifier les valeurs du nouveau password de confirmation
  handleNewPasswordConfirmChange = event => {
    const { value } = event.target;
    if (this.checkPassword(value) === true) {
      this.setState(
        {
          newPasswordConfirm: value,
          validNewPasswordConfirm: true
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          newPasswordConfirm: value,
          validNewPasswordConfirm: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  // Fonction regex pour valider un mot de passe de plus de 8 caractères
  checkPassword(mdp) {
    const regex = /^.{8,}$/;
    return regex.test(mdp);
  }
  // Fonction pour faire une requête au back pour modifier le mdp
  passwordChange() {
    if (this.state.validForm === true) {
      const User = getUser();
      if (type === "candidat") {
        fetch("/candidats/editPassword/" + User.id, {
          method: "PUT",
          body: JSON.stringify({
            password: this.state.password,
            newPassword: this.state.newPassword
          }),
          headers: { "Content-Type": "application/json" }
        })
          .then(function(response) {
            return response;
          })
          .then(function(body) {
            console.log(body.status);
            if (body.status === 200) {
              fetch("/mail/send", {
                method: "POST",
                body: JSON.stringify({
                  mail: User.mail,
                  sujet: "Confirmation modification de votre mot de passe",
                  texte:
                    "Bonjour " +
                    User.prenom +
                    " " +
                    User.nom +
                    ",<br /> votre mot de passe a bien été modifié depuis votre profil.<br /><br />Cordialement"
                }),
                headers: { "Content-Type": "application/json" }
              })
                .then(function(response) {
                  return response;
                })
                .then(function(body) {
                  alert("Vous allez recevoir un mail de confirmation.");
                });
            } else {
              alert("erreur.");
            }
          });
      }
      if (type === "admin") {
        fetch("/admins/editPassword/" + User.id, {
          method: "PUT",
          body: JSON.stringify({
            password: this.state.password,
            newPassword: this.state.newPassword
          }),
          headers: { "Content-Type": "application/json" }
        })
          .then(function(response) {
            return response;
          })
          .then(function(body) {
            if (body.status === 200) {
              fetch("/mail/send", {
                method: "POST",
                body: JSON.stringify({
                  mail: User.mail,
                  sujet: "Confirmation modification de votre mot de passe",
                  texte:
                    "Bonjour " +
                    User.prenom +
                    " " +
                    User.nom +
                    ",<br /> votre mot de passe a bien été modifié depuis votre profil.<br /><br />Cordialement"
                }),
                headers: { "Content-Type": "application/json" }
              })
                .then(function(response) {
                  return response;
                })
                .then(function(body) {
                  alert("Vous allez recevoir un mail de confirmation.");
                });
            } else {
              alert("erreur.");
            }
          });
      }
      this.handleReset();
    } else {
      alert("formulaire non valide.");
    }
  }
  // Fonction pour reset les champs à vide
  handleReset() {
    this.setState({
      password: "",
      newPassword: "",
      newPasswordConfirm: "",

      validNewPassword: false,
      validNewPasswordConfirm: false,

      validForm: false
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
          <MDBIcon icon="lock" /> Modification du mot de passe
        </MDBModalHeader>
        <MDBModalBody>
          <form>
            <MDBInput
              label="Mot de passe actuel"
              icon="lock"
              type="password"
              name="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              autoComplete="current-password"
            />
            <MDBInput
              label="Nouveau mot de passe"
              icon="lock"
              type="password"
              name="newPassword"
              onChange={this.handleNewPasswordChange}
              value={this.state.newPassword}
              autoComplete="new-password"
            />
            <MDBInput
              label="Confirmation"
              icon="lock"
              type="password"
              name="newPasswordConfirm"
              onChange={this.handleNewPasswordConfirmChange}
              value={this.state.newPasswordConfirm}
              autoComplete="new-password"
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
            onClick={this.passwordChange}
            disabled={!this.state.validForm}
          >
            Sauvegarder
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}
