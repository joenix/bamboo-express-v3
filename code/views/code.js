const router = require("express").Router();
const crypto = require("crypto")

const {
  create,
  update,
  get_all,
  get_id
} = require("../services/code")
const { get_id: get_book } = require("../services/book")

router.route("/create").post(create_handle);
router.route("/active").post(update_handle);
router.route("/get_all").post(get_all_handle);

async function create_handle(req, res) {
  try {

    const { bookid, count } = req.body
    if (!bookid) {
      throw new Error("nobook");
    }
    // 查询书是否存在
    let book = await get_book(bookid)
    console.log("book", book)
    if (!book) {
      throw new Error("nobook");
    }
    for (let i = 0; i < (count || 100); i++) {
      await generate_code(bookid)
    }
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

async function generate_code(bookid) {
  try {
    let obj = {
      code: generateRandomString(5),
      bookId: bookid
    }
    const code = await create(obj)
  } catch (error) {
    console.log("error", error)
    generate_code(bookid)
  }

}
function generateRandomString(length) {
  // 使用 crypto 模块生成随机字符串
  return crypto.randomBytes(length).toString('hex');
}


async function update_handle(req, res) {
  try {
    const { bookid, userid, code } = req.body
    if (!bookid || !code) {
      new Error("no bookid or no user")
    }
    const data = await update(bookid, userid, code)
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
    const bookid = parseInt(req.query.bookid) || 0;
    let ress = await get_all(page, pageSize, bookid)
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
