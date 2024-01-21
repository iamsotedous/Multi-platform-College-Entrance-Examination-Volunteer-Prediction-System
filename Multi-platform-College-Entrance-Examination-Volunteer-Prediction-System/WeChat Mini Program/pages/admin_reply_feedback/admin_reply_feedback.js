// pages/admin_reply_feedback/admin_reply_feedback.js
let reply_sender_phone_number = ""
let reply_receiver_phone_number = ""
let change_id = ""
let paragraph = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    change_id = options.change_id
    reply_receiver_phone_number = options.reply_receiver_phone_number
    reply_sender_phone_number = getApp().globalData.user_phone_number
  },

  reply_input(event){
    paragraph = event.detail.value
    console.log(paragraph)
  },

  upload(){
    wx.showModal({
      title: '回复确认',
      content: '确认回复信息正确？',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          if(paragraph == ""){
            wx.showToast({
              title: '回复为空',
              icon:"error"
            })
          }
          else{
            wx.cloud.database().collection("user_feedback").doc(change_id)
            .update({
              data : {
                is_done : 1
              },
              success(res){
                console.log(res)
              },
              fail(res){
                console.log(res)
              }
            })
        
            wx.cloud.database().collection("reply_user_feedback").add({
              data : {
                reply_sender_phone_number : reply_sender_phone_number,
                reply_receiver_phone_number : reply_receiver_phone_number,
                paragraph : paragraph,
                is_read : 0
              },
              success(res){
                console.log("回复成功",res)
                wx.redirectTo({
                  url: '/pages/admin_review_feedback/admin_review_feedback',
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