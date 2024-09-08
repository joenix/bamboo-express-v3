const prisma = require('../utils/prisma');
const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let user;
  try {
    user = await prisma.Permission.create({
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
    updatedPermission = await prisma.Permission.update({
      where: { id: id - 0 },
      data: updatedData
    });
    return updatedPermission;
  } catch (error) {
    throw error;
  }
  return updatedPermission;
}

// 获取所有权限
async function get_all(page = 1, pageSize = 10, filters = []) {
  const where = generate_filters(filters);

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const data = await prisma.Permission.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const counts = await prisma.Permission.count({
    where: where
  });
  const totalPages = Math.ceil(counts / pageSize);

  return {
    data,
    counts,
    totalPages,
    currentPage: page
  };
}
// 查询单个权限
async function get_id(id) {
  const post = await prisma.Permission.findUnique({
    where: { id: parseInt(id, 10), delete: false }
  });
  if (post) {
    return post;
  } else {
    return null;
  }
}
// 查询多个权限
async function get_ids(ids) {
  try {
    if (!ids.length) {
      return [];
    }
    let all_id = ids.split();
    let arr = [];
    for (let i = 0; i < all_id.length; i++) {
      let res = await get_id(all_id[i]);
      arr.push(res);
    }
    return arr;
  } catch (error) {
    return [];
  }
}

module.exports = {
  create,
  get_all,
  get_id,
  update,
  get_ids
};
