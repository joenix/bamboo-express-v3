const router = require('express').Router();

const { create, update, get_all, get_id, get_books_code_user, getDaysWithRecordsForMonth } = require('../services/book');

const { create: create_his, get_select_all, get_all: get_all_bookhis } = require('../services/bookhis');

const { get_id: get_book_info_by_id, update: update_book_by_id } = require('../services/bookhiscount');

router.route('/create').post(create_handle);
router.route('/update').post(update_handle);
router.route('/get_all').post(get_all_handle);
router.route('/book_his').post(book_his_handle);
router.route('/get_book_info').post(get_book_info);
router.route('/wx_get_books').post(wx_get_books);
router.route('/wx_ranks_today').post(ranks_today);
router.route('/wx_ranks').post(ranks);
router.route('/get_all_records').post(get_all_records);
router.route('/get_all_exp').post(get_all_exp_by_user);

async function ranks_today(req, res) {
  try {
    const data = await get_select_all(true);
    res.json({
      status: 200,
      msg: data
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

async function ranks(req, res) {
  try {
    const data = await get_select_all(false);
    res.json({
      status: 200,
      msg: data
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

async function wx_get_books(req, res) {
  try {
    let data = await get_books_code_user(req.user.id);
    res.json({
      status: 200,
      msg: {
        data
      }
    });
  } catch (error) {
    console.log('error', error);
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

// 点读提交
async function book_his_handle(req, res) {
  try {
    const credit = req.body['credit'] || req.query['credit'] || 5;
    // 添加用户点读记录 和 更新用户学分
    await create_his(req.body, credit);

    /**
     * @author joenix
     * @description 累加总表时长
     * ======== ======== ========
     * @todo 1: 获取参数 bookId, count, time
     * @todo 2: 读取总表 BookHisCount
     * @todo 3: 时间累加、次数累加
     * @todo 4: 更新总表数据
     * ======== ======== ========
     */

    // 1.
    const { bookId, count, time } = req.body;

    // 2.
    const data = await get_book_info_by_id(bookId);

    // 3.
    data.time += time;
    data.count += count;

    // 4.
    await update_book_by_id(bookId, data);

    res.json({
      status: 200,
      msg: 'success'
    });
  } catch (error) {
    console.log('error', error);
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

// 获取单本书的数据
async function get_book_info(req, res) {
  try {
    // Book ID
    const id = req.body['id'] || req.query['id'];
    let data = await get_book_info_by_id(id);
    res.json({
      status: 200,
      msg: {
        data
      }
    });
  } catch (error) {
    console.log('error', error);
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

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
async function get_all_records(req, res) {
  try {
    const userid = parseInt(req.body.userid) || 0;
    const year = parseInt(req.body.year) || 2024;
    const month = parseInt(req.body.month) || 1;
    let ress = await getDaysWithRecordsForMonth(userid, year, month);
    res.json({
      status: 200,
      msg: {
        data: ress
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

// 复合接口：根据用户 ID 获取 竹简 心得
async function get_all_exp_by_user(req, res) {
  try {
    /**
     * @author joenix
     * @todo 1. 获取参数 UserId
     * @todo 2. 获取竹简清单
     * @todo 3. 获取竹简信息，附带心得
     * ======== ======== ========
     */

    // 1.
    const { userid } = req.body;
    console.log(111, userid);

    // 2.
    const { data: books } = await get_books_code_user(userid);
    console.log(222, books);
    // 3.
    let exps = [];
    for (const book of books) {
      const exp = (await get_all_bookhis(1, 10, [{ key: 'book', value: book.id }])) || {};
      exp.book = book;

      exps.push(exp);
    }
    console.log(333, exps);

    // res.
    res.json({
      status: 200,
      msg: {
        data: exps
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      msg: '服务出现异常，请重试'
    });
  }
}

module.exports = router;
