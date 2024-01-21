// pages/table_for_score_and_ranking/table_for_score_and_ranking.js

//用来查数据库
const db = wx.cloud.database()

//这个是查一分一段表（固定数据库）
let current_score = 600

//这个是查分数线
let current_location = "广东"
let current_school = "华南理工大学"

//这个是查一分一段表对应的数据库名字
let current_class = "理科（物理类）"
let current_score_for_ranking = 500
let table_name_for_ranking = ""

let current_score_for_ranking_scope = 500 //这里是用来查范围的
let current_score_for_ranking_scope_low = 490
let current_score_for_ranking_scope_high = 510


//这里用来下载选中的一分一段表
let fileid_table = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
      //这里是地址的下拉框的数据
      array_location : ['广东','陕西','北京','上海','重庆','四川','安徽','福建','甘肃','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','天津','云南','浙江'],
      index_for_location :0,

      //这里是文理科下拉框的数据
      array_class : ['理科（物理类）','文科（历史类）'],
      index_for_class : 0,

      output_list : [],

      hidden_for_table : 1
  },

   //查一分一段表（不固定数据库）的输入获取
   add_score_for_ranking(event){
    current_score_for_ranking = event.detail.value
    current_score_for_ranking = Number(current_score_for_ranking)
    console.log(current_score_for_ranking)
    console.log(typeof(current_score_for_ranking))
  },

  //查一分一段表（不固定数据库）的输入获取，查上下十分范围
  add_score_for_ranking_scope(event){
    current_score_for_ranking_scope = event.detail.value
    current_score_for_ranking_scope = Number(current_score_for_ranking_scope)
    current_score_for_ranking_scope_low = current_score_for_ranking_scope - 10
    current_score_for_ranking_scope_high = current_score_for_ranking_scope + 11
    console.log(current_score_for_ranking_scope)
    console.log(typeof(current_score_for_ranking_scope))
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

  search_table_of_ranking(){
  console.log("当前地点为：",current_location)
  console.log("当前学科分类为：",current_class)
  wx.cloud.callFunction({
    name : "search_database",
    data:{
      type : "ranking",
      location : current_location,
      class : current_class
    },
    //complete : console.log,
    success(res){
      console.log(res.result.data[0].table_name)
      table_name_for_ranking = res.result.data[0].table_name
      db.collection(table_name_for_ranking).where({
        score : current_score_for_ranking
        //score : db.command.gt( current_score_for_ranking )
      }).get({
        success(res){
          console.log("对应数据库：",table_name_for_ranking)
          console.log("对应分数：",current_score_for_ranking)
          console.log("对应分数类型：",typeof(current_score_for_ranking))
          console.log("一分一段表对应数据为：",res.data[0])
        },
        fail(res){
          console.log(res)
        }
      })
    },
    fail(res){
      console.log(res.result)
    }
  })
},

download_pdf(){

  console.log("当前下载一分一段表对应地点为：",current_location)
  console.log("当前下载一分一段表对应文理科为：",current_class)

  wx.cloud.callFunction({
    name : "search_database",
    data:{
      type : "ranking",
      location : current_location,
      class : current_class
    },
    //complete : console.log,
    success(res){
      console.log(res.result.data[0].file_id)
      fileid_table = res.result.data[0].file_id
      
      wx.cloud.downloadFile({
        fileID : fileid_table,
        success(res){
          console.log("文件下载成功")
          const file_path = res.tempFilePath
          wx.openDocument({
            filePath: file_path,
            success(res1){
              console.log("打开成功")
            }
          })
    
        },
        fail(res){
          console.log("文件打开失败")
        }
      })

    },
    fail(res){
      console.log(res.result)
    }
  })
  
},

  //这里是用来测试根据输入分数获得范围一分一段表的
  search_table_of_ranking_scope(){
    //异步处理
    let that = this

    console.log("当前地点为：",current_location)
    console.log("当前学科分类为：",current_class)
    if(current_score_for_ranking_scope > 200 && current_score_for_ranking_scope < 750){
      wx.cloud.callFunction({
        name : "search_database",
        data:{
          type : "ranking",
          location : current_location,
          class : current_class
        },
        //complete : console.log,
        success(res){
          console.log(res.result.data[0].table_name)
          table_name_for_ranking = res.result.data[0].table_name
          console.log("当前数据库名为:",table_name_for_ranking)
          db.collection(table_name_for_ranking).where({
            score: db.command.gt(current_score_for_ranking_scope_low).and(db.command.lt(current_score_for_ranking_scope_high))
          })
          .orderBy("score","desc")
          .get({
            success(res){
              console.log("对应数据库：",table_name_for_ranking)
              console.log("对应分数：",current_score_for_ranking)
              console.log("对应分数类型：",typeof(current_score_for_ranking))
              console.log("一分一段表对应数据为：",res.data)
              that.setData({
                output_list : res.data,
                hidden_for_table : 0
              })
            },
            fail(res){
              console.log(res)
            }
          })
        },
        fail(res){
          console.log(res.result)
        }
      })
    }
    else if(current_score_for_ranking_scope < 200){
      console.log("分数过低")
      wx.showToast({
        title: '分数过低',
        icon : "error"
      })
      that.setData({
        output_list : [],
        hidden_for_table : 1
      })
    }
    else{
      console.log("分数过高")
      wx.showToast({
        title: '分数过高',
        icon : "error"
      })
      that.setData({
        output_list : [],
        hidden_for_table : 1
      })
    }

    
    // db.collection('anhui_2022_sci').where({
    //   score: db.command.gt(current_score_for_ranking_scope_low).and(db.command.lt(current_score_for_ranking_scope_high))
    // })
    // .get({
    //   success(res){
    //     console.log(res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    //测试全局变量用
      // console.log(getApp().globalData.global_is_admin)
      // getApp().globalData.global_is_admin = 1
      // console.log(getApp().globalData.global_is_admin)
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