// import Mock from 'mockjs'
const Mock = require('mockjs')

const userList = Mock.mock({
  'list|100': [{
    'cname': '@cname',
    'id+1': 1,
    'time': '@time'
  }]
})
module.exports = [
  {
    url: '/api/user',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: userList,
      }
    },
  },
]