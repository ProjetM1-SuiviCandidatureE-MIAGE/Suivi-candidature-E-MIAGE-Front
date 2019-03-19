import React, { Component } from "react";
import {
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from "mdbreact";
import "./InformationForm.css";

// Le composant qui créé le formulaire avec les informations de la personne connectée
export default class InformationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prenom: "",
      nom: "",
      mail: ""
    };
  }
  // Fonction qui retourne le html du composant
  render() {
    return (
      <MDBCard className="shadow-box-example z-depth-4 CardPerso mx-auto">
        <MDBCardTitle className="font-weight-bold mb-3 mx-auto CardTitle">
          Votre Profil
        </MDBCardTitle>
        <MDBCardBody className="CardBody">
          <MDBInput label="Prénom" icon="user" />
          <MDBInput label="Nom" icon="user" />
          <MDBInput label="Mail" icon="envelope" />
          <MDBInput label="Nouveau mot de passe" icon="lock" />
          <MDBInput label="Confirmation" icon="lock" />
        </MDBCardBody>
        <MDBCardText className="CardText">
          <MDBBtn
            outline
            color="primary"
            size="lg"
            className="CloseButton"
            onClick={() => this.props.toggle()}
          >
            Fermer
          </MDBBtn>
          <MDBBtn
            color="primary"
            size="lg"
            className="SaveButton"
            onClick={() => this.props.toggle()}
          >
            Sauvegarder
          </MDBBtn>
        </MDBCardText>
      </MDBCard>
    );
  }
}
