import axios from "utils/request.js"

//https://m.mtime.cn/Service/callback-mall.mi/PageSubArea/MarketFirstPageNew.api?t=202024214242964
export const shoppingApi=()=>axios({
    method:"get",
    url:"/Mtime/Service/callback-mall.mi/PageSubArea/MarketFirstPageNew.api?t=202024214242964",
})


// https://m.mtime.cn/Service/callback-mall.mi/ECommerce/RecommendProducts.api?t=202026945423673&goodsIds=108795%2C100476%2C107731&pageIndex=1
export const goodsApi=({t,goodsIds,pageIndex})=>axios({
    method:"get",
    url:"/Mtime/Service/callback-mall.mi/ECommerce/RecommendProducts.api",
    data:{
        t,
        goodsIds,
        pageIndex
    }
})