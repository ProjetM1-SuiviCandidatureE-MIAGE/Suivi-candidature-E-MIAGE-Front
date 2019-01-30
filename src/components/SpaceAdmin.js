import React from 'react';
import { Button, Collapse } from 'reactstrap';
import SpaceNavbar from './SpaceNavbar';
import './SpaceAdmin.css';

const candNT = ["hello"];
const candEA = [];
const candT = [];

// Le composant qui affiche la page de l'espace administrateur
class SpaceAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          candNonTraite: false,
          candAttente:false,
          candTraite:false,
          candidatures: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleNonTraite = this.toggleNonTraite.bind(this);
        this.toggleAttente = this.toggleAttente.bind(this);
        this.toggleTraite = this.toggleTraite.bind(this);
        this.renderCandidaturesNonTraitees = this.renderCandidaturesNonTraitees.bind(this);
        this.renderCandidaturesEnAttentes = this.renderCandidaturesEnAttentes.bind(this);
        this.renderCandidaturesTraitees = this.renderCandidaturesTraitees.bind(this);
    }
    // test api
    componentDidMount() {
        fetch('/candidatures/test')
          .then(res => res.json())
          .then(candidatures => this.setState({ candidatures }, () => console.log("Data fetched :" + candidatures)));
    }

    // Fonction pour afficher le div qui contient les candidatures non traitées
    toggleNonTraite() {
        this.setState({
          candNonTraite: !this.state.candNonTraite,
          candAttente:false,
          candTraite:false
        });
    }
    // Fonction pour afficher le div qui contient les candidatures en attentes
    toggleAttente() {
        this.setState({
          candAttente: !this.state.candAttente,
          candNonTraite:false,
          candTraite:false
        });
    }
    // Fonction pour afficher le div qui contient les candidatures traitées
    toggleTraite() {
        this.setState({
          candTraite: !this.state.candTraite,
          candNonTraite:false,
          candAttente:false
        });
    }
    // Fonction pour afficher les candidatures non traitées
    renderCandidaturesNonTraitees() {
        if(candNT.length === 0) {
            return <div className="divPerso" style={{backgroundColor: "silver"}}>IL N'Y A PAS DE CANDIDATURES NON TRAITEES :'(</div>;
        } else {
            return (
                <div id="accordion" className="divPerso">
                    <div className="card" style={{backgroundColor: "silver"}}>
                        <div className="card-header" id="headingOne" role="button" data-toggle="collapse" data-target="#collapseOne" 
                            aria-expanded="false" aria-controls="collapseOne" >
                            <div>
                            Candidature de prénom NOM, le 28 Janvier 2019 
                            </div>
                        </div>
                        <div id="collapseOne" className="collapse" data-toggle="collapse" data-target="#collapseOne" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                            VOUS POUVEZ CLIQUER ICI POUR REFERMER LE TEXTE

                            -------------------------------------------------------
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                            richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                            moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                            wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                            aesthetic synth nesciunt you probably haven't heard of them accusamus
                            labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{backgroundColor: "silver"}}>
                        <div className="card-header" id="headingTwo" role="button" data-toggle="collapse" data-target="#collapseTwo" 
                            aria-expanded="false" aria-controls="collapseTwo">
                            <div>
                            Candidature de prénom NOM, le 28 Janvier 2019 
                            </div>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                            richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                            moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                            wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                            aesthetic synth nesciunt you probably haven't heard of them accusamus
                            labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{backgroundColor: "silver"}}>
                        <div className="card-header" id="headingThree"  role="button" data-toggle="collapse" data-target="#collapseThree" 
                            aria-expanded="false" aria-controls="collapseThree">
                            <div>
                            Candidature de prénom NOM, le 28 Janvier 2019 
                            </div>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf 
                            moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. 
                            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch 
                            et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan 
                            excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you 
                            probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    // Fonction pour afficher les candidatures en attentes
    renderCandidaturesEnAttentes() {
        if(candEA.length === 0) {
            return <div className="divPerso" style={{backgroundColor: "gray"}}>IL N'Y A PAS DE CANDIDATURES EN ATTENTES :'(</div>;
        } else {
            return <div className="divPerso" style={{backgroundColor: "gray"}}>LISTE DES CANDIDATURES EN ATTENTES :</div>;
        }
    }
    // Fonction pour afficher les candidatures traitées
    renderCandidaturesTraitees() {
        if(candT.length === 0) {
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
                    <Button>Mes Informations</Button>
                </div>
                <div className="text-center">
                    <Button onClick={this.toggleNonTraite}>Afficher les candidatures non traitées</Button>
                    <Button onClick={this.toggleAttente}>Afficher les candidatures en attentes</Button>
                    <Button onClick={this.toggleTraite}>Afficher les candidatures traitées</Button>
                </div>    
                <Collapse isOpen={this.state.candNonTraite}>
                    {this.renderCandidaturesNonTraitees()}
                </Collapse>
                <Collapse isOpen={this.state.candAttente}>
                    {this.renderCandidaturesEnAttentes()}
                </Collapse>
                <Collapse isOpen={this.state.candTraite}>
                    {this.renderCandidaturesTraitees()}
                </Collapse>
            </div>
        );
    }
}

export default SpaceAdmin;