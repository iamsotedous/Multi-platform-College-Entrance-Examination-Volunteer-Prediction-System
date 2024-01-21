// pages/class_ranking/class_ranking.js

let current_class = "计算机类"

Page({

  /**
   * 页面的初始数据
   */
  data: {
      //这里是类别的下拉框的数据
      array_class : ["计算机类","工商管理类","外国语言文学类","电子信息类","设计学类","机械类","音乐与舞蹈学类","材料类","中国语言文学类","公共管理类","管理科学与工程类","数学类","土木类","教育学类","新闻传播学类","金融学类","戏剧与影视学类","体育学类","生物科学类","化学类","美术学类","环境科学与工程类","化工与制药类","旅游管理类","法学类","自动化类","食品科学与工程类","建筑类","地理科学类","经济与贸易类","经济学类","电气类","物理学类","临床医学类","医学技术类","物流管理与工程类","植物生产类","统计学类","历史学类","社会学类","药学类","生物工程类","心理学类","交通运输类","电子商务类","能源动力类","马克思主义理论类","护理学类","仪器类","林学类","中医学类","测绘类","政治学类","工业工程类","教育类(专)","中药学类","地质类","矿业类","水利类","安全科学与工程类","公共卫生与预防医学类","生物医学工程类","动物医学类","财政学类","航空航天类","农业工程类","轻工类","计算机类(专)","口腔医学类","动物生产类","农业经济管理类","纺织类","力学类","哲学类","艺术设计类(专)","水产类","自然保护与环境生态类","海洋科学类","图书情报与档案管理类","语言类(专)","护理类(专)","旅游类(专)","兵器类","核工程类","地质学类","自动化类(专)","财务会计类(专)","海洋工程类","林业工程类","中西医结合类"],
      index_for_class :0,

      output_list2 : []
  },

  bindPickerChange_class(event){
    //console.log("事件数据：",event.detail)
    //console.log("事件数据类型：",typeof(event.detail.value))
    current_class = this.data.array_class[event.detail.value]
    this.setData({
      index_for_class: event.detail.value
    })
    console.log("index_for_class:",this.data.index_for_class)
    console.log("current_class值：",current_class)
    console.log("current_class值类型：",typeof(current_class))
},

search_by_class(){

  // //异步处理
  let that = this

  //需要考虑加载多于一百条信息
  wx.cloud.callFunction({
      name : "search_ranking_for_page_major_ranking",
      data:{
        type : "based_on_class",
        major_class : current_class
      },
      success(res){
        console.log(res.result)

        that.setData({
          output_list2 : res.result.data
        })
      },
      fail(res){
        console.log(res)
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