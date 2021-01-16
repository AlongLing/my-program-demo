const serverHandle = (req, res) => {
  // 设置返回格式为 JSON
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: '双越100',
    site: 'imooc',
    env: process.env.MODE_ENV
  }

  res.end(
    JSON.stringify(resData)
  )
}

module.exports = serverHandle