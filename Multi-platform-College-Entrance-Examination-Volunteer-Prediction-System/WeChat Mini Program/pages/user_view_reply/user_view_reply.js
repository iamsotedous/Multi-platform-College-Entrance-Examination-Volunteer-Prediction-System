// pages/user_view_reply/user_view_reply.js
let user_phone_number = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //这里放未读
    output_list : [],
    //这里放已读
    output_list1 : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //异步处理
    let that = this

    user_phone_number = getApp().globalData.user_phone_number

    //读取未读管理员回复
    wx.cloud.database().collection("reply_user_feedback")
    .where({
      reply_receiver_phone_number : user_phone_number,
      is_read : 0
    })
    .get({
      success(res){
        console.log("读取未读管理员回复成功：",res)
        that.setData({
          output_list : res.data,
        })
      },
      fail(res){
        console.log(res)
      }
    })

    //读取已读管理员回复
    wx.cloud.database().collection("reply_user_feedback")
    .where({
      reply_receiver_phone_number : user_phone_number,
      is_read : 1
    })
    .get({
      success(res){
        console.log("读取已读管理员回复成功：",res)
        that.setData({
          output_list1 : res.data,
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },

  read(event){
    wx.showModal({
      title: '已读确认',
      content: '确定标为已读？',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          wx.cloud.database().collection("reply_user_feedback").doc(event.currentTarget.dataset.id).update({
            data : {
              is_read : 1
            },
            success(res){
              console.log("标记为已读成功：",res)
              wx.redirectTo({
                url: "/pages/user_view_reply/user_view_reply",
              })
            },
            fail(res){
              console.log(res)
            }
      
          })
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