//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    images: [],
    imageMode:'scaleToFill',

    motto: '测试数据绑定',
    clicknum:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  chooseImage:function() {

    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const imagesObj = {
           src : res.tempFilePaths[0]
          }
        console.log(res);
        const newImg = this.data.images.concat(imagesObj);
        this.setData({
          images: newImg
        })
        console.log(this.data.images);

      }
    })
  },

  // 保存图片处理函数
  saveImage:function(){
    const data = new Uint8ClampedArray([255, 215, 216, 1])
    wx.canvasPutImageData({
      canvasId: 'myCanvas',
      x: 0,
      y: 0,
      width: 1,
      data: data,
      success(res) {
        console.log(res) 

        wx.canvasToTempFilePath({
          x: 100,
          y: 200,
          width: 50,
          height: 50,
          destWidth: 100,
          destHeight: 100,
          canvasId: 'myCanvas',
          success(res) {
            console.log(res.tempFilePath)
          }
        })

       }
    })
  },

  clickMe: function () {
    wx.canvasToTempFilePath({
      canvasId: 'testCanvas',
      fileType: 'jpg',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res)
            wx.hideLoading();
            wx.showToast({
              title: '保存成功',
            });
          },
          fail() {
            wx.hideLoading()
          }
        })
      }
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
