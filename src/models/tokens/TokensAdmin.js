const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mTokensSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ad_accounts",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

module.exports = mongoose.model("add_token_admin", mTokensSchema);
