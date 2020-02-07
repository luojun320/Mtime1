import mineView from "view/mine.art"
import tabbar from "../tabbar"


class Mine{
    constructor(){

    }
    init(){

        tabbar.init()
    }
    render(){
        var html=mineView()
        $("#app").append(html)
    }
}

export default new Mine