const {
  Account,
  mValidateRefreshPassWordNew,
} = require("../../models/users-md/ModelUser");
const bcrypt = require("bcryptjs");
const Token = require("../../models/tokens/TokensUser");

class UpdatePasswordWithLinkController {
  async mUpdatePasswordWithLink(req, res, next) {
    try {
      const user = await Account.findById(req.params.userID);
      const mFormData = req.body;
      const passwordRefreshNew = mFormData.passwordRefreshNew;
      const passwordConfirmRefreshNew = mFormData.passwordConfirmRefreshNew;
      const { error } = mValidateRefreshPassWordNew(mFormData);
      if (error) {
        res.status(400).json({
          messeage: "Đã xảy ra lỗi",
        });
      } else {
        if (!user) {
          res.status(400).json({
            messeage: "Liên kết không hợp lệ hoặc đã hết hạn",
          });
        } else {
          const token = await Token.findOne({
            userID: user._id,
            toke: req.params.token,
          });
          if (!token) {
            res.status(400).json({
              messeage: "Liên kết không hợp lệ hoặc đã hết hạn",
            });
          } else {
            if (passwordRefreshNew !== passwordConfirmRefreshNew) {
              res.status(400).json({
                messeage: "Mật khẩu không khớp",
              });
            } else {
              if (
                passwordRefreshNew.length <= 6 ||
                passwordConfirmRefreshNew.length <= 6
              ) {
                res.status(400).json({
                  messeage: "Mật khẩu phải lớn hơn 6 ký tự",
                });
              } else {
                bcrypt.hash(
                  passwordRefreshNew,
                  10,
                  async function (err, hashedPass) {
                    if (err) {
                      res.status(400).json({
                        error: err,
                      });
                    } else {
                      user.password = hashedPass;
                      await user.save();
                      await token.delete();
                      res.status(200).json({
                        messeage: "Đổi mật khẩu thành công !!!",
                      });
                    }
                  }
                );
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UpdatePasswordWithLinkController();
