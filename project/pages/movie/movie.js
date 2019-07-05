const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieIdx: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = new Date();
    if (!wx.getStorageSync('movieIdx') || today.toLocaleDateString() != wx.getStorageSync('histDate')){
      console.log('new idx');
      this.setIdx();
    }
    else {
      console.log('old idx');
      this.getMovie(wx.getStorageSync('movieIdx'));
    }
  },

  setIdx(){
    var today = new Date();
    wx.setStorageSync('histDate', today.toLocaleDateString());
    var movieIdx = Math.round(Math.random() * 250);
    wx.setStorageSync('movieIdx', movieIdx)
    this.getMovie(movieIdx);
  },

  getMovie(idx){
    app.http('https://douban.uieee.com/v2/movie/top250',{
      start: idx,
      count: 1
    },res => {
      console.log(res)
      this.setData({
        movieInfo: res.data.subjects[0]
      })
    })
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