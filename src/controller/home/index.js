import homeView from "view/home.art"
import tabbar from "../tabbar"
import "style/home/index.scss"
import {showtimeApi} from "api/home.js"

class Home{
    constructor(){

    }
    init(){
        tabbar.init()
    }
    async render(){
        var data=await showtimeApi()
        console.log(data)
        var html=homeView({data})
        $("#app").append(html)
    }
}

export default new Home