// pages/admin_review_feedback/admin_review_feedback.js
//用来将is_done改为1
let change_id = ""

//用来回复
let reply_receiver_phone_number = ""
//let reply_sender_phone_number = ""
//let reply_paragraph = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    output_list : [],
    output_list1 : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    //异步处理
    let that = this

    //这里查询未回复的用户反馈
    wx.cloud.database().collection("user_feedback")
    .where({
      is_done : 0
    })
    .get({
      success(res){
        console.log(res)
        that.setData({
          output_list : res.data,
        })
      },
      fail(res){
        console.log(res)
      }
    })

    //这里查询已回复的用户反馈
    wx.cloud.database().collection("user_feedback")
    .where({
      is_done : 1
    })
    .get({
      success(res){
        console.log(res)
        that.setData({
          output_list1 : res.data,
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },

  reply(event){
    change_id = event.currentTarget.dataset.id
    reply_receiver_phone_number = event.currentTarget.dataset.phone_number
    //reply_sender_phone_number = getApp().globalData.user_phone_number
    wx.redirectTo({
      url: '/pages/admin_reply_feedback/admin_reply_feedback?change_id=' + change_id + "&reply_receiver_phone_number=" + reply_receiver_phone_number,
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