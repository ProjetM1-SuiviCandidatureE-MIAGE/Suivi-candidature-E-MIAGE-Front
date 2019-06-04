import React, { Component } from "react";
import MUIDataTable from "mui-datatables";

let props = "";
let candidaturesData = "";

export default class DataTableCandidat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidaturesProps: "",
      formatEnd: false
    };
    this.renderDataTable = this.renderDataTable.bind(this);
    this.renderCandidatures = this.renderCandidatures.bind(this);
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
  renderCandidatures(boolean) {
    if (boolean === true) {
      const self = this;
      candidaturesData = this.state.candidaturesProps.filter(function(item, i) {
        if (item.etat !== "brouillon") {
          item.nom = item.candidat[0].nom.toUpperCase();
          item.prenom = item.candidat[0].prenom;
          item.mail = item.candidat[0].mail;
          item.dateCreation = self.formatDate(item.date);
          if (item.dateTraitement !== "") {
            item.dateTraite = self.formatDate(item.dateTraitement);
          }
          return item;
        }
        return false;
      });
      if (candidaturesData.length === this.state.candidaturesProps.length - 1) {
        return this.renderDataTable(true);
      }
    }
  }
  // Fonction pour afficher la DataTable
  renderDataTable(boolean) {
    if (boolean === true) {
      const columns = [
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
          name: "commentaire",
          label: "Commentaire"
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

      const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "scroll",
        expandableRows: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 50],
        download: false,
        textLabels: {
          body: {
            noMatch: "Vous n'avez aucune candidature.",
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
          },
          selectedRows: {
            text: "Ligne sélectionnée",
            delete: "Supprimer",
            deleteAria: "Supprimer la ligne"
          }
        },
        selectableRows: "single",
        onRowsSelect: (rowsSelected, allRows) => {
          console.log(rowsSelected);
        },
        isRowSelectable: dataIndex => {
          // On peut sélectionner uniquement les candidatures "en attente"
          return candidaturesData[dataIndex].etat === "en attente";
        },
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
                return (dateA > dateB ? -1 : 1) * (order === "desc" ? 1 : -1);
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
          title={"Suivi de vos candidatures"}
          data={candidaturesData}
          columns={columns}
          options={options}
        />
      );
    }
  }
  render() {
    return (
      <div
        style={{
          marginBottom: "3em",
          marginTop: "1em",
          marginRight: "2em",
          marginLeft: "2em"
        }}
      >
        {this.renderCandidatures(this.state.formatEnd)}
      </div>
    );
  }
}
