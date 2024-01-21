// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  
  let current_location = event.location;
  let current_school_name = event.school_name;
  let current_class = event.class

  return cloud.database().collection("score_2022").where({
    location : current_location,
    school_name : current_school_name,
    sci_or_art : current_class
  }).get();

}

//update gaokaobiao_2021 set sci_or_art = "理科" where sci_or_art = "物理类"
//SELECT sci_or_art,COUNT(*) AS `value` FROM gaokaobiao_2021 GROUP BY sci_or_art ;