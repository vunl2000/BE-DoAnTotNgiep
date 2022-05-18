const mAdminac = require("./admin/Admin");
const mUserac = require("./users/AccountUser");

const mFirstImg = require("./firstimages/FirstImages");



function routes(app) {

  app.use("/account-ad", mAdminac);

  app.use("/account-user", mUserac);


  app.use("/img-first-images", mFirstImg);


}

module.exports = routes;
