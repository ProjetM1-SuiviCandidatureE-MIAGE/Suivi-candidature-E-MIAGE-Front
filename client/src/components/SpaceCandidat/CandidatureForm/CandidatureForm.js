import React, { Component } from "react";
/* import "./CandidatureForm.css"; */
import {
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

const maxFiles = 5;

// Le formulaire de création d'une candidature
class CandidatureForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statut: "",
      date: "",
      files: "",
      candidat: {
        firstName: "Damien",
        name: "DONNADIEU",
        email: "ddonnadieu@gmail.com"
      }
    };
    // On bind toutes les fonctions qui vont utiliser le this.state
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetForm = this.handleResetForm.bind(this);
  }

  // Méthode pour changer le prénom dans l'MDBInput
  handleFirstnameChange(e) {
    const value = e.target.value;
    this.setState(state => {
      return {
        candidat: {
          ...state.candidat,
          firstName: value
        }
      };
    });
  }
  // Méthode pour changer le nom dans l'MDBInput
  handleNameChange(e) {
    const value = e.target.value;
    this.setState(state => {
      return {
        candidat: {
          ...state.candidat,
          name: value
        }
      };
    });
  }
  // Méthode pour changer le mail dans l'MDBInput
  handleEmailChange(e) {
    const value = e.target.value;
    this.setState(state => {
      return {
        candidat: {
          ...state.candidat,
          email: value
        }
      };
    });
  }
  // Méthode pour envoyer les informations du formulaire en BDD
  handleSubmit(e) {
    e.preventDefault();
    fetch("/candidatures/newCandidature", {
      method: "POST",
      body: JSON.stringify({
        etat: "non traitée",
        commentaire: "",
        date: new Date(),
        candidat: {
          nom: this.state.candidat.name,
          prenom: this.state.candidat.firstName,
          mail: this.state.candidat.email,
          mdp: ""
        }
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
    this.handleResetForm(e);
    this.props.toggle();
  }
  // Méthode pour reset le formulaire avec aucunes valeurs
  handleResetForm(e) {
    e.preventDefault();
    this.setState({
      statut: "",
      date: "",

      Candidat: {
        firstName: "",
        name: "",
        email: ""
      }
    });
    this.props.toggle();
  }
  handleInit() {
    console.log("FilePond créé", this.pond);
  }
  // La fonction qui permet d'afficher le code html du composant CandidatureForm donc le formulaire
  render() {
    return (
      <MDBCard className="shadow-box-example z-depth-4 CardPerso mx-auto">
        <MDBCardTitle className="font-weight-bold mb-3 mx-auto CardTitle">
          Créer votre candidature
        </MDBCardTitle>
        <form
          method="POST"
          action="/candidatures/newCandidature"
          className="candidatureForm"
          autoComplete="new-password"
        >
          <MDBCardBody className="CardBody">
            <MDBInput
              className="MDBInputText"
              type="text"
              name="firstName"
              label="Prénom"
              icon="user"
              value={this.state.candidat.firstName}
              onChange={this.handleFirstnameChange}
              required
              autoComplete="new-password"
            />
            <MDBInput
              className="MDBInputText"
              type="text"
              name="name"
              label="Nom"
              icon="user"
              value={this.state.candidat.name}
              onChange={this.handleNameChange}
              required
              autoComplete="new-password"
            />
            <MDBInput
              className="MDBInputText"
              type="text"
              name="email"
              label="Mail professionnel"
              icon="envelope"
              value={this.state.candidat.email}
              onChange={this.handleEmailChange}
              required
              autoComplete="new-password"
            />
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> CV, lettre
            de motivation et autres fichiers (max {maxFiles} fichiers){" "}
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" />
            <FilePond
              ref={ref => (this.pond = ref)}
              files={this.state.files}
              allowMultiple={true}
              maxFiles={maxFiles}
              oninit={() => this.handleInit()}
              labelIdle={"Glissez et déposez vos fichiers ici"}
              server="/files/"
              onupdatefiles={fileItems => {
                this.setState(
                  {
                    files: fileItems.map(fileItem => fileItem.file)
                  },
                  console.log(this.state.files)
                );
              }}
            />
          </MDBCardBody>
          <MDBCardText className="CardText">
            <MDBBtn
              type="submit"
              outline
              color="primary"
              size="lg"
              className="CloseButton"
              onClick={this.handleResetForm}
            >
              Annuler
            </MDBBtn>
            <MDBBtn
              type="submit"
              color="primary"
              size="lg"
              className="SaveButton"
              onClick={this.handleSubmit}
            >
              Envoyer
            </MDBBtn>
          </MDBCardText>
        </form>
      </MDBCard>
    );
  }
}
export default CandidatureForm;
