// pages/logon/logon.js

//用来连数据库
const db = wx.cloud.database()

//用来实现注册功能
let current_logon_phone_number = ""
let current_logon_password = ""
let current_logon_name = ""
let current_logon_verification = ""
let key_for_is_logon_before = ""

//用来判断是否以前注册过
let is_logon_before = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
      instruction_hidden:true
  },

  //加入注册使用的电话号，变量名为current_logon_phone_number
  add_logon_phone_number(event){
    current_logon_phone_number = event.detail.value
    console.log("注册录入的电话号：",current_logon_phone_number)
    console.log("电话号类型：",typeof(current_logon_phone_number))
  },

  //加入注册使用的密码current_logon_password
  add_logon_password(event){
    current_logon_password = event.detail.value
    console.log("注册录入的密码：",current_logon_password)
    console.log("密码类型：",typeof(current_logon_password))
  },

  //加入注册使用的名字current_logon_name 
  add_logon_name(event){
    current_logon_name = event.detail.value
    console.log("注册录入的名字：",current_logon_name)
    console.log("名字类型：",typeof(current_logon_name))
  },

  //加入注册使用的验证号用于区分是否为管理员，变量名为current_logon_verification
  add_logon_verification(event){
    current_logon_verification = event.detail.value
    console.log("注册录入的验证码：",current_logon_verification)
    console.log("验证码类型：",typeof(current_logon_verification))
  },

  logon(){
    console.log("注册中")
    console.log("上传的电话号为：",current_logon_phone_number)

    db.collection("user").where({
      phone_number : current_logon_phone_number
    }).count({
        success(res){
          console.log("重复手机号数：",res.total)
          is_logon_before = (res.total == 0 ? 0 : 1)
          console.log("is_logon_before:",is_logon_before)
          console.log("typeof(is_logon_before):",typeof(is_logon_before))

          if(is_logon_before == 0){

            wx.cloud.database().collection("account_deleted").where({
              phone_number : current_logon_phone_number
            }).remove()

            db.collection("voluntary_for_check").add({
              data:{
                is_submitted : 0,
                location : "",
                phone_number : current_logon_phone_number,
                score : 0
              },
              success(res){
                console.log(res)
              },
              fail(res){
                console.log(res)
              }
            })

            wx.cloud.callFunction({
              name:"cloud_logon" ,
              data:{
                logon_phone_number : current_logon_phone_number,
                logon_password : current_logon_password,
                logon_name : current_logon_name,
                logon_verification : current_logon_verification
              },
              success(res){
                console.log("注册成功！")
                wx.showToast({
                  title: '注册成功！',
                })
                console.log(res)
                // wx.redirectTo({
                //   url: '/pages/login/login',
                // })
                setTimeout(function () {
                  wx.redirectTo({
                     url: "/pages/login/login",
                  });
                }, 1000);
              }
            })
          }
          else{
            console.log("已注册，请登录")
            wx.showToast({
              title: '账号已存在',
              icon : "error"
            })
            // wx.redirectTo({
            //   url: '/pages/login/login',
            // })
            setTimeout(function () {
              wx.redirectTo({
                 url: "/pages/login/login",
              });
            }, 1000);
            
          }
        },
        fail(res){
          console.log(res)
        }
    });

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