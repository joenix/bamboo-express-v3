// 构建过滤条件
function generate_filters(filters = []) {
  let filter_obj = {}
  if (Array.isArray(filters)) {
    filters.forEach(el => {
      filter_obj[el['key']] = {
        contains: el['value'] || "",
      }
    })
  }
  const where = {
    delete: false, // 假设 delete 是一个布尔类型的字段
    ...filter_obj,
  };
  return where
}


module.exports = {
  generate_filters
};
