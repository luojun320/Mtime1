import ticketView from "view/ticket.art"
import tabbar from "../tabbar"


class Ticket{
    constructor(){

    }
    init(){
        
        tabbar.init()
    }
    render(){
        var html=ticketView()
        $("#app").append(html)
    }
}

export default new Ticket