import React from 'react';
import { Button, Collapse } from 'reactstrap';
import SpaceNavbar from './SpaceNavbar';
import './SpaceAdmin.css'

class SpaceAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          candNonTraite: false,
          candAttente:false,
          candTraite:false
        };
        this.toggleNonTraite = this.toggleNonTraite.bind(this);
        this.toggleAttente = this.toggleAttente.bind(this);
        this.toggleTraite = this.toggleTraite.bind(this);
    }

    toggleNonTraite() {
        this.setState({
          candNonTraite: !this.state.candNonTraite,
          candAttente:false,
          candTraite:false
        });
    }

    toggleAttente() {
        this.setState({
          candAttente: !this.state.candAttente,
          candNonTraite:false,
          candTraite:false
        });
    }

    toggleTraite() {
        this.setState({
          candTraite: !this.state.candTraite,
          candNonTraite:false,
          candAttente:false
        });
    }

    render() {
        return(
            <div>
                <SpaceNavbar></SpaceNavbar>
                <Button onClick={this.toggleNonTraite}>Afficher les candidatures non traitées</Button>
                <Button onClick={this.toggleAttente}>Afficher les candidatures non traitées</Button>
                <Button onClick={this.toggleTraite}>Afficher les candidatures non traitées</Button>
                <Collapse isOpen={this.state.candNonTraite}>
                    <div className="h" style={{backgroundColor: "red"}}>CANDIDATURES NON TRAITEES</div>
                </Collapse>
                <Collapse isOpen={this.state.candAttente}>
                    <div className="h" style={{backgroundColor: "blue"}}>CANDIDATURES EN ATTENTES</div>
                </Collapse>
                <Collapse isOpen={this.state.candTraite}>
                    <div className="h" style={{backgroundColor: "green"}}>CANDIDATURES DEJA TRAITEES</div>
                </Collapse>
            </div>
        );
    }
}

export default SpaceAdmin;