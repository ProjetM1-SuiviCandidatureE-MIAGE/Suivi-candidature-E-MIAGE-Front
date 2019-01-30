import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './CandidatureForm.css';

// Le formulaire de création d'une candidature
class CandidatureForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        firstName:'',
        name:'',
        email:''
      };
      // On bind toutes les fonctions qui vont utiliser le this.state
      this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleResetForm = this.handleResetForm.bind(this);
    }

    // Méthode pour changer le prénom dans l'input
    handleFirstnameChange(e) {
      this.setState({firstName: e.target.value});
    }
    // Méthode pour changer le nom dans l'input
    handleNameChange(e) {
      this.setState({name: e.target.value});
    }
    // Méthode pour changer le mail dans l'input
    handleEmailChange(e) {
      this.setState({email: e.target.value});
    }
    // Méthode pour envoyer les informations du formulaire en BDD
    handleSubmit(e) {
      e.preventDefault();
      fetch('/candidatures/newCandidature',{
        method: 'POST',
        body: JSON.stringify({
          etat: this.state.firstName,
          commentaire: this.state.name,
          date: this.state.email
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
      });
      this.handleResetForm(e);
    }
    // Méthode pour reset le formulaire avec aucunes valeurs
    handleResetForm(e) {
      e.preventDefault();
      this.setState({
        firstName:'',
        name:'',
        email:''
      })
    }

    // La fonction qui permet d'afficher le code html du composant CandidatureForm donc le formulaire
    render() {
      return(
          <div className="candidatureDiv">
            <form method="POST" action="/candidatures/newCandidature" className="candidatureForm">
              <div className="formGroup">
                <input className="inputText" type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstnameChange} required/>
                <label className="labelText" htmlFor="firstName">Prénom(s)</label>
              </div>
              <div className="formGroup">
                <input className="inputText" type="text" name="name" value={this.state.name} onChange={this.handleNameChange} required/>
                <label className="labelText" htmlFor="name">Nom</label>
              </div>
              <div className="formGroup">
                <input className="inputText" type="email" name="email" value={this.state.email} onChange={this.handleEmailChange} required/>
                <label className="labelText" htmlFor="email">Email</label>
              </div>
              <div className="formGroup">
                <label htmlFor="cv">Votre CV</label>
                <input type="file" name="cv" id="cvFile"/>
              </div>
              <div className="formGroup">
                <label htmlFor="lm">Votre lettre de motivation</label>
                <input type="file" name="lm" id="lmFile"/>
              </div>
              <div className="formGroup">
                <label htmlFor="files">Vos autres fichiers</label>
                <input type="file" name="files" id="otherFiles" multiple/>
              </div>
              <div className="text-center">
                <Button color="danger" type="button" onClick={this.handleResetForm}>Annuler</Button>
                <Button color="primary" type="submit" onClick={this.handleSubmit}>Envoyer</Button>
              </div>
            </form>
          </div>
      );
    }
}
export default CandidatureForm;