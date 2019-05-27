import React, { Component } from "react";
import MUIDataTable from "mui-datatables";

let props = "";

export default class DataTableAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidaturesProps: "",
      candidaturesDisplay: "",
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
          label: "Date de création"
        },
        {
          name: "etat",
          label: "Etat"
        }
      ];
      const self = this;
      let data = this.state.candidaturesProps.map(function(item, i) {
        item.nom = item.candidat[0].nom;
        item.prenom = item.candidat[0].prenom;
        item.mail = item.candidat[0].mail;
        item.dateCreation = self.formatDate(item.date);
        return item;
      });
      console.log(data);

      const options = {
        resizableColumns: true,
        expandableRows: true,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 50]
      };
      return (
        <MUIDataTable
          title={"Candidatures non traitées"}
          data={data}
          columns={columns}
          options={options}
        />
      );
    }
  }
  // Fonctionne pour afficher le code HTML du composant
  render() {
    return <div>{this.renderDataTable(this.state.formatEnd)}</div>;
  }
}
