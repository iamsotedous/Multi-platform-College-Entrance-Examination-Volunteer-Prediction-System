// pages/change_password/change_password.js

//用来连数据库
const db = wx.cloud.database()

//用来实现更改密码功能
let current_change_phone_number = ""
let current_change_name = ""
let current_change_password = ""
let change_id = ""


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //加入更改密码使用的电话号，变量名为current_change_phone_number
  add_change_phone_number(event){
    current_change_phone_number = event.detail.value
    console.log("更改密码录入的电话号：",current_change_phone_number)
    //console.log("电话号类型：",typeof(current_change_phone_number))
  },

  //加入更改密码使用的名字current_change_name 
add_change_name(event){
  current_change_name = event.detail.value
  console.log("更改密码录入的名字：",current_change_name)
  //console.log("名字类型：",typeof(current_change_name))
},

//加入更改密码使用的新密码current_change_password
add_change_password(event){
  current_change_password = event.detail.value
  console.log("新密码：",current_change_password)
  //console.log("密码类型：",typeof(current_change_password))
},

change_password(){
  let flag_for_change_password = 0
  //console.log("更改密码按钮")
  wx.cloud.callFunction({
    name : "cloud_login_check",
    data:{
      type : "number",
      login_phone_number : current_change_phone_number
    },
    success(res0){
      //console.log("改密码前检查是否有这个账户:ok",res0)
      if(res0.result.total == 1){
          wx.cloud.callFunction({
            name : "cloud_login_check",
            data: {
              type : "number_and_name",
              login_phone_number : current_change_phone_number,
              change_name : current_change_name
            },
            success(res1){
              console.log("验证姓名与手机号是否对应:ok",res1)
              if(res1.result.total == 1){
                  wx.cloud.callFunction({
                    name : "cloud_login_check",
                    data: {
                      type : "search_id",
                      login_phone_number : current_change_phone_number
                    },
                    success(res3){
                      console.log("获得对应id:ok",res3)
                      //获取更改密码的数据对应的id
                      change_id = res3.result.data[0]._id
                      console.log("id:",change_id)
                      console.log("id类型:",typeof(change_id))
                      console.log("新密码:",current_change_password)

                      db.collection("user").doc(change_id).update({
                        data : {
                          password : current_change_password
                        },
                        success(res4){
                          console.log("密码修改成功:",res4)
                          wx.showToast({
                            title: '修改成功！',
                          })
                          setTimeout(function () {
                            wx.redirectTo({
                               url: "/pages/login/login",
                            });
                          }, 1000);
                        },
                        fail(res4){
                          console.log("密码修改失败:",res4)
                        }
                      })
                    },
                    fail(res3){
                      console.log("获取对应id时调用数据库失败")
                    }

                  })
              }
              else{
                console.log("姓名与账号不对应，请检查")
                wx.showToast({
                  title: '姓名错误',
                  icon : "error"
                })
              }
            },
            fail(res1){
              console.log("验证姓名时调用数据库失败")
            }
          })
      }
      else {
        console.log("账号不存在")
        wx.showToast({
          title: '账号不存在',
          icon : "error"
        })
      }
        
    },
    fail(res0){
      console.log("验证账号是否存在时调用数据库失败")
    }
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