// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {

  let function_type = event.type;
  let current_login_phone_number = event.login_phone_number;
  let current_change_name = event.change_name;
  //let if_password_correct = false;

  //判断是否有该手机号对应的账号
  if(function_type == "number"){
    return  cloud.database().collection("user").where({
    phone_number : current_login_phone_number,
  }).count()
  }

  //判断手机号与名字是否对应
  else if(function_type == "number_and_name"){
    return cloud.database().collection("user").where({
      phone_number : current_login_phone_number,
      name : current_change_name
    }).count()
  }

  else if(function_type == "search_id"){
      return cloud.database().collection("user").where({
        phone_number : current_login_phone_number
      }).get()
    }

}