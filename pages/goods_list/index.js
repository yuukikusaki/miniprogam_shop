import { request } from '../../request/index.js';

Page({
  /**
    * 页面的初始数据
    */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goods_list:[]
  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  getGoodsList() {
    request({ url: "/goods/search",data:this.QueryParams }).then(res => {
      if (res.data.meta.status === 200) {
        const total = res.data.message.total;
        this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
        const { goods } = res.data.message;
        this.setData({
          goods_list:[...this.data.goods_list,...goods]
        });
      }
    });
    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  },

  // 标题点击事件 
  handleTabsItemChange(e) {
    const { index } = e.detail;
    const { tabs } = this.data;
    tabs.map((item, i) => i === index ? item.isActive = true : item.isActive = false);
    this.setData({ tabs });
  },

  // 滚动条触底
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({title: '没有下一页数据'});
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新
  onPullDownRefresh(){
    this.setData({
      goods_list:[]
    });
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }
})