const { resolve } = require('path')
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')             // 通过 commonjs 的语法把这两个文件引入进来
const handleUserRouter = require('./src/router/user')

// 用于处理 post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        // 如果 postData 为空，也就是没有数据
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式为 JSON
  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]        // 获取请求路径

  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 处理 post data
  getPostData(req).then(postData => {
    req.body = postData

    // 之后的路由就可以通过 req.body 获取 post 方式提交的数据
    // console.log('req.body = ', req.body)

    // 处理 blog 路由
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)           // blogData 返回的是一个对象，这里最终是要返回一个字符串，所以这里转化一下
    //   )
    //   return
    // }

    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(
          JSON.stringify(blogData)           // blogData 返回的是一个对象，这里最终是要返回一个字符串，所以这里转化一下
        )
        return
      }) 
    }

    // 处理 user 路由
    const userData = handleUserRouter(req, res)
    if (userData) {
      res.end(
        JSON.stringify(userData)
      )
      return
    }

    // 未命中路由，返回 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()

  })


}

module.exports = serverHandle

// process.env.MODE_ENV