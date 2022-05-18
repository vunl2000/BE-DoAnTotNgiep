const express = require("express");
const router = express.Router();
const mRegisterController = require("../../controllers/users/RegisterController");

const mLoginController = require("../../controllers/users/LoginController");

const mRefreshController = require("../../controllers/users/RefreshController");

const mLinkResetController = require("../../controllers/users/LinkResetController");

const mUpdatePasswordWithLinkController = require("../../controllers/users/UpdatePasswordWithLinkController");

const mLayout = require("../../controllers/users/LayoutController");



router.post("/register-user", mRegisterController.mRegister);

router.get("/login-user", mLoginController.mLoginAdmin);

router.put("/refresh-password-user/:id", mRefreshController.mRefresh);

router.post("/link-reset-password-user", mLinkResetController.mLinkReset);

router.put(
  "/link-reset-password-user/:userID/:token",
  mUpdatePasswordWithLinkController.mUpdatePasswordWithLink
);

//Render ra form UI đổi mật khẩu
router.get(
  "/new-password-user/:userID/:token",
  mLayout.mRenderLayoutChangePassword
);

module.exports = router;
