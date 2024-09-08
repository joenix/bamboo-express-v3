const prisma = require('../utils/prisma');
const { get_ids } = require('./permission');
const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let user;
  try {
    user = await prisma.Role.create({
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
    updatedPermission = await prisma.Role.update({
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
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const where = generate_filters(filters);

  const users = await prisma.Role.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const counts = await prisma.Role.count({
    where: where
  });
  // 查询对应的 permission
  for (let i = 0; i < users.length; i++) {
    const el = users[i];
    el['permissions'] = await get_ids(el.permissionId || '');
  }
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
  try {
    const post = await prisma.Role.findUnique({
      where: { id: parseInt(id, 10) }
    });
    // 查询对应的 permission
    post['permissions'] = await get_ids(post.permissionId || '');
    if (post) {
      return post;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

module.exports = {
  create,
  get_all,
  get_id,
  update
};
