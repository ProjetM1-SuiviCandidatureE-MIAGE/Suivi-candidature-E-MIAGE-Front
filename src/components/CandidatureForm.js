import React, { Component } from 'react';
import { Button, Collapse } from 'reactstrap';
import './CandidatureForm.css';

class CandidatureForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        toggle: true,
        firstName:'',
        name:'',
        email:''
      };
      this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleFirstnameChange(e) {
      this.setState({firstName: e.target.value});
    }

    handleNameChange(e) {
      this.setState({name: e.target.value});
    }

    handleEmailChange(e) {
      this.setState({email: e.target.value});
    }

    handleSubmit(e) {
      console.log("Prénom : " + this.state.firstName);
      console.log("Nom : " + this.state.name);
      console.log("Email : " + this.state.email);
      e.preventDefault();
    }

    render() {
      return(
        <Collapse isOpen={this.state.toggle}>
          <div className="candidatureDiv">
            <form className="candidatureForm">
              <div className="formGroup">
                <input className="inputText" type="text" name="firstName" required value={this.state.firstName} onChange={this.handleFirstnameChange}/>
                <label className="labelText" for="firstName">Prénom(s)</label>
              </div>
              <div className="formGroup">
                <input className="inputText" type="text" name="name" required value={this.state.name} onChange={this.handleNameChange}/>
                <label className="labelText" for="name">Nom</label>
              </div>
              <div className="formGroup">
                <input className="inputText" type="email" name="email" required value={this.state.email} onChange={this.handleEmailChange}/>
                <label className="labelText" for="email">Email</label>
              </div>
              <div className="formGroup">
                <label  for="cv">Votre CV</label>
                <input type="file" name="cv" id="cvFile"/>
              </div>
              <div className="formGroup">
                <label for="lm">Votre lettre de motivation</label>
                <input type="file" name="lm" id="lmFile"/>
              </div>
              <div className="formGroup">
                <label for="files">Vos autres fichiers</label>
                <input type="file" name="files" id="otherFiles" multiple/>
              </div>
              <div className="text-center">
                <Button color="danger" type="button">Annuler</Button>
                <Button color="primary" onClick={this.handleSubmit}>Envoyer</Button>
              </div>
            </form>
          </div>
        </Collapse>
      );
    }
}
export default CandidatureForm;