// pages/admin_add_major_ranking/admin_add_major_ranking.js
let school = "西北工业大学"
let delete_id = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    output_list : [],
  },

  add_school(event){
    school = event.detail.value
  },

  search_school(){

    // //异步处理
    let that = this

    wx.cloud.callFunction({
        name : "search_ranking_for_page_major_ranking",
        data:{
          type : "based_on_school",
          school_name : school
        },
        success(res){
          console.log(res.result)

          that.setData({
            output_list1 : res.result.data
          })

        },
        fail(res){
          console.log(res)
        }
    })
  },

  delete_current_target(event){
    console.log(event.currentTarget.dataset.id)
    delete_id = event.currentTarget.dataset.id
    wx.showModal({
      title: '删除提示',
      content: '确定要删除该项吗',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          console.log(delete_id)
          wx.cloud.database().collection("school_major_ranking").doc(delete_id).remove({
            success(res){
              console.log("删除成功！",res)
              setTimeout(function () {
                wx.redirectTo({
                   url: "/pages/admin_add_major_ranking/admin_add_major_ranking",
                });
              }, 1000);
              wx.showToast({
                title: '删除成功！',
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

  jump_detail_major_ranking(options){
    console.log(options.currentTarget.dataset)
    wx.navigateTo({
      url: "/pages/detail_major_ranking/detail_major_ranking?school_name=" + options.currentTarget.dataset.detail + "&major=" + options.currentTarget.dataset.major,
    })
  },

  jump_to_insert_major_ranking(){
    wx.redirectTo({
      url: '/pages/insert_major_ranking/insert_major_ranking',
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