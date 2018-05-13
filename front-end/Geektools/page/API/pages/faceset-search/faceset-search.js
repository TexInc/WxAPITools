// page/API/pages/faceset-search/faceset-search.js
import FacesetControl from '../../../../facesetcontrol/facesetcontrol.js'
Page({
  data: {
    run_type:'setsearch',
    image_type: 'BASE64',
  },
  onLoad(options) {
    let that = this
    this.imgPath = options.imgPath
    this.facesetControl = new FacesetControl(this)
      .on('ImageChanged', (imgPath) => {
        that.imgPath = imgPath
        console.log('imgPath', imgPath)
      })
      .on('DecodeStart', (imgPath) => {
        console.log('DecodeStart', this.data.user_name)
        wx.showLoading({
          title: '解析中',
          mask: true
        },
          console.log('imgPath:', imgPath))
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
    this.facesetControl.setImage(this.imgPath)
  }
})