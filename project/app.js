//app.js
App({
  onLaunch: function () {
    
  },
  // GET
  http(api, data, success){
    wx.request({
      url: api,
      data: data,
      header: { 'content-type': "application/x-www-form-urlencoded" },
      method: 'GET',
      success: success
    })
  },
  // 提示框
  hint: function (msg) {
    wx.showToast({
      title: msg,
      icon: "none",
      duration: 2000
    })
  },
  globalData: {
    userInfo: null
  }
})