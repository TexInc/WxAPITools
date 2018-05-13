Page({
  data: {
    list: [
      {
        id: 'easy-get',
        name: '简单获取数据',
        open: false,
        pages: [
          {
            zh: "获取用户信息",
            url: 'get-user/get-user'
          }, {
            zh: '获取组的信息',
            url: 'get-groups/get-groups'
          }
        ]
      }, {
        id: 'easy-post',
        name: '简单上传数据',
        open: false,
        pages: [
          {
            zh: "上传用户信息",
            url: 'post-user/post-user'
          }, {
            zh: '上传组的信息',
            url: 'post-groups/post-groups'
          }
        ]
      }, {
        id: 'form-post',
        name: '表单上传数据',
        open: false,
        pages: [
          {
            zh: "上传用户信息",
            url: 'post-form-user/post-form-user'
          }, {
            zh: '上传组的信息',
            url: 'post-form-groups/post-form-groups'
          }
        ]
      }, {
        id: 'own-snippet',
        name: '个人定制API',
        open: false,
        pages: [
          {
            zh: "获取服务端信息",
            url: 'get-own-snippet/get-own-snippet'
          }, {
            zh: '上传信息到服务端',
            url: 'post-own-snippet/post-own-snippet'
          }
        ]
      }, {
        id: 'faceset',
        name: '人脸数据集操作',
        open: false,
        pages: [
          {
            zh: "人脸数据入库",
            url: 'faceset-add/faceset-add'
          }, {
            zh: '人脸数据搜索',
            url: 'faceset-search/faceset-search'
          }
        ]
      },{
        id: 'network',
        name: '网络',
        open: false,
        pages: [
          {
            zh: '发起一个请求',
            url: 'request/request'
          }, {
            zh: 'WebSocket',
            url: 'web-socket/web-socket'
          }, {
            zh: '上传文件',
            url: 'upload-file/upload-file'
          }, {
            zh: '下载文件',
            url: 'download-file/download-file'
          }
        ]
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        if(list[i].url){
          wx.navigateTo({
            url: 'pages/' + list[i].url
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})
