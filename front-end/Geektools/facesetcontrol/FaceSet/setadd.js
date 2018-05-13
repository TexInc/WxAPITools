const config = require('../../config/index.js')
let image_type =  'BASE64'

let url = config.faceseturl + config.setadd + '?' + config.access_token

let request = (base64Img, class_id,user_id, user_name,callback) => {
  let params = {
    'image': base64Img,
    'image_type': image_type,
    'group_id': class_id,
    'user_id': user_id,
    'user_info': user_name
  }
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      if (res['data']['error_code'] == 222018){
        callback.success("请输入你的学号")
      }else if (res['data']['error_code'] == 222006) {
        callback.success("请输入你的班级")
      }else if (user_name == "") {
        callback.success("请输入你的姓名")
      } else if (res['data']['error_code'] == 222202){
        callback.success('图片里面没有人脸啊!')
      }else{
        callback.success("恭喜你录入成功")
      }
      console.log('succses res.' ,res)
    },
    fail: function (res) {
      console.log('url',url)
      console.log('fail res', res)
      if (callback.fail)
        callback.fail('出现错误')
    }
  })
}
module.exports = {
  request: request
}