// 引入节流
import {throttle} from "utils/tool.js"

export default class BScroll{
    constructor(container,options){
        // 获取需要滚动的盒子
        this.container=$(container);
        console.log(this.container)
    }
    // 上拉加载更多
    pullingUp(callback,timeout){
        // 给需要滚动的盒子加一个滚动事件
        // console.log(this.container.scrollHeight)
        console.log($("body").scrollTop())
        console.log(this.container.scrollTop())
        this.container.on("scroll",this.pullingUpHandlerCb.bind(this,callback,timeout))
        // this.container.on("tap",this.pullingUpHHH.bind(this))
        // this.container.scroll(function(){
        //     console.log(11111)
        // })
    }
    // pullingUpHHH(){
    //     console.log("点击")
    // }
    pullingUpHandlerCb(callback,timeout){
        console.log(111)
        // 回调函数是用户需要执行的业务逻辑
        throttle(callback,timeout)
    }
}