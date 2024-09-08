const prisma = require('../utils/prisma');

const { get_id: get_role_id } = require('./role');

const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let user;
  try {
    user = await prisma.User.create({
      data: body
    });
  } catch (error) {
    throw error;
  }
  return user;
}
// 获取所有用户
async function get_all(page = 1, pageSize = 10, filters = []) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const where = generate_filters(filters);

  const users = await prisma.User.findMany({
    skip: skip,
    take: take,
    include: {
      credits: true,
      roles: true
    },
    where: where
  });
  if (users) {
    for (let i = 0; i < users.length; i++) {
      const el = users[i];
      el['roles'] = await get_role_id(el['roles']?.id || 0);
    }
  }

  const counts = await prisma.user.count({
    where
  });
  const totalPages = Math.ceil(counts / pageSize);

  return {
    users,
    counts,
    totalPages,
    currentPage: page
  };
}
// 查询单个用户
async function get_id(id) {
  const post = await prisma.User.findUnique({
    where: {
      id: parseInt(id, 10),
      include: {
        credits: true,
        roles: true
      }
    }
  });
  if (post) {
    for (let i = 0; i < post.length; i++) {
      const el = post[i];
      el['roles'] = await get_role_id(el['roles']?.id);
    }
  }

  if (post) {
    return post;
  } else {
    return null;
  }
}

// 查询单个用户
async function find_username(username) {
  const post = await prisma.User.findUnique({
    where: { username: username },
    include: {
      credits: true,
      roles: true
    }
  });
  // if (post) {
  //   for (let i = 0; i < post.length; i++) {
  //     const el = post[i];
  //     el["roles"] = await get_role_id(el["roles"]?.id)
  //   }
  // }
  if (post) {
    return post;
  } else {
    return null;
  }
}

// 更新  delete为true 则是删除
async function update(id, updatedData) {
  let updatedPermission;
  try {
    updatedPermission = await prisma.User.update({
      where: { id: id - 0 },
      data: updatedData
    });
    return updatedPermission;
  } catch (error) {
    throw error;
  }
  return updatedPermission;
}

module.exports = {
  create,
  get_all,
  get_id,
  update,
  find_username
};
