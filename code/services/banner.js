const prisma = require("../utils/prisma")
const { get_ids } = require("./material")
const { generate_filters } = require("../utils/index")
// 创建
async function create(body) {
  let user
  try {
    user = await prisma.Banner.create({
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
    updatedPermission = await prisma.Banner.update({
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

  const banners = await prisma.Banner.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const totalUsers = await prisma.Banner.count({
    where: where
  });
  for (let i = 0; i < banners.length; i++) {
    const el = banners[i];
    el["img"] = await get_ids(el.img || "")
    el['video'] = await get_ids(el.video || "")
  }
  const totalPages = Math.ceil(totalUsers / pageSize);

  return {
    data: banners,
    totalUsers,
    totalPages,
    currentPage: page
  };
}
// 查询单个
async function get_id(id) {
  const post = await prisma.Banner.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (post) {
    post["img"] = await get_ids(post.img || "")
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



