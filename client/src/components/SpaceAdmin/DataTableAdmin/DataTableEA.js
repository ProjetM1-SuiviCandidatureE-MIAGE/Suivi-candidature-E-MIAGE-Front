import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MDBBtn, MDBIcon, MDBInput } from "mdbreact";
import Download from "./DowloadExcel/Download";

let props = "";
let candidaturesData = "";

export default class DataTableEA extends Component {
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
  // Fonction pour le tri de la date
  changeFormatDate(date) {
    const day = date.substring(0, 2);
    const month = date.substring(3, 5);
    const year = date.substring(6, 10);

    return [year, month, day].join("/");
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
  // Fonction pour afficher la DataTable
  renderDataTable(boolean) {
    if (boolean === true) {
      const columns = [
        {
          name: "_id",
          options: {
            display: "excluded"
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
          name: "dateTraite",
          label: "Date de traitement"
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
        item.dateTraite = self.formatDate(item.dateTraitement);
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
                    onClick={item =>
                      this.loadFile(filtre[0].autresFichier)
                    }
                  >
                    <MDBIcon icon="eye" /> Voir
                  </MDBBtn>
                </TableCell>
                <TableCell colSpan={1}>
                  <MDBBtn
                    color="default"
                    className="FileButton"
                    onClick={item =>
                      this.downloadFile(filtre[0].autresFichier)
                    }
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
                  <TableCell colSpan={1}>
                    CV (Curriculum vitæ) :
                  </TableCell>
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
                  <TableCell colSpan={1}>
                    Lettre de motivation :
                  </TableCell>
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
                      onClick={item =>
                        this.loadFile(filtre[0].releveNote)
                      }
                    >
                      <MDBIcon icon="eye" /> Voir
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="default"
                      className="FileButton"
                      onClick={item =>
                        this.downloadFile(filtre[0].releveNote)
                      }
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
                      onClick={item =>
                        this.downloadFile(filtre[0].diplome)
                      }
                    >
                      <MDBIcon icon="file-download" /> Télécharger
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1} />
                </TableRow>
                <TableRow colSpan={6}>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>Ancien commentaire : </TableCell>
                  <TableCell colSpan={3}>
                    {filtre[0].commentaire}
                  </TableCell>
                </TableRow>
                <TableRow colSpan={6}>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>
                    Nouveau commentaire :{" "}
                  </TableCell>
                  <TableCell colSpan={3}>
                    <MDBInput
                      type="textarea"
                      id={nomClasse}
                      label="Votre commentaire"
                      outline
                      autoComplete="off"
                    />
                  </TableCell>
                </TableRow>
                <TableRow colSpan={6}>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="danger"
                      onClick={() =>
                        this.refuseCand(filtre[0], nomClasse)
                      }
                    >
                      REFUSER
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="success"
                      onClick={() =>
                        this.acceptCand(filtre[0], nomClasse)
                      }
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
              fileName={"CandidaturesEnAttentes"}
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
        selectableRows: "none",
        customSort: (data, colIndex, order) => {
          const self = this;
          return data.sort((a, b) => {
            if (
              a.data[colIndex] !== undefined &&
              b.data[colIndex] !== undefined
            ) {
              // Si c'est une date on tri par rapport à YYYY/MM/DD
              if (
                a.data[colIndex].includes("/") &&
                b.data[colIndex].includes("/")
              ) {
                const dateA = self.changeFormatDate(a.data[colIndex]);
                const dateB = self.changeFormatDate(b.data[colIndex]);
                return (
                  (dateA > dateB ? -1 : 1) * (order === "desc" ? 1 : -1)
                );
              } else {
                return (
                  (a.data[colIndex] > b.data[colIndex] ? -1 : 1) *
                  (order === "desc" ? 1 : -1)
                );
              }
            } else {
              return (
                (a.data[colIndex] > b.data[colIndex] ? -1 : 1) *
                (order === "desc" ? 1 : -1)
              );
            }
          });
        }
      };
      return (
        <MUIDataTable
          title={"Candidatures en attentes "}
          data={candidaturesData}
          columns={columns}
          options={options}
        />
      );
    }
  }
  render() {
    return (
      <div style={{ marginBottom: "3em", marginTop: "1em" }}>
        {this.renderDataTable(this.state.formatEnd)}
      </div>
    );
  }
}
