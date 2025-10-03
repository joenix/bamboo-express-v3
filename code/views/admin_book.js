const router = require('express').Router();
const crypto = require('crypto');

const { create, update, remove, get_all, get_one } = require('../services/admin_book');
const { create: create_code } = require('../services/code');

router.route('/create').post(create_handle);
router.route('/generate_codes').post(generate_codes_handle);
router.route('/update').post(update_handle);
router.route('/remove').post(remove_handle);
router.route('/get_all').post(get_all_handle);
router.route('/get_one').post(get_one_handle);

async function create_handle(req, res) {
  try {
    // 验证必要字段
    const { title, author, isbn } = req.body;
    if (!title || !author) {
      return res.json({
        status: 400,
        msg: '标题和作者不能为空'
      });
    }

    const data = await create(req.body);

    res.json({
      status: 200,
      data: {
        id: data.id
      },
      msg: '创建成功'
    });
  } catch (error) {
    console.error('创建图书失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

async function generate_codes_handle(req, res) {
  try {
    const { bookId, count } = req.body;
    
    // 验证必要参数
    if (!bookId) {
      return res.json({
        status: 400,
        msg: '图书ID不能为空'
      });
    }

    if (!count || count <= 0 || count > 1000) {
      return res.json({
        status: 400,
        msg: '生成数量必须是1-1000之间的正整数'
      });
    }

    // 验证图书是否存在
    const book = await get_one(bookId);
    if (!book) {
      return res.json({
        status: 404,
        msg: '图书不存在'
      });
    }

    // 批量生成激活码
    const generatedCodes = [];
    for (let i = 0; i < count; i++) {
      try {
        const codeData = {
          code: generateRandomString(5),
          bookId: parseInt(bookId)
        };
        const createdCode = await create_code(codeData);
        generatedCodes.push({
          id: createdCode.id,
          code: createdCode.code
        });
      } catch (error) {
        console.log('生成激活码失败，重试中...', error);
        // 如果生成失败，重试一次
        try {
          const codeData = {
            code: generateRandomString(5),
            bookId: parseInt(bookId)
          };
          const createdCode = await create_code(codeData);
          generatedCodes.push({
            id: createdCode.id,
            code: createdCode.code
          });
        } catch (retryError) {
          console.error('重试生成激活码失败:', retryError);
        }
      }
    }

    res.json({
      status: 200,
      data: {
        bookId: parseInt(bookId),
        bookTitle: book.title,
        generatedCount: generatedCodes.length,
        codes: generatedCodes
      },
      msg: `成功生成 ${generatedCodes.length} 个激活码`
    });
  } catch (error) {
    console.error('批量生成激活码失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

function generateRandomString(length) {
  // 使用 crypto 模块生成随机字符串
  return crypto.randomBytes(length).toString('hex');
}

async function update_handle(req, res) {
  try {
    const { id } = req.body;
    
    if (!id || isNaN(id) || id <= 0) {
      return res.json({
        status: 400,
        msg: '图书ID必须是有效的正整数'
      });
    }

    const data = await update(id, req.body);

    res.json({
      status: 200,
      data: data,
      msg: '更新成功'
    });
  } catch (error) {
    console.error('更新图书失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

async function remove_handle(req, res) {
  try {
    const { id } = req.body;
    
    if (!id || isNaN(id) || id <= 0) {
      return res.json({
        status: 400,
        msg: '图书ID必须是有效的正整数'
      });
    }

    const data = await remove(id);

    res.json({
      status: 200,
      data: data,
      msg: '删除成功'
    });
  } catch (error) {
    console.error('删除图书失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

async function get_all_handle(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const filters = req.body.filters || [];

    // 验证分页参数
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return res.json({
        status: 400,
        msg: '分页参数无效，页码必须大于0，每页数量必须在1-100之间'
      });
    }

    let data = await get_all(page, pageSize, filters);

    res.json({
      status: 200,
      msg: data,
      msg: '查询成功'
    });
  } catch (error) {
    console.error('查询图书列表失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

async function get_one_handle(req, res) {
  try {
    const { id } = req.body;
    
    if (!id || isNaN(id) || id <= 0) {
      return res.json({
        status: 400,
        msg: '图书ID必须是有效的正整数'
      });
    }

    const data = await get_one(id);
    
    if (!data) {
      return res.json({
        status: 404,
        msg: '图书不存在'
      });
    }

    res.json({
      status: 200,
      data: data,
      msg: '查询成功'
    });
  } catch (error) {
    console.error('查询图书详情失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

module.exports = router;
