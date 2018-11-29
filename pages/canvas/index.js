const app = getApp();

/**
 *
 * 修改思路
 使用
 wxml 完成功能
 导出是 把元素
 内的照片文字等信息
 获取后用
 canvas 绘制出来
 在进行保存即可

 */

Page({
    data: {

        bgimg: '../../images/bg.jpg',
        bgImgObj: {}

    },

    onLoad: function () {

        // 渲染背景图
        const ctx = wx.createCanvasContext('myCanvas')

        ctx.width = 412;
        ctx.height = 732;

        var _that = this;

        wx.getImageInfo({
            src: _that.data.bgimg,
            success (res) {

                _that.setCavas(ctx,res);

            }
        });

    },
    onReady: function (e) {

        // 页面渲染后 执行


    },

    setCavas :function (canvasObj,res) {

        console.log(res)
        canvasObj.drawImage(this.data.bgimg, 0, 0, canvasObj.width, canvasObj.height)

        // 添加文字
        canvasObj.setFontSize(20)
        canvasObj.setFillStyle('red');
        canvasObj.fillText('Hello', 20, 20)
        canvasObj.fillText('MINA', 100, 100)
        canvasObj.draw()


    }


});