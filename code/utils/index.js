// 返回器
async function returner(data, code = 0, msg = decodeURI(`%E6%9C%8D%E5%8A%A1%E5%BC%82%E5%B8%B8`)) {
  const info = { data, code };

  if (code) {
    info.msg = msg;
  }

  return info;
}

// Promise
async function catcher(resolve, reject) {
  try {
    return await resolve();
  } catch (e) {
    await reject(e);
  }
}

// 构建过滤条件
// function generate_filters(filters = [], exps = {}) {
//   let filter_obj = {};
//   if (Array.isArray(filters)) {
//     filters.forEach((el) => {
//       filter_obj[el['key']] = {
//         contains: el['value'] || ''
//       };
//     });
//   }
//   const where = {
//     delete: false, // 假设 delete 是一个布尔类型的字段
//     ...filter_obj,
//     ...exps
//   };
//   return where;
// }

function generate_filters(filters = [], exps = {}) {
  const filter_obj = {};
  if (Array.isArray(filters)) {
    filters.forEach((el) => {
      const { key, value, op = 'contains' } = el;
      filter_obj[key] = {
        [op]: value
      };
    });
  }
  return {
    delete: false,
    ...filter_obj,
    ...exps
  };
}

// 导出
module.exports = {
  returner,
  catcher,
  generate_filters
};
