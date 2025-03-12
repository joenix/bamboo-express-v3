const router = require('express').Router();

const { create, update, remove, get_all, get_one } = require('../services/admin_users');

router.route('/create').post(create_handle);
router.route('/update').post(update_handle);
router.route('/remove').post(remove_handle);
router.route('/get_all').post(get_all_handle);
router.route('/get_one').post(get_one_handle);

async function create_handle(req, res) {
  try {
    const user = await create(req.body);

    res.json({
      status: 200,
      data: {
        id: user.id
      },
      msg: `success`
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: `服务器异常`
    });
  }
}

async function update_handle(req, res) {
  try {
    const data = await update(req.body.id, req.body);

    res.json({
      status: 200,
      msg: data
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: `服务器异常`
    });
  }
}

async function remove_handle(req, res) {
  try {
    const data = await remove(req.body.id);

    res.json({
      status: 200,
      msg: data
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: `服务器异常`
    });
  }
}

async function get_all_handle(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const filters = req.body.filters || [];

    console.log(68);

    let data = await get_all(page, pageSize, filters);

    console.log(73);

    res.json({
      status: 200,
      msg: data
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: `服务器异常`
    });
  }
}

async function get_one_handle(req, res) {
  try {
    const data = await get_one(req.body.id);

    res.json({
      status: 200,
      msg: data
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: `服务器异常`
    });
  }
}

module.exports = router;
