// pages/voluntary_output/voluntary_output.js

//用来查数据库
const db = wx.cloud.database()
let phone_number = ""
let user_score = 0
let user_location = ""
let user_class = ""

//用来查每个学校专业的排名
let school_name_1 = ""
let school_name_2 = ""
let school_name_3 = ""
let school_name_4 = ""
let school_name_5 = ""

let major_name_1 = ""
let major_name_2 = ""
let major_name_3 = ""
let major_name_4 = ""
let major_name_5 = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    output_list_1 : [],
    output_list_2 : [],
    output_list_3 : [],
    output_list_4 : [],
    output_list_5 : [],

    time_1 : 0,
    time_2 : 0,
    time_3 : 0,
    time_4 : 0,
    time_5 : 0,

    rank_1 : 1,
    rank_2 : 1,
    rank_3 : 1,
    rank_4 : 1,
    rank_5 : 1,

    school_name_1_output : "",
    school_name_2_output : "",
    school_name_3_output : "",
    school_name_4_output : "",
    school_name_5_output : "",
    
    major_name_1_output : "",
    major_name_2_output : "",
    major_name_3_output : "",
    major_name_4_output : "",
    major_name_5_output : "",

    hidden_for_optimization : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // //异步处理
    let that = this

    //console.log(getApp().globalData.user_phone_number)
    phone_number = getApp().globalData.user_phone_number
    db.collection("voluntary_for_check").where({
      "phone_number" : phone_number
    }).field({
      score : true,
      is_submitted : true
    })
    .get({
      success(res){
        console.log(res)
        if(res.data[0].is_submitted == 0){
          console.log("未志愿填报，无法查看")
          wx.showModal({
            title: '填报提醒',
            content: '您仍未填报志愿，请问是否跳转到志愿填报页面？',
            complete: (res) => {
              if (res.cancel) {
                wx.redirectTo({
                  url: '/pages/user_index/user_index',
                })
              }
          
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/voluntary_input/voluntary_input',
                })
              }
            }
          })
        }
        else if(res.data[0].is_submitted == 1){
          //这里查到已经填报了，就搜表
          //console.log("res.data[0].score:",res.data[0].score)
          user_score = res.data[0].score
          console.log("当前用户为：",phone_number)
          console.log("当前成绩为",user_score)

          //这里用手机号查已填报志愿
          db.collection("voluntary_for_ranking").where({
            "phone_number" : phone_number
          }).get({
            success(res){
              console.log(res)

              school_name_1 = res.data[0].school_name
              school_name_2 = res.data[1].school_name
              school_name_3 = res.data[2].school_name
              school_name_4 = res.data[3].school_name
              school_name_5 = res.data[4].school_name

              major_name_1 = res.data[0].major
              major_name_2 = res.data[1].major
              major_name_3 = res.data[2].major
              major_name_4 = res.data[3].major
              major_name_5 = res.data[4].major

              that.setData({
                school_name_1_output : res.data[0].school_name,
                school_name_2_output : res.data[1].school_name,
                school_name_3_output : res.data[2].school_name,
                school_name_4_output : res.data[3].school_name,
                school_name_5_output : res.data[4].school_name,
                
                major_name_1_output : res.data[0].major,
                major_name_2_output : res.data[1].major,
                major_name_3_output : res.data[2].major,
                major_name_4_output : res.data[3].major,
                major_name_5_output : res.data[4].major,
              })

              user_location = res.data[0].location
              user_class = res.data[0].sci_or_art

              // console.log(school_name_1)
              // console.log(major_name_1)
              // console.log(user_location)
              // console.log(user_class)

              if(school_name_1 != null){
                db.collection("voluntary_for_ranking").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_1,
                  major : major_name_1
                }).orderBy("score","desc")
                .get({
                  success(res){
                    console.log("志愿一所有填报信息：",res.data[0])
                    for(let i1 = 0;i1 < 20;i1++){
                      if(user_score == res.data[i1].score){
                        //console.log(user_score)
                        console.log("志愿一排名为：",i1+1)
                        that.setData({
                          rank_1 : i1+1
                        })
                        break
                      }
                    }
                  },
                  fail(res){
                    console.log(res)
                  }
                })

                db.collection("voluntary_major_count").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_1,
                  major : major_name_1
                }).field({
                  time : true
                }).get({
                  success(res){
                    console.log("志愿一的填报热度为：",)
                    that.setData({
                      time_1 : res.data[0].time
                    })
                  }
                })

              }
             

              if(school_name_2 != null){
                db.collection("voluntary_for_ranking").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_2,
                  major : major_name_2
                }).orderBy("score","desc")
                .get({
                  success(res){
                    console.log("志愿二所有填报信息：",res)
                    for(let i2 = 0;i2 < 20;i2++){
                      if(user_score == res.data[i2].score){
                        //console.log(user_score)
                        console.log("志愿二排名为：",i2+1)
                        that.setData({
                          rank_2 : i2+1
                        })
                        break
                      }
                    }
                  },
                  fail(res){
                    console.log(res)
                  }
                })

                db.collection("voluntary_major_count").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_2,
                  major : major_name_2
                }).field({
                  time : true
                }).get({
                  success(res){
                    console.log("志愿二的填报热度为：",res.data[0].time)
                    that.setData({
                      time_2 : res.data[0].time
                    })
                  }
                })

              }

              if(school_name_3 != null){
                db.collection("voluntary_for_ranking").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_3,
                  major : major_name_3
                }).orderBy("score","desc")
                .get({
                  success(res){
                    console.log("志愿三所有填报信息：",res)
                    for(let i3 = 0;i3 < 20;i3++){
                      if(user_score == res.data[i3].score){
                        //console.log(user_score)
                        console.log("志愿三排名为：",i3+1)
                        that.setData({
                          rank_3 : i3+1
                        })
                        break
                      }
                    }
                  },
                  fail(res){
                    console.log(res)
                  }
                })

                db.collection("voluntary_major_count").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_3,
                  major : major_name_3
                }).field({
                  time : true
                }).get({
                  success(res){
                    console.log("志愿三的填报热度为：",res.data[0].time)
                    that.setData({
                      time_3 : res.data[0].time
                    })
                  }
                })

              }

              if(school_name_4 != null){
                db.collection("voluntary_for_ranking").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_4,
                  major : major_name_4
                }).orderBy("score","desc")
                .get({
                  success(res){
                    console.log("志愿四所有填报信息：",res)
                    for(let i4 = 0;i4 < 20;i4++){
                      if(user_score == res.data[i4].score){
                        //console.log(user_score)
                        console.log("志愿四排名为：",i4+1)
                        that.setData({
                          rank_4 : i4+1
                        })
                        break
                      }
                    }
                  },
                  fail(res){
                    console.log(res)
                  }
                })

                db.collection("voluntary_major_count").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_4,
                  major : major_name_4
                }).field({
                  time : true
                }).get({
                  success(res){
                    console.log("志愿四的填报热度为：",res.data[0].time)
                    that.setData({
                      time_4 : res.data[0].time
                    })
                  }
                })

              }

              if(school_name_5 != null){
                db.collection("voluntary_for_ranking").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_5,
                  major : major_name_5
                }).orderBy("score","desc")
                .get({
                  success(res){
                    console.log("志愿五所有填报信息：",res)
                    for(let i5 = 0;i5 < 20;i5++){
                      if(user_score == res.data[i5].score){
                        //console.log(user_score)
                        console.log("志愿五排名为：",i5+1)
                        that.setData({
                          rank_5 : i5+1
                        })
                        break
                      }
                    }
                  },
                  fail(res){
                    console.log(res)
                  }
                })

                db.collection("voluntary_major_count").where({
                  location : user_location,
                  sci_or_art : db.command.eq(user_class).or(db.command.eq("综合类")),
                  school_name : school_name_5,
                  major : major_name_5
                }).field({
                  time : true
                }).get({
                  success(res){
                    console.log("志愿五的填报热度为：",res.data[0].time)
                    that.setData({
                      time_5 : res.data[0].time
                    })
                  }
                })

              }



            },
            fail(res){
              console.log(res)
            }
          })
        }
        else{
          console.log("is_submitted有点问题，看一看")
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },

  back_to_index(){
    wx.redirectTo({
      url: '/pages/user_index/user_index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    // //异步处理
    let that = this

    that.setData({
      hidden_for_optimization : false
    })
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