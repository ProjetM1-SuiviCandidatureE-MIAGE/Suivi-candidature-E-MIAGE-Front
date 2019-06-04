import React, { Component } from "react";
import {
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
import "filepond/dist/filepond.min.css";
import "./CandidatureForm.css";
import Tooltip from "@material-ui/core/Tooltip";
import MySnackBar from "../../SnackBar/MySnackBar";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);
let getCandidat = "";
let candidaturesCandidat = "";
let brouillonCandidat = "";
let fetchCandidatures = "";

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

      fileCV: "",
      CV: [],
      fileLM: "",
      LM: [],
      fileDI: "",
      DI: [],
      fileRN: "",
      RN: [],
      fileAF: "",
      AF: [],

      candidatures: "",
      brouillon: "",
      loadEnd: false,
      openSnackBar: false
    };
    // On bind toutes les fonctions qui vont utiliser le this.state
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetForm = this.handleResetForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.renderFilePonds = this.renderFilePonds.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.renderButtonViewFile = this.renderButtonViewFile.bind(this);
    this.changeSnackBar = this.changeSnackBar.bind(this);
  }
  // Fonction qui s'éxecute à la création du composant mais après le constructor et le render
  componentDidMount() {
    getCandidat = this.props.get;
    candidaturesCandidat = this.props.candidatures;
    brouillonCandidat = this.props.brouillon;
    fetchCandidatures = this.props.fetch;

    console.log("Candidatures : " + candidaturesCandidat.length);

    this.setState({
      candidatures: candidaturesCandidat,
      brouillon: brouillonCandidat[0],

      CV: brouillonCandidat[0].cv,
      LM: brouillonCandidat[0].lm,
      DI: brouillonCandidat[0].diplome,
      RN: brouillonCandidat[0].releveNote,
      AF: brouillonCandidat[0].autresFichier,

      loadEnd: true
    });
  }
  ////////////////////////////////////////////////////////////
  /// Fonction qui s'éxecute à chaque fois que l'état (le this.state) du composant est modifié
  componentDidUpdate() {
    const requiredCV = this.state.CV.length > 0 ? true : false;
    const requiredLM = this.state.LM.length > 0 ? true : false;
    const requiredDI = this.state.DI.length > 0 ? true : false;
    const requiredRN = this.state.RN.length > 0 ? true : false;

    if (requiredCV + requiredLM + requiredDI + requiredRN === 4) {
      if (this.state.formValid === false) {
        this.setState({
          formValid: true
        });
      }
    }
  }
  //////////////////////////////////////////////////////////
  ///// Fonction pour ouvrir le snackBar après la sauvegarde de la candidature
  changeSnackBar() {
    this.setState({
      openSnackBar: !this.state.openSnackBar
    });
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
  ////////////////////////////////////////////////////
  // Méthode pour envoyer une candidature quand elle est complète
  handleSubmit(e) {
    e.preventDefault();
    const Candidat = getCandidat();
    if (this.state.formValid === true) {
      fetch("/candidatures/edit/" + this.state.brouillon._id, {
        method: "PUT",
        body: JSON.stringify({
          etat: "non traitée",
          commentaire: "",
          date: new Date(),
          dateTraitement: this.state.dateTraitement,
          cv: this.state.CV,
          lm: this.state.LM,
          releveNote: this.state.RN,
          diplome: this.state.DI,
          autresFichier: this.state.AF,
          candidat: Candidat
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(body) {
          console.log("candidature envoyée.");
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
            ",<br /> votre candidature a bien été créée.<br /><br />Cordialement"
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(function(response) {
          return response;
        })
        .then(function(body) {
          alert("Vous allez recevoir un mail de confirmation.");
        });

      this.handleResetForm(e);
    }
  }
  ////////////////////////////////////////////////////////
  // Fonction pour sauvegarder la candidature en brouillon
  handleSave() {
    const Candidat = getCandidat();
    const self = this;
    fetch("/candidatures/edit/" + this.state.brouillon._id, {
      method: "PUT",
      body: JSON.stringify({
        etat: "brouillon",
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
        console.log("candidature modifiée.");
        self.changeSnackBar();
      });
  }
  //////////////////////////////////////////////////////////////
  // Méthode pour reset le formulaire avec les valeurs de bases
  handleResetForm(e) {
    e.preventDefault();
    this.setState(
      {
        formValid: false,
        etat: "brouillon",
        date: new Date(),
        commentaire: "",
        dateTraitement: "",
        CV: [],
        LM: [],
        DI: [],
        RN: [],
        AF: [],

        fileCV: "",
        fileAF: "",
        fileLM: "",
        fileDI: "",
        fileRN: "",

        brouillon: ""
      },
      fetchCandidatures()
    );
  }
  ///////////////////////////////////////////////////////////////
  // Fonction pour supprimer un fichier quand l'utilisateur clique sur la croix
  deleteFile(file, name) {
    const self = this;
    fetch("/upload/deleteFile", {
      method: "DELETE",
      body: JSON.stringify({
        fichier: name,
        id: this.state.brouillon._id
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
        self.handleSave();
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
            (Curriculum Vitae)<strong style={{ color: "red" }}>*</strong>
          </div>
          <FilePond
            ref={refCV => (this.pond = refCV)}
            files={this.state.fileCV}
            allowMultiple={false}
            required={true}
            registerPlugin={registerPlugin}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            acceptedFileTypes={["application/pdf"]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={"Format accepté : PDF"}
            labelIdle={"Glissez et déposez votre CV ici"}
            server={{
              process: (
                fieldName,
                file,
                metadata,
                load,
                error,
                progress,
                abort
              ) => {
                const fileName = this.state.CV[0].nom;
                const formData = new FormData();
                formData.append(fieldName, file, fileName);

                const request = new XMLHttpRequest();
                request.open("POST", "/upload/uploadFile");

                request.upload.onprogress = e => {
                  progress(e.lengthComputable, e.loaded, e.total);
                };
                request.onload = function() {
                  if (request.status >= 200 && request.status < 300) {
                    load(request.responseText);
                  } else {
                    error("oh no");
                  }
                };
                request.send(formData);
                return {
                  abort: () => {
                    request.abort();
                    abort();
                  }
                };
              },
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {
              if (this.state.CV[0] !== undefined) {
                this.deleteFile(file.file, this.state.CV[0].nom);
              }
            }}
            onupdatefiles={fileItems => {
              if (fileItems.length === 0) {
                this.setState({
                  CV: [],
                  fileCV: "",
                  formValid: false
                });
              } else {
                if (fileItems[0].fileExtension === "pdf") {
                  const rename =
                    "CV_" +
                    getCandidat().nom +
                    "_" +
                    this.state.brouillon._id.substring(18) +
                    ".pdf";
                  const fileData = [
                    {
                      nom: rename,
                      date: fileItems[0].source.lastModifiedDate,
                      fichier: rename,
                      ancienNom: fileItems[0].source.name
                    }
                  ];
                  this.setState({
                    CV: fileData,
                    fileCV: fileItems
                  });
                }
              }
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          {this.renderButtonViewFile(this.state.CV)}
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Lettre de
            motivation<strong style={{ color: "red" }}>*</strong>
          </div>
          <FilePond
            ref={refLM => (this.pond = refLM)}
            files={this.state.fileLM}
            allowMultiple={false}
            required={true}
            registerPlugin={registerPlugin}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            acceptedFileTypes={["application/pdf"]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={"Format accepté : PDF"}
            labelIdle={"Glissez et déposez votre lettre de motivation ici"}
            server={{
              process: (
                fieldName,
                file,
                metadata,
                load,
                error,
                progress,
                abort
              ) => {
                const fileName = this.state.LM[0].nom;
                const formData = new FormData();
                formData.append(fieldName, file, fileName);

                const request = new XMLHttpRequest();
                request.open("POST", "/upload/uploadFile");

                request.upload.onprogress = e => {
                  progress(e.lengthComputable, e.loaded, e.total);
                };
                request.onload = function() {
                  if (request.status >= 200 && request.status < 300) {
                    load(request.responseText);
                  } else {
                    error("oh no");
                  }
                };
                request.send(formData);
                return {
                  abort: () => {
                    request.abort();
                    abort();
                  }
                };
              },
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {
              if (this.state.LM[0] !== undefined) {
                this.deleteFile(file.file, this.state.LM[0].nom);
              }
            }}
            onupdatefiles={fileItems => {
              if (fileItems.length === 0) {
                this.setState({
                  LM: [],
                  fileLM: "",
                  formValid: false
                });
              } else {
                if (fileItems[0].fileExtension === "pdf") {
                  const rename =
                    "LM_" +
                    getCandidat().nom +
                    "_" +
                    this.state.brouillon._id.substring(18) +
                    ".pdf";
                  const fileData = [
                    {
                      nom: rename,
                      date: fileItems[0].source.lastModifiedDate,
                      fichier: rename,
                      ancienNom: fileItems[0].source.name
                    }
                  ];
                  this.setState({
                    LM: fileData,
                    fileLM: fileItems
                  });
                }
              }
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          {this.renderButtonViewFile(this.state.LM)}
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Diplôme
            <strong style={{ color: "red" }}>*</strong>
          </div>
          <FilePond
            ref={refDI => (this.pond = refDI)}
            files={this.state.fileDI}
            allowMultiple={false}
            registerPlugin={registerPlugin}
            required={true}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            acceptedFileTypes={["application/pdf"]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={"Format accepté : PDF"}
            labelIdle={"Glissez et déposez votre diplôme ici"}
            server={{
              process: (
                fieldName,
                file,
                metadata,
                load,
                error,
                progress,
                abort
              ) => {
                const fileName = this.state.DI[0].nom;
                const formData = new FormData();
                formData.append(fieldName, file, fileName);

                const request = new XMLHttpRequest();
                request.open("POST", "/upload/uploadFile");

                request.upload.onprogress = e => {
                  progress(e.lengthComputable, e.loaded, e.total);
                };
                request.onload = function() {
                  if (request.status >= 200 && request.status < 300) {
                    load(request.responseText);
                  } else {
                    error("oh no");
                  }
                };
                request.send(formData);
                return {
                  abort: () => {
                    request.abort();
                    abort();
                  }
                };
              },
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {
              if (this.state.DI[0] !== undefined) {
                this.deleteFile(file.file, this.state.DI[0].nom);
              }
            }}
            onupdatefiles={fileItems => {
              if (fileItems.length === 0) {
                this.setState({
                  DI: [],
                  fileDI: "",
                  formValid: false
                });
              } else {
                if (fileItems[0].fileExtension === "pdf") {
                  const rename =
                    "DI_" +
                    getCandidat().nom +
                    "_" +
                    this.state.brouillon._id.substring(18) +
                    ".pdf";
                  const fileData = [
                    {
                      nom: rename,
                      date: fileItems[0].source.lastModifiedDate,
                      fichier: rename,
                      ancienNom: fileItems[0].source.name
                    }
                  ];
                  this.setState({
                    DI: fileData,
                    fileDI: fileItems
                  });
                }
              }
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          {this.renderButtonViewFile(this.state.DI)}
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Relevé de
            notes<strong style={{ color: "red" }}>*</strong>
          </div>
          <FilePond
            ref={refRN => (this.pond = refRN)}
            files={this.state.fileRN}
            allowMultiple={false}
            required={true}
            registerPlugin={registerPlugin}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            acceptedFileTypes={["application/pdf"]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={"Format accepté : PDF"}
            labelIdle={"Glissez et déposez votre relevé de notes ici"}
            server={{
              process: (
                fieldName,
                file,
                metadata,
                load,
                error,
                progress,
                abort
              ) => {
                const fileName = this.state.RN[0].nom;
                const formData = new FormData();
                formData.append(fieldName, file, fileName);

                const request = new XMLHttpRequest();
                request.open("POST", "/upload/uploadFile");

                request.upload.onprogress = e => {
                  progress(e.lengthComputable, e.loaded, e.total);
                };
                request.onload = function() {
                  if (request.status >= 200 && request.status < 300) {
                    load(request.responseText);
                  } else {
                    error("oh no");
                  }
                };
                request.send(formData);
                return {
                  abort: () => {
                    request.abort();
                    abort();
                  }
                };
              },
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {
              if (this.state.RN[0] !== undefined) {
                this.deleteFile(file.file, this.state.RN[0].nom);
              }
            }}
            onupdatefiles={fileItems => {
              if (fileItems.length === 0) {
                this.setState({
                  RN: [],
                  fileRN: "",
                  formValid: false
                });
              } else {
                if (fileItems[0].fileExtension === "pdf") {
                  const rename =
                    "RN_" +
                    getCandidat().nom +
                    "_" +
                    this.state.brouillon._id.substring(18) +
                    ".pdf";
                  const fileData = [
                    {
                      nom: rename,
                      date: fileItems[0].source.lastModifiedDate,
                      fichier: rename,
                      ancienNom: fileItems[0].source.name
                    }
                  ];
                  this.setState({
                    RN: fileData,
                    fileRN: fileItems
                  });
                }
              }
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          {this.renderButtonViewFile(this.state.RN)}
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Autre
            fichier (optionnel){" "}
          </div>
          <FilePond
            ref={ref => (this.pond = ref)}
            files={this.state.fileAF}
            registerPlugin={registerPlugin}
            allowMultiple={false}
            required={true}
            allowFileSizeValidation={true}
            maxTotalFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            acceptedFileTypes={["application/pdf"]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={"Format accepté : PDF"}
            labelIdle={"Glissez et déposez votre fichier ici"}
            server={{
              process: (
                fieldName,
                file,
                metadata,
                load,
                error,
                progress,
                abort
              ) => {
                const fileName = this.state.AF[0].nom;
                const formData = new FormData();
                formData.append(fieldName, file, fileName);

                const request = new XMLHttpRequest();
                request.open("POST", "/upload/uploadFile");

                request.upload.onprogress = e => {
                  progress(e.lengthComputable, e.loaded, e.total);
                };
                request.onload = function() {
                  if (request.status >= 200 && request.status < 300) {
                    load(request.responseText);
                  } else {
                    error("oh no");
                  }
                };
                request.send(formData);
                return {
                  abort: () => {
                    request.abort();
                    abort();
                  }
                };
              },
              revert: null,
              load: null,
              restore: null,
              fetch: null
            }}
            onremovefile={file => {}}
            onupdatefiles={fileItems => {
              if (fileItems.length === 0) {
                this.setState({
                  AF: [],
                  fileAF: ""
                });
              } else {
                if (fileItems[0].fileExtension === "pdf") {
                  const rename =
                    "AF_" +
                    getCandidat().nom +
                    "_" +
                    this.state.brouillon._id.substring(18) +
                    ".pdf";
                  const fileData = [
                    {
                      nom: rename,
                      date: fileItems[0].source.lastModifiedDate,
                      fichier: rename,
                      ancienNom: fileItems[0].source.name
                    }
                  ];
                  this.setState({
                    AF: fileData,
                    fileAF: fileItems
                  });
                }
              }
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          {this.renderButtonViewFile(this.state.AF)}
        </div>
      );
    }
  }
  /////////////////////////////////////////////////////////////////
  /// Fonction qui créé un bouton pour visionner le fichier upload
  renderButtonViewFile(file) {
    if (file.length !== 0) {
      const ext = file[file.length - 1].nom.split(".").pop();
      if (ext !== "pdf") {
        return <div />;
      }
      const temp = file;
      return (
        <div>
          <MDBBtn
            outline
            color="default"
            className=""
            onClick={item => this.loadFile(temp)}
          >
            <MDBIcon icon="eye" /> Voir
          </MDBBtn>
          <MDBBtn
            color="default"
            className=""
            onClick={item => this.downloadFile(temp)}
          >
            <MDBIcon icon="file-download" /> Télécharger
          </MDBBtn>
        </div>
      );
    } else {
      return <div />;
    }
  }
  /////////////////////////////////////////////////////////////////
  render() {
    return (
      <MDBCard className="shadow-box-example z-depth-4 CardPerso mx-auto">
        <MDBCardTitle className="font-weight-bold mb-3 mx-auto CardTitle">
          Créer votre candidature
        </MDBCardTitle>
        <MDBCardBody className="CardBody">
          <div>
            <p>
              <strong>Tous les fichiers doivent être au format PDF !</strong>
            </p>
          </div>
          {this.renderFilePonds(this.state.loadEnd)}
        </MDBCardBody>
        <MDBCardText className="CardText">
          <MDBBtn
            type="submit"
            outline
            color="primary"
            className="SaveButton"
            onClick={this.handleSave}
          >
            Sauvegarder
          </MDBBtn>
          <Tooltip
            title={
              this.state.validForm === true
                ? ""
                : "Il manque un ou plusieurs fichiers."
            }
            placement="top"
          >
            <span>
              <MDBBtn
                type="submit"
                color="primary"
                className="SubmitButton"
                onClick={this.handleSubmit}
                disabled={!this.state.formValid}
              >
                Envoyer
              </MDBBtn>
            </span>
          </Tooltip>
          <MySnackBar
            message={"Candidature sauvegardée."}
            open={this.state.openSnackBar}
            close={() => this.changeSnackBar()}
          />
        </MDBCardText>
      </MDBCard>
    );
  }
}
export default CandidatureForm;
