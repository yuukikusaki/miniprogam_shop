import { request } from '../../request/index.js';

// pages/category/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单
    leftMenuList: [],
    // 右侧商品
    rightContent: [],
    currentIndex:0,
    // 右侧滚动条
    scrollTop: 0
  },
  // 接口返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates();
    } else {
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(item => item.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      }
    }
  },

  // 获取分类数据
  getCates() {
    request({
      url: "/categories"
    }).then(res => {
      if (res.statusCode === 200) {
        this.Cates = res.data.message;
        wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });

        let leftMenuList = this.Cates.map(item => item.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      }

    })
  },

  // 左侧点击事件
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      rightContent,
      currentIndex:index,
      scrollTop: 0
    });
  }
})