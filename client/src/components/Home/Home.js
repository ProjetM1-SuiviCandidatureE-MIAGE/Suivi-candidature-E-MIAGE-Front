import React, { Component } from "react";
import "./Home.css";
import HomeNavbar from "./HomeNavbar/HomeNavbar";
import { withRouter } from "react-router-dom";
import { MDBIcon } from "mdbreact";

// Page d'accueil du site avec la navbar
class Home extends Component {
  render() {
    return (
      <div>
        <HomeNavbar props={this.props} />
        {/* Theme Name: Medilab
            Theme URL: https://bootstrapmade.com/medilab-free-medical-bootstrap-theme/
            Author: BootstrapMade.com
            Author URL: https://bootstrapmade.com
        */}
        <section id="banner" className="banner">
          <div className="bg-color">
            <div className="container">
              <div className="row">
                <div className="banner-info">
                  <div className="banner-text text-center">
                    <h1 className="whiteh">FORMATION À DISTANCE</h1>
                    <p>
                      MASTER 1 E-MIAGE - MÉTHODES INFORMATIQUES APPLIQUÉES À LA
                      GESTION DES ENTREPRISES <br />À L'UNIVERSITÉ D'ÉVRY
                      VAL-D'ESSONNE
                    </p>
                  </div>
                  <div className="overlay-detail text-center">
                    <a href="#about">
                      <i className="fa fa-angle-down" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="ser-title">MASTER 1 E-MIAGE</h2>
                <hr className="botm-line" />
              </div>
            </div>
            <p className="pIntro">
              Le master 1 e-miage est la modalité "à distance" du master 1
              MIAGE, parcours ingénierie logicielle pour le Web. La filière
              MIAGE est proposée à l'université d'Evry depuis 1991 . Cette
              formation à distance s'appuie sur un consortium international
              e-miage (
              <a
                href="http://www.e-miage.fr/site_emiage_public/#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consortium e-miage
              </a>
              ). Ce consortium est actuellement constitué&nbsp; de 9 universités
              françaises et d'un certain nombre d'établissements étrangers. Le
              master préparé est celui de la filière MIAGE (parcours ingénierie
              logicielle pour le Web) en conformité avec l'habilitation actuelle
              du master MIAGE Paris Saclay (
              <a
                href="https://www.universite-paris-saclay.fr/fr/formation/master/methodes-informatiques-appliquees-a-la-gestion-des-entreprises-miage#objectifs-pedagogiques"
                target="_blank"
                rel="noopener noreferrer"
              >
                Master MIAGE Paris Saclay
              </a>
              ).
            </p>
            <p className="pIntro">
              Aujourd'hui la e-miage est une formation possédant une bonne
              notoriété internationale avec un effectif d'environ 800 étudiants.
              Le fonctionnement est identique pour tous les centres de formation
              (de référence ou associés), une gestion globale des examens au
              plan international, une mutualisation des travaux des étudiants
              (exercices, activités, études de cas...).
            </p>
          </div>
        </section>

        <section id="objectifs" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <h2 className="ser-title">OBJECTIFS DE LA FORMATION</h2>
                <hr className="botm-line" />
                <p className="pIntro">
                  La formation continue E-miage s'adresse aux&nbsp;
                  informaticiens en activité ou en recherche d'emploi souhaitant
                  :
                </p>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="service-info">
                  <div className="icon">
                    <MDBIcon icon="user-graduate" />
                  </div>
                  <div className="icon-info">
                    <h4>UN DIPLÔME</h4>
                    <p className="pIntro">
                      Développer leurs compétences et acquérir un diplôme. La
                      souplesse dans le rythme de progression vers le diplôme
                      permet de répondre aux besoins des apprenants ayant des
                      contraintes professionnelles et personnelles
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="service-info">
                  <div className="icon">
                    <MDBIcon icon="trophy" />
                  </div>
                  <div className="icon-info">
                    <h4>DES ACQUIS</h4>
                    <p className="pIntro">
                      Compléter leurs acquis dans le cadre d'une VAE (validation
                      des acquis de l'expérience)
                      <br />
                      <br />
                      Une spécialisation ou une remise à niveau ponctuelle
                      indépendamment d'un diplôme.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="pIntro">
                  Pour des informations complémentaires sur les débouchés
                  consulter :{" "}
                  <a
                    href="https://www.universite-paris-saclay.fr/fr/formation/master/methodes-informatiques-appliquees-a-la-gestion-des-entreprises-miage#debouches"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    débouchés Master MIAGE Université Paris Saclay
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="organisation" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <h2 className="ser-title">ORGANISATION</h2>
                <hr className="botm-line" />
                <p className="pIntro">
                  3 à 4 modules sont à choisir chaque semestre (janvier et
                  juillet) pour un parcours sur 3 ans maximum
                </p>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="service-info">
                  <div className="icon">
                    <MDBIcon icon="check" />
                  </div>
                  <div className="icon-info">
                    <p className="pIntro">
                      Un total de 17 modules thématiques et 1 module de
                      professionnalisation (3-4 mois de stage)
                    </p>
                  </div>
                </div>
                <div className="service-info">
                  <div className="icon">
                    <MDBIcon icon="check" />
                  </div>
                  <div className="icon-info">
                    <p className="pIntro">
                      Contenus en ligne accessibles sur une plateforme
                      pédagogique dès l'inscription
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="service-info">
                  <div className="icon">
                    <MDBIcon icon="check" />
                  </div>
                  <div className="icon-info">
                    <p className="pIntro">
                      Services pédagogiques proposés pour chaque module :
                      tutorat, forum, correction des travaux, regroupement à
                      l'université d'Evry-Val-d'Essonne
                    </p>
                  </div>
                </div>
                <div className="service-info">
                  <div className="icon">
                    <MDBIcon icon="check" />
                  </div>
                  <div className="icon-info">
                    <p className="pIntro">
                      Sessions d'examens organisées à la fin de chaque semestre,
                      au plus près de la localisation géographique des
                      apprenants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="candidature" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="ser-title">POUR CANDIDATER</h2>
                <hr className="botm-line" />
                <div className="service-info">
                  <div className="icon">
                    <div className="iconText">
                      Inscrivez-vous sur ce site pour postuler directement à la
                      formation E-MIAGE à l'université d'Evry-Val-d'Essonne.
                      <br />
                      Pour cela :
                      <br />
                      <br />
                      - Cliquez sur "Espace candidat" puis sur l'onglet
                      "S'inscrire"
                      <br />
                      <br />- Une fois votre compte créé, vous pourrez créer
                      votre candidature, en fournissant les documents
                      obligatoires (CV, lettre de motivation, vos relevés de
                      notes et vos diplômes).
                      <br />
                      <br />- Vous recevrez un mail de confirmation lorsque
                      votre candidature aura été transmise au jury et vous en
                      recevrez un autre quand elle sera traitée (acceptée ou
                      refusée)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-4 col-xs-12">
                <div className="section-title">
                  <h2 className="head-title lg-line">Contacts</h2>
                  <hr className="botm-line" />
                </div>
              </div>
              <div className="col-md-9 col-sm-8 col-xs-12">
                <div className="col-sm-9 more-features-box">
                  <div className="more-features-box-text">
                    <div className="more-features-box-text-icon">
                      {" "}
                      <i
                        className="fa fa-angle-right"
                        aria-hidden="true"
                      />{" "}
                    </div>
                    <div className="more-features-box-text-description">
                      <h3>Responsable pédagogique e-miage :</h3>
                      <p className="pIntro">
                        Judith Benzakki&nbsp; /{" "}
                        <button className="blue-text buttonLinkable">
                          judith.benzakki@univ-evry.fr
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="more-features-box-text">
                    <div className="more-features-box-text-icon">
                      {" "}
                      <i
                        className="fa fa-angle-right"
                        aria-hidden="true"
                      />{" "}
                    </div>
                    <div className="more-features-box-text-description">
                      <h3>Assistante pédagogique :</h3>
                      <p className="pIntro">
                        Carole Girard /{" "}
                        <button className="blue-text buttonLinkable">
                          carole.girard<span>ping</span>
                          <span>@</span>univ-evry
                          <span>pong</span>
                          <span>.</span>fr
                        </button>{" "}
                        / tél : 01 64 85 35 92
                      </p>
                    </div>
                  </div>
                  <div className="more-features-box-text">
                    <div className="more-features-box-text-icon">
                      {" "}
                      <i
                        className="fa fa-angle-right"
                        aria-hidden="true"
                      />{" "}
                    </div>
                    <div className="more-features-box-text-description">
                      <h3>Service Commun de la Formation Continue : </h3>
                      <p className="pIntro">
                        <button className="blue-text buttonLinkable">
                          fc@univ-evry.fr
                        </button>{" "}
                        / tél : 01 69 47 71 01
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="savoirPlus" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="ser-title">POUR EN SAVOIR PLUS</h2>
                <hr className="botm-line" />
                <div className="service-info">
                  <div className="icon">
                    <MDBIcon icon="download" />
                    <a
                      href="/"
                      title="Ouvre un lien interne dans la fenêtre en cours"
                      className="download link--icon link--download"
                    >
                      {" "}
                      <i className="icon icon-download" />{" "}
                      <span className="text">
                        Télécharger la plaquette de présentation de la
                        formation, pdf, 464ko
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(Home);
