import CardScanner from '../../../../cardscanner/cardscanner.js'
Page({
  data: {
    image_type: 'BASE64',
    user_id: '',
    user_info: ''
  },
  bindNameInput: function (e) {
    this.data.user_id = e.detail.value
  },
  bindEmailInput: function (e) {
    this.data.user_info = e.detail.value
  },
  onLoad(options) {
    let that = this
    this.imgPath = options.imgPath
    this.cardScanner = new CardScanner(this)
      .on('ImageChanged', (imgPath) => {
        that.imgPath = imgPath
        console.log(imgPath)
      })
      .on('DecodeStart', (imgPath) => {
        wx.showLoading({
          title: '解析中',
          mask: true
        })
      })
      .on('DecodeComplete', (res) => {
        if (res.code == 0) {
          wx.showModal({
            title: '',
            content: JSON.stringify(res.data),
          })
        } else {
          console.log('解析失败：' + res)
        }
        wx.hideLoading()
      })
  },

  onReady() {
    this.cardScanner.setImage(this.imgPath)
  }
})