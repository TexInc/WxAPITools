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
      url: 'https://ehome.susmote.com/zb_system/cmd.php?act=os_wxapi&v=v1&mode=article',
      
      data: {
        'id':'1'
      },
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
