// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let top = Number(event.top);
  let buttom = Number(event.buttom);
  let location = event.location;
  let sci_art = event.sci_art;


  return cloud.database().collection("score_2022").where({
    //lowest_ranking: wx.cloud.database().command.gt(top).and(wx.cloud.database().command.lt(buttom)),
    lowest_ranking : _.gt(15000),
    location : location,
    sci_or_art : sci_art
  }).get();

}