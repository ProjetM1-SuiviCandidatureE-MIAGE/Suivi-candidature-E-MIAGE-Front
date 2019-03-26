const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const busboy = require("connect-busboy");
const fs = require("fs"),
  path = require("path"),
  async = require("async");
//--END CONSTANT

// Connexion à la BDD'candidature'
mongoose
  .connect("mongodb://localhost/candidature", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(e => {
    console.log("Error while DB connecting");
    console.log(e);
  });

const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(busboy());

// ------------------------
// LIST ROUTE
// ------------------------
// -- LIRE UN REPERTOIRE
app.get("/", function(req, res) {
  let myDir = [];
  fs.readdir(path.join(__dirname), (err, result) => {
    async.each(
      result,
      (file, callback) => {
        // --
        fs.stat(path.join(__dirname, file), (err, stat) => {
          if (stat.isFile()) {
            myDir.push("http://localhost:3010/files/" + file + "");
          }
          callback();
        });
      },
      err => {
        res.status(200).json({ repo: myDir });
      }
    );
  });
});
// -- Read File
app.get("/files/:path", function(req, res) {
  res.sendFile(path.join(__dirname, req.params.path));
});

//Définition des CORS
app.use(function(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/candidatures", require("./Candidature/candidatureRoute"));
app.use("/admins", require("./Admin/adminRoute"));
app.use("/apprenants", require("./Apprenant/apprenantRoute"));
app.use("/candidats", require("./Candidat/candidatRoute"));
app.use("/mail", require("./Candidature/Mail"));
app.use("/upload", require("./Candidature/upload"));

console.log("le server est connecté sur le port 3010");
app.listen(3010);
