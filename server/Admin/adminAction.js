let auth = module.exports;
const AdminProcess = require("./adminProcess");

auth.checkAuth = function(req, res, next) {
  AdminProcess.checkAuth(req);
};
