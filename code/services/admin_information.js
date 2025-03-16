const prisma = require('../utils/prisma');
const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let data;
  let last;

  try {
    // 获取最大值
    last = await prisma.information.findFirst({
      where: {
        id: {
          gte: 1,
          lte: 9999
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    data = await prisma.information.create({
      data: {
        ...body,
        id: last++
      }
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
    data = await prisma.information.update({
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
    data = await prisma.information.delete({
      where: { id: id - 0 }
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// 查询列表
async function get_all(page = 1, pageSize = 10, filters = []) {
  const where = generate_filters(filters, {
    // Information is from 1 to 9999
    id: {
      gte: 1,
      lte: 9999
    }
  });

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const data = await prisma.information.findMany({
    skip,
    take,
    where
  });

  const counts = await prisma.information.count({
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
  const data = await prisma.information.findUnique({
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
