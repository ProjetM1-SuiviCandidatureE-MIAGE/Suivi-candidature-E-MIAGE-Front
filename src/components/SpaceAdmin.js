import React from 'react';
import { Button, Collapse } from 'reactstrap';
import SpaceNavbar from './SpaceNavbar';
import './SpaceAdmin.css';

// Le composant qui affiche la page de l'espace administrateur
class SpaceAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Les booléens pour les fonctions toggle des boutons
            boolMesInformations: false,
            boolCandNonTraitees: false,
            boolCandEnAttentes: false,
            boolCandTraitees: false,
            //
            candidaturesNonTraitees: [],
            candidaturesEnAttentes: [],
            candidaturesTraitees: []
        };
        this.toggleNonTraite = this.toggleNonTraite.bind(this);
        this.toggleAttente = this.toggleAttente.bind(this);
        this.toggleTraite = this.toggleTraite.bind(this);
        this.toggleMesInformations = this.toggleMesInformations.bind(this);

        this.renderMesInformations = this.toggleMesInformations.bind(this);
        this.renderCandidaturesNonTraitees = this.renderCandidaturesNonTraitees.bind(this);
        this.renderCandidaturesEnAttentes = this.renderCandidaturesEnAttentes.bind(this);
        this.renderCandidaturesTraitees = this.renderCandidaturesTraitees.bind(this);

        fetch('/candidatures/testGet')
          .then(res => res.json())
          .then(data => this.setState({ candidaturesNonTraitees : data }))
          .catch(error => console.log(error));
    }

    // Fonction pour afficher le div qui contient les candidatures non traitées
    toggleNonTraite() {
        this.setState({
            boolCandNonTraitees: !this.state.boolCandNonTraitees,
            boolMesInformations: false,
            boolCandEnAttentes:false,
            boolCandTraitees:false
        });
    }
    // Fonction pour afficher le div qui contient les candidatures en attentes
    toggleAttente() {
        this.setState({
            boolCandEnAttentes: !this.state.boolCandEnAttentes,
            boolMesInformations: false,
            boolCandNonTraitees:false,
            boolCandTraitees:false
        });
    }
    // Fonction pour afficher le div qui contient les candidatures traitées
    toggleTraite() {
        this.setState({
            boolCandTraitees: !this.state.boolCandTraitees,
            boolMesInformations: false,
            boolCandNonTraitees:false,
            boolCandEnAttentes:false
        });
    }
    // Fonction pour afficher le div qui contient les informations de l'admin
    toggleMesInformations() {
        this.setState({
            boolMesInformations: !this.state.boolMesInformations,
            boolCandTraitees: false,
            boolCandNonTraitees:false,
            boolCandEnAttentes:false
        })
    }
    renderMesInformations() {
        return <div className="divPerso text-center">Mes Informations</div>;
    }
    // Fonction pour afficher les candidatures non traitées
    renderCandidaturesNonTraitees() {
        if(this.state.candidaturesNonTraitees.length === 0) {
            return <div className="divPerso" style={{backgroundColor: "silver"}}>IL N'Y A PAS DE CANDIDATURES NON TRAITEES :'(</div>;
        } else {
            return (
                <div id="accordion"> 
                    <h1 style={{color:"black"}}>Liste des candidatures non traitées :</h1>
                    {this.state.candidaturesNonTraitees.map( (item, index) => 
                        <div className="card" style={{backgroundColor: "silver"}}>
                            <div className="card-header" id={"heading"+ index} role="button" data-toggle="collapse" data-target={"#collapse"+ index} 
                            aria-expanded="false" aria-controls={"collapse"+ index} >
                                <div>Candidature numéro : {index +1} </div>
                            </div>
                            <div id={"collapse"+ index} className="collapse" aria-labelledby={"heading"+ index} data-parent="#accordion">
                                <div className="card-body">
                                    <h2>Nom : {item.etat}</h2>  
                                    <p>email : {item.date} </p>
                                </div>
                                <Button color="danger" data-toggle="collapse" data-target={"#collapse"+ index}>FERMER</Button>
                                <Button color="warning" data-toggle="collapse" data-target={"#collapse"+ index}>METTRE EN ATTENTE</Button>
                                <Button color="success" data-toggle="collapse" data-target={"#collapse"+ index}>ACCEPTER</Button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }
    // Fonction pour afficher les candidatures en attentes
    renderCandidaturesEnAttentes() {
        if(this.state.candidaturesEnAttentes.length === 0) {
            return <div className="divPerso" style={{backgroundColor: "gray"}}>IL N'Y A PAS DE CANDIDATURES EN ATTENTES :'(</div>;
        } else {
            return (
                <div className="divPerso" style={{backgroundColor: "gray"}}>Liste des candidatures en attentes : ;D</div>
            );
        }
    }
    // Fonction pour afficher les candidatures traitées
    renderCandidaturesTraitees() {
        if(this.state.candidaturesTraitees.length === 0) {
            return <div className="divPerso" style={{backgroundColor: "black"}}>IL N'Y A PAS DE CANDIDATURES TRAITEES :'(</div>;
        } else {
            return <div className="divPerso" style={{backgroundColor: "black"}}>LISTE DES CANDIDATURES TRAITEES :</div>;
        }
    }
    render() {
        return(
            <div>
                <SpaceNavbar></SpaceNavbar>
                <div className="text-center">
                    <Button onClick={this.toggleMesInformations} color="info" size="lg" >Mes Informations</Button>
                </div>
                <Collapse isOpen={this.state.boolMesInformations}>
                    <div className="text-center">Voici vos informations</div>
                </Collapse>
                <div className="text-center">
                    <Button onClick={this.toggleNonTraite}>Afficher les candidatures non traitées</Button>
                    <Button onClick={this.toggleAttente}>Afficher les candidatures en attentes</Button>
                    <Button onClick={this.toggleTraite}>Afficher les candidatures traitées</Button>
                </div>    
                <Collapse isOpen={this.state.boolCandNonTraitees}>
                    {this.renderCandidaturesNonTraitees()}
                </Collapse>
                <Collapse isOpen={this.state.boolCandEnAttentes}>
                    {this.renderCandidaturesEnAttentes()}
                </Collapse>
                <Collapse isOpen={this.state.boolCandTraitees}>
                    {this.renderCandidaturesTraitees()}
                </Collapse>
            </div>
        );
    }
}

export default SpaceAdmin;