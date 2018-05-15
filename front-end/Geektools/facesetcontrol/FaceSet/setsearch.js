const config = require("../../config/index.js")
let image_type = 'BASE64'
let group_id_list = 'rj1710,rj1709'

let url = config.facesearchurl + config.setsearch + '?' + config.access_token

let request = (base64Img, callback) => {
  let params = {
    'image': base64Img,
    'image_type': image_type,
    "group_id_list" : group_id_list
  }
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res){
      console.log('succses res.', res)
      if (res['data']['error_code'] == 222202){
        callback.success('图片里没有人脸啊')
      }else if(res['data']['result']['user_list'][0]['score'] > 80){
        let talk = '经过识别，我们有很大几率认为你就是' + res['data']['result']['user_list'][0]['group_id'] + '的' + res['data']['result']['user_list'][0]['user_info'] + '同学'
        callback.success(talk)
      }else{
        callback.success('在人脸库中没有找到与你匹配的人脸信息')
      }
        
    },
    fail: function (res) {
      console.log('fail res', res)
      if (callback.fail)
        callback.fail()
    }
  })
}
module.exports = {
  request: request
}