var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationInfo: {},
    currentLocation: '',
    weatherInfo: {},
    isSwitch: false,
    animation: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
  },

  fadeOut(){
    this.animation.opacity(0).step({ duration: 2000 });
    this.setData({
      animation: this.animation.export()
    })
  },

  fadeIn() {
    this.animation.opacity(1).step({ duration: 3000 });
    this.setData({
      animation: this.animation.export()
    })
  },

  getLocation(){
    var that = this;
    wx.getLocation({
      success: function(res) {
        console.log(res)
        var position = res.latitude + "," + res.longitude;
        app.http('https://apis.map.qq.com/ws/geocoder/v1/?l&get_poi=1',{
          key: 'AFEBZ-7NN34-VWZUY-XINDT-CGE4F-7MBHW',
          location: position
        }, res => {
          console.log(res.data.result)
          that.setData({
            locationInfo: res.data.result,
            currentLocation: res.data.result.address_component.city
          })
          that.getWeather();
        })
      },
    })
  },

  switchLocation(){
    // this.fadeOut();
    this.setData({
      isSwitch: true
    })
  },

  confirmLocation(e){
    this.fadeIn();
    this.setData({
      currentLocation: e.detail.value,
      isSwitch: false
    })
    this.getWeather();
  },

  cancel(){
    this.setData({
      isSwitch: false
    })
  },

  getWeather() {
    app.http('https://free-api.heweather.net/s6/weather/now', {
      location: this.data.currentLocation,
      key: '95d8850b44eb45a7abd7acbd7ee211d6'
    }, res => {
      if (res.data.HeWeather6[0].status == 'ok') {
        this.setData({
          weatherInfo: res.data.HeWeather6[0],
          currentLocation: res.data.HeWeather6[0].basic.location
        })
      } else {
        app.hint('请输入正确的城市或地区')
        this.setData({
          isSwitch: true,
          currentLocation: ''
        })
      }
    })
  },

  getForecast(){
    app.http('https://free-api.heweather.net/s6/weather/forecast',{
      location: this.data.currentLocation,
      key: '95d8850b44eb45a7abd7acbd7ee211d6'
    },res => {
      if (res.data.HeWeather6[0].status == 'ok'){
        this.setData({
          forecastInfo: res.data.HeWeather6[0]
        })
      }
    })
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