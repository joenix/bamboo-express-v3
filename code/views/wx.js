const router = require('express').Router();

router.route('/login').post(login_handle);
router.route('/phone').post(phone_handle);

async function login_handle(req, res) {
  const APPID = 'wx875ce0af9f17a215';
  const SECRET = 'bf4a1d2da36f536351a377836123697c';

  const { code } = req.body;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;

  const response = await fetch(url);
  const result = await response.json();

  res.json(result);
}

async function phone_handle(req, res) {
  const { encryptedData, iv, session_key } = req.body;

  console.log('encryptedData:', encryptedData);
  console.log('iv:', iv);
  console.log('session_key:', session_key);

  try {
    const sessionKey = Buffer.from(session_key, 'base64');
    const encrypted = Buffer.from(encryptedData, 'base64');
    const ivBuffer = Buffer.from(iv, 'base64');

    console.log('sessionKey:', sessionKey);
    console.log('encrypted:', encrypted);
    console.log('ivBuffer:', ivBuffer);

    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, ivBuffer);

    console.log(30, decipher);

    decipher.setAutoPadding(true);

    console.log(31, decipher);

    let decoded = decipher.update(encrypted, 'binary', 'utf8');
    decoded += decipher.final('utf8');

    console.log(36, decoded);

    res.json(JSON.parse(decoded));
  } catch (err) {
    res.status(500).json({ error: '解密失败', message: err.message });
  }
}

module.exports = router;
