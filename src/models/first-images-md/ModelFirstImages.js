const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const mFirstImg = new Schema(
  {
    imagefirst: {
      type: String,
    },
    titlefirst: {
      type: String,
    },
    descriptionfirst: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const FirstImg = mongoose.model("up_first_images", mFirstImg);

const mValidate = (banner) => {
  const shema = Joi.object({
    imagefirst: Joi.string(),
    titlefirst: Joi.string().required().trim(),
    descriptionfirst: Joi.string().required().trim(),
  });
  return shema.validate(banner);
};

module.exports = { FirstImg, mValidate };
