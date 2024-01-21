// pages/major_recommendation/major_recommendation.js

//用来查数据库
const db = wx.cloud.database()

//这个是查一分一段表（固定数据库）
let current_score = 600

//这个是查分数线
let current_location = "广东"

//这个是查一分一段表对应的数据库名字
let current_class = "理科（物理类）"
let current_score_for_ranking = 600
let table_name_for_ranking = ""

//用来查数据库里的类别
let db_class = "理科"


//这里用来下载选中的一分一段表
let fileid_table = ""

//这里用来推断21年的排名
let infer_ranking_2021 = 0

//这里用来分类三种推荐的排名区间
let high_recommendation_top = 1
let high_recommendation_buttom = 1
let middle_recommendation_top = 1
let middle_recommendation_buttom = 1
let low_recommendation_top = 1
let low_recommendation_buttom = 1

//这里用来分类三种用于推荐学校的分数区间
let high_recommendation_top_score = 1
let high_recommendation_buttom_score = 1
let middle_recommendation_top_score = 1
let middle_recommendation_buttom_score = 1
let low_recommendation_top_score = 1
let low_recommendation_buttom_score = 1



Page({

  /**
   * 页面的初始数据
   */
  data: {
    //这里是地址的下拉框的数据
    array_location : ['广东','陕西','北京','上海','重庆','四川','安徽','福建','甘肃','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','天津','云南','浙江'],
    index_for_location :0,

    //这里是文理科下拉框的数据
    array_class : ['理科（物理类）','文科（历史类）',"综合类"],
    index_for_class : 0,

    output_list_school_high : [],
    output_list_school_middle : [],
    output_list_school_low : [],
    output_list_major_high : [],
    output_list_major_middle : [],
    output_list_major_low : [],

    //为了美观隐藏部分title
    hidden_for_school : true,
    hidden_for_major : true
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
    // console.log("index_for_class:",this.data.index_for_class)
    // console.log("current_class值：",current_class)
    // console.log("current_class值类型：",typeof(current_class))

    if(current_class == "理科（物理类）"){
      db_class = "理科"
      console.log(db_class)
    }
    else if(current_class == "文科（历史类）"){
      db_class = "文科"
      console.log(db_class)
    }
    else if(current_class == "综合类"){
      db_class = "综合"
      console.log(db_class)
    }

  },

  //查一分一段表（不固定数据库）的输入获取
  add_score_for_ranking(event){
    current_score_for_ranking = event.detail.value
    current_score_for_ranking = Number(current_score_for_ranking)
    console.log(current_score_for_ranking)
    console.log(typeof(current_score_for_ranking))
  },

  search_table_of_ranking(){
    // //异步处理
    let that = this


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
            // console.log("对应数据库：",table_name_for_ranking)
          console.log("对应分数：",current_score_for_ranking)
            // console.log("对应分数类型：",typeof(current_score_for_ranking))
            // console.log("根据一分一段表查出来的21年排名为：",res,res.data.length,typeof(res.data.length))
            
        

            if(current_score_for_ranking < 700 && current_score_for_ranking > 300){
              that.setData({
                hidden_for_major : false,
                // hidden_for_school : false
              })
              console.log('分数合法')

              infer_ranking_2021 = res.data[0].ranking

              console.log("infer_ranking_2021:",infer_ranking_2021)

            //top更小，排名更高；buttom更大，排名靠后
            //冲刺档名次范围
            high_recommendation_top = (infer_ranking_2021 > 1500 ? infer_ranking_2021 - 1500 : 1)
            high_recommendation_buttom = (infer_ranking_2021 > 700 ? infer_ranking_2021 - 700 : 700)

            //主申档名次范围
            middle_recommendation_top = (infer_ranking_2021 > 500 ? infer_ranking_2021 - 500 : 500)
            middle_recommendation_buttom = infer_ranking_2021 + 500

            //保底档名次范围
            low_recommendation_top = infer_ranking_2021 + 700
            low_recommendation_buttom = infer_ranking_2021 + 1500

            //冲刺档推荐
            db.collection("score_2022").where({
              lowest_ranking: db.command.gt(high_recommendation_top).and(db.command.lt(high_recommendation_buttom)),
              location : current_location,
              sci_or_art : db_class
            })
            .orderBy("lowest_score","desc")
            .get({
              success(res){
                console.log("冲刺档专业：",res.data)
                that.setData({
                  output_list_major_high : res.data
                })
              }
            })

            //主申档推荐
            db.collection("score_2022").where({
              lowest_ranking: db.command.gt(middle_recommendation_top).and(db.command.lt(middle_recommendation_buttom)),
              location : current_location,
              sci_or_art : db_class
            })
            .orderBy("lowest_score","desc")
            .get({
              success(res){
                console.log("主申档专业：",res.data)
                that.setData({
                  output_list_major_middle : res.data
                })
              }
            })

            //保底档推荐
            db.collection("score_2022").where({
              lowest_ranking: db.command.gt(low_recommendation_top).and(db.command.lt(low_recommendation_buttom)),
              location : current_location,
              sci_or_art : db_class
            })
            .orderBy("lowest_score","desc")
            .get({
              success(res){
                console.log("保底档专业：",res.data)
                that.setData({
                  output_list_major_low : res.data
                })
              }
            })
            }
            else if(current_score_for_ranking < 300){
              console.log("分数过低，请修改后重试")
              wx.showToast({
                title: '分数过低',
                icon : 'error'
              })
              that.setData({
                hidden_for_major : true,
                hidden_for_school : true,
                // output_list_school_high : [],
                // output_list_school_middle : [],
                // output_list_school_low : [],
                // output_list_major_high : [],
                // output_list_major_middle : [],
                // output_list_major_low : [],
              })
            }
            else{
              console.log("分数过高，请修改后重试")
              wx.showToast({
                title: '分数过高',
                icon : 'error'
              })
              that.setData({
                hidden_for_major : true,
                hidden_for_school : true,
                // output_list_school_high : [],
                // output_list_school_middle : [],
                // output_list_school_low : [],
                // output_list_major_high : [],
                // output_list_major_middle : [],
                // output_list_major_low : [],
              })
            }

            

          },
          fail(res){
            console.log(res)
          }
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },

  recommend_school(){

    // //异步处理
    let that = this

    that.search_table_of_ranking()



    if(current_score_for_ranking > 300 && current_score_for_ranking < 700){
      this.setData({
        hidden_for_school : false
      })
      high_recommendation_top_score = current_score_for_ranking + 15
      high_recommendation_buttom_score = current_score_for_ranking + 5
      middle_recommendation_top_score = current_score_for_ranking + 5
      middle_recommendation_buttom_score = current_score_for_ranking - 5
      low_recommendation_top_score = current_score_for_ranking - 5
      low_recommendation_buttom_score = current_score_for_ranking - 15

      //冲刺档推荐
      db.collection("recommendation_school").where({
        score: db.command.gt(high_recommendation_buttom_score).and(db.command.lt(high_recommendation_top_score)),
        location : current_location,
        sci_or_art : db.command.eq(db_class).or(db.command.eq("综合"))
      })
      .orderBy("score","desc")
      .limit(20)
      .get({
        success(res){
          console.log("冲刺档院校：",res.data)
          that.setData({
            output_list_school_high : res.data
          })
        }
      })

      //主申档推荐
      db.collection("recommendation_school").where({
        score: db.command.gt(middle_recommendation_buttom_score).and(db.command.lt(middle_recommendation_top_score)),
        location : current_location,
        sci_or_art : db.command.eq(db_class).or(db.command.eq("综合"))
      })
      .orderBy("score","desc")
      .limit(20)
      .get({
        success(res){
          console.log("主申档院校：",res.data)
          that.setData({
            output_list_school_middle : res.data
          })
        }
      })

      //保底档推荐
      db.collection("recommendation_school").where({
        score: db.command.gt(low_recommendation_buttom_score).and(db.command.lt(low_recommendation_top_score)),
        location : current_location,
        sci_or_art : db.command.eq(db_class).or(db.command.eq("综合"))
      })
      .orderBy("score","desc")
      .limit(20)
      .get({
        success(res){
          console.log("保底档院校：",res.data)
          that.setData({
            output_list_school_low : res.data
          })
        }
      })
      // if(that.output_list_school_high == []){
      //   that.setData({
      //     output_list_school_high : [{school_name:"暂无",score:"暂无"}]
      //   })
      // }

    }
    else{
      // wx.showToast({
      //   title: '分数不合理',
      //   icon : 'error'
      // })
      that.setData({
        hidden_for_school : true,
        output_list_school_high : [],
        output_list_school_middle : [],
        output_list_school_low : [],
        output_list_major_high : [],
        output_list_major_middle : [],
        output_list_major_low : [],
      })
    }
      
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
      url: '/pages/search_single_school_and_major/search_single_school_and_major?school=' + event.currentTarget.dataset.school + "&major=" + event.currentTarget.dataset.major + "&location=" + event.currentTarget.dataset.location + "&class=" + db_class,
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