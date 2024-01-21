// pages/insert_major_ranking/insert_major_ranking.js
let ruanke_ranking = 1
let school = ""
let major = ""
let major_class = ""
let evaluation_level = ""
let is_distinction = "是"
let percentage_ranking = "1%"

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

  },

  add_school(event){
    //console.log(event.detail.value)
    school = event.detail.value
  },

  add_major(event){
    major = event.detail.value
  },

  add_class1(event){
    major_class = event.detail.value
  },

  add_is_distinction(event){
    is_distinction = event.detail.value
  },

  add_evaluation(event){
    evaluation_level = event.detail.value
  },

  add_ruanke_ranking(event){
    ruanke_ranking = event.detail.value
  },

  add_percentage(event){
    percentage_ranking = event.detail.value
  },

  upload(){

    wx.showModal({
      title: '新增专业排名确认',
      content: '确定输入的信息无误吗',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          if(school == ""){
            wx.showToast({
              title: '院校为空',
              icon:"error"
            })
          }
          else if(major == ""){
            wx.showToast({
              title: '专业为空',
              icon:"error"
            })
          }
          else{
            wx.cloud.database().collection("school_major_ranking").add({
              data : {
                evaluation_level : evaluation_level,
                is_distinction : is_distinction,
                major : major,
                major_class : major_class,
                percentage_ranking : percentage_ranking,
                ruanke_ranking : ruanke_ranking,
                school_name : school
              },
              success(res){
                console.log("新专业排名添加成功：",res)
                setTimeout(function () {
                  wx.redirectTo({
                     url: "/pages/admin_add_major_ranking/admin_add_major_ranking",
                  });
                }, 1000);
  
                wx.showToast({
                  title: '提交成功！',
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