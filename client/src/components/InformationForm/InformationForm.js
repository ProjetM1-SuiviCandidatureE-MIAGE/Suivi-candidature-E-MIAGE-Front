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

let getUser = "";
let setUser = "";

// Le composant qui créé le formulaire avec les informations de la personne connectée
export default class InformationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prenom: "",
      nom: "",
      mail: "",

      newPrenom: "",
      newNom: "",
      newMail: "",

      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }
  // Fonction qui s'éxecute à la création du composant
  componentDidMount() {
    getUser = this.props.get;
    setUser = this.props.set;

    const User = getUser();
    console.log(User);

    this.setState({
      prenom: User.prenom,
      nom: User.nom,
      mail: User.mail,

      newPrenom: User.prenom,
      newNom: User.nom,
      newMail: User.mail
    });
  }
  // Fonction pour modifier les valeurs des inputs
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  // Fonction pour ouvrir le modal de modification du mot de passe
  openModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
          <div className="options text-center mt-1">
            <p>
              <a className="blue-text" onClick={this.openModal}>
                <MDBIcon icon="lock" /> Modifier mon mot de passe
              </a>
            </p>
          </div>
          <ModalPassword isOpen={this.state.isOpen} toggle={this.openModal} />
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
      </MDBCard>
    );
  }
}
