import React, { Component } from "react";
import "./CandidatureForm.css";
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
      files: "",

      candidatures: "",
      brouillon: ""
    };
    // On bind toutes les fonctions qui vont utiliser le this.state
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetForm = this.handleResetForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  // Fonction qui s'éxecute à la création du composant mais après le constructor et le render
  componentDidMount() {
    getCandidat = this.props.get;
    candidaturesCandidat = this.props.candidatures;
    brouillonCandidat = this.props.brouillon;

    console.log("Props Brouillons : " + JSON.stringify(brouillonCandidat));
    console.log("Props Candidatures : " + JSON.stringify(candidaturesCandidat));

    this.setState(
      {
        mail: brouillonCandidat.candidat.mail,
        candidatures: candidaturesCandidat,
        brouillon: brouillonCandidat
      },
      console.log("brouillon : " + this.state.brouillon)
    );
  }
  /////////////////////////////////////////////////
  // Méthode pour changer le mail dans le MDBInput
  handleEmailChange(e) {
    console.log(this.state.brouillon);
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
          autresFichiers: this.state.files,
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
    this.handleResetForm(e);
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
              console.log(file);
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
              this.setState(
                {
                  CV: fileItems.map(fileItem => fileItem.file)
                },
                console.log("CV : "),
                console.log(this.state.CV)
              );
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
              console.log(file);
              return `LM_${getCandidat().nom}_${getCandidat().id.substring(
                18
              )}${file.extension}`;
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
              this.setState(
                {
                  LM: fileItems.map(fileItem => fileItem.file)
                },
                console.log("variable LM updated !"),
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
              console.log(file);
              return `DI_${getCandidat().nom}_${getCandidat().id.substring(
                18
              )}${file.extension}`;
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
              this.setState(
                {
                  DI: fileItems.map(fileItem => fileItem.file)
                },
                console.log("variable DI updated !"),
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
              console.log(file);
              return `RN_${getCandidat().nom}_${getCandidat().id.substring(
                18
              )}${file.extension}`;
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
              this.setState(
                {
                  RN: fileItems.map(fileItem => fileItem.file)
                },
                console.log("Relevé : " + this.state.RN)
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
              console.log(file);
              let numero = this.state.files.length + 1;
              return `AF${numero}_${
                getCandidat().nom
              }_${getCandidat().id.substring(18)}${file.extension}`;
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
              this.setState(
                {
                  files: fileItems.map(fileItem => fileItem.file)
                },
                console.log("Autres fichiers : " + this.state.files)
              );
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
        </MDBCardBody>
        <MDBCardText className="CardText">
          <MDBBtn
            type="submit"
            outline
            color="primary"
            className="CloseDItton"
            onClick={this.handleResetForm}
          >
            Annuler
          </MDBBtn>
          <MDBBtn
            type="submit"
            color="primary"
            className="SaveDItton"
            onClick={this.handleSave}
          >
            Sauvegarder
          </MDBBtn>
          <MDBBtn
            type="submit"
            color="primary"
            className="SubmitDItton"
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
