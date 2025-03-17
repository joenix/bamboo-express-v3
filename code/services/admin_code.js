const prisma = require('../utils/prisma');
const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let data;

  try {
    data = await prisma.code.create({
      data: body
    });
  } catch (error) {
    throw error;
  }

  return data;
}

// 更新
async function update(id, info) {
  let data;
  try {
    data = await prisma.code.update({
      where: { id: id - 0 },
      data: info
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// 删除
async function remove(id) {
  let data;

  try {
    data = await prisma.code.delete({
      where: { id: id - 0 }
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// 查询列表
async function get_all(page = 1, pageSize = 10, filters = []) {
  const where = generate_filters(filters);

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const data = await prisma.code.findMany({
    skip,
    take,
    where
  });

  const counts = await prisma.code.count({
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

// 查询单个
async function get_one(id) {
  const data = await prisma.code.findUnique({
    where: { id: parseInt(id, 10) }
  });

  return data || null;
}

// 导出
module.exports = {
  create,
  update,
  remove,
  get_all,
  get_one
};
