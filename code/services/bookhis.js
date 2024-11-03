const prisma = require('../utils/prisma');
const { update_crtedit_his } = require('./credit');
const { createOrUpdateBookHisCount } = require('./bookhiscount');
const { generate_filters } = require('../utils/index');
const { get_id: get_user_byid } = require('./user');
// 创建
async function create(body, credit) {
  let bookhis;
  try {
    bookhis = await prisma.BookHis.create({
      data: body
    });
    // 更新阅读累计
    await createOrUpdateBookHisCount(body);
    // 更新学分
    await update_crtedit_his(body['userId'], credit);
  } catch (error) {
    console.log('error', error);
    throw error;
  }
  return bookhis;
}

// 更新  delete为true 则是删除
async function update(id, updatedData) {
  let updatedPermission;
  try {
    updatedPermission = await prisma.BookHis.update({
      where: { id: id - 0 },
      data: updatedData
    });
    return updatedPermission;
  } catch (error) {
    throw error;
  }
}

// 获取所有
async function get_all(page = 1, pageSize = 10, filters = []) {
  const where = generate_filters(filters);
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const books = await prisma.BookHis.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const counts = await prisma.BookHis.count({
    where: where
  });
  const totalPages = Math.ceil(counts / pageSize);

  return {
    data: books,
    counts,
    totalPages,
    currentPage: page
  };
}
// 查询单个
async function get_id(id) {
  const post = await prisma.BookHis.findUnique({
    where: { id: parseInt(id, 10) }
  });
  if (post) {
    return post;
  } else {
    return null;
  }
}

// 排行榜 
async function get_select_all(isToday = true) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 设置为当天的开始时间

  const where = {
    ...(isToday ? { createdAt: { gte: today } } : {}), // 如果是当天，加入时间筛选条件
  };

  const result = await prisma.bookHis.groupBy({
    by: ['userId'], // 按用户分组
    where, // 根据 isToday 参数动态设置 where 条件
    _sum: {
      time: true, // 统计 time 的总和
    },
    orderBy: {
      _sum: {
        time: 'desc', // 按 time 总和降序排列
      },
    },
    take: 100, // 只取前20名
  });

  for (let i = 0; i < result.length; i++) {
    let id = result[i]["userId"]
    if (id) {
      try {
        console.log("id", id)
        result[i]["user"] = await get_user_byid(id)
      } catch (error) {
        console.log("error", error)
      }
    }
  }



  return {
    data: result,
  };
}


module.exports = {
  create,
  get_all,
  get_id,
  update,
  get_select_all
};
