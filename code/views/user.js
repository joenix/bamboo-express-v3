const router = require('express').Router();
const axios = require('axios');
const bcrypt = require('bcrypt');

const { generateToken } = require('../utils/jwt');
const { create, get_all, update, find_username, get_id, find_token, find_userinfo } = require('../services/user');

const { create: init_credit } = require('../services/credit');
const { create: create_userinfo, update: update_userinfo, get_userinfo_report, get_item } = require('../services/userinfo');

const { update_crtedit_his } = require('../services/credit');

router.route('/login').post(login);
router.route('/regist').post(regist);
router.route('/update').post(update_handle);
router.route('/wx_login').post(wx_login);
router.route('/get_all').post(get_all_users);
router.route('/get_info').post(get_user_info);
router.route('/get_data').post(get_user_data);
router.route('/update_crtedit').post(update_crtedit);
router.route('/update_user_info').post(update_user_info);
router.route('/get_user_report').post(get_user_report);
router.route('/set_user_info').post(set_user_info);
router.route('/get_user_info_item').post(get_user_info_item);

// 创建用户信息报告
async function set_user_info(req, res) {
  try {
    // 创建记录
    const result = await create_userinfo(req.body);
    res.json({
      status: 200,
      msg: result
    });
  } catch (error) {
    console.log("error", error)
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

async function get_user_info_item(req, res) {
  try {
    const { id } = req.body
    // 创建记录
    const result = await get_item(id);
    res.json({
      status: 200,
      msg: result
    });
  } catch (error) {
    console.log("error", error)
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

// 获取用户信息报告 
async function get_user_report(req, res) {
  try {
    const { id, day } = req.body;
    // 创建记录
    const result = await get_userinfo_report(id, day);
    res.json({
      status: 200,
      msg: result
    });
  } catch (error) {
    console.log("error", error)
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

// 更新部分用户信息， 视力，身高，体重
async function update_user_info(req, res) {
  try {
    const { id, ...updateInfo } = req.body;

    // 创建记录
    const result = await update_userinfo(id, updateInfo);
    res.json({
      status: 200,
      msg: result
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

async function update_crtedit(req, res) {
  try {
    const userid = parseInt(req.body.userid) || 0;
    const credit = parseInt(req.body.credit) || 1;

    // 更新学分
    await update_crtedit_his(userid, credit);
    res.json({
      status: 200,
      msg: 'success'
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // 根据用户名查找用户
    const user = await find_username(username);

    if (!user) {
      return res.status(200).json({ status: 400, error: '用户不存在' });
    }

    // 验证密码
    const isPasswordValid = password == user.password;
    if (!isPasswordValid) {
      return res.status(200).json({ status: 400, error: '密码错误' });
    }

    // 生成 JWT
    const token = generateToken({ id: user.id });

    res.json({ status: 200, msg: token });
  } catch (error) {
    console.error('登录错误：', error);
    res.status(200).json({ status: 500, error: '服务器错误' });
  }
}
async function wx_login(req, res) {
  let { mobile, captcha, password } = req.body;

  if (!password) {
    password = captcha;
  }

  try {
    let user = await find_username(mobile);

    if (!user) {
      // 如果没有用户就创建一个
      await create({
        username: mobile,
        mobile: mobile,
        password: password
      });
    }

    user = await find_username(mobile);

    // 验证密码
    const isPasswordValid = password == user.password;
    if (!isPasswordValid) {
      return res.status(200).json({ status: 500, error: '密码错误' });
    }

    // 生成 JWT
    const token = generateToken({ id: user.id });

    // 更新 token 字段
    await update(user.id, { token });

    res.json({ status: 200, msg: token });
  } catch (e) {
    console.error('登录错误：', error);
    res.status(200).json({ status: 500, error: '服务器错误' });
  }
}

async function update_handle(req, res) {
  try {
    const user = await update(req.query.id, req.body);
    res.json({
      status: 200,
      msg: 'success'
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

// test
async function regist(req, res) {
  try {
    const user = await create(req.body);
    // 初始化学分
    await init_credit(user.id);
    res.json({
      status: 200,
      msg: 'success'
      // msg: generateToken({ id: user.id })
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

async function get_all_users(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const filters = req.body.filters || [];
    let ress = await get_all(page, pageSize, filters);
    res.json({
      status: 200,
      msg: ress
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

// Code by Joenix
async function get_user_info(req, res) {
  try {
    const { token, id } = req.body;
    const response = await find_token(token);

    res.json({
      status: 200,
      msg: response
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: error // '服务出现异常，请重试'
    });
  }
}

async function get_user_data(req, res) {
  try {
    const { userId } = req.body;
    const response = await find_userinfo(userId);

    res.json({
      status: 200,
      msg: response
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: error // '服务出现异常，请重试'
    });
  }
}

module.exports = router;
