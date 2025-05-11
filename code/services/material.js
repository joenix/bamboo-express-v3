const prisma = require('../utils/prisma');
const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let user;
  try {
    user = await prisma.Material.create({
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
    updatedPermission = await prisma.Material.update({
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

  console.log(36, where);

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const users = await prisma.Material.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const counts = await prisma.Material.count({
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
  const post = await prisma.Material.findUnique({
    where: {
      id: parseInt(id, 10),
      delete: false
    }
  });
  if (post) {
    return post;
  } else {
    return null;
  }
}

// 查询多个物料
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
  return [];
}

module.exports = {
  create,
  get_all,
  get_id,
  update,
  get_ids
};
