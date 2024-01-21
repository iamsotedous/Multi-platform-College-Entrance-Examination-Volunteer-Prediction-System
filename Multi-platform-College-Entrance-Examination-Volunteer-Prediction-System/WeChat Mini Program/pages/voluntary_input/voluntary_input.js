// pages/voluntary_input/voluntary_input.js
const db = wx.cloud.database()

//获取考生生源地和分数
let current_location = "广东"
let current_score = 0
let current_phone_number = ""

//用于获取文理科
let current_class = "理科类"

//用来获取校名
let school_input_1 = ""
let school_input_2 = ""
let school_input_3 = ""
let school_input_4 = ""
let school_input_5 = ""

//用来获取专业类别
let major_input_1 = "规划建设类"
let major_input_2 = "规划建设类"
let major_input_3 = "规划建设类"
let major_input_4 = "规划建设类"
let major_input_5 = "规划建设类"

//检查是否填写过志愿
let is_submit_before = 0



Page({

  /**
   * 页面的初始数据
   */
  data: {

    //这里放生源地
    array_location : ['广东','陕西','北京','上海','重庆','四川','安徽','福建','甘肃','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','天津','云南','浙江'],
    index_for_location :0,

    //这里放选专业类别的
    array_class1 : ['规划建设类','装备制造类','经济金融类','现代管理类','现代农业类','法律类','思想文化类','中文传播类','对外交流类','教育体艺类','信息电子类','生态环境类','海洋船舶类','能源和动力类','地质矿产类','新材料类','生物医学类','化学化工类','治安国防类','其他理工类'],
    index_for_class1 : 0,

    array_class2 : ['规划建设类','装备制造类','经济金融类','现代管理类','现代农业类','法律类','思想文化类','中文传播类','对外交流类','教育体艺类','信息电子类','生态环境类','海洋船舶类','能源和动力类','地质矿产类','新材料类','生物医学类','化学化工类','治安国防类','其他理工类'],
    index_for_class2 : 0,

    array_class3 : ['规划建设类','装备制造类','经济金融类','现代管理类','现代农业类','法律类','思想文化类','中文传播类','对外交流类','教育体艺类','信息电子类','生态环境类','海洋船舶类','能源和动力类','地质矿产类','新材料类','生物医学类','化学化工类','治安国防类','其他理工类'],
    index_for_class3 : 0,

    array_class4 : ['规划建设类','装备制造类','经济金融类','现代管理类','现代农业类','法律类','思想文化类','中文传播类','对外交流类','教育体艺类','信息电子类','生态环境类','海洋船舶类','能源和动力类','地质矿产类','新材料类','生物医学类','化学化工类','治安国防类','其他理工类'],
    index_for_class4 : 0,

    array_class5 : ['规划建设类','装备制造类','经济金融类','现代管理类','现代农业类','法律类','思想文化类','中文传播类','对外交流类','教育体艺类','信息电子类','生态环境类','海洋船舶类','能源和动力类','地质矿产类','新材料类','生物医学类','化学化工类','治安国防类','其他理工类'],
    index_for_class5 : 0,

    //这里是文理科下拉框的数据
    array_class : ['理科类','文科类','综合类'],
    index_for_class : 0,
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

  //用来获取生源地
  bindPickerChange_location(event){
    //console.log("事件数据：",event.detail)
    //console.log("事件数据类型：",typeof(event.detail.value))
    current_location = this.data.array_location[event.detail.value]
    this.setData({
      index_for_location: event.detail.value
    })
    //console.log("index_for_location:",this.data.index_for_location)
    console.log("current_location值：",current_location)
    console.log("current_location值类型：",typeof(current_location))
},

  //获取高考分数
  add_score(event){
    if(Number(event.detail.value)<750 && Number(event.detail.value)>0){
      current_score = event.detail.value
      current_score = Number(current_score)
    }
    else{
      current_score = 0
    }

    console.log("current_score:",current_score)
    console.log(typeof(current_score))
  },

  //用来获取五个志愿的校名
  add_school1(event){
    school_input_1 = event.detail.value
    console.log(school_input_1)
    console.log(typeof(school_input_1))
  },

  add_school2(event){
    school_input_2 = event.detail.value
    console.log(school_input_2)
    console.log(typeof(school_input_2))
  },

  add_school3(event){
    school_input_3 = event.detail.value
    console.log(school_input_3)
    console.log(typeof(school_input_3))
  },

  add_school4(event){
    school_input_4 = event.detail.value
    console.log(school_input_4)
    console.log(typeof(school_input_4))
  },

  add_school5(event){
    school_input_5 = event.detail.value
    console.log(school_input_5)
    console.log(typeof(school_input_5))
  },

  //这里用来获取每个志愿的专业类型
  bindPickerChange_class1(event){
    major_input_1 = this.data.array_class1[event.detail.value]
    this.setData({
      index_for_class1 : event.detail.value
    })
    //console.log("index_for_class1:",this.data.index_for_class1)
    console.log("major_input_1值：",major_input_1)
    //console.log("major_input_1值类型：",typeof(major_input_1))
  },

  bindPickerChange_class2(event){
    major_input_2 = this.data.array_class2[event.detail.value]
    this.setData({
      index_for_class2 : event.detail.value
    })
    //console.log("index_for_class2:",this.data.index_for_class2)
    console.log("major_input_2值：",major_input_2)
    //console.log("major_input_2值类型：",typeof(major_input_2))
  },

  bindPickerChange_class3(event){
    major_input_3 = this.data.array_class3[event.detail.value]
    this.setData({
      index_for_class3 : event.detail.value
    })
    //console.log("index_for_class3:",this.data.index_for_class3)
    console.log("major_input_3值：",major_input_3)
    //console.log("major_input_3值类型：",typeof(major_input_3))
  },

  bindPickerChange_class4(event){
    major_input_4 = this.data.array_class1[event.detail.value]
    this.setData({
      index_for_class4 : event.detail.value
    })
    //console.log("index_for_class4:",this.data.index_for_class4)
    console.log("major_input_4值：",major_input_4)
    //console.log("major_input_4值类型：",typeof(major_input_4))
  },

  bindPickerChange_class5(event){
    major_input_5 = this.data.array_class5[event.detail.value]
    this.setData({
      index_for_class5 : event.detail.value
    })
    //console.log("index_for_class5:",this.data.index_for_class5)
    console.log("major_input_5值：",major_input_5)
    //console.log("major_input_5值类型：",typeof(major_input_5))
  },

  submit(){
    console.log(current_phone_number)
    db.collection("voluntary_for_check").where({
      "phone_number" : current_phone_number
    }).get({
      success(res){
        console.log(res)
        //检查是否填写过志愿
        is_submit_before = res.data[0].is_submitted
        if(is_submit_before == 0){
          wx.showModal({
            title: '提交确认',
            content: '确认填报信息无误？',
            complete: (result) => {
              if (result.cancel) {
                console.log("用户返回修改")
              }
          
              if (result.confirm) {
              //测试过能在赋值以后判断
              console.log("未填写志愿")

          //注册以后自动生成一个voluntary_for_check表下的空信息，这里要把信息填满，把is_submit_before改为1
          db.collection("voluntary_for_check").doc(res.data[0]._id).update({
            data:{
              is_submitted : 1,
              location : current_location,
              phone_number : current_phone_number,
              score : current_score
            },
            success(res){
              console.log(res)
              console.log("更改voluntary_for_check表信息成功")
            },
            fail(res){
              console.log(res)
            }
          })

          db.collection("schoollist_check").where({
            school_name : school_input_1
          }).count({
            success(res){
              console.log(res)
              if(res.total > 0){
                //测试成功走这里，这里是对验证成功的专业进行统计和插入
                console.log("高校存在")

                //这里是第一个志愿
                //这段用来插入学校统计表，首先检查是否能查到学校，查得到就time进行自增，查不到就新建
                db.collection("voluntary_school_count").where({
                  location : current_location,
                  school_name : school_input_1,
                  sci_or_art : current_class
                }).get({
                  success(res){
                    console.log(res)
                    if(res.data.length > 0){
                      //长度大于0即能查到这条学校，只用time++
                      console.log("查询到相同填报信息，time+1")
                      //console.log(res.data[0]._id)
                      db.collection("voluntary_school_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校查不到，要插入学校
                      console.log("学校查不到，需要插入一条新的")
                      db.collection("voluntary_school_count").add({
                        data:{
                          location : current_location,
                          school_name : school_input_1,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }

                  }
                })

                //这里要插入专业统计表voluntary_major_count
                db.collection("voluntary_major_count").where({
                  location : current_location,
                  school_name : school_input_1,
                  sci_or_art : current_class,
                  major : major_input_1
                }).get({
                  success(res){
                    console.log("查询voluntary_major_count表是否有相同结果：",res)
                    if(res.data.length > 0){
                      //这里能查到相同结果，time自增
                      console.log("查询到相同填报专业信息，time+1")
                      db.collection("voluntary_major_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校专业查不到，要插入学校和专业
                      console.log("学校和专业查不到，需要插入一条新的")
                      db.collection("voluntary_major_count").add({
                        data:{
                          location : current_location,
                          major : major_input_1,
                          school_name : school_input_1,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
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

                //这里要插入用来算排名的表voluntary_for_ranking
                db.collection("voluntary_for_ranking").add({
                  data:{
                    location: current_location,
                    major : major_input_1,
                    phone_number : current_phone_number,
                    school_name : school_input_1,
                    sci_or_art : current_class,
                    score : current_score
                  },
                  success(res){
                    console.log("插入用于排名的voluntary_for_ranking表：",res)
                  },
                  fail(res){
                    console.log(res)
                  }
                })

              }
              else {
                //这里暂时跑不了，要看看
                console.log("高校不存在")
              }
            },
            fail(res){
              console.log(res)
            }
          })

          //这里是第二个志愿
          db.collection("schoollist_check").where({
            school_name : school_input_2
          }).count({
            success(res){
              console.log(res)
              if(res.total > 0){
                //测试成功走这里，这里是对验证成功的专业进行统计和插入
                console.log("高校存在")

                //这段用来插入学校统计表，首先检查是否能查到学校，查得到就time进行自增，查不到就新建
                db.collection("voluntary_school_count").where({
                  location : current_location,
                  school_name : school_input_2,
                  sci_or_art : current_class
                }).get({
                  success(res){
                    console.log(res)
                    if(res.data.length > 0){
                      //长度大于0即能查到这条学校，只用time++
                      console.log("查询到相同填报信息，time+1")
                      //console.log(res.data[0]._id)
                      db.collection("voluntary_school_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校查不到，要插入学校
                      console.log("学校查不到，需要插入一条新的")
                      db.collection("voluntary_school_count").add({
                        data:{
                          location : current_location,
                          school_name : school_input_2,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }

                  }
                })

                //这里要插入专业统计表voluntary_major_count
                db.collection("voluntary_major_count").where({
                  location : current_location,
                  school_name : school_input_2,
                  sci_or_art : current_class,
                  major : major_input_2
                }).get({
                  success(res){
                    console.log("查询voluntary_major_count表是否有相同结果：",res)
                    if(res.data.length > 0){
                      //这里能查到相同结果，time自增
                      console.log("查询到相同填报专业信息，time+1")
                      db.collection("voluntary_major_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校专业查不到，要插入学校和专业
                      console.log("学校和专业查不到，需要插入一条新的")
                      db.collection("voluntary_major_count").add({
                        data:{
                          location : current_location,
                          major : major_input_2,
                          school_name : school_input_2,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
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

                //这里要插入用来算排名的表voluntary_for_ranking
                db.collection("voluntary_for_ranking").add({
                  data:{
                    location: current_location,
                    major : major_input_2,
                    phone_number : current_phone_number,
                    school_name : school_input_2,
                    sci_or_art : current_class,
                    score : current_score
                  },
                  success(res){
                    console.log("插入用于排名的voluntary_for_ranking表：",res)
                  },
                  fail(res){
                    console.log(res)
                  }
                })

              }
              else {
                //这里暂时跑不了，要看看
                console.log("高校不存在")
              }
            },
            fail(res){
              console.log(res)
            }
          })

          //这里是第三个志愿
          db.collection("schoollist_check").where({
            school_name : school_input_3
          }).count({
            success(res){
              console.log(res)
              if(res.total > 0){
                //测试成功走这里，这里是对验证成功的专业进行统计和插入
                console.log("高校存在")

                //这段用来插入学校统计表，首先检查是否能查到学校，查得到就time进行自增，查不到就新建
                db.collection("voluntary_school_count").where({
                  location : current_location,
                  school_name : school_input_3,
                  sci_or_art : current_class
                }).get({
                  success(res){
                    console.log(res)
                    if(res.data.length > 0){
                      //长度大于0即能查到这条学校，只用time++
                      console.log("查询到相同填报信息，time+1")
                      //console.log(res.data[0]._id)
                      db.collection("voluntary_school_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校查不到，要插入学校
                      console.log("学校查不到，需要插入一条新的")
                      db.collection("voluntary_school_count").add({
                        data:{
                          location : current_location,
                          school_name : school_input_3,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }

                  }
                })

                //这里要插入专业统计表voluntary_major_count
                db.collection("voluntary_major_count").where({
                  location : current_location,
                  school_name : school_input_3,
                  sci_or_art : current_class,
                  major : major_input_3
                }).get({
                  success(res){
                    console.log("查询voluntary_major_count表是否有相同结果：",res)
                    if(res.data.length > 0){
                      //这里能查到相同结果，time自增
                      console.log("查询到相同填报专业信息，time+1")
                      db.collection("voluntary_major_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校专业查不到，要插入学校和专业
                      console.log("学校和专业查不到，需要插入一条新的")
                      db.collection("voluntary_major_count").add({
                        data:{
                          location : current_location,
                          major : major_input_3,
                          school_name : school_input_3,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
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

                //这里要插入用来算排名的表voluntary_for_ranking
                db.collection("voluntary_for_ranking").add({
                  data:{
                    location: current_location,
                    major : major_input_3,
                    phone_number : current_phone_number,
                    school_name : school_input_3,
                    sci_or_art : current_class,
                    score : current_score
                  },
                  success(res){
                    console.log("插入用于排名的voluntary_for_ranking表：",res)
                  },
                  fail(res){
                    console.log(res)
                  }
                })

              }
              else {
                //这里暂时跑不了，要看看
                console.log("高校不存在")
              }
            },
            fail(res){
              console.log(res)
            }
          })

          //这里是第四个志愿
          db.collection("schoollist_check").where({
            school_name : school_input_4
          }).count({
            success(res){
              console.log(res)
              if(res.total > 0){
                //测试成功走这里，这里是对验证成功的专业进行统计和插入
                console.log("高校存在")

                //这段用来插入学校统计表，首先检查是否能查到学校，查得到就time进行自增，查不到就新建
                db.collection("voluntary_school_count").where({
                  location : current_location,
                  school_name : school_input_4,
                  sci_or_art : current_class
                }).get({
                  success(res){
                    console.log(res)
                    if(res.data.length > 0){
                      //长度大于0即能查到这条学校，只用time++
                      console.log("查询到相同填报信息，time+1")
                      //console.log(res.data[0]._id)
                      db.collection("voluntary_school_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校查不到，要插入学校
                      console.log("学校查不到，需要插入一条新的")
                      db.collection("voluntary_school_count").add({
                        data:{
                          location : current_location,
                          school_name : school_input_4,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }

                  }
                })

                //这里要插入专业统计表voluntary_major_count
                db.collection("voluntary_major_count").where({
                  location : current_location,
                  school_name : school_input_4,
                  sci_or_art : current_class,
                  major : major_input_4
                }).get({
                  success(res){
                    console.log("查询voluntary_major_count表是否有相同结果：",res)
                    if(res.data.length > 0){
                      //这里能查到相同结果，time自增
                      console.log("查询到相同填报专业信息，time+1")
                      db.collection("voluntary_major_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校专业查不到，要插入学校和专业
                      console.log("学校和专业查不到，需要插入一条新的")
                      db.collection("voluntary_major_count").add({
                        data:{
                          location : current_location,
                          major : major_input_4,
                          school_name : school_input_4,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
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

                //这里要插入用来算排名的表voluntary_for_ranking
                db.collection("voluntary_for_ranking").add({
                  data:{
                    location: current_location,
                    major : major_input_4,
                    phone_number : current_phone_number,
                    school_name : school_input_4,
                    sci_or_art : current_class,
                    score : current_score
                  },
                  success(res){
                    console.log("插入用于排名的voluntary_for_ranking表：",res)
                  },
                  fail(res){
                    console.log(res)
                  }
                })

              }
              else {
                //这里暂时跑不了，要看看
                console.log("高校不存在")
              }
            },
            fail(res){
              console.log(res)
            }
          })

          //这里是第五个志愿
          db.collection("schoollist_check").where({
            school_name : school_input_5
          }).count({
            success(res){
              console.log(res)
              if(res.total > 0){
                //测试成功走这里，这里是对验证成功的专业进行统计和插入
                console.log("高校存在")

                //这段用来插入学校统计表，首先检查是否能查到学校，查得到就time进行自增，查不到就新建
                db.collection("voluntary_school_count").where({
                  location : current_location,
                  school_name : school_input_5,
                  sci_or_art : current_class
                }).get({
                  success(res){
                    console.log(res)
                    if(res.data.length > 0){
                      //长度大于0即能查到这条学校，只用time++
                      console.log("查询到相同填报信息，time+1")
                      //console.log(res.data[0]._id)
                      db.collection("voluntary_school_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校查不到，要插入学校
                      console.log("学校查不到，需要插入一条新的")
                      db.collection("voluntary_school_count").add({
                        data:{
                          location : current_location,
                          school_name : school_input_5,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }

                  }
                })

                //这里要插入专业统计表voluntary_major_count
                db.collection("voluntary_major_count").where({
                  location : current_location,
                  school_name : school_input_5,
                  sci_or_art : current_class,
                  major : major_input_5
                }).get({
                  success(res){
                    console.log("查询voluntary_major_count表是否有相同结果：",res)
                    if(res.data.length > 0){
                      //这里能查到相同结果，time自增
                      console.log("查询到相同填报专业信息，time+1")
                      db.collection("voluntary_major_count").doc(res.data[0]._id).update({
                        data:{
                          time : db.command.inc(1)
                        },
                        success(res){
                          console.log(res)
                        },
                        fail(res){
                          console.log(res)
                        }
                      })
                    }
                    else{
                      //长度不存在，学校专业查不到，要插入学校和专业
                      console.log("学校和专业查不到，需要插入一条新的")
                      db.collection("voluntary_major_count").add({
                        data:{
                          location : current_location,
                          major : major_input_5,
                          school_name : school_input_5,
                          sci_or_art : current_class,
                          time : 1
                        },
                        success(res){
                          console.log(res)
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

                //这里要插入用来算排名的表voluntary_for_ranking
                db.collection("voluntary_for_ranking").add({
                  data:{
                    location: current_location,
                    major : major_input_5,
                    phone_number : current_phone_number,
                    school_name : school_input_5,
                    sci_or_art : current_class,
                    score : current_score
                  },
                  success(res){
                    console.log("插入用于排名的voluntary_for_ranking表：",res)
                    wx.redirectTo({
                      url: '/pages/voluntary_output/voluntary_output',
                    })
                  },
                  fail(res){
                    console.log(res)
                  }
                })

              }
              else {
                //这里暂时跑不了，要看看
                console.log("高校不存在")
              }
            },
            fail(res){
              console.log(res)
            }
          })

              }
            }
          })
        }
        else{
          
          console.log("已填写志愿，不能修改咯")
          wx.showModal({
            title: '已填报提醒',
            content: '您已提交过填报结果，是否跳转到查看志愿页面？',
            complete: (res) => {
              if (res.cancel) {
                wx.redirectTo({
                  url: '/pages/user_index/user_index',
                })
              }
          
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/voluntary_output/voluntary_output',
                })
              }
            }
          })
        }
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
    //console.log(getApp().globalData.user_phone_number)
    current_phone_number = getApp().globalData.user_phone_number
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