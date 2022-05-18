const {
  FirstImg,
  mValidate,
} = require("../../models/first-images-md/ModelFirstImages");

class CreactFirst {
  mCreactBanner(req, res, next) {
    const mFormData = req.body;
    const mFirstImg = new FirstImg(mFormData);
    const { error } = mValidate(mFormData);

    if (error) {
      // Kiểm tra validate form
      res.status(400).json({
        message: "Đã có lỗi xảy ra",
        error,
      });
    } else {
      if (req.file) {
        // kiểm tra xem trường này nhập vào có phải là 1 file hay không ?
        mFirstImg.imagefirst = req.file.path;
      }
      mFirstImg.save((err) => {
        if (err) {
          res.status(400).json({ message: "Lỗi không lưu được" });
        } else {
          res.status(200).json({ message: "Lưu thành công" });
          console.log(mFirstImg);
        }
      });
    }
  }
}

module.exports = new CreactFirst();
