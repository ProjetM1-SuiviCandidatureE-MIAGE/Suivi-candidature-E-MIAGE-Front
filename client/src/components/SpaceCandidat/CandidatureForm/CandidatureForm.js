import React, { Component } from "react";
import {
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileRename from "filepond-plugin-file-rename";
import "filepond/dist/filepond.min.css";
import "./CandidatureForm.css";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginFileRename
);
const maxFiles = 3;
let getCandidat = "";
let candidaturesCandidat = "";
let brouillonCandidat = "";

// Le formulaire de création d'une candidature
class CandidatureForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: false,

      etat: "brouillon",
      date: new Date(),
      commentaire: "",
      dateTraitement: "",
      mail: "",
      CV: "",
      LM: "",
      DI: "",
      RN: "",
      files: [],

      candidatures: "",
      brouillon: "",

      loadEnd: false
    };
    // On bind toutes les fonctions qui vont utiliser le this.state
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetForm = this.handleResetForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.renderFilePonds = this.renderFilePonds.bind(this);
  }
  // Fonction qui s'éxecute à la création du composant mais après le constructor et le render
  componentDidMount() {
    getCandidat = this.props.get;
    candidaturesCandidat = this.props.candidatures;
    brouillonCandidat = this.props.brouillon;

    console.log("Props Brouillons : " + JSON.stringify(brouillonCandidat));
    console.log("Props Candidatures : " + JSON.stringify(candidaturesCandidat));

    this.setState({
      mail: brouillonCandidat[0].candidat.mail,
      candidatures: candidaturesCandidat,
      brouillon: brouillonCandidat[0],

      CV: brouillonCandidat[0].cv,
      LM: brouillonCandidat[0].lm,
      DI: brouillonCandidat[0].diplome,
      RN: brouillonCandidat[0].releveNote,
      files: brouillonCandidat[0].autresFichier,

      loadEnd: true
    });
  }
  /////////////////////////////////////////////////
  // Méthode pour changer le mail dans le MDBInput
  handleEmailChange(e) {
    console.log(this.state);
    const value = e.target.value;
    this.setState({
      mail: value
    });
  }
  ////////////////////////////////////////////////////
  // Méthode pour créer une candidature
  handleSubmit(e) {
    e.preventDefault();
    console.log("submit !");
    const Candidat = getCandidat();
    if (this.state.formValid === true) {
      fetch("/candidatures/newCandidature", {
        method: "POST",
        body: JSON.stringify({
          etat: "non traitée",
          commentaire: "",
          date: new Date(),
          dateTraitement: this.state.dateTraitement,
          cv: this.state.CV,
          lm: this.state.LM,
          releveNote: this.state.RN,
          diplome: this.state.DI,
          autresFichier: this.state.files,
          candidat: Candidat
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(body) {
          console.log(body);
        });

      fetch("/mail/send", {
        method: "POST",
        body: JSON.stringify({
          mail: Candidat.mail,
          sujet: "Confirmation de la création de votre candidature",
          texte:
            "Bonjour " +
            Candidat.prenom +
            " " +
            Candidat.nom +
            ",<br /> Votre candidature a bien été créée.<br />Cordialement"
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(body) {
          console.log(body);
        });

      this.handleResetForm(e);
    } else {
      console.log("formulaire non valide petit malin :D !");
    }
  }
  ////////////////////////////////////////////////////////
  // Fonction pour sauvegarder la candidature en brouillon
  handleSave(e) {
    e.preventDefault();
    const Candidat = getCandidat();
    fetch(`/candidatures/edit/${this.state.brouillon._id}`, {
      method: "PUT",
      body: JSON.stringify({
        etat: "brouillon",
        commentaire: this.state.mail,
        date: new Date(),
        dateTraitement: this.state.dateTraitement,
        cv: this.state.CV,
        lm: this.state.LM,
        releveNote: this.state.RN,
        diplome: this.state.DI,
        autresFichier: this.state.files,
        candidat: Candidat
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
  }
  //////////////////////////////////////////////////////////////
  // Méthode pour reset le formulaire avec les valeurs de bases
  handleResetForm(e) {
    e.preventDefault();
    this.setState({
      formValid: false,
      etat: "brouillon",
      date: new Date(),
      files: "",
      CV: "",
      LM: "",
      DI: "",
      RN: "",
      mail: getCandidat().mail
    });
  }
  ///////////////////////////////////////////////////////////////
  // Fonction pour supprimer un fichier quand l'utilisateur clique sur la croix
  deleteFile(file) {
    fetch("/upload/deleteFile", {
      method: "DELETE",
      body: JSON.stringify({
        fichier: file.name
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
  }
  ////////////////////////////////////////////////////////////
  // Fonction pour afficher les FilePond
  renderFilePonds(boolean) {
    if (boolean === true) {
      return (
        <div>
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> CV
            (Curriculum Vitae)
          </div>
          <FilePond
            ref={refCV => (this.pond = refCV)}
            files={this.state.CV}
            allowMultiple={false}
            required={true}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            allowFileRename={true}
            fileRenameFunction={file => {
              return `CV_${
                getCandidat().nom
              }_${this.state.brouillon._id.substring(18)}${file.extension}`;
            }}
            acceptedFileTypes={[
              "application/msword",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={
              "Format accepté : doc, docx et pdf"
            }
            labelIdle={"Glissez et déposez votre CV ici"}
            server={{
              process: "/upload/uploadFile",
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {
              this.deleteFile(file.file);
            }}
            onupdatefiles={fileItems => {
              console.log(fileItems);
              if (fileItems.length === 0) {
                console.log("CV vide");
                this.setState(
                  {
                    CV: ""
                  },
                  console.log(this.state.CV)
                );
              } else {
                const fileData = {
                  nom: fileItems[0].filename,
                  date: fileItems[0].source.lastModifiedDate,
                  fichier: "server/uploads/CV/" + fileItems[0].filename,
                  ancienNom: fileItems[0].source.name
                };
                this.setState(
                  {
                    CV: fileData
                  },
                  console.log(this.state.CV)
                );
              }
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Lettre de
            motivation
          </div>
          <FilePond
            ref={refLM => (this.pond = refLM)}
            files={this.state.LM}
            allowMultiple={false}
            required={true}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            allowFileRename={true}
            fileRenameFunction={file => {
              return `LM_${
                getCandidat().nom
              }_${this.state.brouillon._id.substring(18)}${file.extension}`;
            }}
            acceptedFileTypes={[
              "application/msword",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={
              "Format accepté : doc, docx et pdf"
            }
            labelIdle={"Glissez et déposez votre lettre de motivation ici"}
            server={{
              process: "/upload/uploadFile",
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {
              this.deleteFile(file.file);
            }}
            onupdatefiles={fileItems => {
              const fileData = {
                nom: fileItems[0].filename,
                date: fileItems[0].source.lastModifiedDate,
                fichier: "server/uploads/LM/" + fileItems[0].filename,
                ancienNom: fileItems[0].source.name
              };
              this.setState(
                {
                  LM: fileData
                },
                console.log(this.state.LM)
              );
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Diplôme
          </div>
          <FilePond
            ref={refDI => (this.pond = refDI)}
            files={this.state.DI}
            allowMultiple={false}
            required={true}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            allowFileRename={true}
            fileRenameFunction={file => {
              return `DI_${
                getCandidat().nom
              }_${this.state.brouillon._id.substring(18)}${file.extension}`;
            }}
            acceptedFileTypes={[
              "application/msword",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={
              "Format accepté : doc, docx et pdf"
            }
            labelIdle={"Glissez et déposez votre diplôme ici"}
            server={{
              process: "/upload/uploadFile",
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {
              this.deleteFile(file.file);
            }}
            onupdatefiles={fileItems => {
              const fileData = {
                nom: fileItems[0].filename,
                date: fileItems[0].source.lastModifiedDate,
                fichier: "server/uploads/DI/" + fileItems[0].filename,
                ancienNom: fileItems[0].source.name
              };
              this.setState(
                {
                  DI: fileData
                },
                console.log(this.state.DI)
              );
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Relevé de
            notes
          </div>
          <FilePond
            ref={refRN => (this.pond = refRN)}
            files={this.state.RN}
            allowMultiple={false}
            required={true}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            allowFileRename={true}
            fileRenameFunction={file => {
              return `RN_${
                getCandidat().nom
              }_${this.state.brouillon._id.substring(18)}${file.extension}`;
            }}
            acceptedFileTypes={[
              "application/msword",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={
              "Format accepté : doc, docx et pdf"
            }
            labelIdle={"Glissez et déposez votre relevé de notes ici"}
            server={{
              process: "/upload/uploadFile",
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {
              this.deleteFile(file.file);
            }}
            onupdatefiles={fileItems => {
              const fileData = {
                nom: fileItems[0].filename,
                date: fileItems[0].source.lastModifiedDate,
                fichier: "server/uploads/RN/" + fileItems[0].filename,
                ancienNom: fileItems[0].source.name
              };
              this.setState(
                {
                  RN: fileData
                },
                console.log(this.state.RN)
              );
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Autres
            fichiers (max {maxFiles} fichiers){" "}
          </div>
          <FilePond
            ref={ref => (this.pond = ref)}
            files={this.state.files}
            registerPlugin={registerPlugin}
            allowMultiple={true}
            maxFiles={maxFiles}
            maxParallelUploads={1}
            allowFileSizeValidation={true}
            maxTotalFileSize={10000000} // 10MB
            allowFileTypeValidation={true}
            allowFileRename={true}
            fileRenameFunction={file => {
              let numero = this.state.files.length + 1;
              return `AF${numero}_${
                getCandidat().nom
              }_${this.state.brouillon._id.substring(18)}${file.extension}`;
            }}
            acceptedFileTypes={[
              "application/msword",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={
              "Format accepté : doc, docx et pdf"
            }
            labelIdle={"Glissez et déposez vos fichiers ici"}
            server={{
              process: "/upload/uploadFile",
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {
              this.deleteFile(file.file);
            }}
            onupdatefiles={fileItems => {
              const fileData = {
                nom: fileItems[0].filename,
                date: fileItems[0].source.lastModifiedDate,
                fichier: "server/uploads/AF/" + fileItems[0].filename,
                ancienNom: fileItems[0].source.name
              };
              this.setState(
                {
                  files: this.state.files + fileData
                },
                console.log(this.state.files)
              );
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
        </div>
      );
    }
  }
  // La fonction qui permet d'afficher le code html du composant CandidatureForm donc le formulaire
  render() {
    return (
      <MDBCard className="shadow-box-example z-depth-4 CardPerso mx-auto">
        <MDBCardTitle className="font-weight-bold mb-3 mx-auto CardTitle">
          Créer votre candidature
        </MDBCardTitle>
        <MDBCardBody className="CardBody">
          <MDBInput
            className="MDBInputText"
            type="text"
            name="mail"
            label="Mail professionnel"
            icon="envelope"
            value={this.state.mail}
            onChange={this.handleEmailChange}
            required
            autoComplete="new-password"
          />
          {this.renderFilePonds(this.state.loadEnd)}
        </MDBCardBody>
        <MDBCardText className="CardText">
          <MDBBtn
            type="submit"
            outline
            color="primary"
            className="CloseButton"
            onClick={this.handleResetForm}
          >
            Annuler
          </MDBBtn>
          <MDBBtn
            type="submit"
            color="primary"
            className="SaveButton"
            onClick={this.handleSave}
          >
            Sauvegarder
          </MDBBtn>
          <MDBBtn
            type="submit"
            color="primary"
            className="SubmitButton"
            onClick={this.handleSubmit}
            // true pour que ce soit disabled
            disabled={!this.state.formValid}
          >
            Envoyer
          </MDBBtn>
        </MDBCardText>
      </MDBCard>
    );
  }
}
export default CandidatureForm;
