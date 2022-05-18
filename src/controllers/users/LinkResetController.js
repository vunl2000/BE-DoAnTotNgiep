const {
  Account,
  mValidateRefreshPassWord,
} = require("../../models/users-md/ModelUser");
const Token = require("../../models/tokens/TokensUser");
const mSendEmail = require("../../util/SendEmail");
const crypto = require("crypto");
class LinkResetController {
  async mLinkReset(req, res, next) {
    const email = req.body.email;
    const mFormData = req.body;
    const { error } = mValidateRefreshPassWord(mFormData);
    try {
      if (error) {
        res.status(400).json({
          messeage: "Đã xảy ra lỗi",
          error,
        });
      } else {
        const user = await Account.findOne({ email: email });
        if (!user) {
          res.status(400).json({
            messeage: "Email không tồn tại, vui lòng kiểm tra lại",
          });
        } else {
          let token = Token.findOne({ userID: user._id });
          console.log(token);
          if (!token) {
            res.status(400).json({
              messeage: "Đã xảy ra lỗi!!!",
            });
          } else {
            token = await new Token({
              userID: user._id,
              token: crypto.randomBytes(32).toString("hex"),
            }).save();

            const link = `${process.env.BASE_URL}/account-user/link-reset-password-user/${user._id}/${token.token}`;
            await mSendEmail(user.email, "Đặt lại mật khẩu của mình", link);
            res.status(200).json({
              messeage:
                "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn",
            });
          }
        }
      }
    } catch (error) {
      res.status(400).json({
        messeage: "Đã có lỗi xảy ra",
      });
      console.log("Đã xảy ra lỗi", error);
    }
  }
}

module.exports = new LinkResetController();
