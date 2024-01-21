// pages/search_single_school_and_major/search_single_school_and_major.js

//用来连数据库
const db = wx.cloud.database()

let school_name = "清华大学"
let major = ""
let location = ""
let classi = ""
let year = 2022
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
    location = options.location
    major = options.major
    classi = options.class
    year = options.year

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
    //异步处理
    let that = this

    console.log(school_name)
    console.log(location)
    console.log(major)
    console.log(classi)
    console.log(year)

    if(year == 2022){
      //改了2021
      db.collection("score_2022").where({
        school_name : school_name,
        major : major,
        location : location,
        sci_or_art : classi
      })
      .limit(1)
      .get({
        success(res){
          console.log(res)
          // output_list = res.data
          that.setData({
            output_list : res.data,

          })

      },
      fail(res){
        console.log(res)
      }
    })
    }
    else if(year == 2021){

            db.collection("score_2020").where({
              school_name : school_name,
              major : major,
              location : location,
              sci_or_art : classi
            })
            .limit(1)
            .get({
              success(res){
                console.log(res)
                // output_list = res.data
                that.setData({
                  output_list : res.data,
      
                })
      
            },
            fail(res){
              console.log(res)
            }
          })
    }
    else{
            db.collection("score_2019").where({
              school_name : school_name,
              major : major,
              location : location,
              sci_or_art : classi
            })
            .limit(1)
            .get({
              success(res){
                console.log(res)
                // output_list = res.data
                that.setData({
                  output_list : res.data,
      
                })
      
            },
            fail(res){
              console.log(res)
            }
          })
    }


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