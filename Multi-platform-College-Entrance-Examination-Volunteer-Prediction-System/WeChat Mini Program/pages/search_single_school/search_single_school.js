// pages/search_single_school/search_single_school.js

//用来连数据库
const db = wx.cloud.database()

let school_name = "清华大学"

// let output_list = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    output_list : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //console.log(options.school)
    school_name = options.school

    // //先清空列表里的东西，免得下次打开有不同学校的
    // //异步处理
    let that = this

    that.setData({
      output_list : []
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
    //异步处理
     let that = this

    db.collection("school_info").where({
      school_name : school_name
    })
    .field({
      school_name : false
    })
    .get({
      success(res){
        console.log(res)
        // output_list = res.data
        that.setData({
          output_list : res.data
        })
        if(res.data.length == 0){
          wx.showToast({
            title: '查询失败',
            icon : "error"
          })
          setTimeout(function () {
            wx.navigateBack()
        }, 1000);
        }

      },
      fail(res){
        console.log(res)
      }
    })
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