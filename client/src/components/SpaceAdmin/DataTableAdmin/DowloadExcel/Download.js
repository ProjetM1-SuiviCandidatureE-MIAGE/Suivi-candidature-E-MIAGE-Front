import React, { Component } from "react";
import ReactExport from "react-data-export";
import Tooltip from "@material-ui/core/Tooltip";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const MyButton = React.forwardRef((props, ref) => (
  <Tooltip title="Télécharger" placement="bottom" ref={ref}>
    <button
      {...props}
      ref={ref}
      className="MuiButtonBase-root MuiIconButton-root MUIDataTableToolbar-icon-217"
      type="button"
    >
      <span className="MuiIconButton-label">
        <svg
          className="MuiSvgIcon-root"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
        </svg>
      </span>
    </button>
  </Tooltip>
));

export default class Download extends Component {
  render() {
    const reff = React.createRef();
    return (
      <ExcelFile
        filename={this.props.fileName}
        element={<MyButton ref={reff} />}
      >
        <ExcelSheet data={this.props.candidatures} name="Employees">
          <ExcelColumn label="Nom" value="nom" />
          <ExcelColumn label="Prénom" value="prenom" />
          <ExcelColumn label="Mail" value="mail" />
          <ExcelColumn label="Date de création" value="dateCreation" />
          <ExcelColumn label="Date de traitement" value="dateTraite" />
          <ExcelColumn label="Commentaire" value="commentaire" />
          <ExcelColumn label="Etat" value="etat" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
