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

        showInput:{
            hiddenmodalput:true,
            showText :'',
            nowId : ''
        },

        imgObj:{
            // 背景图片
            bgimg:{
                src:'../../images/bg.jpg',
                mode:'scaleToFill'
            },
            // 用户图片
            // 示例图片
            uploadImg:{
                mode :'scaleToFill',
                userimg:{
                    src:'../../images/user.png'
                },
                img1:{
                    src : '../../images/tt.jpg',

                },
                img2:{
                    src : '../../images/tt.jpg',

                },
                img3:{
                    src : '../../images/tt.jpg',

                },
                img4:{
                    src : '../../images/tt.jpg',
                },
            },
        },

        textObj: {
            crop: '草莓',
            userName: '张三',
            address: '江苏省无锡市南长区五星家园',
            text1: '点击修改文字',
            text2: '点击修改文字',
        },

        bgImgObj: {}

    },

    onLoad: function () {

        return false;

        // 渲染背景图
        const ctx = wx.createCanvasContext('myCanvas')

        ctx.width = 412;
        ctx.height = 880;

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

    changeText:function(e){

        // 获取修改文字ID
        var textId = e.currentTarget.id;
        var tmpText = e._relatedInfo.anchorTargetText;

        this.setData({
            showInput: {
                hiddenmodalput: !this.data.showInput.hiddenmodalput,
                showText : tmpText,
                nowId :textId
            }
        });

        console.log(e);
        // console.log(tmpText);


    },

    //取消按钮
    textCancel: function(e){

        this.setData({
            showInput: {
                hiddenmodalput: true,
                showText : '',
                nowId :''
            }
        });
    },
    //确认
    textConfirm: function(e){

        this.setData({
            showInput: {
                hiddenmodalput: true,
                showText : ''
            }
        });

    },

    // 获取input输入框的文字
    getInput:function(e){
        var inputText = e.detail.value;
        var nowId = this.data.showInput.nowId;
        var newtextObj = this.data.textObj;
        newtextObj[nowId] = inputText;
        this.setData({
            textObj:newtextObj
        });

    },

    chooseImg :function(e){

        // 获取当前点击ID
        var textId = e.currentTarget.id;

        var that = this;

        // 调用上传图片
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const setImgSrc = res.tempFilePaths[0];

                var newimgObj = that.data.imgObj;
                newimgObj.uploadImg[textId]['src'] = setImgSrc;

                that.setData({
                    imgObj:newimgObj
                });

            }
        })


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