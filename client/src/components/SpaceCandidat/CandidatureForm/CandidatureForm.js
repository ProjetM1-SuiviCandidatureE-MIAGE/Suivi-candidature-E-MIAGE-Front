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
      temp: "",
      loadEnd: false
    };
    // On bind toutes les fonctions qui vont utiliser le this.state
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetForm = this.handleResetForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.renderFilePonds = this.renderFilePonds.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.renderButtonViewFile = this.renderButtonViewFile.bind(this);
  }
  // Fonction qui s'éxecute à la création du composant mais après le constructor et le render
  componentDidMount() {
    getCandidat = this.props.get;
    candidaturesCandidat = this.props.candidatures;
    brouillonCandidat = this.props.brouillon;
    fetchCandidatures = this.props.fetch;

    console.log("Props Brouillons : " + JSON.stringify(brouillonCandidat));
    console.log("Props Candidatures : " + JSON.stringify(candidaturesCandidat));

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
    console.log(this.state);
    const requiredCV = this.state.CV.length > 0 ? true : false;
    const requiredLM = this.state.LM.length > 0 ? true : false;
    const requiredDI = this.state.DI.length > 0 ? true : false;
    const requiredRN = this.state.RN.length > 0 ? true : false;
    console.log(requiredCV + requiredLM + requiredDI + requiredRN);

    if (requiredCV + requiredLM + requiredDI + requiredRN === 4) {
      if (this.state.formValid === false) {
        this.setState({
          formValid: true
        });
      }
    }
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
            ",<br /> votre candidature a bien été créée.<br /><br />Cordialement"
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
  }
  ////////////////////////////////////////////////////////
  // Fonction pour sauvegarder la candidature en brouillon
  handleSave() {
    const Candidat = getCandidat();
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
        console.log(body);
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
    this.setState({
      temp: file.name
    });
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
            (Curriculum Vitae)*
          </div>
          <FilePond
            ref={refCV => (this.pond = refCV)}
            files={this.state.fileCV}
            allowMultiple={false}
            required={true}
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
              this.deleteFile(file.file, this.state.CV[0].nom);
            }}
            onupdatefiles={fileItems => {
              console.log(fileItems);
              if (fileItems.length === 0) {
                this.setState({
                  CV:
                    this.state.temp === this.state.CV[0].ancienNom
                      ? []
                      : this.state.CV,
                  fileCV: ""
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
            motivation*
          </div>
          <FilePond
            ref={refLM => (this.pond = refLM)}
            files={this.state.fileLM}
            allowMultiple={false}
            required={true}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            allowFileRename={true}
            fileRenameFunction={file => {
              return (
                "LM_" +
                getCandidat().nom +
                "_" +
                this.state.brouillon._id.substring(18) +
                file.extension
              );
            }}
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
              this.deleteFile(file.file);
            }}
            onupdatefiles={fileItems => {
              if (fileItems.length === 0) {
                this.setState({
                  LM: [],
                  fileLM: ""
                });
              } else {
                const fileData = [
                  {
                    nom: fileItems[0].filename,
                    date: fileItems[0].source.lastModifiedDate,
                    fichier: fileItems[0].filename,
                    ancienNom: fileItems[0].source.name
                  }
                ];
                this.setState({
                  LM: fileData,
                  fileLM: fileItems
                });
              }
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          {this.renderButtonViewFile(this.state.LM)}
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Diplôme*
          </div>
          <FilePond
            ref={refDI => (this.pond = refDI)}
            files={this.state.fileDI}
            allowMultiple={false}
            required={true}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            allowFileRename={true}
            fileRenameFunction={file => {
              return (
                "DI_" +
                getCandidat().nom +
                "_" +
                this.state.brouillon._id.substring(18) +
                file.extension
              );
            }}
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
              this.deleteFile(file.file);
            }}
            onupdatefiles={fileItems => {
              if (fileItems.length === 0) {
                this.setState({
                  DI: [],
                  fileDI: ""
                });
              } else {
                const fileData = [
                  {
                    nom: fileItems[0].filename,
                    date: fileItems[0].source.lastModifiedDate,
                    fichier: fileItems[0].filename,
                    ancienNom: fileItems[0].source.name
                  }
                ];
                this.setState({
                  DI: fileData,
                  fileDI: fileItems
                });
              }
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          {this.renderButtonViewFile(this.state.DI)}
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Relevé de
            notes*
          </div>
          <FilePond
            ref={refRN => (this.pond = refRN)}
            files={this.state.fileRN}
            allowMultiple={false}
            required={true}
            allowFileSizeValidation={true}
            maxFileSize={2000000} // 2MB
            allowFileTypeValidation={true}
            allowFileRename={true}
            fileRenameFunction={file => {
              return (
                "RN_" +
                getCandidat().nom +
                "_" +
                this.state.brouillon._id.substring(18) +
                file.extension
              );
            }}
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
              this.deleteFile(file.file);
            }}
            onupdatefiles={fileItems => {
              if (fileItems.length === 0) {
                this.setState({
                  RN: [],
                  fileRN: ""
                });
              } else {
                const fileData = [
                  {
                    nom: fileItems[0].filename,
                    date: fileItems[0].source.lastModifiedDate,
                    fichier: fileItems[0].filename,
                    ancienNom: fileItems[0].source.name
                  }
                ];
                this.setState({
                  RN: fileData,
                  fileRN: fileItems
                });
              }
            }}
            labelTapToCancel={"Cliquez pour annuler "}
          />
          {this.renderButtonViewFile(this.state.RN)}
          <div className="text-center">
            <MDBIcon icon="cloud-upload-alt mdb-gallery-view-icon" /> Autres
            fichiers (max {maxFiles} fichiers){" "}
          </div>
          <FilePond
            ref={ref => (this.pond = ref)}
            files={this.state.fileAF}
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
              return (
                "AF" +
                numero +
                "_" +
                getCandidat().nom +
                "_" +
                this.state.brouillon._id.substring(18) +
                file.extension
              );
            }}
            acceptedFileTypes={["application/pdf"]}
            labelFileTypeNotAllowed={"Type du fichier invalide !"}
            fileValidateTypeLabelExpectedTypes={"Format accepté : PDF"}
            labelIdle={"Glissez et déposez vos fichiers ici"}
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
            onremovefile={file => {
              this.deleteFile(file.file);
            }}
            onupdatefiles={fileItems => {
              console.log(fileItems);
              if (fileItems.length === 0) {
                this.setState({
                  AF: []
                });
              } else {
                const fileData = {
                  nom: fileItems[0].filename,
                  date: fileItems[0].source.lastModifiedDate,
                  fichier: fileItems[0].filename,
                  ancienNom: fileItems[0].source.name
                };
                this.setState({
                  AF: this.state.AF.push(fileData),
                  fileAF: fileItems
                });
              }
              console.log(this.state.AF);
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
    console.log(file);
    if (file.length !== 0) {
      const ext = file[0].nom.split(".").pop();
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
          <MDBBtn type="submit" outline color="primary" className="CloseButton">
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
