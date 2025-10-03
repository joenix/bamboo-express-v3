const prisma = require('../utils/prisma');

// 根据用户ID查询积分信息
async function get_user_credit(userId) {
  try {
    // 查询用户基本信息
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },
      select: {
        id: true,
        username: true,
        nickname: true,
        mobile: true,
        openId: true
      }
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    // 查询用户积分信息
    const credit = await prisma.Credit.findUnique({
      where: { userId: parseInt(userId, 10) }
    });

    // 如果用户没有积分记录，创建初始记录
    if (!credit) {
      const newCredit = await prisma.Credit.create({
        data: {
          userId: parseInt(userId, 10),
          credit: 0
        }
      });

      // 添加初始化记录到历史表
      await prisma.CreditHis.create({
        data: {
          userId: parseInt(userId, 10),
          credit: 0,
          content: '系统初始化'
        }
      });

      return {
        user,
        credit: newCredit
      };
    }

    return {
      user,
      credit
    };
  } catch (error) {
    throw error;
  }
}

// 修改用户积分
async function update_user_credit(userId, creditAmount, content, operation = 'add') {
  try {
    const userIdInt = parseInt(userId, 10);
    const creditInt = parseInt(creditAmount, 10);

    // 使用事务确保数据一致性
    const result = await prisma.$transaction(async (tx) => {
      // 验证用户是否存在
      const user = await tx.user.findUnique({
        where: { id: userIdInt }
      });

      if (!user) {
        throw new Error('用户不存在');
      }

      // 获取当前积分
      let currentCredit = await tx.Credit.findUnique({
        where: { userId: userIdInt }
      });

      // 如果用户没有积分记录，创建初始记录
      if (!currentCredit) {
        currentCredit = await tx.Credit.create({
          data: {
            userId: userIdInt,
            credit: 0
          }
        });
      }

      let newCreditAmount;
      let operationContent;

      // 根据操作类型计算新积分
      if (operation === 'add') {
        newCreditAmount = currentCredit.credit + creditInt;
        operationContent = `增加积分: +${creditInt}, 原因: ${content}`;
      } else if (operation === 'subtract') {
        newCreditAmount = currentCredit.credit - creditInt;
        operationContent = `减少积分: -${creditInt}, 原因: ${content}`;
      } else if (operation === 'set') {
        newCreditAmount = creditInt;
        operationContent = `设置积分: ${creditInt}, 原因: ${content}`;
      } else {
        throw new Error('无效的操作类型，支持的操作: add, subtract, set');
      }

      // 确保积分不为负数
      if (newCreditAmount < 0) {
        throw new Error('积分不能为负数');
      }

      // 更新积分
      const updatedCredit = await tx.Credit.update({
        where: { userId: userIdInt },
        data: { credit: newCreditAmount }
      });

      // 记录积分变更历史
      const creditHistory = await tx.CreditHis.create({
        data: {
          userId: userIdInt,
          credit: newCreditAmount, // 存储变更后的总积分
          content: operationContent
        }
      });

      return {
        updatedCredit,
        creditHistory,
        operation: operationContent,
        previousCredit: currentCredit.credit,
        newCredit: newCreditAmount
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
}

// 查询用户积分历史记录
async function get_credit_history(userId, page = 1, pageSize = 10) {
  try {
    const userIdInt = parseInt(userId, 10);
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // 验证用户是否存在
    const user = await prisma.user.findUnique({
      where: { id: userIdInt },
      select: {
        id: true,
        username: true,
        nickname: true,
        mobile: true
      }
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    // 查询积分历史记录
    const history = await prisma.CreditHis.findMany({
      where: {
        userId: userIdInt,
        delete: false
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 查询总记录数
    const totalCount = await prisma.CreditHis.count({
      where: {
        userId: userIdInt,
        delete: false
      }
    });

    // 获取当前积分
    const currentCredit = await prisma.Credit.findUnique({
      where: { userId: userIdInt }
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      user,
      currentCredit: currentCredit || { credit: 0 },
      history,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize
      }
    };
  } catch (error) {
    throw error;
  }
}

// 批量查询多个用户的积分信息
async function get_multiple_users_credit(userIds) {
  try {
    const userIdsInt = userIds.map(id => parseInt(id, 10));

    // 查询用户基本信息
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIdsInt }
      },
      select: {
        id: true,
        username: true,
        nickname: true,
        mobile: true,
        openId: true
      }
    });

    // 查询积分信息
    const credits = await prisma.Credit.findMany({
      where: {
        userId: { in: userIdsInt }
      }
    });

    // 合并用户信息和积分信息
    const result = users.map(user => {
      const credit = credits.find(c => c.userId === user.id);
      return {
        user,
        credit: credit || { credit: 0 }
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
}

// 查询所有用户的积分列表（分页）
async function get_all_users_credit(page = 1, pageSize = 10, filters = []) {
  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // 构建查询条件
    let whereCondition = {
      delete: false
    };

    // 如果有筛选条件，可以在这里添加
    if (filters && filters.length > 0) {
      // 可以根据需要添加筛选逻辑
      filters.forEach(filter => {
        if (filter.field === 'username' && filter.value) {
          whereCondition.username = {
            contains: filter.value
          };
        }
        if (filter.field === 'nickname' && filter.value) {
          whereCondition.nickname = {
            contains: filter.value
          };
        }
        if (filter.field === 'mobile' && filter.value) {
          whereCondition.mobile = {
            contains: filter.value
          };
        }
      });
    }

    // 查询用户列表
    const users = await prisma.user.findMany({
      skip,
      take,
      where: whereCondition,
      select: {
        id: true,
        username: true,
        nickname: true,
        mobile: true,
        openId: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 获取用户ID列表
    const userIds = users.map(user => user.id);

    // 查询对应的积分信息
    const credits = await prisma.Credit.findMany({
      where: {
        userId: { in: userIds }
      }
    });

    // 合并用户信息和积分信息
    const usersWithCredit = users.map(user => {
      const credit = credits.find(c => c.userId === user.id);
      return {
        ...user,
        credit: credit ? credit.credit : 0,
        creditId: credit ? credit.id : null
      };
    });

    // 查询总用户数
    const totalCount = await prisma.user.count({
      where: whereCondition
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data: usersWithCredit,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize
      }
    };
  } catch (error) {
    throw error;
  }
}

// 查询所有用户的积分统计信息
async function get_credit_statistics() {
  try {
    // 总用户数
    const totalUsers = await prisma.user.count({
      where: { delete: false }
    });

    // 有积分记录的用户数
    const usersWithCredit = await prisma.Credit.count();

    // 总积分
    const totalCredits = await prisma.Credit.aggregate({
      _sum: {
        credit: true
      }
    });

    // 平均积分
    const avgCredits = usersWithCredit > 0 && totalCredits._sum.credit ? 
      totalCredits._sum.credit / usersWithCredit : 0;

    // 积分分布统计（限制返回结果数量，避免性能问题）
    const creditDistribution = await prisma.Credit.groupBy({
      by: ['credit'],
      _count: {
        credit: true
      },
      orderBy: {
        credit: 'asc'
      },
      take: 50 // 限制返回最多50个不同的积分值
    });

    return {
      totalUsers,
      usersWithCredit,
      totalCredits: totalCredits._sum.credit || 0,
      avgCredits: Math.round(avgCredits * 100) / 100,
      creditDistribution
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  get_user_credit,
  update_user_credit,
  get_credit_history,
  get_multiple_users_credit,
  get_all_users_credit,
  get_credit_statistics
};
