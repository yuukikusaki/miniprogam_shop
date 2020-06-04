//Page Object
import { request } from '../../request/index.js';
Page({
    data: {
        // 轮播图数组
        swiperList: [],
        // 导航
        catesList:[],
        // 楼层数据
        floorList:[]
    },
    //options(Object)
    onLoad: function (options) {
        this.getSwiperList();
        this.getCatesList();
        this.getFloorList();
    },

    // 获取轮播图
    getSwiperList(){
        request({ url: "/home/swiperdata" })
        .then(res => {
            if (res.data.meta.status === 200) {
                this.setData({
                    swiperList: res.data.message
                })
            }
        });
    },
    // 获取导航数据
    getCatesList(){
        request({ url: "/home/catitems" })
        .then(res => {
            if (res.data.meta.status === 200) {
                this.setData({
                    catesList: res.data.message
                })
            }
        });
    },
    // 获取楼层数据
    getFloorList(){
        request({ url: "/home/floordata" })
        .then(res => {
            if (res.data.meta.status === 200) {
                this.setData({
                    floorList: res.data.message
                })
            }
        });
    }
});
