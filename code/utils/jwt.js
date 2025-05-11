// jwtUtils.js

const jwt = require('jsonwebtoken');
const minimatch = require('minimatch').minimatch;

// 白名单的URL
const whitelist = [
  '/wx/login',
  '/wx/phone',
  '/users/login',
  '/users/wx_login', // 登录接口不需要验证JWT
  '/users/get_info',
  '/users/get_data',
  '/public/*', // 公共接口不需要验证JWT
  '/users/regist',
  '/uploads/*',

  // Add by Joenix
  '/infomation/get_all',
  '/infomation/get_id',
  '/tips/get_all'
];

// 密钥，用于生成和验证 JWT
const JWT_SECRET = 'sixsixsix';

// 生成 JWT
function generateToken(user) {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
}

// 验证 JWT
function verifyToken(req, res, next) {
  const path = req.path;
  // 检查是否在白名单中
  for (const pattern of whitelist) {
    if (minimatch(path, pattern)) {
      return next(); // 不验证JWT，继续下一个中间件或路由处理程序
    }
  }

  // 从请求的 header 中获取 token
  const token = req.headers['token'];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // 验证 token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalid or expired' });
    }
    req.user = decoded; // 将解码后的用户信息存储到请求对象中，以便后续路由使用
    next();
  });
}

module.exports = {
  generateToken,
  verifyToken
};
