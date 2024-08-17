const prisma = require("../utils/prisma")
const { generate_filters } = require("../utils/index")

// 创建
async function create(body) {
  let user
  try {
    user = await prisma.Teach.create({
      data: body,
    });
  } catch (error) {
    throw error;
  }
  return user
}

// 更新  delete为true 则是删除
async function update(id, updatedData) {
  let updatedPermission
  try {
    updatedPermission = await prisma.Teach.update({
      where: { id: id - 0 },
      data: updatedData,
    });
    return updatedPermission
  } catch (error) {
    throw error;
  }
  return updatedPermission
}

// 获取所有 
async function get_all(page = 1, pageSize = 10, filters = []) {
  const where = generate_filters(filters)

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const users = await prisma.Teach.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const counts = await prisma.Teach.count({
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
  const post = await prisma.Teach.findUnique({
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



