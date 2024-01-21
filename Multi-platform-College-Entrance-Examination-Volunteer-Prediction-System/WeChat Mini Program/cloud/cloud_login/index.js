// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {

  let current_login_phone_number = event.login_phone_number;
  let current_login_password = event.login_password;
  //let if_password_correct = false;

  return  cloud.database().collection("user").where({
    phone_number : current_login_phone_number,
    password : current_login_password
  }).count()

}