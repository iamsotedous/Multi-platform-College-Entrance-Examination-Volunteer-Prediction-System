// pages/test/test.js
//数据库大于小于

let test_value = 0

const db = wx.cloud.database()
const anhui_2022 = db.collection("anhui_2022_sci")
const score_2021 = db.collection("score_2021")

//这里是用来设置默认选项的，就是用户不选的话会直接用这些

//这个是查一分一段表（固定数据库）
let current_score = 600

//这个是查分数线
let current_location = "广东"
let current_school = "华南理工大学"

//这个是查一分一段表对应的数据库名字
let current_class = "理科（物理类）"
let current_score_for_ranking = 600
let table_name_for_ranking = ""

//用来判断是否以前注册过
let is_logon_before = 0

//用来实现注册功能
let current_logon_phone_number = ""
let current_logon_password = ""
let current_logon_name = ""
let current_logon_verification = ""
let key_for_is_logon_before = ""

//用来实现登录功能
let current_login_phone_number = ""
let current_login_password = ""

//用来实现更改密码功能
let current_change_phone_number = ""
let current_change_name = ""
let current_change_password = ""
let change_id = ""


Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ['BLE', 'WIFI', 'NFC',
    'BLE', 'WIFI', 'NFC',
    'BLE', 'WIFI', 'NFC'],
  taps: ['tap1', 'tap2', 'tap3'],
      loc : "1",
      new_image_src : "/images/visualize_1.jpg",
      number1 : Math.random() * 10,

      //这里是地址的下拉框的数据
      array_location : ['广东','陕西','北京','上海','重庆','四川','安徽','福建','甘肃','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','天津','云南','浙江'],
      index_for_location :0,

      //这里是文理科下拉框的数据
      array_class : ['理科（物理类）','文科（历史类）'],
      index_for_class : 0,

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

  //查一分一段表（固定数据库）的输入获取
  add_score(event){
    current_score = event.detail.value
    current_score = Number(current_score)
    console.log(current_score)
    console.log(typeof(current_score))
  },

  //查一分一段表（不固定数据库）的输入获取
  add_score_for_ranking(event){
    current_score_for_ranking = event.detail.value
    current_score_for_ranking = Number(current_score_for_ranking)
    console.log(current_score_for_ranking)
    console.log(typeof(current_score_for_ranking))
  },

  add_school(event){
    current_school = event.detail.value
    console.log(current_school)
    console.log(typeof(current_school))
  },

  //加入注册使用的电话号，变量名为current_logon_phone_number
  add_logon_phone_number(event){
    current_logon_phone_number = event.detail.value
    console.log("注册录入的电话号：",current_logon_phone_number)
    console.log("电话号类型：",typeof(current_logon_phone_number))
  },

  //加入注册使用的密码current_logon_password
  add_logon_password(event){
    current_logon_password = event.detail.value
    console.log("注册录入的密码：",current_logon_password)
    console.log("密码类型：",typeof(current_logon_password))
  },

  //加入注册使用的名字current_logon_name 
  add_logon_name(event){
    current_logon_name = event.detail.value
    console.log("注册录入的名字：",current_logon_name)
    //console.log("名字类型：",typeof(current_logon_name))
  },

  //加入注册使用的验证号用于区分是否为管理员，变量名为current_logon_verification
  add_logon_verification(event){
    current_logon_verification = event.detail.value
    console.log("注册录入的验证码：",current_logon_verification)
    //console.log("验证码类型：",typeof(current_logon_verification))
  },

    //加入登录使用的电话号，变量名为current_login_phone_number
    add_login_phone_number(event){
      current_login_phone_number = event.detail.value
      console.log("登录录入的电话号：",current_login_phone_number)
      console.log("电话号类型：",typeof(current_login_phone_number))
    },
  
    //加入登录使用的密码current_login_password
    add_login_password(event){
      current_login_password = event.detail.value
      console.log("登录录入的密码：",current_login_password)
      console.log("密码类型：",typeof(current_logon_password))
    },

    //加入更改密码使用的电话号，变量名为current_change_phone_number
    add_change_phone_number(event){
      current_change_phone_number = event.detail.value
      console.log("更改密码录入的电话号：",current_change_phone_number)
      //console.log("电话号类型：",typeof(current_change_phone_number))
    },

    //加入更改密码使用的名字current_change_name 
  add_change_name(event){
    current_change_name = event.detail.value
    console.log("更改密码录入的名字：",current_change_name)
    //console.log("名字类型：",typeof(current_change_name))
  },

  //加入更改密码使用的新密码current_change_password
  add_change_password(event){
    current_change_password = event.detail.value
    console.log("新密码：",current_change_password)
    //console.log("密码类型：",typeof(current_change_password))
  },

  get_some_data(){
    //console.log(current_score)
    //console.log(typeof(current_score))
    anhui_2022.where({
      score : current_score
    }).get({
      success(res){
        console.log(current_score)
        console.log(typeof(current_score))
        console.log(res.data[0])
        console.log("分数：",res.data[0].score)
        console.log("排名：",res.data[0].ranking)
        console.log("本段人数：",res.data[0].quantity)
      }
    })
  },


  get_score_line(){
      //console.log(current_location)
      score_2021.where({
        "location" : current_location,
        "school_name" : current_school
      }).orderBy("lowest_score","desc").get({
          success(res){
            console.log("查询分数线成功")
            console.log(res.data)
          },
          fail(res){
            console.log("查询失败")
          }
      })
  },
//调用云函数实现小加法
  add_two_numbers(){
      wx.cloud.callFunction({
        name :"add",
        data:{
          a : 1,
          b : 2
        },
        success(res){
          console.log("调用成功",res.result)
        },
        fail(res){
          console.log("调用失败",res.result)
        }
      })
  },
  
