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

var propsUSer = "";

// Le composant qui créé le formulaire avec les informations de la personne connectée
export default class InformationForm extends Component {
  constructor(props) {
    super(props);
    propsUSer = this.props.props.user;

    this.state = {
      prenom: "",
      nom: "",
      mail: "",
      password: "",

      newPrenom: "",
      newNom: "",
      newMail: "",
      newPassword: "",
      newPasswordConfirm: ""
    };
  }
  // Fonction qui s'éxecute à la création du composant
  componentDidMount() {
    this.setState({
      prenom: propsUSer.prenom,
      nom: propsUSer.nom,
      mail: propsUSer.mail,

      newPrenom: propsUSer.prenom,
      newNom: propsUSer.nom,
      newMail: propsUSer.mail
    });
  }
  // Fonction pour modifier les valeurs des inputs
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  // Fonction qui retourne le html du composant
  render() {
    return (
      <MDBCard className="shadow-box-example z-depth-4 CardPerso mx-auto">
        <MDBCardTitle className="font-weight-bold mb-3 mx-auto CardTitle">
          Votre Profil
        </MDBCardTitle>
        <form method="POST" autoComplete="new-password">
          <MDBCardBody className="CardBody">
            <MDBInput
              label="Prénom"
              icon="user"
              type="text"
              name="newPrenom"
              onChange={this.handleInputChange}
              value={this.state.newPrenom}
              autoComplete="off"
            />
            <MDBInput
              label="Nom"
              icon="user"
              type="text"
              name="newNom"
              onChange={this.handleInputChange}
              value={this.state.newNom}
              autoComplete="off"
            />
            <MDBInput
              label="Mail"
              icon="envelope"
              type="email"
              name="newMail"
              onChange={this.handleInputChange}
              value={this.state.newMail}
              autoComplete="new-password"
            />
            {/*             <MDBInput
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
            /> */}
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
              onClick={() => this.props.toggle()}
            >
              Sauvegarder
            </MDBBtn>
          </MDBCardText>
        </form>
      </MDBCard>
    );
  }
}
