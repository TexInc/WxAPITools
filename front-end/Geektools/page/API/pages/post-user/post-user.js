const requestUrl = require('../../../../config').requestUrl
const duration = 2000

Page({
  data:{
    hasUserInfo: false
  },
  makeRequest: function() {
    var that = this
    var self = this
    self.setData({
      loading: true
    })

    wx.request({
      url: 'http://ehome.susmote.com/users/',
      data: {
        'username' : 'ayesup',
        'email': 'ayesup@susmote.com'
      },
      method: 'POST',
      success: function(result) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: duration
        })
        self.setData({
          loading: false
        })
        that.setData({
          hasUserInfo: true,
          user_name: result['data']['username'],
          user_url: result['data']['url']
        })
        that.update()
        console.log('request success', result),
        console.log(result['data'])
      },

      fail: function({errMsg}) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
      }
    })
  }
})
