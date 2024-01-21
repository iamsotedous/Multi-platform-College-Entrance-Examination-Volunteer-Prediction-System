// pages/popular_major/popular_major.js

const db = wx.cloud.database()

let current_class = "理科类"
let current_location = "广东"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //这里是地址的下拉框的数据
    array_location : ['广东','陕西','北京','上海','重庆','四川','安徽','福建','甘肃','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','天津','云南','浙江'],
    index_for_location :0,

    //这里是文理科下拉框的数据
    array_class : ['理科类','文科类','综合类'],
    index_for_class : 0,

    output_list_school : [],
    output_list_major : [],

    hidden_for_school : true,
    hidden_for_major : true,
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
  current_class = this.data.array_class[event.detail.value]
  this.setData({
    index_for_class : event.detail.value
  })
  console.log("index_for_class:",this.data.index_for_class)
  console.log("current_class值：",current_class)
  console.log("current_class值类型：",typeof(current_class))
},

  search_information(){

    //异步处理
    let that = this

    this.setData({
      hidden_for_school : false,
      hidden_for_major : false
    })

    //这里查询热门学校
    db.collection("voluntary_school_count").where({
      location : current_location,
      sci_or_art : db.command.eq(current_class).or(db.command.eq("综合类"))
    })
    .field({
      school_name : true,
      time : true
    })
    .limit(10)
    .orderBy("time","desc")
    .get({
      success(res){
        console.log("院校热度排名：",res)
        that.setData({
          output_list_school : res.data
        })
        if(res.data.length == 0){
          that.setData({
            hidden_for_school : true
          })
          wx.showToast({
            title: '暂无数据',
            icon : "error"
          })
        }
      },
      fail(res){
        console.log(res)
      }
    })

    //这里查询热门专业
    db.collection("voluntary_major_count").where({
      location : current_location,
      sci_or_art : db.command.eq(current_class).or(db.command.eq("综合类"))
    })
    .field({
      school_name : true,
      major : true,
      time : true
    })
    .limit(10)
    .orderBy("time","desc")
    .get({
      success(res){
        console.log("专业热度排名：",res)
        that.setData({
          output_list_major : res.data
        })
        if(res.data.length == 0){
          that.setData({
            hidden_for_major : true
          })
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },

  jump(event){
    console.log(event.currentTarget.dataset.school)
    if(event.currentTarget.dataset.school == "哈尔滨工业大学（深圳）" || event.currentTarget.dataset.school == "哈尔滨工业大学（威海）"){
      wx.navigateTo({
        url: '/pages/search_single_school/search_single_school?school=' + "哈尔滨工业大学",
      })
    }
    else if(event.currentTarget.dataset.school == "山东大学（威海）"){
      wx.navigateTo({
        url: '/pages/search_single_school/search_single_school?school=' + "山东大学",
      })
    }
    else if(event.currentTarget.dataset.school == "中国矿业大学（北京）"){
      wx.navigateTo({
        url: '/pages/search_single_school/search_single_school?school=' + "中国矿业大学",
      })
    }

    else{
      wx.navigateTo({
      url: '/pages/search_single_school/search_single_school?school=' + event.currentTarget.dataset.school,
    })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // db.collection("voluntary_major_count").limit(10)
    // .orderBy("time","desc")
    // .get({
    //   success(res){
    //     console.log(res)
    //   },
    //   fail(res){
    //     console.log(res)
    //   }
    // })
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