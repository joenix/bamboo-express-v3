const prisma = require("../utils/prisma")
const { update_crtedit_his } = require("./credit")
const { createOrUpdateBookHisCount } = require("./bookhiscount")
const { generate_filters } = require("../utils/index")

// 创建
async function create(body, credit) {
  let bookhis
  try {
    bookhis = await prisma.BookHis.create({
      data: body,
    });
    // 更新阅读累计
    await createOrUpdateBookHisCount(body)
    // 更新学分 
    await update_crtedit_his(body["userId"], credit)
  } catch (error) {
    console.log("error", error)
    throw error;
  }
  return bookhis
}

// 更新  delete为true 则是删除
async function update(id, updatedData) {
  let updatedPermission
  try {
    updatedPermission = await prisma.BookHis.update({
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

  const books = await prisma.BookHis.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const totalUsers = await prisma.BookHis.count({
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
  const post = await prisma.BookHis.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (post) {
    return post
  } else {
    return null
  }
}


module.exports = {
  create,
  get_all,
  get_id,
  update
}



