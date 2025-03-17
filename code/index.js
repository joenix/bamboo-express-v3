const express = require('express');
const cors = require('cors');
const { verifyToken } = require('./utils/jwt');
const bodyParser = require('body-parser');
const pro_cfg = require('./config.json');
const app = express();

const publics = require('./views/public');

const file_path = pro_cfg['STATIC_PATH'];

// For MiniProgram
const wechat = require('./wechat/index');
const users = require('./views/user');
const infomation = require('./views/infomation');
const permission = require('./views/permission');
const creditshop = require('./views/creditshop');
const role = require('./views/role');
const book = require('./views/book');
const banner = require('./views/banner');
const landing = require('./views/landing');
const teach = require('./views/teach');
const tips = require('./views/tips');
const school = require('./views/school');
const code = require('./views/code');
const material = require('./views/material');

// For Admin
const admin_users = require('./views/admin_users');
const admin_information = require('./views/admin_information');
const admin_teach = require('./views/admin_teach');
const admin_school = require('./views/admin_school');
const admin_tips = require('./views/admin_tips');
// const admin_gift = require('./views/admin_gift');
// const admin_gift_exchange = require('./views/admin_gift_exchange');
const admin_code = require('./views/admin_code');
const admin_book = require('./views/admin_book');
const admin_material = require('./views/admin_material');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // 解析URL编码请求体
app.use(verifyToken);

// For MiniProgram
app.use('/wechat', wechat);
app.use('/material', material);
app.use('/code', code);
app.use('/school', school);
app.use('/teach', teach);
app.use('/tips', tips);
app.use('/banner', banner);
app.use('/book', book);
app.use('/landing', landing);
app.use('/users', users);
app.use('/public', publics);
app.use('/infomation', infomation);
app.use('/permission', permission);
app.use('/creditshop', creditshop);
app.use('/role', role);
app.use('/uploads', express.static(file_path));

// For Admin
app.use('/admin/users', admin_users); // 用户管理
app.use('/admin/information', admin_information); // 资讯管理
app.use('/admin/teach', admin_teach); // 师资管理
app.use('/admin/school', admin_school); // 机构管理
app.use('/admin/tip', admin_tips); // 贴士管理
// app.use('/admin/gift', admin_gift); // 礼品管理
// app.use('/admin/gift_exchange', admin_gift_exchange); // 礼品兑换
app.use('/admin/code', admin_code); // 激活码
app.use('/admin/book', admin_book); // 图书管理
app.use('/admin/material', admin_material); // 物料管理

const PORT = process.env.PORT || 6033;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
