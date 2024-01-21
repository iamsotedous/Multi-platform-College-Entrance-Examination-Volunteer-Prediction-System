// pages/statistics/statistics.js
const db = wx.cloud.database()
let add_total = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_user : 0,
    admin_user : 0,
    none_admin_user : 0,
    deleted_user : 0,
    feedbacks : 0,
    replies : 0,

    submitted_user : 0,
    submitted_school : 0,
    submitted_major : 0,

    school : 0,
    major : 0,
    score_line : 0,
    table : 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this

    db.collection("user").count({
      success(res){
        //console.log(res)
        that.setData({
          total_user : res.total
        })
      }
    })

    db.collection("user").where({
      is_admin : 1
    })
    .count({
      success(res){
        //console.log(res)
        that.setData({
          admin_user : res.total
        })
      }
    })

    db.collection("user").where({
      is_admin : 0
    })
    .count({
      success(res){
        //console.log(res)
        that.setData({
          none_admin_user : res.total
        })
      }
    })

    db.collection("account_deleted")
    .count({
      success(res){
        //console.log(res)
        that.setData({
          deleted_user : res.total
        })
      }
    })

    db.collection("user_feedback")
    .count({
      success(res){
        console.log(res)
        that.setData({
          feedbacks : res.total
        })
      }
    })

    db.collection("user_feedback").where({
      is_done : 1
    })
    .count({
      success(res){
        //console.log(res)
        that.setData({
          replies : res.total
        })
      }
    })

    db.collection("voluntary_for_check").where({
      is_submitted : 1
    })
    .count({
      success(res){
        //console.log(res)
        that.setData({
          submitted_user : res.total
        })
      }
    })

    db.collection("voluntary_school_count")
    .count({
      success(res){
        //console.log(res)
        that.setData({
          submitted_school : res.total
        })
      }
    })

    db.collection("voluntary_major_count")
    .count({
      success(res){
        //console.log(res)
        that.setData({
          submitted_major : res.total
        })
      }
    })

    db.collection("schoollist_check")
    .count({
      success(res){
        //console.log(res)
        that.setData({
          school : res.total
        })
      }
    })

    db.collection("school_major_ranking")
    .count({
      success(res){
        //console.log(res)
        that.setData({
          major : res.total
        })
      }
    })

    db.collection("score_2022")
    .count({
      success(res){
        //console.log(res)
        add_total =  add_total + res.total
        db.collection("score_2020").count({
          success(res){
            add_total =  add_total + res.total
            db.collection("score_2019").count({
              success(res){
                add_total = add_total + res.total
                that.setData({
                  score_line : add_total
                })
              }
            })
          }
        })
      }
    })

    db.collection("database_list")
    .count({
      success(res){
        //console.log(res)
        that.setData({
          table : res.total
        })
      }
    })

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
    add_total = 0
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    add_total = 0
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