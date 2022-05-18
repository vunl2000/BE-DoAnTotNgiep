const express = require("express");
const router = express.Router();
const mFirstImg = require("../../controllers/firstimages/CreactFirst");
const mUpLoad = require("../../middlewares/FirstImages");

router.post("/creact-img", mUpLoad.single("imagefirst"), mFirstImg.mCreactBanner);

// router.get("/get-img", mBanner.mListBaner);

// router.put("/update-img", mBanner.mEditBanner);

// router.delete("/delete-img", mBanner.mDeleteBanner);

module.exports = router;
