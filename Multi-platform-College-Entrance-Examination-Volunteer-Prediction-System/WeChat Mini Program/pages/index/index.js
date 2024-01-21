// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    user_phone_number : "",
    showUploadTip: false,
    powerList: [{
      title: '院校库',
      tip: '包含院校简介、排名等信息',
      showItem: false,
      item: [{
        title: '院校列表',
        page: 'school_list/school_list'
      }
    ]
    }, {
      title: '专业库',
      tip: '包含专业排名信息',
      showItem: false,
      item: [{
        title: '学校专业排名',
        page: 'major_ranking/major_ranking'
      }, {
        title: '大类专业排名',
        page: 'class_ranking/class_ranking'
      }
    ]
    }, {
      title: '分数信息',
      tip: '包含分数线及一分一段表信息',
      showItem: false,
      item: [
      {
        title: '历年分数线',
        page: 'score_line/score_line'
      },
      {
        title: '一分一段表',
        page: 'table_for_score_and_ranking/table_for_score_and_ranking'
      }
    ]
    }, {
      title: '智能推荐',
      tip: '根据位次数据提供专业推荐服务',
      showItem: false,
      item: [{
        title: '学校/专业推荐',
        page: 'major_recommendation/major_recommendation'
      },{
        title: '热门学校/专业',
        page:'popular_major/popular_major'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },

  //对title为111的项展开进行加载
  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '111' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      //貌似是跳转到云端服务器的网页
      //url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
      //跳转到本地pages下的页面，不能跳tabbar上的页面
      url: `/pages/${e.currentTarget.dataset.page}`
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },

  onLoad(options) {
    //console.log(getApp().globalData.global_is_admin)
    //首先确定这个是不是管理员
    this.setData({
      user_phone_number : getApp().globalData.user_phone_number
    })
  },
});
