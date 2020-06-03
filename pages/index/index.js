//Page Object
import { request } from '../../request/index.js'
Page({
    data: {
        // 轮播图数组
        swiperList: []
    },
    //options(Object)
    onLoad: function (options) {
        request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
            .then(res => {
                if (res.data.meta.status === 200) {
                    this.setData({
                        swiperList: res.data.message
                    })
                }
            });

    },
});
