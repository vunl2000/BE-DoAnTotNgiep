const express = require("express");
const router = express.Router();
const mRegisterController = require("../../controllers/admins/RegisterController");

const mLoginController = require("../../controllers/admins/LoginController");

const mRefreshController = require("../../controllers/admins/RefreshController");

const mLinkResetController = require("../../controllers/admins/LinkResetController");

const mUpdatePasswordWithLinkController = require("../../controllers/admins/UpdatePasswordWithLinkController");

const mLayout = require("../../controllers/admins/LayoutController");

router.post("/register-admin", mRegisterController.mRegister);

router.get("/login-admin", mLoginController.mLoginAdmin);

router.put("/refresh-password-admin/:id", mRefreshController.mRefresh);

router.post("/link-reset-password-admin", mLinkResetController.mLinkReset);

router.put(
  "/link-reset-password-admin/:userID/:token",
  mUpdatePasswordWithLinkController.mUpdatePasswordWithLink
);

//Render ra form UI đổi mật khẩu
router.get(
  "/new-password-admin/:userID/:token",
  mLayout.mRenderLayoutChangePassword
);

module.exports = router;
