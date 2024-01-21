// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let function_type = event.type;
  let current_location = event.location;
  let current_class = event.class;

  if(function_type == "ranking"){
    return  cloud.database().collection("database_list").where({
      class : current_class,
      location : current_location
    }).get()
  }

  else if(function_type == ""){

  }
}