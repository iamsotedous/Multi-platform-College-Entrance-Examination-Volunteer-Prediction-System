// pages/score_line/score_line.js

const db = wx.cloud.database()
const anhui_2022 = db.collection("anhui_2022_sci")
const score_2022 = db.collection("score_2022")
//改了2021

//这个是查分数线
let current_location = "广东"
let current_class = "理科"
let current_school = "华南理工大学"
let year = 2022

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

    //年份下拉栏
    array_year : ["2022","2021","2020"],
    index_for_year : 0,

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

bindPickerChange_year(event){
  //console.log("事件数据：",event.detail)
  //console.log("事件数据类型：",typeof(event.detail.value))
  year = Number(this.data.array_year[event.detail.value])
  this.setData({
    index_for_year: event.detail.value
  })
  console.log("year值：",year)
  console.log(typeof(year))

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

    if(year == 2022){
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
  
          if(res.result.data.length == 0){
            wx.showToast({
              title: '查询失败',
              icon : "error"
            })
          }
        },
        fail(res){
          console.log("大寄特寄")
        }
      })
    }
    else if(year == 2021){
      wx.cloud.database().collection("score_2020").where({
        location : current_location,
        school_name : current_school,
        sci_or_art : current_class
      }).get({
        success(res){
          console.log(res)
          that.setData({
            output_list : res.data
          })
          if(res.result.data.length == 0){
            wx.showToast({
              title: '查询失败',
              icon : "error"
            })
          }
        }
      })
    }
    else{
      wx.cloud.database().collection("score_2019").where({
        location : current_location,
        school_name : current_school,
        sci_or_art : current_class
      }).get({
        success(res){
          console.log(res)
          that.setData({
            output_list : res.data
          })
          if(res.result.data.length == 0){
            wx.showToast({
              title: '查询失败',
              icon : "error"
            })
          }
        }
      })
    }
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
    // if(event.currentTarget.dataset.school == "哈尔滨工业大学（深圳）" || event.currentTarget.dataset.school == "哈尔滨工业大学（威海）"){
    //   wx.navigateTo({
    //     url: '/pages/search_single_school_and_major/search_single_school_and_major?school=' + "哈尔滨工业大学" + "&major=" + event.currentTarget.dataset.major + "&location=" + event.currentTarget.dataset.location ,
    //   })
    // }
    // else if(event.currentTarget.dataset.school == "山东大学（威海）"){
    //   wx.navigateTo({
    //     url: '/pages/search_single_school_and_major/search_single_school_and_major?school=' + "山东大学" + "&major=" + event.currentTarget.dataset.major + "&location=" + event.currentTarget.dataset.location ,
    //   })
    // }
    // else if(event.currentTarget.dataset.school == "中国矿业大学（北京）"){
    //   wx.navigateTo({
    //     url: '/pages/search_single_school_and_major/search_single_school_and_major?school=' + "中国矿业大学" + "&major=" + event.currentTarget.dataset.major + "&location=" + event.currentTarget.dataset.location ,
    //   })
    // }

    // else{
    wx.navigateTo({
      url: '/pages/search_single_school_and_major/search_single_school_and_major?school=' + event.currentTarget.dataset.school + "&major=" + event.currentTarget.dataset.major + "&location=" + event.currentTarget.dataset.location + "&class=" + current_class + "&year=" + year,
    })
    // }
    
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