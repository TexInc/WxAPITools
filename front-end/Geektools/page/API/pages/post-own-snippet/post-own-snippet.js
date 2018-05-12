// page/API/pages/post-own-snippet/post-own-snippet.js
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
        'title': 'hello TexTec',
        'code': 'print("hello TexTec")',
        'linenos': 'True',
        'language': 'python',
      },
      method: 'POST',
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
          info_id: result['data']['id'],
          info_title: result['data']['title'],
          info_code: result['data']['code'],
          info_linenos: result['data']['linenos'],
          info_language: result['data']['language'],
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
