// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    //云开发环境初始化
    wx.cloud.init({
      env : 'test-3g4liwgzdf92b615'
    })
  },
  //getApp().globalData.user_phone_number
  globalData: {
    userInfo: null,
    global_is_admin : 0,
    user_phone_number : "",
    user_score : 0,
    user_location : "",
    user_name : ""
  }
})
