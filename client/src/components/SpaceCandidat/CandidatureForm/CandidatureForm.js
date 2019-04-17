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
let setCandidat = "";
let candidaturesCandidat = "";
let brouillonCandidat = "";

// Le formulaire de création d'une candidature
class CandidatureForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: false,
      statut: "",
      date: "",
      CV: "",
      LM: "",
      files: "",
      mail: "",
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
    setCandidat = this.props.set;
    candidaturesCandidat = this.props.candidatures;
    brouillonCandidat = this.props.brouillon;

    console.log(brouillonCandidat);
    console.log(candidaturesCandidat);

    this.setState({
      mail:
        brouillonCandidat === "vide" ? "vide" : brouillonCandidat.candidat.mail,
      candidatures: candidaturesCandidat,
      brouillon: brouillonCandidat
    });
  }
  // Méthode pour changer le mail dans l'MDBInput
  handleEmailChange(e) {
    const value = e.target.value;
    this.setState({
      mail: value
    });
  }
  // Méthode pour créer une candidature
  handleSubmit(e) {
    e.preventDefault();
    console.log("submit !");
    if (this.state.formValid === true) {
      fetch("/candidatures/newCandidature", {
        method: "POST",
        body: JSON.stringify({
          etat: "non traitée",
          commentaire: "",
          date: new Date(),
          CV: this.state.CV,
          LM: this.state.LM,
          files: this.state.files,
          candidat: getCandidat()
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
          mail: this.state.candidat.mail,
          sujet: "Confirmation de la creation de votre candidature",
          texte:
            "Bonjour " +
            this.state.candidat.firstName +
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
  // Fonction pour sauvegarder la candidature en brouillon
  handleSave(e) {
    e.preventDefault();
    fetch("/candidatures/saveCandidature", {
      method: "POST",
      body: JSON.stringify({
        etat: "brouillon",
        commentaire: "",
        date: new Date(),
        CV: this.state.CV,
        LM: this.state.LM,
        files: this.state.files,
        candidat: getCandidat()
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
  // Méthode pour reset le formulaire avec les valeurs de bases
  handleResetForm(e) {
    e.preventDefault();
    this.setState({
      formValid: false,
      statut: "",
      date: new Date(),
      files: ""
      /*       mail: propsUser.mail */
    });
  }
  // Fonction pour supprimer un fichier quand l'utilisateur clique sur la croix
  deleteFile(file) {
    console.log("deleteFile() + ");
    console.log(file);
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
            allowFileSizeValidation={true}
            maxFileSize={5000000} // 5MB
            allowFileTypeValidation={true}
            acceptedFileTypes={[
              "application/msword",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={
              "Type accepté : doc, docx et pdf"
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
                console.log("variable CV updated !"),
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
            allowFileSizeValidation={true}
            maxFileSize={5000000} // 5MB
            allowFileTypeValidation={true}
            acceptedFileTypes={[
              "application/msword",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={
              "Type accepté : doc, docx et pdf"
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
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Autres
            fichiers (max {maxFiles} fichiers){" "}
          </div>
          <FilePond
            ref={ref => (this.pond = ref)}
            files={this.state.files}
            registerPlugin={registerPlugin}
            allowMultiple={true}
            maxFiles={maxFiles}
            allowFileSizeValidation={true}
            maxTotalFileSize={10000000} // 10MB
            allowFileTypeValidation={true}
            acceptedFileTypes={[
              "application/msword",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={
              "Type accepté : doc, docx et pdf"
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
                console.log("variable files updated !"),
                console.log(this.state.files)
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
