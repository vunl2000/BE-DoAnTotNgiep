const {
  Account,
  mValidateChangePassWord,
} =  require("../../models/users-md/ModelUser");
const bcrypt = require("bcryptjs");

// Xử lý phần đổi mật khẩu
class RefreshController {
  mRefresh(req, res, next) {
    const mFormData = req.body;
    let password = mFormData.password;
    let passwordNew = mFormData.passwordNew;
    let passwordConfirmNew = mFormData.passwordNewConfirm;

    const { error } = mValidateChangePassWord(mFormData);

    if (error) {
      // Kiểm tra validate
      res.status(400).json({
        error: error,
        messeage: "Đã có lỗi xảy ra",
      });
    } else {
      Account.findById(req.params.id, (err, ad_accounts) => {
        if (err) {
          res.status(400).json({ messeage: "Đã có lỗi xảy ra" });
        } else {
          bcrypt.compare(
            password,
            ad_accounts.password,
            function (err, resule) {
              if (err) {
                res.status(400).json({
                  messeage: "Đã xảy ra lỗi",
                });
              } else {
                if (!resule) {
                  // Check mật khẩu mới nhập có khớp với mật khẩu trong db không
                  res.status(400).json({
                    messeage: "Mật khẩu cũ không hợp lệ",
                  });
                } else {
                  if (passwordNew !== passwordConfirmNew) {
                    // So sánh mật 2 mật khẩu mới nhập vào có khớp hay không ?
                    res.status(400).json({
                      messeage: "Mật khẩu không khớp ",
                    });
                  } else {
                    if (passwordNew.length <= 6 || passwordConfirmNew <= 6) {
                      res.status(400).json({
                        messeage: "Mật khẩu phải lớn hơn 6 ký tự",
                      });
                    } else {
                      bcrypt.hash(passwordNew, 10, function (err, hashedPass) {
                        if (err) {
                          res.status(400).json({
                            messeage: "Đã xảy ra lỗi 179",
                          });
                        } else {
                          // console.log(hashedPass);
                          passwordNew = hashedPass;
                          console.log(passwordNew);
                          Account.updateOne(
                            { _id: req.params.id },
                            { password: passwordNew },
                            (err) => {
                              if (!err) {
                                //Kiểm tra khác error
                                res.status(200).json({
                                  messeage: "Đổi mật khẩu thành công",
                                });
                              } else {
                                res.status(400).json({
                                  messeage: "Đỗi mật khẩu thất bại",
                                });
                              }
                            }
                          );
                        }
                      });
                    }
                  }
                }
              }
            }
          );
        }
      });
    }
  }
}

module.exports = new RefreshController();
