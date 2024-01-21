// pages/user_index/user_index.js

let phone_number = ""
//用来删两个表里的用户数据
// let delete_id1 = ""
// let delete_id1 = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_phone_number : "",
    is_admin_for_page : 0,
    is_hidden : 1,
    user_name : "",

    items: ['志愿填报', '查看志愿', '用户反馈', '查看通知', '修改密码', '用户注销'],
    items_admin: ['用户列表管理', '用户反馈管理', '数据统计', '院校列表更新', '专业信息更新', '分数线更新'],

    taps: ['jump_to_input', 'jump_to_output', 'feedback','jump_view_reply','jump_user_change_password','delete_account'],
    taps_admin: ['jump_to_user_management', 'jump_to_review_feedback', 'jump_to_statistics','jump_insert_school_list','jump_to_add_major_ranking','jump_score_line'],

    online_icons:['cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/add_circle.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/check_circle.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/error_circle.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/eye.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/unlock.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/cancel_circle.png'
  ],
    online_icons_admin:['cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/layer.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/note.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/chart.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/book.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/file.png',
  'cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/icon_user_index/book_mark.png'
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    //console.log(getApp().globalData.global_is_admin)
    //首先确定这个是不是管理员
    console.log(getApp().globalData.user_phone_number)
    phone_number = getApp().globalData.user_phone_number
    this.setData({
      user_phone_number : getApp().globalData.user_phone_number,
      is_admin_for_page : getApp().globalData.global_is_admin
    })
    if(getApp().globalData.global_is_admin == 1){
      this.setData({
        is_hidden : 0
      })
    }

    wx.cloud.database().collection("user").where({
      phone_number : getApp().globalData.user_phone_number
    }).get({
      success(res){
        console.log(res)
        that.setData({
          user_name : res.data[0].name
        })
      }
    })
  },

  //这里跳转到志愿填报页面
  jump_to_input(){
    wx.navigateTo({
      url: '/pages/voluntary_input/voluntary_input',
    })
  },

  jump_reply(){
    wx.navigateTo({
      url: '/pages/reply/reply',
    })
  },
  
  //这里跳转到志愿查看页面
  jump_to_output(){
    wx.navigateTo({
      url: '/pages/voluntary_output/voluntary_output',
    })
  },

    //这里做用户反馈
  feedback(){
    wx.navigateTo({
      url: '/pages/user_feedback/user_feedback',
    })
  },

  //这里跳到用户改密码界面
  jump_user_change_password(){
    wx.navigateTo({
      url: '/pages/user_change_password/user_change_password',
    })
  },
    
  jump_insert_school_list(){
    wx.navigateTo({
      url: '/pages/insert_school_list/insert_school_list',
    })
  },

  jump_to_user_management(){
    wx.navigateTo({
      url: "/pages/admin_user_management/admin_user_management",
    })
  },

  jump_to_review_feedback(){
    wx.navigateTo({
      url: "/pages/admin_review_feedback/admin_review_feedback",
    })
  },

  jump_view_reply(){
    wx.navigateTo({
      url: "/pages/user_view_reply/user_view_reply",
    })
  },

  jump_to_statistics(){
    wx.navigateTo({
      url: "/pages/statistics/statistics",
    })
  },

  jump_to_add_major_ranking(){
    wx.navigateTo({
      url: "/pages/admin_add_major_ranking/admin_add_major_ranking",
    })
  },

  jump_score_line(){
    wx.navigateTo({
      url: '/pages/admin_view_score_line/admin_view_score_line',
    })
  },

  delete_account(){
    wx.showModal({
      title: '注销确认',
      content: '确定要注销当前账号吗，这样会导致所有用户信息被删除',
      complete: (res) => {
        if (res.cancel) {
          console.log("用户取消注销")
        }
    
        if (res.confirm) {
          console.log("用户确定注销")

          wx.cloud.database().collection("user").where({
            phone_number : phone_number
          }).remove()

          wx.cloud.database().collection("voluntary_for_check").where({
            phone_number : phone_number
          }).remove()

          wx.cloud.database().collection("voluntary_for_ranking").where({
            phone_number : phone_number
          }).remove()

          wx.cloud.database().collection("account_deleted").add({
            data : {
              phone_number : phone_number
            }
          })

          wx.redirectTo({
            url: '/pages/login/login',
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