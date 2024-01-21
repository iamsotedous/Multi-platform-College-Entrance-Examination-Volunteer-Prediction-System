// pages/admin_user_management/admin_user_management.js
let delete_id = ""
let phone_number = ""
let delete_id_check = ""
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
    //异步处理
    let that = this

    wx.cloud.database().collection("user")
    .where({
      is_admin : 0
    })
    .get({
      success(res){
        console.log(res)
        that.setData({
          output_list : res.data
        })
      }
    })
  },

  delete_accout(event){
    delete_id = event.target.dataset.id
    phone_number = event.target.dataset.phone
    console.log(delete_id)

    wx.showModal({
      title: '删除确认',
      content: '确定删除该用户信息？',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          wx.cloud.database().collection("voluntary_for_check").where({
            phone_number : phone_number
          })
          .get({
            success(res){
              delete_id_check = res.data[0]._id
              console.log("删除voluntary_for_check表中的id为：",delete_id_check)
              wx.cloud.database().collection("voluntary_for_check").doc(delete_id_check).remove({
                success(res){
                  console.log("voluntary_for_check表数据删除成功")
                  console.log(res)
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
      
          wx.cloud.database().collection("user").doc(delete_id).remove({
            success(res){
              console.log("删除user表中的id为：",res)
              console.log("user表中的数据删除成功")
              wx.redirectTo({
                url: '/pages/admin_user_management/admin_user_management',
              })
              wx.showToast({
                title: '删除成功！',
              })
            },
            fail(res){
              console.log(res)
            }
          })
        }
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