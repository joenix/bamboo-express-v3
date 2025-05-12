const WXBizDataCrypt = require('wx-biz-data-crypt');
const router = require('express').Router();

const { create, update, find_username } = require('../services/user');

router.route('/login').post(login_handle);
router.route('/phone').post(phone_handle);
router.route('/mnp_login').post(mnp_login);

const APPID = 'wx875ce0af9f17a215';
const SECRET = 'bf4a1d2da36f536351a377836123697c';

async function login_handle(req, res) {
  const { code } = req.body;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;

  const response = await fetch(url);
  const result = await response.json();

  res.json(result);
}

async function phone_handle(req, res) {
  const { encryptedData, iv, session_key } = req.body;

  try {
    const comp = new WXBizDataCrypt(APPID, session_key);
    const data = comp.decryptData(encryptedData, iv);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: '解密失败', message: err.message });
  }
}

async function mnp_login(req, res) {
  let { mobile, openid } = req.body;

  console.log(170, mobile, openid);

  try {
    let user = await find_username(mobile);

    console.log(175, user);

    if (!user) {
      // 如果没有用户就创建一个
      await create({
        username: mobile,
        mobile: mobile,
        password: 'Aa123456',
        nickname: mobile,
        openId: openid
      });
    }

    // 重新获取 user
    user = await find_username(mobile);

    console.log(191, user);

    // 生成 JWT
    const token = generateToken({ id: user.id });

    console.log(196, token);

    // 更新 token 字段
    await update(user.id, { token });

    // 返回
    res.json({ status: 200, msg: token });
  } catch (e) {}
}

module.exports = router;
