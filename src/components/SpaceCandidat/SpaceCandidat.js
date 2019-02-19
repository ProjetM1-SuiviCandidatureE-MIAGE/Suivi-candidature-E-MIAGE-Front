import CandidatureForm from '../CandidatureForm/CandidatureForm';
import React from 'react';
import { Button, Collapse } from 'reactstrap';
import SpaceNavbar from '../SpaceNavbar';
import './SpaceCandidat.css';

class SpaceCandidat extends React.Component {
    constructor(props) {
        super(props);

        this.toggleCandidatureForm = this.toggleCandidatureForm.bind(this);
        this.toggleInformationsForm = this.toggleInformationsForm.bind(this);
        this.state = {
            // Booléens pour le toggle des boutons
            toggleCandidature: false,
            toggleInformations: false
        };
    }
    
    toggleCandidatureForm() {
        this.setState({
          toggleCandidature: !this.state.toggleCandidature,
          toggleInformations: false
        });
    }

    toggleInformationsForm() {
        this.setState({
            toggleInformations: !this.state.toggleInformations,
            toggleCandidature: false
        });
    }

    render() {
        return(
            <div>
                <SpaceNavbar></SpaceNavbar>
                <div className="text-center">
                    <Button onClick={this.toggleInformationsForm} color="info" size="lg">Mes informations</Button>
                </div>
                <Collapse isOpen={this.state.toggleInformations}>
                    <div className="text-center">--->  Hello World !  ---> Hello You !</div>
                </Collapse>
                <div className="text-center">
                    <Button onClick={this.toggleCandidatureForm} size="lg" color="primary">Créer une candidature</Button>
                </div>
                <Collapse isOpen={this.state.toggleCandidature}>
                    <CandidatureForm toggle={this.toggleCandidatureForm}></CandidatureForm>
                </Collapse>
            </div>
        );
    }
}

export default SpaceCandidat;