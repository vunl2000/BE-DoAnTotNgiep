const { Account, mValidateLogin } =  require("../../models/users-md/ModelUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class LoginController {
  //Đăng nhập account-admin
  mLoginAdmin(req, res, next) {
    const formData = req.body;
    const email = formData.email;
    const password = formData.password;
    const { error } = mValidateLogin(formData);

    if (error) {
      // Kiểm tra validate
      res.status(400).json({
        error,
        messeage: "Đã xảy ra lỗi",
      });
    } else {
      Account.findOne({ $or: [{ email: email }] }).then((user) => {
        if (!user) {
          //Kiểm tra người dùng xem có tồn tại hay không ?
          res.status(400).json({
            messeage: "Tên đăng nhập hoặc mật khẩu sai",
          });
        } else {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              //Kiểm tra xem có lỗi hay không
              res.status(400).json({
                messeage: "Đã xảy ra lỗi",
                error: err,
              });
            } else {
              if (!result) {
                // Kiểm tra result
                res.status(400).json({
                  messeage: "Mật khẩu không chính xác",
                });
              } else {
                let token = jwt.sign({ email: user.email }, "verySecretValue", {
                  expiresIn: "1h",
                });
                res.status(200).json({
                  user,
                  token,
                });
              }
            }
          });
        }
      });
    }
  }
}

module.exports = new LoginController();
