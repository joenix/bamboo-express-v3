const prisma = require("../utils/prisma")
const { generate_filters } = require("../utils/index")

// 创建 和 更新累计阅读历史
async function createOrUpdateBookHisCount(body) {
  let bookhis;

  const userId = body.userId || 0
  const bookId = body.bookId || 0

  try {
    // 检查 User 和 Book 是否存在
    const userExists = await prisma.User.findUnique({
      where: { id: userId },
    });

    const bookExists = await prisma.Book.findUnique({
      where: { id: bookId, delete: false },
    });

    if (!userExists || !bookExists) {
      throw new Error("User or Book not found");
    }

    // 检查是否存在对应的 BookHisCount 记录
    const existingRecord = await prisma.bookHisCount.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });

    if (existingRecord) {
      // 更新记录
      bookhis = await prisma.bookHisCount.update({
        where: {
          id: existingRecord.id,
        },
        data: {
          time: existingRecord.time + body.time,
          count: existingRecord.count + body.count,
          content: body.content, // 根据需要更新内容
        },
      });
    } else {
      // 创建新的记录
      bookhis = await prisma.bookHisCount.create({
        data: {
          userId: userId,
          bookId: bookId,
          time: body.time,
          count: body.count,
          content: body.content,
        },
      });
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }

  return bookhis;
}


// 更新  delete为true 则是删除
async function update(id, updatedData) {
  let updatedPermission
  try {
    updatedPermission = await prisma.BookHisCount.update({
      where: { id: id - 0 },
      data: updatedData,
    });
    return updatedPermission
  } catch (error) {
    throw error;
  }
}

// 获取所有 
async function get_all(page = 1, pageSize = 10, filters = []) {
  const where = generate_filters(filters)

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const books = await prisma.BookHisCount.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const totalUsers = await prisma.BookHisCount.count({
    where: where
  });
  const totalPages = Math.ceil(totalUsers / pageSize);

  return {
    data: books,
    totalUsers,
    totalPages,
    currentPage: page
  };
}
// 查询单个
async function get_id(id) {
  const post = await prisma.BookHisCount.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (post) {
    return post
  } else {
    return null
  }
}


module.exports = {
  createOrUpdateBookHisCount,
  get_all,
  get_id,
  update
}



