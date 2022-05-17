const mAdminac = require("./admin/Admin");

function routes(app) {
  app.use("/account-ad", mAdminac);
}

module.exports = routes;
