const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routers/index");
const mDB = require("./configs/index");
require("dotenv").config();

//Kết nối đến Data
mDB.connect();


//Body -parse
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//gọi đến phương thức index trong routes
routes(app);

app.listen(port, () => {
  console.log(`Đang chạy cổng ${port}`);
});
