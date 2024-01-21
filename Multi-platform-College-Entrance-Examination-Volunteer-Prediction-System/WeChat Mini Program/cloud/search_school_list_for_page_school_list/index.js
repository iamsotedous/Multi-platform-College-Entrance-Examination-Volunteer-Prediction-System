// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

//定义总长
const db = cloud.database()
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await db.collection('school_list').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []

  let current_flag_for_985 = event.flag_for_985;
  let current_flag_for_211 = event.flag_for_211;
  let current_flag_for_double = event.flag_for_double;
  let current_flag_for_all = event.flag_for_all;
  let current_school_class = event.school_class;

  if(current_flag_for_all == 1){
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('school_list').where({
        class : current_school_class
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  }

  else if(current_flag_for_double == 1){
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('school_list').where({
        class : current_school_class,
        is_double_first_class : "双一流"
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  }

  else if(current_flag_for_211 == 1){
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('school_list').where({
        class : current_school_class,
        is_211 : 211
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  }

  else if(current_flag_for_985 == 1){
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('school_list').where({
        class : current_school_class,
        is_985 : 985
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  }

  else return "?"

  // for (let i = 0; i < batchTimes; i++) {
  //   const promise = db.collection('school_list').where({
  //     score : 600
  //   }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
  //   tasks.push(promise)
  // }
  // // 等待所有
  // return (await Promise.all(tasks)).reduce((acc, cur) => {
  //   return {
  //     data: acc.data.concat(cur.data),
  //     errMsg: acc.errMsg,
  //   }
  // })
}