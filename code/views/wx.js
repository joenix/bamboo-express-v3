const WXBizDataCrypt = require('wx-biz-data-crypt');
const router = require('express').Router();

router.route('/login').post(login_handle);
router.route('/phone').post(phone_handle);

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

    console.log(data);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: '解密失败', message: err.message });
  }
}

module.exports = router;
