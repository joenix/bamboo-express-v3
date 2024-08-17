const prisma = require("../utils/prisma")
const { get_ids } = require("./permission")
const { generate_filters } = require("../utils/index")

// 创建
async function create(userid) {
  let user
  try {
    // 初始化用户的学分
    let obj = {
      userId: userid,
      credit: 0,
    }
    user = await prisma.Credit.create({
      data: obj,
    });
    // 添加初始化学分记录 
    obj["content"] = "init"
    user = await prisma.CreditHis.create({
      data: obj,
    });
  } catch (error) {
    throw error;
  }
  return user
}

// 更新 学分记录表  
async function update_crtedit_his(userid, credit) {
  let updatedPermission
  try {
    updatedPermission = await prisma.CreditHis.create({
      data: {
        userId: userid,
        credit: credit - 0
      },
    });
    await update(userid, credit)
    return updatedPermission
  } catch (error) {
    throw error;
  }
}


// 更新  delete为true 则是删除
async function update(userid, credit) {
  console.log("credit", credit)
  let updatedPermission
  let obj = {}
  credit = credit - 0
  obj = { increment: credit }
  try {
    updatedPermission = await prisma.Credit.update({
      where: { userId: userid - 0 },
      data: {
        credit: obj
      },
    });
    return updatedPermission
  } catch (error) {
    console.log("update", error)
    throw error;
  }
}

// 获取所有 
async function get_all(page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const users = await prisma.Credit.findMany({
    skip: skip,
    take: take,
    where: {
      delete: false, // 假设 delete 是一个布尔类型的字段  
    },
  });

  const counts = await prisma.Credit.count({
    where: {
      delete: false, // 假设 delete 是一个布尔类型的字段  
    },
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
  const post = await prisma.Credit.findUnique({
    where: { id: parseInt(id, 10) },
  });
  // 查询对应的 permission
  post["permissions"] = await get_ids(post.permissionId || "")
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
  update,
  update_crtedit_his
}



