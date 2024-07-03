const fs = require('fs');
const path = require('path');

module.exports = function viteMockPlugin() {
  return ({
    name: 'my-mock-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // 自定义请求处理...
        const mockRes = getMockResult();
        const mockItem = mockRes.find(i => i.url === req.url);

        if (mockItem) {
          const result = mockItem.response();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } else {
          next();
        }
      })
    },
  });
};

function getMockResult() {
  const stat = fs.statSync('mock')
  const isDir = stat.isDirectory();
  let mockRes = []
  if (isDir) {
    // 获取根目录下的文件
    mockRes = require(path.resolve(process.cwd(), 'mock/index.js'))
  }
  return mockRes;
}