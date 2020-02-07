import tabbarView from "view/tabbar.art"
import "style/tabbar/index.scss"
import router from "../../router"

class Tabbar{
    constructor(){
        this.data=[
            {
                text:"首页"
            },
            {
                text:"购票"
            },
            {
                text:"商城"
            },
            {
                text:"发现"
            },
        ]
        this.activeIndex=0

    }
    init(){
        this.render()
    }
    render(){
        var html=tabbarView({data:this.data})
        $("#app").append(html)
        this.eachTabbar()
        this.mineTabbar()
        this.homeTabbar()
    }
    eachTabbar(){
        this.ali=$("#header>ul>li")
        var hash=window.location.hash.slice(1)
        switch(hash){
            case "/":
                this.activeIndex=0
                break
            case "/ticket":
                this.activeIndex=1
                break
            case "/shopping":
                this.activeIndex=2
                break
            case "/discover":
                this.activeIndex=3
                break
        }
        if(hash!=="/mine"){
            this.ali.eq(this.activeIndex).addClass("active").siblings().removeClass("active")
        }
        this.ali.each(this.eachTabbarHandler.bind(this))
    }
    eachTabbarHandler(index){
        this.ali.eq(index).on("tap",this.eachTabbarHandlerCb.bind(this,index))
    }
    eachTabbarHandlerCb(index){
        switch(index){
            case 0:
                router.push("/")
                break
            case 1:
                router.push("/ticket")
                break
            case 2:
                router.push("/shopping")
                break
            case 3:
                router.push("/discover")
                break
            case 4:
                router.push("/mine")
                break
        }
        this.ali.eq(index).addClass("active").siblings().removeClass("active")

    }
    mineTabbar(){
        $(".header_mine").on("click",this.mineTabbarHandler.bind(this))
    }
    mineTabbarHandler(){
        router.push("/mine")
        this.ali.removeClass("active")
    }
    homeTabbar(){
        $(".main-logo").on("click",this.homeTabbarHandler.bind(this))
    }
    homeTabbarHandler(){
        router.push("/")
        this.ali.eq(0).addClass("active").siblings().removeClass("active")

    }
}

export default new Tabbar