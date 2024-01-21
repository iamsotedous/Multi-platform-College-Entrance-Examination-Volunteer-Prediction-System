// pages/school_list/school_list.js

let current_school = "综合类"
let current_class = "985"
let current_school_input = "西北工业大学"


let flag_for_985 = 1
let flag_for_211 = 0
let flag_for_double = 0
let flag_for_all = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //这里是类型下拉框的数据
    array_school : ["综合类","理工类","师范类","医药类","财经类","农林类","艺术类","语言类","体育类","政法类","民族类","其他"],
    index_for_school : 0,

    array_class : ['985高校','211高校','双一流高校','所有本科高校'],
    index_for_class : 0,

    output_list : [],
    
    hidden_for_school_list : 1

  },

  bindPickerChange_school(event){
    current_school = this.data.array_school[event.detail.value]
    this.setData({
      index_for_school : event.detail.value
    })
    console.log("index_for_school:",this.data.index_for_school)
    console.log("current_school值：",current_school)
    //console.log("current_school值类型：",typeof(current_school))
  },

  bindPickerChange_class(event){

    //重新置0防止更改为1后无法改回
    flag_for_985 = 0
    flag_for_211 = 0
    flag_for_double = 0
    flag_for_all = 0

    current_class = this.data.array_class[event.detail.value]
    this.setData({
      index_for_class : event.detail.value
    })

    //console.log("current_class值：",current_class)



    if(current_class == "985高校"){
      flag_for_985 = 1
    }
    else if(current_class == "211高校"){
      flag_for_211 = 1
    }
    else if(current_class == "双一流高校"){
      flag_for_double = 1
    }
    else if(current_class == "所有本科高校"){
      flag_for_all = 1
    }
    else{
      console.log("pick for title错误")
    }
  },

  add_school(event){
    current_school_input = event.detail.value
  },

  get_school_info_from_school_name(){
    wx.navigateTo({
      url: '/pages/search_single_school/search_single_school?school=' + current_school_input,
    })
  },

  search_school_list(){
    //异步处理
    let that = this

    this.setData({
      output_list : []
    })

  //用来判断查询的内容
  console.log("flag_for_985:",flag_for_985)
  console.log("flag_for_211:",flag_for_211)
  console.log("flag_for_double:",flag_for_double)
  console.log("flag_for_all:",flag_for_all)

  wx.cloud.callFunction({
    name : "search_school_list_for_page_school_list",
    data:{
      flag_for_985 : flag_for_985,
      flag_for_211 : flag_for_211,
      flag_for_double : flag_for_double,
      flag_for_all : flag_for_all,
      school_class : current_school
    },
    success(res){
      console.log(res.result)
      that.setData({
        output_list : res.result.data,
        hidden_for_school_list : 0
      })
    },
    fail(res){
      console.log(res)
    }
  })


},

  jump(event){
    console.log(event.currentTarget.dataset.school)
    wx.navigateTo({
      url: '/pages/search_single_school/search_single_school?school=' + event.currentTarget.dataset.school,
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