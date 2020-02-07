// class Router{
//     constructor(options){
//         // 路由配置项
//         this.$options=options;
//         // 路由的形式，当用户传递了路由形式就用用户传递过来的，如果没有的话就用hash
//         this.$mode=this.$options.mode || "hash";
//         // 路由表
//         this.$routes=this.$options.routes || []
//         // 定义初始的hash值
//         this.current="/"
//         this.mapRouters={};
//         this.flag=true;
//         //获取路由传值的对象
//         this.$route={
//             query:{},
//             path:"/"
//         }
//         this.init()
//     }
//     init(){
//         // 监听路由的变化事件
//         this.isMode();
//         // 获取路由表对象
//         this.bindEvent()
//         //将路由表转换为路由对象
//         this.mapRoutersEvent()
//         // 渲染对应的页面
//         this.randerTemplate()
//     }
//     isMode(){
//         console.log(111)
//         if (!window.sessionStorage.getItem("mode") && this.$mode === "hash") {
//             window.location.href = window.location.origin + "#/";
//             window.sessionStorage.setItem("mode", "hash")
//         }
//         // if(!window.sessionStorage.getItem("mode") && this.$mode==="hash"){
//         //     console.log(222)
//         //     //定义hash路由
//         //     console.log(window.location.origin)
//         //     window.location.href=window.location.origin+"#/";
//         //     window.sessionStorage.setItem("mode","hash")
//         // }
//     }
//     bindEvent(){
//         //页面第一次加载进来的时候也需要监听路由变化
//         window.addEventListener("load",this.bindEventHandler.bind(this))
//         if(this.$mode==="hash"){
//             // 监听hash值改变的事件
//             window.addEventListener('hashchange',this.bindEventHandler.bind(this))
//         }else if(this.$mode==="history"){
//             // 前进后退改变页面的渲染
//             window.addEventListener('popState',this.bindEventHandler.bind(this))
//         }
//     }
//     bindEventHandler(e){
//         if(this.$mode==="hash"){
//             let hash=window.location.hash.split("?")[0].slice(1) || "/";
//             this.current=hash
//         }else if(this.$mode==="history"){
//             let hash = e.state || "/";
//             this.current = hash
            
//         }

//         this.getQuery()
//         this.randerTemplate()
//     }
//     mapRoutersEvent(){
//         this.$routes.forEach((item)=>{
//             //console.log(this.mapRouters) /list: {path: "/list", template: "list"}
//             this.mapRouters[item.path]=item
//         })
        
//     }
//     randerTemplate(){
//         if(this.$mode==="history"){
//             this.current=window.sessionStorage.getItem("path")
//         }
//         var template=this.mapRouters[this.current].template
//         template.render()
//     }
//     // 路由跳转
//     push(path){
//         if(this.$mode==="hash"){
//             window.location.href=path
//         }else if(this.$mode==="history"){
//             window.history.pushState(path,"",path)
//             this.current=path.split("?")[0];
//             sessionStorage.setItem("path",this.current)
//             this.getQuery()
//             this.randerTemplate()
//         }
//     }
//     //获取路由参数
//     getQuery(){
//         var href=window.location.href
//         var obj=href.substr(href.indexOf("?")+1).split("&").reduce(function(prev,item){
//             let key=item.split("=")[0]
//             let val=item.split("=")[1]
//             prev[key]=val
//             return prev
//         },{})
//         this.$route.query=obj
//     }
// }

// export default Router




import router from "../router"
import tabbar from "controller/tabbar/index.js"
class Router {
    constructor(options) {
        //路由配置项
        this.$options = options;
        //路由的形式  当用户传递了路由的形式就用用户传递过来的  如果没有则默认是hash
        this.$mode = this.$options.mode || "hash";
        //路由表
        this.$routes = this.$options.routes || [];
        //定义初始的hash值
        this.current = "/";
        //路由表对象
        this.mapRoutes = {}; 

        //定义tabber的显示
        this.flag=true

        //获取路由传值得对象
        this.$route = {
            query: {},
            path:"/"
        }


        //初始化事件
        this.init();
    }
    init() {
        //判断hash路由还是history
        this.isMode();
        //1、监听路由变化的事件
        this.bindEvent();
        //2、处理路由表
        this.mapRoutesEvent();
        //3、渲染对应的页面
        // this.randerTemplate();
    }
    isMode() {
        //定义hash路由
        if (!window.sessionStorage.getItem("mode") && this.$mode === "hash") {
            window.location.href = window.location.origin + "#/";
            window.sessionStorage.setItem("mode", "hash")
        }

    }
    bindEvent() {
        //页面第一次加载进来的时候也需要监听路由变换
        window.addEventListener("load", this.handleBindEventSucc.bind(this))
        if (this.$mode === "hash") {
            //监听hash值改变的事件
            window.addEventListener("hashchange", this.handleBindEventSucc.bind(this))
        } else if (this.$mode === "history") {
            window.addEventListener("popState", this.handleBindEventSucc.bind(this))
        }

    }
    //hash值改变后要做的事情
    handleBindEventSucc(e) {
        if (this.$mode === "hash") {
            //获取到hash值
            let hash = window.location.hash.split("?")[0].slice(1) || "/";
            this.current = hash;

        } else if (this.$mode === "history") {
            //有点小问题
            let hash = e.state || "/";
            this.current = hash;
        }
        
        //获取query传值
        this.getQuery()
        //这里也需要调用渲染页面的函数，
        this.randerTemplate();


    }
    //将路由表转换为路由对象
    mapRoutesEvent() {
        this.$routes.forEach((item) => {
            this.mapRoutes[item.path] = item;
        })
    }
    //渲染
    randerTemplate() {

        if(this.$mode == "history"){
            this.current = window.sessionStorage.getItem("path");
        }
        // this.$route.path = this.current;
        //获取mapRoutes中template: "home"的值home
        var template = this.mapRoutes[this.current].template;
        if(this.flag){
            tabbar.init();
            this.flag=false
        }

        $("#footer").siblings().remove()
        //页面的跳转，调用template中的render的方法
        
        template.render();
    
    }
    //路由跳转
    push(path) {

        if (this.$mode === "hash") {
            window.location.hash = path;
        } else if (this.$mode == "history") {
            window.history.pushState(path, "", path);
            this.current = path.split("?")[0];
            sessionStorage.setItem("path",this.current);
            console.log(this.current)
            this.getQuery();
            this.randerTemplate();
        }

    }
    //获取路由参数
    getQuery() {
        var href = window.location.href;
        var obj = href.substr(href.indexOf("?") + 1).split("&").reduce(function (prev, item) {
            let key = item.split("=")[0];
            let val = item.split("=")[1];
            prev[key] = val;
            return prev;
        }, {})

        this.$route.query = obj;

    }
    back(){
        window.history.back();
    }
}
export default Router;