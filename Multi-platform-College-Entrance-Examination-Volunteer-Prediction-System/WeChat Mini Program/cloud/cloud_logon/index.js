// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  
  let current_logon_phone_number = event.logon_phone_number;
  let current_logon_password = event.logon_password;
  let current_logon_name = event.logon_name;
  let current_is_admin = (event.logon_verification == "wx469dd95ec7a5248a" ? 1 : 0);

  cloud.database().collection("user").add({
    data:{
      phone_number : current_logon_phone_number,
      password : current_logon_password,
      name : current_logon_name,
      is_admin : current_is_admin
    },
    success(res){
      return res;
    },
    fail(res){
      return res;
    }
  })
}