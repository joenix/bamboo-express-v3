const router = require('express').Router();
const crypto = require('crypto');

const { create, update, remove, get_all, get_one } = require('../services/admin_code');

router.route('/create').post(create_handle);
router.route('/update').post(update_handle);
router.route('/remove').post(remove_handle);
router.route('/get_all').post(get_all_handle);
router.route('/get_one').post(get_one_handle);

async function create_handle(req, res) {
  try {
    const { bookId, count, codes } = req.body;
    
    // 如果提供了 codes 数组，则批量创建指定的激活码
    if (codes && Array.isArray(codes)) {
      const createdCodes = [];
      const errors = [];
      
      for (let i = 0; i < codes.length; i++) {
        try {
          const codeData = {
            code: codes[i],
            bookId: parseInt(bookId)
          };
          const createdCode = await create(codeData);
          createdCodes.push({
            id: createdCode.id,
            code: createdCode.code
          });
        } catch (error) {
          errors.push({
            index: i,
            code: codes[i],
            error: error.message
          });
        }
      }
      
      res.json({
        status: 200,
        data: {
          bookId: parseInt(bookId),
          totalRequested: codes.length,
          successCount: createdCodes.length,
          errorCount: errors.length,
          createdCodes: createdCodes,
          errors: errors
        },
        msg: `成功创建 ${createdCodes.length} 个激活码，失败 ${errors.length} 个`
      });
    }
    // 如果提供了 count，则批量生成随机激活码
    else if (count && count > 0) {
      if (count > 1000) {
        return res.json({
          status: 400,
          msg: '批量生成数量不能超过1000个'
        });
      }
      
      const createdCodes = [];
      for (let i = 0; i < count; i++) {
        try {
          const codeData = {
            code: generateRandomString(5),
            bookId: parseInt(bookId)
          };
          const createdCode = await create(codeData);
          createdCodes.push({
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
            const createdCode = await create(codeData);
            createdCodes.push({
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
        msg: {
          bookId: parseInt(bookId),
          requestedCount: count,
          actualCount: createdCodes.length,
          codes: createdCodes
        },

      });
    }
    // 单个创建（保持原有功能）
    else {
      const data = await create(req.body);
      res.json({
        status: 200,
        data: {
          id: data.id
        },
        msg: 'success'
      });
    }
  } catch (error) {
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
    const data = await update(req.body.id, req.body);

    res.json({
      status: 200,
      msg: data
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: error
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
      msg: error
    });
  }
}

async function get_all_handle(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const filters = req.body.filters || [];

    let data = await get_all(page, pageSize, filters);

    res.json({
      status: 200,
      msg: data
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: error
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
      msg: error
    });
  }
}

module.exports = router;
