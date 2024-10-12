const router = require('express').Router();

const { create, update, get_all, get_id } = require('../services/infomation');

router.route('/create').post(create_handle);
router.route('/update').post(update_handle);
router.route('/get_all').post(get_all_handle);
router.route('/get_id').post(get_id_handle);

async function create_handle(req, res) {
  try {
    const user = await create(req.body);
    res.json({
      status: 200,
      data: {
        id: user.id
      },
      msg: 'success'
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
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

async function get_all_handle(req, res) {
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

async function get_id_handle(req, res) {
  try {
    const a = req.body;

    res.json({
      status: 200,
      msg: {
        a,
        b: 2
      }
    });
    const id = req.query.id;
    let ress = await get_id(id);
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

module.exports = router;
