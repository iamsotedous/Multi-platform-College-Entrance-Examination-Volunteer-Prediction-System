// pages/user_feedback/user_feedback.js

const db = wx.cloud.database()

let paragraph = ""
let connection = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  feedback_input(event){
    paragraph = event.detail.value
    console.log(paragraph)
  },

  connection_input(event){
    connection = event.detail.value
  },

  submit(){
    wx.showModal({
      title: '提交确认',
      content: '确定提交的反馈信息无误？',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          if(paragraph == ""){
            wx.showToast({
              title: '反馈为空',
              icon :"error"
            })
          }
          else{
            db.collection("user_feedback").add({
              data : {
              phone_number : getApp().globalData.user_phone_number,
              feedback : paragraph,
              connection : connection,
              is_done : 0
              },
            success(res){
              console.log(res)
              wx.redirectTo({
                url: '/pages/user_index/user_index',
              })
            },
            fail(res){
              console.log(res)
            }
          })
          }

        }
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