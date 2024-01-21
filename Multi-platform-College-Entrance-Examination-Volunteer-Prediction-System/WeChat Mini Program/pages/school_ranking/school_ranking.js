// pages/school_ranking/school_ranking.js

let current_school = "清华大学"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    output_list : []
  },

  //获取查询校名
  add_school(event){
    current_school = event.detail.value
    console.log(current_school)
    console.log(typeof(current_school))
  },

  get_school_info_from_school_name(){
      // // //异步处理
      let that = this
      wx.cloud.callFunction({
        name : "search_info_for_page_school_ranking",
        data : {
          school : current_school
        },
        success(res){
          console.log(res.result.data)

          that.setData({
            output_list : res.result.data
          })
        },
        fail(res){
          console.onLoad(res)
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