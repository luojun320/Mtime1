import discoverView from "view/discover.art"
import tabbar from "../tabbar"


class Discover{
    constructor(){

    }
    init(){
        
        tabbar.init()
    }
    render(){
        var html=discoverView()
        $("#app").append(html)
    }
}

export default new Discover