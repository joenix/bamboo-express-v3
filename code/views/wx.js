const router = require('express').Router();

router.route('/login').post(login_handle);

async function login_handle(req, res) {
  const APPID = 'wx875ce0af9f17a215';
  const SECRET = 'bf4a1d2da36f536351a377836123697c';

  const { code } = req.body;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;

  const response = await fetch(url);
  const result = await response.json();

  res.json(result);
}

module.exports = router;
