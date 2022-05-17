const {
  Account,
  mValidateRegister,
} = require("../../models/admin-md/ModelAdmin");
const bcrypt = require("bcryptjs");
class RegisterControler {
  //Tạo tài khoản admins
  async mRegister(req, res, next) {
    try {
      const mFormData = req.body;
      const mAccount = await new Account(mFormData);
      const email = mAccount.email;
      let passwordConfirm = mFormData.passwordConfirm;
      let password = mFormData.password;
      const { error } = mValidateRegister(mFormData);

      console.log(mFormData);
      if (error) {
        // kiểm tra validate form ?
        res.status(400).json({
          error,
          messeage: "Đã xảy ra lỗi",
        });
      } else {
        Account.findOne({ $or: [{ email: email }] }).then((user) => {
          if (user) {
            // kiểm tra xem có trùng email hay không ?
            res.status(400).json({
              messeage: "Email này đã có người sử dụng",
            });
          } else {
            if (password !== passwordConfirm) {
              // kiểm tra mật khẩu nhập có giống nhau hay không
              res.status(400).json({
                messeage: "Mật khẩu không khớp",
              });
            } else {
              if (password.length <= 6 || passwordConfirm <= 6) {
                res.status(400).json({
                  messeage: "Mật khẩu phải lớn hơn 6 ký tự",
                });
              } else {
                bcrypt.hash(mFormData.password, 10, function (err, hashedPass) {
                  if (err) {
                    //Kiểm tra xem có mã hoá được mật khẩu hay không
                    res.status(400).json({
                      messeage: "Đã xảy ra lỗi",
                      error: err,
                    });
                  } else {
                    mAccount.password = hashedPass;
                    mAccount.save((err) => {
                      if (!err) {
                        // khác error
                        res.status(200).json({
                          messeage: "Đăng ký tài khoản thành công",
                          mFormData,
                        });
                      } else {
                        res.status(400).json({
                          messeage: "Đăng ký tài khoản thất bại",
                          error: err,
                        });
                      }
                    });
                  }
                });
              }
            }
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        messeage: "Đã xảy ra lỗi",
      });
    }
  }
}
module.exports = new RegisterControler();