//调用云函数实现数据库查询（根据地点）
  search_score(){
    wx.cloud.callFunction({
      name:"search_score_info",
      data:{
          location : current_location,
          school_name : current_school
      },
      success(res){
        console.log("当前位置：",current_location)
        console.log("当前大学：",current_school)
        console.log("调用成功，搜索结果为：",res.result.data)
      },
      fail(res){
        console.log("大寄特寄")
      }
    })
  },

  //测试超过一百条的数据库查询
  test_over100(){
    console.log("在跑了在跑了")
    wx.cloud.callFunction({
      name:"search_over100_test",
      data:{
      },
      success(res){
        console.log("好")
        console.log(res)
      },
      fail(res){
        console.log(res)
        console.log("寄")
      }
    })
  },

  logon(){
      console.log("注册中")
      console.log("上传的电话号为：",current_logon_phone_number)

      db.collection("user").where({
        phone_number : current_logon_phone_number
      }).count({
          success(res){
            console.log("重复手机号数：",res.total)
            is_logon_before = (res.total == 0 ? 0 : 1)
            console.log("is_logon_before:",is_logon_before)
            console.log("typeof(is_logon_before):",typeof(is_logon_before))

            if(is_logon_before == 0){
              wx.cloud.callFunction({
                name:"cloud_logon" ,
                data:{
                  logon_phone_number : current_logon_phone_number,
                  logon_password : current_logon_password,
                  logon_name : current_logon_name,
                  logon_verification : current_logon_verification
                },
                success(res){
                  console.log("注册成功！")
                  console.log(res)
                }
              })
            }
            else{
              console.log("已注册，请登录")
            }
          },
          fail(res){
            console.log(res)
          }
      });

  },

  //登陆的实现：由于云函数很难读出查库的内容，这里采用了两次调用云函数的方法：首先获取到输入框的电话号和密码，然后第一次首先查找是否有对应的电话号，total为数量值（由于注册的限制total只能为01）。第二次查找是否有电话号和密码都对应的数据，并且赋值数量给total。两次total的和存在flag_for_situation中，flag_for_situation只能有三个取值：0代表不存在账号，1代表账号存在但密码错误，2代表账号密码正确。
  login(){
    let flag_for_situation = 0
    //console.log("登录按钮")
    wx.cloud.callFunction({
      name: "cloud_login_check",
      data: {
        type : "number",
        login_phone_number : current_login_phone_number,
        //login_password : current_login_password
      },
      //complete : console.log,
      success(res0){
        //console.log("检查是否有这个账户:ok",res0)
        flag_for_situation = flag_for_situation + res0.result.total
        wx.cloud.callFunction({
          name : "cloud_login",
          data:{
            login_phone_number : current_login_phone_number,
            login_password : current_login_password
          },
          success(res1){
              //console.log("检查账号密码是否正确:ok",res1)
              flag_for_situation = flag_for_situation + res1.result.total
              //console.log("flag_for_situation = " , flag_for_situation)

              if(flag_for_situation == 2){
                console.log("密码正确")
              }
              else if(flag_for_situation == 1){
                console.log("密码错误")
              }
              else if(flag_for_situation == 0){
                console.log("账号未注册")
              }
              else{
                console.log("意外问题")
              }
          }
        })
        
      }
    })
},

change_password(){
    let flag_for_change_password = 0
    //console.log("更改密码按钮")
    wx.cloud.callFunction({
      name : "cloud_login_check",
      data:{
        type : "number",
        login_phone_number : current_change_phone_number
      },
      success(res0){
        //console.log("改密码前检查是否有这个账户:ok",res0)
        if(res0.result.total == 1){
            wx.cloud.callFunction({
              name : "cloud_login_check",
              data: {
                type : "number_and_name",
                login_phone_number : current_change_phone_number,
                change_name : current_change_name
              },
              success(res1){
                console.log("验证姓名与手机号是否对应:ok",res1)
                if(res1.result.total == 1){
                    wx.cloud.callFunction({
                      name : "cloud_login_check",
                      data: {
                        type : "search_id",
                        login_phone_number : current_change_phone_number
                      },
                      success(res3){
                        console.log("获得对应id:ok",res3)
                        //获取更改密码的数据对应的id
                        change_id = res3.result.data[0]._id
                        console.log("id:",change_id)
                        console.log("id类型:",typeof(change_id))
                        console.log("新密码:",current_change_password)

                        db.collection("user").doc(change_id).update({
                          data : {
                            password : current_change_password
                          },
                          success(res4){
                            console.log("密码修改成功:",res4)
                          },
                          fail(res4){
                            console.log("密码修改失败:",res4)
                          }
                        })
                      },
                      fail(res3){
                        console.log("获取对应id时调用数据库失败")
                      }

                    })
                }
                else{
                  console.log("姓名与账号不对应，请检查")
                }
              },
              fail(res1){
                console.log("验证姓名时调用数据库失败")
              }
            })
        }
        else {
          console.log("账号不存在")
        }
          
      },
      fail(res0){
        console.log("验证账号是否存在时调用数据库失败")
      }
    })
},

download_pdf(){
    wx.cloud.downloadFile({
      fileID : "cloud://test-3g4liwgzdf92b615.7465-test-3g4liwgzdf92b615-1317480899/安徽2022理科.pdf",
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

  //button 1 事件处理函数
  btnhand00(event){
    console.log(event)
    //console.log(event.type)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //测试全局变量
    //console.log(getApp().globalData.global_is_admin)
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

  },
  tap1(){
    console.log(1)
  },

  tap2(){
    console.log(2)
  },

  tap3(){
    console.log(3)
  },
})