const prisma = require("../utils/prisma")
const { get_ids } = require("./material")
const { generate_filters } = require("../utils/index")

// 创建
async function create(body) {
  let user
  try {
    user = await prisma.Information.create({
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
    updatedPermission = await prisma.Information.update({
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

  const infos = await prisma.Information.findMany({
    skip: skip,
    take: take,
    where: where
  });

  for (let i = 0; i < infos.length; i++) {
    const el = infos[i];
    el["img"] = await get_ids(el.img || "")
    el['video'] = await get_ids(el.video || "")
  }

  const counts = await prisma.Information.count({
    where: where
  });
  const totalPages = Math.ceil(counts / pageSize);

  return {
    data: infos,
    counts,
    totalPages,
    currentPage: page
  };
}
// 查询单个
async function get_id(id) {
  const post = await prisma.Information.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (post) {
    post["img"] = await get_ids(post.img || "")
    post["video"] = await get_ids(post.video || "")
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



