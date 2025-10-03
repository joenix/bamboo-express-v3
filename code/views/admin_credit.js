const router = require('express').Router();

const { get_user_credit, update_user_credit, get_credit_history, get_all_users_credit, get_credit_statistics } = require('../services/admin_credit');

// 根据用户ID查询积分
router.route('/get_user_credit').post(get_user_credit_handle);

// 修改用户积分
router.route('/update_user_credit').post(update_user_credit_handle);

// 查询用户积分历史记录
router.route('/get_credit_history').post(get_credit_history_handle);

// 查询所有用户的积分列表
router.route('/get_all_users_credit').post(get_all_users_credit_handle);

// 查询积分统计信息
router.route('/get_credit_statistics').post(get_credit_statistics_handle);

// 根据用户ID查询积分
async function get_user_credit_handle(req, res) {
  try {
    const { userId } = req.body;
    
    if (!userId || isNaN(userId) || userId <= 0) {
      return res.json({
        status: 400,
        msg: '用户ID必须是有效的正整数'
      });
    }

    const creditData = await get_user_credit(userId);
    
    res.json({
      status: 200,
      data: creditData,
      msg: '查询成功'
    });
  } catch (error) {
    console.error('查询用户积分失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

// 修改用户积分
async function update_user_credit_handle(req, res) {
  try {
    const { userId, credit, content, operation } = req.body;
    
    if (!userId || isNaN(userId) || userId <= 0) {
      return res.json({
        status: 400,
        msg: '用户ID必须是有效的正整数'
      });
    }

    if (credit === undefined || credit === null) {
      return res.json({
        status: 400,
        msg: '积分数量不能为空'
      });
    }

    if (isNaN(credit) || credit === 0) {
      return res.json({
        status: 400,
        msg: '积分数量不能为0，请输入正数或负数'
      });
    }

    if (!content) {
      return res.json({
        status: 400,
        msg: '操作说明不能为空'
      });
    }

    const result = await update_user_credit(userId, credit, content, operation || 'direct');
    
    res.json({
      status: 200,
      data: result,
      msg: '积分修改成功'
    });
  } catch (error) {
    console.error('修改用户积分失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

// 查询用户积分历史记录
async function get_credit_history_handle(req, res) {
  try {
    const { userId, page = 1, pageSize = 10 } = req.body;
    
    if (!userId || isNaN(userId) || userId <= 0) {
      return res.json({
        status: 400,
        msg: '用户ID必须是有效的正整数'
      });
    }

    // 验证分页参数
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return res.json({
        status: 400,
        msg: '分页参数无效，页码必须大于0，每页数量必须在1-100之间'
      });
    }

    const historyData = await get_credit_history(userId, page, pageSize);
    
    res.json({
      status: 200,
      data: historyData,
      msg: '查询成功'
    });
  } catch (error) {
    console.error('查询积分历史失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

// 查询所有用户的积分列表
async function get_all_users_credit_handle(req, res) {
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

    const result = await get_all_users_credit(page, pageSize, filters);
    
    res.json({
      status: 200,
      data: result,
      msg: '查询成功'
    });
  } catch (error) {
    console.error('查询所有用户积分列表失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

// 查询积分统计信息
async function get_credit_statistics_handle(req, res) {
  try {
    const statistics = await get_credit_statistics();
    
    res.json({
      status: 200,
      data: statistics,
      msg: '查询成功'
    });
  } catch (error) {
    console.error('查询积分统计信息失败:', error);
    res.json({
      status: 500,
      msg: error.message || '服务出现异常，请重试'
    });
  }
}

module.exports = router;
