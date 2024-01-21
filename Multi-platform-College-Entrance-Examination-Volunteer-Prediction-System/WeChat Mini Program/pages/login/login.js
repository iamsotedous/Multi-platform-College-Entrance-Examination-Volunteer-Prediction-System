// pages/login/login.js

//用来实现登录功能
let current_login_phone_number = ""
let current_login_password = ""

const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //加入登录使用的电话号，变量名为current_login_phone_number
  add_login_phone_number(event){
    current_login_phone_number = event.detail.value
    console.log("登录录入的电话号：",current_login_phone_number)
    console.log("电话号类型：",typeof(current_login_phone_number))
  },

  //加入登录使用的密码current_login_password
  add_login_password(event){
    current_login_password = event.detail.value
    console.log("登录录入的密码：",current_login_password)
    console.log("密码类型：",typeof(current_logon_password))
  },

  //登陆的实现：由于云函数很难读出查库的内容，这里采用了两次调用云函数的方法：首先获取到输入框的电话号和密码，然后第一次首先查找是否有对应的电话号，total为数量值（由于注册的限制total只能为01）。第二次查找是否有电话号和密码都对应的数据，并且赋值数量给total。两次total的和存在flag_for_situation中，flag_for_situation只能有三个取值：0代表不存在账号，1代表账号存在但密码错误，2代表账号密码正确。
  login(){
    let flag_for_situation = 0
    //console.log("登录按钮")
    wx.cloud.callFunction({
      name: "cloud_login_check",
      data: {
        type : "number",
        login_phone_number : current_login_phone_number,
        //login_password : current_login_password
      },
      //complete : console.log,
      success(res0){
        console.log("检查是否有这个账户:ok",res0)
        flag_for_situation = flag_for_situation + res0.result.total
        wx.cloud.callFunction({
          name : "cloud_login",
          data:{
            login_phone_number : current_login_phone_number,
            login_password : current_login_password
          },
          success(res1){
              console.log("检查账号密码是否正确:ok",res1)
              flag_for_situation = flag_for_situation + res1.result.total
              //console.log("flag_for_situation = " , flag_for_situation)

              if(flag_for_situation == 2){
                console.log("密码正确")
                
                db.collection("user").where({
                  phone_number : current_login_phone_number
                })
                .get({
                  success(res){
                    //console.log(res)
                    getApp().globalData.global_is_admin = Number(res.data[0].is_admin)
                  },
                  fail(res){
                    console.log(res)
                  }
                })
                getApp().globalData.user_phone_number = current_login_phone_number
                //这里要跳转到主页
                // wx.switchTab({
                //   url: '/pages/index/index',
                // })
                setTimeout(function () {
                  wx.switchTab({
                     url: "/pages/index/index",
                  });
                }, 1000);
                wx.showToast({
                  title: '欢迎使用',
                })
              }
              else if(flag_for_situation == 1){
                console.log("密码错误")
                wx.showToast({
                  title: '密码错误',
                  icon : "error"
                })
              }
              else if(flag_for_situation == 0){
                console.log("账号未注册")
                wx.showToast({
                  title: '账号未注册',
                  icon : "error"
                })
                setTimeout(function () {
                  wx.redirectTo({
                     url: "/pages/logon/logon",
                  });
                }, 1000);
              }
              else{
                console.log("意外问题")
              }
          }
        })
        
      }
    })
},

jump_to_logon(){
  wx.navigateTo({
    url: '/pages/logon/logon',
  })
},

jump_to_change_password(){
  wx.navigateTo({
    url: '/pages/change_password/change_password',
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})