const router = require("express").Router();

const {
  create,
  update,
  get_all,
  get_id,
  get_books_code_user
} = require("../services/book")

const { create: create_his } = require("../services/bookhis")

router.route("/create").post(create_handle);
router.route("/update").post(update_handle);
router.route("/get_all").post(get_all_handle);
router.route("/book_his").post(book_his_handle);
router.route("/wx_get_books").post(wx_get_books);


async function wx_get_books(req, res) {
  try {

    let data = await get_books_code_user(req.user.id)
    res.json({
      status: 200,
      data,
      msg: 'success',
    })
  } catch (error) {
    res.json({
      status: 500,
      msg: error
    })
  }

}




async function book_his_handle(req, res) {
  try {
    const credit = req.query['credit'] || 5
    // 添加用户点读记录 和 更新用户学分
    await create_his(req.body, credit)
    res.json({
      status: 200,
      msg: 'success',
    })
  } catch (error) {
    console.log('error', error)
    res.json({
      status: 500,
      msg: error
    })
  }
}

async function create_handle(req, res) {
  try {
    const user = await create(req.body)
    res.json({
      status: 200,
      msg: 'success',
    })
  } catch (error) {
    res.json({
      status: 500,
      msg: error
    })
  }
}

async function update_handle(req, res) {
  try {
    const user = await update(req.query.id, req.body)
    res.json({
      status: 200,
      msg: 'success',
    })
  } catch (error) {
    res.json({
      status: 500,
      msg: error
    })
  }
}



async function get_all_handle(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const filters = req.body.filters || []
    let ress = await get_all(page, pageSize, filters)
    res.json({
      status: 200,
      msg: ress
    })
  } catch (error) {
    res.json({
      status: 500,
      msg: error
    })
  }
}

module.exports = router;
