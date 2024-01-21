// pages/admin_add_score_line/admin_add_score_line.js
let batch_num = "本科批"
let highest_score = "无"
let kind = "普通类"
let location = "广东"
let lowest_ranking = 1
let lowest_score = 1
let major = "人工智能"
let minimum_score = 1
let requirement = "无"
let sci_or_art = "理科"
let school_name = "西北工业大学"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  add_school_name(event){
    school_name = event.detail.value
    console.log(school_name)
  },

  add_major(event){
    major = event.detail.value
  },

  add_kind(event){
    kind = event.detail.value
  },

  add_batch_num(event){
    batch_num = event.detail.value
  },

  add_highest_score(event){
    highest_score = event.detail.value
  },

  add_lowest_score(event){
    lowest_score = event.detail.value
  },

  add_lowest_ranking(event){
    lowest_ranking = event.detail.value
  },

  add_minimum_score(event){
    minimum_score = event.detail.value
  },

  add_sci_or_art(event){
    sci_or_art = event.detail.value
  },

  add_requirement(event){
    requirement = event.detail.value
  },

  add_location(event){
    location = event.detail.value
  },

  insert(){
    wx.showModal({
      title: '提交确认',
      content: '确定提交的信息无误？',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          if(school_name == ""){
            wx.showToast({
              title: '校名为空',
              icon:"error"
            })
          }
          else if(major == ""){
            wx.showToast({
              title: '专业为空',
              icon:"error"
            })
          }
          else if(location == ""){
            wx.showToast({
              title: '生源地为空',
              icon:"error"
            })
          }
          else if(lowest_score == ""){
            wx.showToast({
              title: '分数线为空',
              icon:"error"
            })
          }
          else{
            wx.cloud.database().collection("score_2022").add({
              data : {
                batch_num : batch_num,
                highest_score : highest_score,
                kind : kind,
                location : location,
                lowest_score : lowest_score,
                lowest_ranking : lowest_ranking,
                major : major,
                minimum_score : minimum_score,
                requirement : requirement,
                school_name : school_name,
                sci_or_art : sci_or_art
              },
              success(res){
                console.log("分数线提交成功",res)
                wx.showToast({
                  title: '提交成功！',
                })
                setTimeout(function () {
                  wx.redirectTo({
                     url: "/pages/admin_view_score_line/admin_view_score_line",
                  });
                }, 1000);
                // wx.redirectTo({
                //   url: '/pages/admin_view_score_line/admin_view_score_line',
                // })
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