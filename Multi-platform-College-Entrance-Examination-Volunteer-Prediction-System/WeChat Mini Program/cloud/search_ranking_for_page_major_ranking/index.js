// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let function_type = event.type;
  let current_school_name = event.school_name;
  let current_major_class = event.major_class;

  if(function_type == "based_on_school"){
    return  cloud.database().collection("school_major_ranking").where({
      school_name : current_school_name,
    })
    .orderBy("ruanke_ranking","asc")
    .get()
  }
  else if(function_type == "based_on_class"){
    return  cloud.database().collection("school_major_ranking").where({
      major_class : current_major_class,
    })
    .orderBy("ruanke_ranking","asc")
    .get()
  }
}