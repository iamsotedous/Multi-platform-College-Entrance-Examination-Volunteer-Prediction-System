// pages/admin_add_school_list/admin_add_school_list.js
let school_name = "西北工业大学"
let location = "广东"
let class1 = "综合类"
let is_211 = 211
let is_985 = 985
let is_double_first_class = "双一流"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array_school : ["综合类","理工类","师范类","医药类","财经类","农林类","艺术类","语言类","体育类","政法类","民族类","其他"],
    index_for_school : 0,

    array_location : ['广东','陕西','北京','上海','重庆','四川','安徽','福建','甘肃','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','天津','云南','浙江'],
    index_for_location :0,
    
    array : ["985","211","双一流","普通本科"],
    index_for_array : 0,
  },

  bindPickerChange_school(event){
    class1 = this.data.array_school[event.detail.value]
    this.setData({
      index_for_school : event.detail.value
    })
    console.log(class1)
  },

  bindPickerChange_location(event){
    location = this.data.array_location[event.detail.value]
    this.setData({
      index_for_location: event.detail.value
    })
    console.log(location)
},

  bindPickerChange(event){
    console.log(event.detail.value)

    this.setData({
      index_for_array: event.detail.value
    })

    if(event.detail.value == 0){
      is_211 = 211,
      is_985 = 985,
      is_double_first_class = "双一流"
    }
    else if(event.detail.value == 1){
      is_211 = 211,
      is_double_first_class = "双一流",
      is_985 = null
    }
    else if(event.detail.value == 2){
      is_double_first_class = "双一流",
      is_985 = null,
      is_211 = null
    }
  },

  school_name_input(event){
    school_name = event.detail.value
  },

  location_input(event){
    location = event.detail.value
  },

  class1_input(event){
    class1 = event.detail.value
  },

  is_211_input(event){
    is_211 = event.detail.value
  },

  is_985_input(event){
    is_985 = event.detail.value
  },

  is_double_first_class_input(event){
    is_double_first_class = event.detail.value
  },

  insert(){
    wx.showModal({
      title: '提交确认',
      content: '确定提交信息无误？',
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
          else{
            wx.cloud.database().collection("schoollist_check").where({
              school_name : school_name
            }).count({
              success(res){
                console.log(res)
                if(res.total == 1){
                  console.log("重复")
                  wx.showToast({
                    title: '院校重复',
                    icon:"error"
                  })
                }
                else{
                  wx.cloud.database().collection("school_list").add({
                    data : {
                      school_name : school_name,
                      province : location,
                      class : class1,
                      is_211 : Number(is_211),
                      is_985 : Number(is_985),
                      is_double_first_class : is_double_first_class
                    },
                    success(res){
                      console.log(res)
                      wx.showToast({
                        title: '提交成功！',
                      })
                      setTimeout(function () {
                        wx.redirectTo({
                           url: "/pages/insert_school_list/insert_school_list",
                        });
                      }, 1000);
              
                    },
                    fail(res){
                      console.log(res)
                    }
                  })
                }
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