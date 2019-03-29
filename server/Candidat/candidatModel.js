const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const candidatSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true, 
  },
  mail: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  token: String
});

//champs qui n'est pas stocké dans la base calculé et permet la relation entre les différents candidats
candidatSchema.virtual("candidatures", {
  ref: "candidatureModel",
  localField: "_id",
  foreignField: "candidat"
});

candidatSchema.methods = {
  authenticate: function(password) {
    return bcrypt.compareSync(password, this.mdp);
  },
  validateEmail : function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }
  /*
	getToken: function () {
		return jwt.encode(this, config.secret);
	}*/
};

candidatSchema.methods.getToken = function() {
  console.log(this.token);
  if (this.token === undefined) {
    this.token = Date.now();
    console.log(this.token);
    this.save();
  }
  return this.token;
};

candidatSchema.methods.validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const Candidat = mongoose.model("Candidat", candidatSchema);
module.exports = Candidat;
