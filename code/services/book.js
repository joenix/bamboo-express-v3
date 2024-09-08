const prisma = require('../utils/prisma');
const { get_ids } = require('./material');
const { generate_filters } = require('../utils/index');

// 创建
async function create(body) {
  let user;
  try {
    user = await prisma.Book.create({
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
    updatedPermission = await prisma.Book.update({
      where: { id: id - 0 },
      data: updatedData
    });
    return updatedPermission;
  } catch (error) {
    throw error;
  }
}

// 获取所有
async function get_all(page = 1, pageSize = 10, filters = []) {
  const where = generate_filters(filters);
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const books = await prisma.Book.findMany({
    skip: skip,
    take: take,
    where: where
  });

  for (let i = 0; i < books.length; i++) {
    const el = books[i];
    el['url'] = await get_ids(el.url || '');
    el['img'] = await get_ids(el.img || '');
  }

  const counts = await prisma.Book.count({
    where: where
  });
  const totalPages = Math.ceil(counts / pageSize);

  return {
    data: books,
    counts,
    totalPages,
    currentPage: page
  };
}
// 查询单个
async function get_id(id) {
  const post = await prisma.Book.findUnique({
    where: { id: parseInt(id, 10) }
  });
  if (post) {
    post['url'] = await get_ids(post.url || '');
    post['img'] = await get_ids(post.img || '');
    return post;
  } else {
    return null;
  }
}

async function get_books_code_user(user_id) {
  // 获取当前所有的book
  const books = await prisma.Books.findMany({
    where: {
      delete: false
    }
  });
  // 根据用户获取code
  const codes = await prisma.Code.findMany({
    where: {
      delete: false,
      userId: user_id
    }
  });
  if (!books || !codes) {
    return [];
  }
  // 设置是否激活状态
  for (let index = 0; index < books.length; index++) {
    const book = books[index];
    for (let index = 0; index < books.length; index++) {
      const code = booksbooks[index];
      book['active'] = false;
      if (code.bookId == book.id && code.active) {
        book['active'] = true;
      }
    }
  }
  return book;
}

module.exports = {
  create,
  get_all,
  get_id,
  update,
  get_books_code_user
};
