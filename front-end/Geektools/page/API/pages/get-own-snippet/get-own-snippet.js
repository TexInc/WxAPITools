// page/API/pages/get-own-snippet/get-own-snippet.js
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
      url: 'http://127.0.0.1:8000/snippets/',
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
          mainInfo: result['data'][0],
          info_id: result['data'][0]['id'],
          info_title: result['data'][0]['title'],
          info_code: result['data'][0]['code'],
          info_linenos: result['data'][0]['linenos'],
          info_language: result['data'][0]['language'],
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
