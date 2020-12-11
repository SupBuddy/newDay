const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPath: 'https://gw.alicdn.com/tfscom/i1/TB1hyBBjtTfau8jSZFwXXX1mVXa_.jpg',
    avatarPath: 'https://gw.alicdn.com/tfscom/i1/TB1hyBBjtTfau8jSZFwXXX1mVXa_.jpg',
    descTxt: 'Life is short, seize the day.'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx: wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pixelRatio: res.pixelRatio,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
    that.drawCanvas();
  },

  drawCanvas(){
    this.setData({
      pixelRatio: this.data.pixelRatio,
      descTxt: this.data.descTxt
    })
    let ctx = wx.createCanvasContext('myCanvas');
    let ctxW = this.data.windowWidth;
    let ctxH = 1210;
    let pixelRatio = this.data.pixelRatio;

    // 垂直渐变
    const grd = ctx.createLinearGradient(0, 0, 0, ctxH);
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(1, '#ffffff');
    ctx.setFillStyle(grd);
    ctx.fillRect(0, 0, ctxW, ctxH);

    wx.getImageInfo({
      src: this.data.bgPath,
      success: (res) => {
        ctx.drawImage(res.path, 15, 15, 345, 510); //bg
        wx.getImageInfo({
          src: this.data.avatarPath,
          success: (res) => {
            /**/
            ctx.arc(46, 358, 25, 0, 2 * Math.PI)
            ctx.fill()
            ctx.save();
            ctx.beginPath(); //开始绘制
            ctx.clip(); //剪切
            ctx.drawImage(res.path, 23, 333, 50, 50); //userHeader  // 推进去图片必须是https
            ctx.restore(); //恢复之前保存的绘图上下文 继续绘制
            /**/

            ctx.setTextAlign('left');
            ctx.setTextBaseline('middle');
            ctx.setFontSize(16);
            ctx.setFillStyle('#fff');
            this.fontLineFeed(ctx, this.data.descTxt, 450, 30, 79, 328);
            ctx.stroke();
            ctx.draw();
          }
        })

      }
    })

  },

  // 保存图片
  saveImage: function (e) {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            wx.showToast({
              title: '图片保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },

  // 文字换行
  fontLineFeed: function (ctx, str, splitLen, strHeight, x, y) {
    let strArr = [];
    for (let i = 0, len = str.length / splitLen; i < len; i++) {
      strArr.push(str.substring(i * splitLen, i * splitLen + splitLen));
    }
    let s = 0;
    for (let j = 0, len = strArr.length; j < len; j++) {
      s = s + strHeight;
      ctx.fillText(strArr[j], x, y + s);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})