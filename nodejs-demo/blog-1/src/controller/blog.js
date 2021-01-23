const { exec } = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1 = 1 `
  if (author) {
    sql += `and author = '${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回一个 promise
  return exec(sql)
}

// 获取博客详情
const getDetail = (id) => {
  // 先返回假数据，格式是正确的
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1610798060195,
    author: 'zhangsan'
  }
}

// 新建一篇博客
const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性
  console.log('newBlog blogData...', blogData)                // 获取 post 请求中的 body 数据

  return {
    id: 3     // 表示新建博客，插入到数据表里面的 id
  }
}

// 更新一篇博客
const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的id
  // blogData 是一个博客对象，包含 title content 属性
  console.log('update blog ', id, blogData)
  return true
}

// 删除一篇博客
const delBlog = (id) => {
  // id 就是要删除的博客 id
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}