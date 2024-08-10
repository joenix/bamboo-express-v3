const express = require('express');
const cors = require("cors")
const { verifyToken } = require("./utils/jwt")
const bodyParser = require('body-parser');
const pro_cfg = require("./config.json")
const app = express();

const publics = require("./views/public")

const file_path = pro_cfg["STATIC_PATH"]

const users = require("./views/user")
const infomation = require("./views/infomation")
const permission = require("./views/permission")
const role = require("./views/role")
const book = require("./views/book")
const banner = require("./views/banner")
const landing = require("./views/landing")
const teach = require("./views/teach")
const tips = require("./views/tips")
const school = require("./views/school")
const code = require("./views/code")
const material = require("./views/material")

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));  // 解析URL编码请求体
app.use(verifyToken)

app.use('/material', material)
app.use('/code', code)
app.use('/school', school);
app.use('/teach', teach);
app.use('/tips', tips);
app.use('/banner', banner);
app.use('/book', book);
app.use('/landing', landing);
app.use('/users', users);
app.use('/public', publics)
app.use('/infomation', infomation)
app.use('/permission', permission)
app.use("/role", role)
app.use('/uploads', express.static(file_path));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
