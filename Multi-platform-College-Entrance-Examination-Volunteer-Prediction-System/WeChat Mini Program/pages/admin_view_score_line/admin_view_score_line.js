// pages/score_line/score_line.js

const db = wx.cloud.database()
const anhui_2022 = db.collection("anhui_2022_sci")
const score_2022 = db.collection("score_2022")
//改了2021

//这个是查分数线
let current_location = "广东"
let current_class = "理科"
let current_school = "华南理工大学"

let delete_id = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //这里是地址的下拉框的数据
    array_location : ['广东','陕西','北京','上海','重庆','四川','安徽','福建','甘肃','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','天津','云南','浙江'],
    index_for_location :0,

    //文理科下拉栏
    array_class : ["理科","文科","综合"],
    index_for_class :0,

    output_list : []    
  },

  bindPickerChange_location(event){
    //console.log("事件数据：",event.detail)
    //console.log("事件数据类型：",typeof(event.detail.value))
    current_location = this.data.array_location[event.detail.value]
    this.setData({
      index_for_location: event.detail.value
    })
    console.log("index_for_location:",this.data.index_for_location)
    console.log("current_location值：",current_location)
    console.log("current_location值类型：",typeof(current_location))
},

bindPickerChange_class(event){
  //console.log("事件数据：",event.detail)
  //console.log("事件数据类型：",typeof(event.detail.value))
  current_class = this.data.array_class[event.detail.value]
  this.setData({
    index_for_class: event.detail.value
  })
  console.log("current_class值：",current_class)

},

  add_school(event){
    current_school = event.detail.value
    console.log(current_school)
    console.log(typeof(current_school))
  },

//调用云函数实现数据库查询（根据地点）
  search_score(){
    //异步处理
    let that = this

    wx.cloud.callFunction({
      name:"search_score_info",
      data:{
          location : current_location,
          school_name : current_school,
          class : current_class
      },
      success(res){
        //console.log("当前位置：",current_location)
        //console.log("当前大学：",current_school)
        console.log("调用成功，搜索结果为：",res.result.data)

        that.setData({
          output_list : res.result.data
        })
      },
      fail(res){
        console.log("大寄特寄")
      }
    })
  },

  //测试超过一百条的数据库查询
  test_over100(){
    console.log("在跑了在跑了")
    wx.cloud.callFunction({
      name:"search_over100_test",
      data:{
      },
      success(res){
        console.log("好")
        console.log(res)
      },
      fail(res){
        console.log(res)
        console.log("寄")
      }
    })
  },

  jump1(event){
    console.log(event.currentTarget.dataset.school)
    wx.navigateTo({
      url: '/pages/search_single_school_and_major/search_single_school_and_major?school=' + event.currentTarget.dataset.school + "&major=" + event.currentTarget.dataset.major + "&location=" + event.currentTarget.dataset.location + "&class=" + current_class,
    })
    
  },

  delete_score_line(event){
    //console.log(event.currentTarget.dataset.id)
    delete_id = event.currentTarget.dataset.id
    wx.showModal({
      title: '删除确认',
      content: '确定删除该项吗',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          wx.cloud.database().collection("score_2022").doc(delete_id).remove({
            success(res){
              console.log("删除成功！",res)
              wx.showToast({
                title: '删除成功！',
              })
              // wx.redirectTo({
              //   url: '/pages/admin_view_score_line/admin_view_score_line',
              // })
              setTimeout(function () {
                wx.redirectTo({
                   url: "/pages/admin_view_score_line/admin_view_score_line",
                });
              }, 1000);
            },
            fail(res){
              console.log(res)
            }
          })
        }
      }
    })
  },

  add_score_line(){
    wx.redirectTo({
      url: '/pages/admin_add_score_line/admin_add_score_line',
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