import React, { Component } from "react";
import {
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon
} from "mdbreact";
import "../../Home/ModalHome/ModalHome.css";
import Tooltip from "@material-ui/core/Tooltip";

let props = "";

export default class ModalSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prenomInscription: "",
      nomInscription: "",
      mailInscription: "",
      passwordInscription: "",
      passwordConfirm: "",

      prenomInscriptionValid: false,
      nomInscriptionValid: false,
      mailInscriptionValid: false,
      passwordInscriptionValid: false,
      passwordConfirmValid: false,

      validForm: false
    };
    this.SignUp = this.SignUp.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  // Fonction qui se lance à la création du composant pour récupèrer les props et les stocker
  componentDidMount() {
    props = this.props;
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
      const Admin = {
        nom: this.state.nomInscription,
        prenom: this.state.prenomInscription,
        mail: this.state.mailInscription,
        mdp: this.state.passwordInscription,
        mdpConfirmation: this.state.passwordConfirm
      };
      fetch("/admins/signup", {
        method: "POST",
        body: JSON.stringify(Admin),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response;
        })
        .then(function(body) {
          if (body.status === 200) {
            const User = {
              prenom: Admin.prenom,
              nom: Admin.nom,
              mail: Admin.mail,
              token: body.token,
              id: body.id
            };
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
                  ",<br />La création de votre compte est achevée, vous pouvez dès à présent vous connecter dans votre espace enseigant.<br /><br />Cordialement"
              }),
              headers: { "Content-Type": "application/json" }
            })
              .then(function(response) {
                return response;
              })
              .then(function(body) {
                alert("Inscription terminée.");
                props.toggle();
              });
          }
          if (body.status === 204) {
            alert("L'adresse mail existe déjà.");
          }
          if (body.status === 500) {
            alert("Erreur interne.");
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
  // Fonction qui retourne le code html du composant
  // Le render est appelé à chaque fois que l'état du composant change
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
          <MDBIcon icon="user-plus" /> Inscription
        </MDBModalHeader>
        {/* Panel avec le formulaire d'inscription */}
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
        <MDBModalFooter className="ModalFooter">
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
                Confirmer
              </button>
            </span>
          </Tooltip>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}
