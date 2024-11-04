const prisma = require('../utils/prisma');
const { get_ids } = require('./material');
const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let user;
  try {
    user = await prisma.Book.create({
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
    updatedPermission = await prisma.Book.update({
      where: { id: id - 0 },
      data: updatedData
    });
    return updatedPermission;
  } catch (error) {
    throw error;
  }
}

// 获取当前用户在某一年某一月的完成记录

async function getDaysWithRecordsForMonth(userId, year, month) {
  // 查询指定用户在某年某月的记录
  const result = await prisma.bookHis.findMany({
    where: {
      userId,
      delete: false,
      createdAt: {
        gte: new Date(Date.UTC(year, month - 1, 1)), // 月份从0开始
        lt: new Date(Date.UTC(year, month, 1)),      // 下个月的第一天
      },
    },
    select: {
      createdAt: true,
    },
  });

  // 提取唯一的日期（去重）并返回 UTC 零点的时间戳
  const uniqueDays = Array.from(
    new Set(
      result.map(record => {
        const date = new Date(record.createdAt);
        date.setUTCHours(0, 0, 0, 0); // 设置为当天 UTC 零点
        return date.getTime();
      })
    )
  );

  return uniqueDays;
}

// 获取所有
async function get_all(page = 1, pageSize = 10, filters = []) {
  const where = generate_filters(filters);
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const books = await prisma.Book.findMany({
    skip: skip,
    take: take,
    where: where
  });

  for (let i = 0; i < books.length; i++) {
    const el = books[i];
    el['url'] = await get_ids(el.url || '');
    el['img'] = await get_ids(el.img || '');
  }

  const counts = await prisma.Book.count({
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
  const post = await prisma.Book.findUnique({
    where: { id: parseInt(id, 10) }
  });
  if (post) {
    post['url'] = await get_ids(post.url || '');
    post['img'] = await get_ids(post.img || '');
    return post;
  } else {
    return null;
  }
}

async function get_books_code_user(user_id) {
  // 获取当前所有的book
  const books = await prisma.Book.findMany({
    where: {
      delete: false
    }
  });
  // 根据用户获取code
  const codes = await prisma.Code.findMany({
    where: {
      delete: false,
      userId: user_id
    }
  });
  // 获取当天的开始和结束时间
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  console.log("codes", codes)
  if (!books || !codes) {
    return [];
  }
  let all_book = []
  // 设置是否激活状态
  for (let index = 0; index < books.length; index++) {
    const book = books[index];
    book["read_count"] = 0
    const distinctUserCount = await prisma.bookHis.groupBy({
      by: ['userId'],
      where: {
        bookId: book?.id,
        delete: false,
      },
      _count: {
        _all: true,
      },
    });
    book["read_count"] = distinctUserCount?.length || 0
    for (let J = 0; J < codes.length; J++) {
      const code = codes[J];
      book['active'] = false;

      book["today_count"] = 0
      book["today_time"] = 0

      if (code?.bookId == book?.id && code?.active) {
        book['active'] = true;
        const result = await prisma.bookHis.aggregate({
          _sum: {
            count: true,
            time: true,
          },
          where: {
            userId: user_id,
            bookId: book?.id,
            createdAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
            delete: false, // 排除已标记为删除的记录
          },
        });
        book["today_count"] = result._sum.count || 0
        book["today_time"] = result._sum.time || 0
      }

    }
    all_book.push(book)
  }
  return all_book;
}

module.exports = {
  create,
  get_all,
  get_id,
  update,
  get_books_code_user,
  getDaysWithRecordsForMonth
};
