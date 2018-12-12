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
                src:'../../images/canvas-bg.jpg',
                mode:'scaleToFill'
            },
            // 用户图片
            // 示例图片
            uploadImg:{
                mode :'aspectFill',
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
            address: '江苏省无锡市南长区',
            text1: '点击添加描述',
            text2: '点击添加描述',
        },

        bgImgObj: {}

    },

    onLoad: function () {


    },
    onReady: function (e) {

        // 页面渲染后 执行


    },



    // 用户修改文字
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

    // 选择上传图片
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
    }

    ,saveCanvas :function () {
        // 渲染背景图
        const ctx = wx.createCanvasContext('firstCanvas');
        ctx.width = 1080;
        ctx.height = 1920;
        var _that = this;
        var bgSrc = _that.data.imgObj.bgimg.src;

        wx.getImageInfo({
            src: bgSrc,
            success (res) {
                _that.setCanvas(ctx,res,bgSrc);
            },
            fail(){
                wx.showToast({
                    title: '生成海报失败!',
                    icon: 'error',
                    duration: 2000
                })

            }
        });

    }


    // 绘制 canvas
    ,setCanvas :function (canvasObj,res,src) {

        canvasObj.clearRect(0, 0, canvasObj.width, canvasObj.height);

        // return false;
        canvasObj.drawImage(src, 0, 0, canvasObj.width, canvasObj.height);

        // 绘制文字
        this.canvasFillText(canvasObj);
        // 绘制图片
        this.canvasDrawImg(canvasObj);
        // 绘制用户头像
        this.canvasDrawUserImg(canvasObj);
        canvasObj.save();

        wx.showToast({
            title: '正在生成海报...',
            icon: 'loading',
            duration: 3000
        });

        // 导出保存图片
        canvasObj.draw(false,this.save_img());


    },
    // 绘制文本
    canvasFillText :function(canvasObj){
        // 绘制文字
        // 绘制用户信息
        canvasObj.setFontSize(40);
        canvasObj.setTextAlign('center');
        // 774 235
        // 作物
        canvasObj.setFillStyle('#fff');
        canvasObj.fillText(this.data.textObj.crop, 893, 280,234);

        // 姓名
        canvasObj.setFillStyle('#000');
        canvasObj.fillText(this.data.textObj.userName, 893, 358,234);

        // 地址
        // 调用多行绘制函数
        canvasObj.setFontSize(30);
        canvasObj.setTextAlign('left');
        this.drawText(canvasObj, this.data.textObj.address, 775, 420, 500, 234,30);
        // canvasObj.fillText(this.data.textObj.address, 893, 440,234);

        canvasObj.setFontSize(40);
        // 描述1
        this.drawText(canvasObj, this.data.textObj.text1, 64, 988, 500, 946,40);

        // 描述2
        this.drawText(canvasObj, this.data.textObj.text2, 64, 1560, 500, 946,40);
    }
    , canvasDrawImg:function (canvasObj) {

        var img1 = this.data.imgObj.uploadImg.img1.src;
        canvasObj.drawImage(img1,65,520,437,348);

        var img2 = this.data.imgObj.uploadImg.img2.src;
        canvasObj.drawImage(img2,578,520,436,348);

        var img3 = this.data.imgObj.uploadImg.img3.src;
        canvasObj.drawImage(img3,65,1090,437,348);

        var img4 = this.data.imgObj.uploadImg.img4.src;
        canvasObj.drawImage(img4,578,1090,436,348);


    }
    // 绘制用户头像
    ,canvasDrawUserImg:function (canvasObj) {

        var avatarurl_width = 251;    //绘制的头像宽度
        var avatarurl_heigth = 260;   //绘制的头像高度
        var avatarurl_x = 385;   //绘制的头像在画布上的位置
        var avatarurl_y = 222;   //绘制的头像在画布上的位置
        canvasObj.save();
        canvasObj.beginPath(); //开始绘制
        //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
        canvasObj.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
        canvasObj.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
        var userImg = this.data.imgObj.uploadImg.userimg.src;
        canvasObj.drawImage(userImg, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片
        canvasObj.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
    }

    // 保存图片
    ,save_img:function () {

        setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: 'firstCanvas',
                fileType:'png',
                destWidth:1080,
                destHeight:1920,
                width: 1080, //canvas原本的大小
                heght: 1920,
                quality: 1,

                success(res) {
                    wx.saveImageToPhotosAlbum({
                        filePath :res.tempFilePath,
                        success(res) {
                            console.log('保存成功');
                        },
                        fail(res){
                            console.log(res);
                        },
                        complete(res){
                            console.log(res);
                        }
                    });
                    wx.hideToast();
                },
                fail(res){
                    console.log('转换图片失败!');
                    console.log(res);
                }
            })
        }, 800)
    },

    //文本换行 参数：1、canvas对象，2、文本 3、距离左侧的距离 4、距离顶部的距离 5、6、文本的宽度
    drawText: function(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth,fontSize) {

        var setFontSize = 16;
        if (fontSize){
            setFontSize = fontSize;
        }

        var lineWidth = 0;
        var lastSubStrIndex = 0; //每次开始截取的字符串的索引
        for (let i = 0; i < str.length; i++) {
            lineWidth += ctx.measureText(str[i]).width;
            if (lineWidth > canvasWidth) {
                ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
                initHeight += setFontSize; //16为字体的高度
                lineWidth = 0;
                lastSubStrIndex = i;
                titleHeight += 30;
            }
            if (i == str.length - 1) { //绘制剩余部分
                ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
            }
        }
        // 标题border-bottom 线距顶部距离
        titleHeight = titleHeight + 10;
        return titleHeight
    }



});