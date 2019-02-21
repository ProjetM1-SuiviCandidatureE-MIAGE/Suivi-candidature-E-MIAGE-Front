import React from 'react';
import { Button, Collapse } from 'reactstrap';
import SpaceNavbar from '../SpaceNavbar/SpaceNavbar';
import './SpaceAdmin.css';
import Moment from 'react-moment';

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
            // Tableaux contenant les candidatures traitées, non traitées et en attentes
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

        this.acceptCandidature = this.acceptCandidature.bind(this);
        this.refuseCandidature = this.refuseCandidature.bind(this);
        // Récupération de toutes les candidatures de la  base de données
        fetch('/candidatures/getAllCandidatures')
          .then(res => res.json())
          .then(data => this.setState({ 
              candidaturesNonTraitees : data.filter(item => {
                  return item.etat.includes("non traitée") 
                }),
              candidaturesEnAttentes : data.filter(item => {
                    return item.etat.includes("en attente") 
                }),
              candidaturesTraitees : data.filter(item => {
                    return item.etat.includes("acceptée") || item.etat.includes("refusée") 
                })
            }))
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
    // Fonction pour accepter une candidature
    acceptCandidature(item) {
        fetch(`/candidatures/edit/${item._id}`,{
            method: 'PUT',
            body: JSON.stringify({
                etat: "acceptée",
                commentaire: "",
                dateTraitement: new Date()
            }),
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(function(response){
            return response.json()
        }).then(function(body){
            console.log(body);
        });
    }
    // Fonction pour refuser une candidature
    refuseCandidature(item) {
        fetch(`/candidatures/edit/${item._id}`,{
            method: 'PUT',
            body: JSON.stringify({
                etat: "refusée",
                commentaire: "",
                dateTraitement: new Date()
            }),
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(function(response){
            return response.json()
        }).then(function(body){
            console.log(body);
        });
    }
    // Fonction pour afficher les informations du compte et la modification du mot de passe
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
                        <div key={index} className="card" style={{backgroundColor: "silver"}}>
                            <div className="card-header" id={"heading"+ index} role="button" data-toggle="collapse" data-target={"#collapse"+ index} 
                            aria-expanded="false" aria-controls={"collapse"+ index} >
                                <div className="nameCand">Candidature de {item.candidat.prenom} {item.candidat.nom} </div>
                                <div className="dateCand">
                                    <Moment format="DD/MM/YYYY">{item.date}</Moment>
                                </div>
                            </div>
                            <div id={"collapse"+ index} className="collapse" aria-labelledby={"heading"+ index} data-parent="#accordion">
                                <div className="card-body">
                                    <h2>Etat candidature : {item.etat}</h2>  
                                    <p>email candidat : {item.candidat.mail} </p>
                                </div>
                                <form action={`/candidatures/edit/${item}?_method=PUT`} method="POST" >
                                    <Button onClick={() => this.refuseCandidature(item)} color="danger" data-toggle="collapse" data-target={"#collapse"+ index}>REFUSER</Button>
                                    <Button color="warning" data-toggle="collapse" data-target={"#collapse"+ index}>METTRE EN ATTENTE</Button>
                                    <Button onClick={() => this.acceptCandidature(item)} color="success" data-toggle="collapse" data-target={"#collapse"+ index}>ACCEPTER</Button>
                                </form>
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
                <div id="accordion"> 
                    <h1 style={{color:"black"}}>Liste des candidatures en attentes :</h1>
                    {this.state.candidaturesEnAttentes.map( (item, index) => 
                        <div key={index} className="card" style={{backgroundColor: "silver"}}>
                            <div className="card-header" id={"heading"+ index} role="button" data-toggle="collapse" data-target={"#collapse"+ index} 
                            aria-expanded="false" aria-controls={"collapse"+ index} >
                                <div className="nameCand">Candidature de {item.candidat.prenom} {item.candidat.nom} </div>
                                <div className="dateCand"> en attente depuis le 
                                    <Moment format="DD/MM/YYYY">{item.date}</Moment>
                                </div>
                            </div>
                            <div id={"collapse"+ index} className="collapse" aria-labelledby={"heading"+ index} data-parent="#accordion">
                                <div className="card-body">
                                    <h2>Etat candidature : {item.etat}</h2>  
                                    <p>email candidat : {item.candidat.mail} </p>
                                </div>
                                <Button color="danger" data-toggle="collapse" data-target={"#collapse"+ index}>REFUSER</Button>
                                <Button color="success" data-toggle="collapse" data-target={"#collapse"+ index}>ACCEPTER</Button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }
    // Fonction pour afficher les candidatures traitées
    renderCandidaturesTraitees() {
        if(this.state.candidaturesTraitees.length === 0) {
            return <div className="divPerso" style={{backgroundColor: "black"}}>IL N'Y A PAS DE CANDIDATURES TRAITEES :'(</div>;
        } else {
            return (
                <div id="accordion"> 
                    <h1 style={{color:"black"}}>Liste des candidatures traitées :</h1>
                    {this.state.candidaturesTraitees.map( (item, index) => 
                        <div key={index} className="card" style={{backgroundColor: "silver"}}>
                            <div className="card-header" id={"heading"+ index} role="button" data-toggle="collapse" data-target={"#collapse"+ index} 
                            aria-expanded="false" aria-controls={"collapse"+ index} >
                                <div className="nameCand">Candidature de {item.candidat.prenom} {item.candidat.nom} </div>
                                <div className="dateCand">
                                    <Moment format="DD/MM/YYYY">{item.date}</Moment>
                                </div>
                            </div>
                            <div id={"collapse"+ index} className="collapse" aria-labelledby={"heading"+ index} data-parent="#accordion">
                                <div className="card-body">
                                    <h2>Etat candidature : {item.etat}</h2>  
                                    <p>email candidat : {item.candidat.mail} </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
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