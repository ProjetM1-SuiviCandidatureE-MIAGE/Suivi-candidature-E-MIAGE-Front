import React, { Component } from "react";
import {
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import "./InformationForm.css";
import ModalPassword from "./ModalPassword/ModalPassword";
import SnackBar from "../SnackBar/MySnackBar";

let getUser = "";
let setUser = "";
let type = "";

// Le composant qui créé le formulaire avec les informations de la personne connectée
export default class InformationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validForm: false,
      validMail: false,
      validPrenom: false,
      validNom: false,

      prenom: "",
      nom: "",
      mail: "",

      newPrenom: "",
      newNom: "",
      newMail: "",

      isOpen: false,
      loadEnd: false,
      openSnackBar: false
    };
    this.openModal = this.openModal.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.changeInfos = this.changeInfos.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.changeSnackBar = this.changeSnackBar.bind(this);
  }
  // Fonction qui s'éxecute à la création du composant
  componentDidMount() {
    getUser = this.props.get;
    setUser = this.props.set;
    type = this.props.type;

    const User = getUser();

    this.setState({
      validForm: false,
      validMail: true,
      validPrenom: true,
      validNom: true,

      prenom: User.prenom,
      nom: User.nom,
      mail: User.mail,

      newPrenom: User.prenom,
      newNom: User.nom,
      newMail: User.mail,

      loadEnd: true
    });
  }
  ////////////////////////////////////////////////////////////
  ///// Fonction pour ouvrir le snackBar après la sauvegarde de la candidature
  changeSnackBar(boolean) {
    this.setState({
      openSnackBar: boolean
    });
  }
  // Fonction qui vérifie que tout le formulaire est valide
  checkValid() {
    if (this.state.validMail && this.state.validPrenom && this.state.validNom) {
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
  /////////////////////////////////////////////
  // fonction pour vérifier le format du nom et prénom
  validateName(name) {
    const regex = /^[a-zA-Zéèàêùîô ]{2,}$/;
    return regex.test(String(name).toLowerCase());
  }
  ////////////////////////////////////////////////
  // Fonction pour modifier le mail
  handleEmailChange = event => {
    const { value } = event.target;
    if (this.validateEmail(value) === true) {
      this.setState(
        {
          newMail: value,
          validMail: true
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          newMail: value,
          validMail: false,
          validForm: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  ////////////////////////////////////////////////
  // Fonction pour modifier le prénom
  handleFirstNameChange = event => {
    const { value } = event.target;
    this.checkValid();
    if (this.validateName(value) === true) {
      this.setState(
        {
          newPrenom: value,
          validPrenom: true
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          newPrenom: value,
          validPrenom: false,
          validForm: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  ////////////////////////////////////////////////
  // Fonction pour modifier le nom
  handleNameChange = event => {
    const { value } = event.target;
    this.checkValid();
    if (this.validateName(value) === true) {
      this.setState(
        {
          newNom: value,
          validNom: true
        },
        this.checkValid
      );
    } else {
      this.setState(
        {
          newNom: value,
          validNom: false,
          validForm: false
        },
        this.checkValid
      );
    }
    this.checkValid();
  };
  //////////////////////////////////////////////////////////////
  // Fonction pour ouvrir le modal de modification du mot de passe
  openModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  ////////////////////////////////////////////////////////////
  //// Fonction pour envoyer les modifications en base de données
  changeInfos() {
    const User = getUser();
    const self = this;
    if (this.state.validMail === true) {
      if (type === "candidat") {
        fetch("/candidats/editCandidat/" + User.id, {
          method: "PUT",
          body: JSON.stringify({
            mail: this.state.newMail,
            prenom: this.state.newPrenom,
            nom: this.state.newNom
          }),
          headers: { "Content-Type": "application/json" }
        })
          .then(function(response) {
            return response;
          })
          .then(function(body) {
            fetch("/mail/send", {
              method: "POST",
              body: JSON.stringify({
                mail: User.mail,
                sujet: "Confirmation de la modification de vos données",
                texte:
                  "Bonjour " +
                  User.prenom +
                  " " +
                  User.nom +
                  ",<br /> vos données personnelles ont bien été modifié.<br /><br />Cordialement"
              }),
              headers: { "Content-Type": "application/json" }
            })
              .then(function(response) {
                return response;
              })
              .then(function(body) {
                self.changeSnackBar(true);
                const replaceUser = {
                  id: User.id,
                  mail: self.state.newMail,
                  prenom: self.state.newPrenom,
                  nom: self.state.newNom
                };
                setUser(replaceUser);

                self.setState({
                  validMail: true,

                  prenom: replaceUser.prenom,
                  nom: replaceUser.nom,
                  mail: replaceUser.mail,

                  newPrenom: replaceUser.prenom,
                  newNom: replaceUser.nom,
                  newMail: replaceUser.mail
                });
              });
          });
      }

      if (type === "admin") {
        fetch("/admins/editAdmin/" + User.id, {
          method: "PUT",
          body: JSON.stringify({
            mail: this.state.newMail,
            prenom: this.state.newPrenom,
            nom: this.state.newNom
          }),
          headers: { "Content-Type": "application/json" }
        })
          .then(function(response) {
            return response;
          })
          .then(function(body) {
            fetch("/mail/send", {
              method: "POST",
              body: JSON.stringify({
                mail: User.mail,
                sujet: "Confirmation de la modification de vos données",
                texte:
                  "Bonjour " +
                  User.prenom +
                  " " +
                  User.nom +
                  ",<br /> vos données personnelles ont bien été modifié.<br /><br />Cordialement"
              }),
              headers: { "Content-Type": "application/json" }
            })
              .then(function(response) {
                return response;
              })
              .then(function(body) {
                self.changeSnackBar(true);
                const replaceUser = {
                  id: User.id,
                  mail: self.state.newMail,
                  prenom: self.state.newPrenom,
                  nom: self.state.newNom
                };
                setUser(replaceUser);

                self.setState({
                  validMail: true,

                  prenom: replaceUser.prenom,
                  nom: replaceUser.nom,
                  mail: replaceUser.mail,

                  newPrenom: replaceUser.prenom,
                  newNom: replaceUser.nom,
                  newMail: replaceUser.mail
                });
              });
          });
      }
    } else {
      alert("email non valide.");
    }
  }
  //// Fonction pour chargé le composant fils quand celui-ci a fini de chargé
  renderPasswordModal(bool) {
    if (bool === true) {
      return (
        <ModalPassword
          isOpen={this.state.isOpen}
          toggle={this.openModal}
          type={type}
          get={getUser}
        />
      );
    } else {
      return <div />;
    }
  }
  // Fonction qui retourne le html du composant
  render() {
    return (
      <MDBCard className="shadow-box-example z-depth-4 CardPerso mx-auto">
        <MDBCardTitle className="font-weight-bold mb-3 mx-auto CardTitle">
          Votre Profil
        </MDBCardTitle>
        <MDBCardBody className="CardBody">
          <MDBInput
            label="Prénom"
            icon="user"
            type="text"
            name="newPrenom"
            onChange={this.handleFirstNameChange}
            value={this.state.newPrenom}
            autoComplete="off"
          />
          <MDBInput
            label="Nom"
            icon="user"
            type="text"
            name="newNom"
            onChange={this.handleNameChange}
            value={this.state.newNom}
            autoComplete="off"
          />
          <MDBInput
            label="Mail"
            icon="envelope"
            type="email"
            name="newMail"
            onChange={this.handleEmailChange}
            value={this.state.newMail}
            autoComplete="new-password"
          />
          <div className="options text-center mt-1">
            <p>
              <button
                className="blue-text buttonLinkable"
                onClick={this.openModal}
              >
                <MDBIcon icon="lock" /> Modifier mon mot de passe
              </button>
            </p>
          </div>
          {this.renderPasswordModal(this.state.loadEnd)}
        </MDBCardBody>
        <MDBCardText className="CardText">
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
            onClick={this.changeInfos}
            disabled={!this.state.validForm}
          >
            Sauvegarder
          </MDBBtn>
          <SnackBar
            message={"Informations modifées."}
            open={this.state.openSnackBar}
            close={item => this.changeSnackBar(item)}
          />
        </MDBCardText>
      </MDBCard>
    );
  }
}
