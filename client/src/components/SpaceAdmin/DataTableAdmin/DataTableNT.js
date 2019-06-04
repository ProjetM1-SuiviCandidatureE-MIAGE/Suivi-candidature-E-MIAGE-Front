import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MDBBtn, MDBIcon, MDBInput } from "mdbreact";
import Download from "./DowloadExcel/Download";

let props = "";
let candidaturesData = "";

export default class DataTableAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidaturesProps: "",
      formatEnd: false
    };
    this.renderDataTable = this.renderDataTable.bind(this);
  }
  // Fonction qui s'éxecute à la création du composant
  componentDidMount() {
    props = this.props;
    this.setState({
      candidaturesProps: props.candidatures,
      formatEnd: true
    });
  }
  // Fonction pour formatter la date
  formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }
  ////////////////////////////////////////////////////////////
  // Fonction pour charger les fichiers upload
  loadFile(file) {
    const path = file[0].fichier;
    const url = "http://localhost:3010/upload/getFile/" + path;
    window.open(url);
  }
  ////////////////////////////////////////////////////////////
  // Fonction pour télécharger un fichier déjà upload
  downloadFile(file) {
    const path = file[0].fichier;
    const url = "http://localhost:3010/upload/downloadFile/" + path;
    window.open(url);
  }
  ////////////////////////////////////////////////////////////
  // Fonction pour accepter une candidature
  acceptCand(item, idInput) {
    const commentaire = document.getElementById(idInput).value;
    props.accepter(item._id, commentaire, item.candidat[0]);
  }
  ////////////////////////////////////////////////////////////
  // Fonction pour refuser une candidature
  refuseCand(item, idInput) {
    const commentaire = document.getElementById(idInput).value;
    props.refuser(item._id, commentaire, item.candidat[0]);
  }
  ////////////////////////////////////////////////////////////
  // Fonction pour mettre en attente une candidature
  waitCand(item, idInput) {
    const commentaire = document.getElementById(idInput).value;
    props.attente(item._id, commentaire, item.candidat[0]);
  }
  // Fonction pour afficher la DataTable
  renderDataTable(boolean) {
    if (boolean === true) {
      const columns = [
        {
          name: "_id",
          options: {
            display: false
          }
        },
        {
          name: "nom",
          label: "Nom"
        },
        {
          name: "prenom",
          label: "Prénom"
        },
        {
          name: "mail",
          label: "Mail"
        },
        {
          name: "dateCreation",
          label: "Date de création",
          options: {
            sortDirection: "desc"
          }
        },
        {
          name: "etat",
          label: "Etat"
        }
      ];

      const self = this;
      candidaturesData = this.state.candidaturesProps.map(function(item, i) {
        item.nom = item.candidat[0].nom.toUpperCase();
        item.prenom = item.candidat[0].prenom;
        item.mail = item.candidat[0].mail;
        item.dateCreation = self.formatDate(item.date);
        return item;
      });

      const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "scroll",
        expandableRows: true,
        renderExpandableRow: (rowData, rowMeta) => {
          let filtre = candidaturesData.filter(item => {
            return item._id === rowData[0];
          });
          const nomClasse = filtre[0]._id.substring(16);
          let autreFichier = [];
          if (filtre[0].autresFichier.length !== 0) {
            autreFichier.push(
              <TableRow>
                <TableCell colSpan={1} />
                <TableCell colSpan={1}>Autre fichier :</TableCell>
                <TableCell colSpan={1}>
                  <MDBBtn
                    outline
                    color="default"
                    className="FileButton"
                    onClick={item => this.loadFile(filtre[0].autresFichier)}
                  >
                    <MDBIcon icon="eye" /> Voir
                  </MDBBtn>
                </TableCell>
                <TableCell colSpan={1}>
                  <MDBBtn
                    color="default"
                    className="FileButton"
                    onClick={item => this.downloadFile(filtre[0].autresFichier)}
                  >
                    <MDBIcon icon="file-download" /> Télécharger
                  </MDBBtn>
                </TableCell>
                <TableCell colSpan={1} />
              </TableRow>
            );
          }
          return (
            <TableRow colSpan={6}>
              <TableCell colSpan={6}>
                <TableRow>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>CV (Curriculum vitæ) :</TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      outline
                      color="default"
                      className="FileButton"
                      onClick={item => this.loadFile(filtre[0].cv)}
                    >
                      <MDBIcon icon="eye" /> Voir
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="default"
                      className="FileButton"
                      onClick={item => this.downloadFile(filtre[0].cv)}
                    >
                      <MDBIcon icon="file-download" /> Télécharger
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1} />
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>Lettre de motivation :</TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      outline
                      color="default"
                      className="FileButton"
                      onClick={item => this.loadFile(filtre[0].lm)}
                    >
                      <MDBIcon icon="eye" /> Voir
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="default"
                      className="FileButton"
                      onClick={item => this.downloadFile(filtre[0].lm)}
                    >
                      <MDBIcon icon="file-download" /> Télécharger
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1} />
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>Relevé de notes :</TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      outline
                      color="default"
                      className="FileButton"
                      onClick={item => this.loadFile(filtre[0].releveNote)}
                    >
                      <MDBIcon icon="eye" /> Voir
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="default"
                      className="FileButton"
                      onClick={item => this.downloadFile(filtre[0].releveNote)}
                    >
                      <MDBIcon icon="file-download" /> Télécharger
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1} />
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>Bulletin :</TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      outline
                      color="default"
                      className="FileButton"
                      onClick={item => this.loadFile(filtre[0].diplome)}
                    >
                      <MDBIcon icon="eye" /> Voir
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="default"
                      className="FileButton"
                      onClick={item => this.downloadFile(filtre[0].diplome)}
                    >
                      <MDBIcon icon="file-download" /> Télécharger
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1} />
                </TableRow>
                {autreFichier}
                <TableRow colSpan={6}>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>Commentaire : </TableCell>
                  <TableCell colSpan={3}>
                    <MDBInput
                      type="textarea"
                      label="Votre commentaire"
                      outline
                      id={nomClasse}
                      autoComplete="off"
                    />
                  </TableCell>
                </TableRow>
                <TableRow colSpan={6}>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="danger"
                      onClick={() => this.refuseCand(filtre[0], nomClasse)}
                    >
                      REFUSER
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="warning"
                      onClick={() => this.waitCand(filtre[0], nomClasse)}
                    >
                      METTRE EN ATTENTE
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="success"
                      onClick={() => this.acceptCand(filtre[0], nomClasse)}
                    >
                      ACCEPTER
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1} />
                </TableRow>
                <TableRow />
              </TableCell>
            </TableRow>
          );
        },
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 50],
        download: false,
        customToolbar: () => {
          return (
            <Download
              fileName={"CandidaturesNonTraitées"}
              candidatures={candidaturesData}
            />
          );
        },
        textLabels: {
          body: {
            noMatch: "Désolé, aucun résultat.",
            toolTip: "Trier"
          },
          pagination: {
            next: "Page Suivante",
            previous: "Page Précédente",
            rowsPerPage: "Lignes par page :",
            displayRows: "sur"
          },
          toolbar: {
            search: "Rechercher",
            downloadCsv: "Télécharger en CSV",
            print: "Imprimer",
            viewColumns: "Voir les colonnes",
            filterTable: "Filtrer"
          },
          filter: {
            all: "TOUT",
            title: "FILTRER",
            reset: "RESET"
          },
          viewColumns: {
            title: "Voir les colonnes",
            titleAria: "Voir/Cacher les colonnes"
          }
        },
        selectableRows: "none"
      };
      return (
        <MUIDataTable
          title={"Candidatures non traitées "}
          data={candidaturesData}
          columns={columns}
          options={options}
        />
      );
    }
  }
  // Fonctionne pour afficher le code HTML du composant
  render() {
    return (
      <div style={{ marginBottom: "3em", marginTop: "1em" }}>
        {this.renderDataTable(this.state.formatEnd)}
      </div>
    );
  }
}
