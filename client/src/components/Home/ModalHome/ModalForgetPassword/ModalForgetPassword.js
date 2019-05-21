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
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  // Fonction qui affiche le code HTML du composant
  render() {
    return <div />;
  }
}
