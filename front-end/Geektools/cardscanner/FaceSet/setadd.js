let image_type =  'BASE64'
let user_id = "1564asf"
let user_info = "sadf445"
let url = 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=24.b1f8809b41f4e08e2ddaca24385350d2.2592000.1528706275.282335-11229629'

let request = (base64Img, callback) => {
  let params = {
    'image': base64Img,
    'image_type': image_type,
    'group_id': 'student',
    'user_id': user_id,
    'user_info': user_info
  }
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      console.log('succses res.' ,res)
      callback.success(res.data)
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