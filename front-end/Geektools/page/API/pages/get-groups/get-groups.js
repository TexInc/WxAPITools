const requestUrl = require('../../../../config').requestUrl
const duration = 2000

Page({
  data: {
    hasUserInfo: false
  },
  makeRequest: function () {
    var that = this
    var self = this
    self.setData({
      loading: true
    })

    wx.request({
      url: 'http://ehome.susmote.com/groups/',
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
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
          groups_Info: result['data'][0],
          groups_url: result['data'][0]['url'],
          groups_name: result['data'][0]['name'],
        })
        that.update()
        console.log('request success', result),
          console.log(result['data'])
      },

      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
      }
    })
  }
})
