const prisma = require('../utils/prisma');
const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let user;
  try {
    user = await prisma.User_Info.create({
      data: body
    });
  } catch (error) {
    throw error;
  }
  return user;
}

// 更新  delete为true 则是删除
async function update(id, updatedData) {
  let updatedPermission;
  try {
    console.log(21, updatedData);

    updatedPermission = await prisma.User_Info.update({
      where: { id: id - 0 },
      data: updatedData
    });
    return updatedPermission;
  } catch (error) {
    throw error;
  }
  return updatedPermission;
}

// 获取所有
async function get_all(page = 1, pageSize = 10, filters = []) {
  const where = generate_filters(filters);

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const users = await prisma.User_Info.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const counts = await prisma.User_Info.count({
    where: where
  });
  const totalPages = Math.ceil(counts / pageSize);

  return {
    data: users,
    counts,
    totalPages,
    currentPage: page
  };
}
// 查询单个
async function get_id(id) {
  const post = await prisma.User_Info.findUnique({
    where: { id: parseInt(id, 10) }
  });

  if (post) {
    return post;
  } else {
    return null;
  }
}

async function get_userinfo_report(id, limt = 7) {
  const userId = parseInt(id, 10); // 替换为你要查询的用户 ID
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - limt); // 获取最近 limt 天的开始日期

  // 查询用户对应天数内的所有记录
  const allRecords = await prisma.user_Info.findMany({
    where: {
      userId: userId,
      delete: false,
      createdAt: {
        gte: startDate
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // 按天分组并获取每日最晚的记录
  const dailyLatestRecords = [];
  const seenDates = new Set();

  for (const record of allRecords) {
    const recordDate = record.createdAt.toISOString().split('T')[0]; // 仅获取日期部分
    if (!seenDates.has(recordDate)) {
      dailyLatestRecords.push(record); // 记录每日的最晚一条
      seenDates.add(recordDate); // 标记该日期已处理
    }
  }

  if (dailyLatestRecords) {
    return dailyLatestRecords;
  } else {
    return null;
  }
}

async function get_item(userId) {
  const latestUserInfo = await prisma.user_Info.findFirst({
    where: {
      id: userId, // 当前用户的ID
      delete: false // 确保数据没有被标记为删除
    },
    orderBy: {
      createdAt: 'desc' // 按 createdAt 字段降序排列，最新的记录在前
    }
  });
  if (latestUserInfo) {
    return latestUserInfo;
  } else {
    return null;
  }
}

module.exports = {
  create,
  get_all,
  get_id,
  update,
  get_userinfo_report,
  get_item
};
