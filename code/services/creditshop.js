const prisma = require('../utils/prisma');
const { generate_filters } = require('../utils/index');
const { update_crtedit_his } = require('./credit');

async function getcreditshop(userId) {
  // Step 1: 查询 CreditShopHis 表，获取用户的积分商品历史
  const creditShopHistory = await prisma.creditShopHis.findMany({
    where: { userId }
  });

  // Step 2: 根据 ceditShopID 查询 CreditShop 信息并附加到历史记录中
  const historyWithShopInfo = await Promise.all(
    creditShopHistory.map(async (history) => {
      const shopInfo = await prisma.creditShop.findUnique({
        where: { id: history.ceditShopID }
      });
      return {
        ...history,
        shopInfo
      };
    })
  );

  console.log(historyWithShopInfo);
  return historyWithShopInfo;
}

// 积分购买商品
async function buycreditshop(userid, credit, creditshopid, content, address) {
  const userCredit = await prisma.credit.findUnique({
    where: { userId: userid }, // 通过 userId 查找
    select: {
      credit: true // 仅选择 credit 字段
    }
  });
  if (userCredit.credit < credit) {
    throw '积分不足';
  }
  // 更新用户积分
  await update_crtedit_his(userid, -credit, content);

  // 添加购买历史
  user = await prisma.CreditShopHis.create({
    data: {
      ceditShopID: creditshopid,
      userId: userid,
      content: address
    }
  });
  return true;
}

// 创建
async function create(body) {
  let user;
  try {
    user = await prisma.CreditShop.create({
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
    updatedPermission = await prisma.CreditShop.update({
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

  const users = await prisma.CreditShop.findMany({
    skip: skip,
    take: take,
    where: where
  });

  const counts = await prisma.CreditShop.count({
    where: where
  });
  // 查询对应的 permission
  // for (let i = 0; i < users.length; i++) {
  //   const el = users[i];
  //   el['permissions'] = await get_ids(el.permissionId || '');
  // }
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
    const post = await prisma.CreditShop.findUnique({
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
  update,
  buycreditshop,
  getcreditshop
};
