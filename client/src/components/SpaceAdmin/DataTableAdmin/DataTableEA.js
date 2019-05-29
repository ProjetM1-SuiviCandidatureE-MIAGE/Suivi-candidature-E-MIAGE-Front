import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MDBBtn, MDBIcon, MDBInput } from "mdbreact";

let props = "";
let candidaturesData = "";

export default class DataTableEA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidaturesProps: "",
      formatEnd: false,
      commentaire: ""
    };
    this.renderDataTable = this.renderDataTable.bind(this);
    this.handleCommentaireChange = this.handleCommentaireChange.bind(this);
  }
  // Fonction qui s'éxecute à la création du composant
  componentDidMount() {
    props = this.props;
    this.setState({
      candidaturesProps: props.candidatures,
      formatEnd: true
    });
  }
  // Fonction pour changer le commentaire d'une candidature
  handleCommentaireChange = event => {};
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
          name: "dateTraitement",
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
          console.log(filtre);
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
                    onClick={item => this.loadFile(filtre.autresFichier)}
                  >
                    <MDBIcon icon="eye" /> Voir
                  </MDBBtn>
                </TableCell>
                <TableCell colSpan={1}>
                  <MDBBtn
                    color="default"
                    className="FileButton"
                    onClick={item => this.downloadFile(filtre.autresFichier)}
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
                      onClick={item => this.loadFile(rowData[0], "cv")}
                    >
                      <MDBIcon icon="eye" /> Voir
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="default"
                      className="FileButton"
                      onClick={item => this.downloadFile(rowData[0], "cv")}
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
                      onClick={item => this.loadFile(rowData[0], "lm")}
                    >
                      <MDBIcon icon="eye" /> Voir
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="default"
                      className="FileButton"
                      onClick={item => this.downloadFile(rowData[0], "lm")}
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
                      onClick={item => this.loadFile(rowData[0], "rn")}
                    >
                      <MDBIcon icon="eye" /> Voir
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="default"
                      className="FileButton"
                      onClick={item => this.downloadFile(rowData[0], "rn")}
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
                      onClick={item => this.loadFile(rowData[0], "di")}
                    >
                      <MDBIcon icon="eye" /> Voir
                    </MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn
                      color="default"
                      className="FileButton"
                      onClick={item => this.downloadFile(rowData[0], "di")}
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
                    />
                  </TableCell>
                  <TableCell colSpan={1} />
                </TableRow>
                <TableRow colSpan={6}>
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1} />
                  <TableCell colSpan={1}>
                    <MDBBtn color="danger">REFUSER</MDBBtn>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <MDBBtn color="success">ACCEPTER</MDBBtn>
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
        downloadOptions: {
          filename: "CandidaturesEnAttentes.csv",
          separator: ","
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
