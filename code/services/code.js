const prisma = require('../utils/prisma');
const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let user;
  try {
    user = await prisma.Code.create({
      data: body
    });
  } catch (error) {
    throw error;
    throw error;
  }
  return user;
}

// 更新  delete为true 则是删除
async function update(bookid, userid, code) {
  let updatedPermission;
  try {
    // 查询当前 code 的状态
    const existingCode = await prisma.Code.findUnique({
      where: { code: code, bookId: bookid },
      select: { active: true }
    });

    // 如果 active 为 true，则返回 false，不执行更新
    if (existingCode?.active) {
      return false;
    }

    // 否则更新 userId 和 active
    updatedPermission = await prisma.Code.update({
      where: { code: code, bookId: bookid },
      data: {
        userId: userid,
        active: true
      }
    });

    return updatedPermission;
  } catch (error) {
    throw error;
  }
}

// 获取所有
async function get_all(page = 1, pageSize = 10, bookid, filters = []) {
  const where = {
    ...generate_filters(filters),
    bookId: bookid
  };

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const users = await prisma.Code.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const counts = await prisma.Code.count({
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
  const post = await prisma.Code.findUnique({
    where: { id: parseInt(id, 10) }
  });
  if (post) {
    return post;
  } else {
    return null;
  }
}

module.exports = {
  create,
  get_all,
  get_id,
  update
};
