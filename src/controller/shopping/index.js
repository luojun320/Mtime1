import shoppingView from "view/shopping.art"
import shoppingListView from "view/shoppingList.art"
import tabbar from "../tabbar"
import "style/shopping/index.scss"
import "style/shoppingList/index.scss"
import {shoppingApi} from "api/shopping.js"
import Swiper from "@/common/swiper/index.js"
import {goodsApi} from "api/shopping.js"
import BScroll from "../../common/bscroll/index.js"


class Shopping{
    constructor(){
        this.t=202026945423673
        this.sortData={
            t:202026945423673,
            goodsIds:108795,
            pageIndex: 1
        }
    }
    init(){

        tabbar.init()
    }
    async render(){
        var data=await shoppingApi()
        // var goods=await goodsApi(this.t)
        // console.log(goods)
        var html=shoppingView({data})
        $("#app").append(html)

        //轮播图
        new Swiper(".banner")
        this.goodsRender()

        // this.goodsBox=$(".goods")
    }
    async goodsRender(){
        var goods=await goodsApi(this.t)
        console.log(goods)
        var html=shoppingListView({goods})
        $("#shopping").append(html)

        //上拉加载更多
        this.scroll=new BScroll(".goods")
        // console.log(this.scroll)
        this.scroll.pullingUp(function(){
            console.log(111)
        },300)
    }
}

export default new Shopping