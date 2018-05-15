var upng = require('./upng-js/UPNG.js')
var setadd = require('./FaceSet/setadd.js')
var setsearch = require('./FaceSet/setsearch.js')
var Promise = require('./promise.js')

const canvasID = 'scannerCanvas'
const actionTypes = ['ImageChanged', 'DecodeStart', 'DecodeComplete']

export default class FacesetControl {
  constructor(page) {
    this.page = page
    this.canvas = wx.createCanvasContext(canvasID)
    page.facesetControl = this
    page.bindChooseImg = this.bindChooseImg
    page.bindConfirm = this.bindConfirm
  }

  setImage(imgFilePath) {
    if (imgFilePath) {
      let that = this
      this.img = {
        path: imgFilePath
      }
      this._getImgSize(this.img)
        .then((img) => {
          return that._getCanvasSize()
        })
        .then(() => {
          that._calcTarget()
          that._drawTarget()
        })
    }
  }

  bindChooseImg(e) {
    let control = this.facesetControl
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: function (res) {
        control.onImageChanged && control.onImageChanged(res.tempFilePaths[0])
        console.log(res.tempFilePaths)
        control.setImage(res.tempFilePaths[0])
      },
      fail(e) {
        console.error(e)
      }
    })
  }

  bindConfirm(e) {
    let control = this.facesetControl
    if (control.finishDraw) {
      control.onDecodeStart && control.onDecodeStart()
      control._decodeTarget()
    } else {
      console.log('绘制未完成')
    }
  }

  on(action, callback) {
    if (actionTypes.indexOf(action) > -1 && typeof (callback) === 'function') {
      this['on' + action] = callback
    }
    return this
  }

  _getImgSize(img) {
    return new Promise(resolve => {
      if (img.width && img.height) {
        resolve(img)
      } else {
        let that = this
        wx.getImageInfo({
          src: img.path,
          success(res) {
            img['radio'] = res.width / res.height
            img['width'] = res.width
            img['height'] = res.height
            resolve(img)
          },
          fail(e) {
            console.error(e)
          }
        })
      }
    })
  }

  _getCanvasSize() {
    let that = this
    return new Promise(resolve => {
      if (that.canvasSize) {
        resolve()
      } else {
        wx.createSelectorQuery().select('#' + canvasID).boundingClientRect((res) => {
          that.canvasSize = {
            radio: res.width / res.height,
            width: res.width,
            height: res.height
          }
          resolve()
        }).exec()
      }
    })
  }

  _calcTarget() {
    let target = {}
    if (this.img.radio > this.canvasSize.radio) {
      target['width'] = this.canvasSize.width
      target['height'] = parseInt(target['width'] / this.img.radio)
      target['top'] = parseInt((this.canvasSize.height - target['height']) / 2)
      target['left'] = 0
    } else {
      target['height'] = this.canvasSize.height
      target['width'] = parseInt(target['height'] * this.img.radio)
      target['left'] = parseInt((this.canvasSize.width - target['width']) / 2)
      target['top'] = 0
    }
    this.target = target
  }

  _drawTarget() {
    let that = this
    this.finishDraw = false
    this.canvas.drawImage(this.img.path, this.target.left, this.target.top, this.target.width, this.target.height)
    this.canvas.draw(false, () => {
      that.finishDraw = true
    })
  }

  _decodeTarget() {
    let that = this
    this._getTargetImgData()
      .then((res) => {
        return that._toPNGBase64(res.buffer, res.width, res.height)
      })
      .then((base64) => {
        if (this.page.data.run_type == 'setadd'){
          return that._requestFaceSetAdd(base64)
        } else if (this.page.data.run_type == 'setsearch'){
          return that._requestFaceSetSearch(base64)
        }
      })
      .then(res => {
        that.onDecodeComplete && that.onDecodeComplete({
          code: 0,
          data: res
        })
      })
      .catch(error => {
        that.onDecodeComplete && that.onDecodeComplete(error)
      })
  }

  _getTargetImgData() {
    let that = this
    return new Promise((resolve, reject) => {
      wx.canvasGetImageData({
        canvasId: canvasID,
        x: that.target.left,
        y: that.target.top,
        width: that.target.width,
        height: that.target.height,
        success(res) {
          let platform = wx.getSystemInfoSync().platform
          if (platform == 'ios') {
            // 兼容处理：ios获取的图片上下颠倒
            res = that.reverseImgData(res)
          }
          resolve({
            buffer: res.data.buffer,
            width: res.width,
            height: res.height
          })
        },
        fail(e) {
          reject({
            code: 1,
            reason: '读取图片数据失败'
          })
        }
      })
    })
  }

  reverseImgData(res) {
    var w = res.width
    var h = res.height
    let con = 0
    for (var i = 0; i < h / 2; i++) {
      for (var j = 0; j < w * 4; j++) {
        con = res.data[i * w * 4 + j]
        res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
        res.data[(h - i - 1) * w * 4 + j] = con
      }
    }
    return res
  }

  _toPNGBase64(buffer, width, height) {
    return new Promise((resolve, reject) => {
      try {
        let pngData = upng.encode([buffer], width, height)
        resolve(wx.arrayBufferToBase64(pngData))
      } catch (e) {
        reject({
          code: 2,
          reason: '图片转base64失败'
        })
      }
    })
  }

  _requestFaceSetAdd(base64) {
    return new Promise((resolve, reject) => {
      setadd.request(base64,this.page.data.class_id,this.page.data.user_id,this.page.data.user_name, {
        success(res) {
          resolve(res)
        },
        fail() {
          reject({
            code: 3,
            reason: '图片解析失败'
          })
        }
      })
    })
  }

  _requestFaceSetSearch(base64) {
    return new Promise((resolve, reject) => {
      setsearch.request(base64, {
        success(res) {
          resolve(res)
        },
        fail() {
          reject({
            code: 3,
            reason: '图片解析失败'
          })
        }
      })
    })
  }
}
