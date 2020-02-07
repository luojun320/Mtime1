import Router from "lib/router"
import home from "controller/home/index.js"
import ticket from "controller/ticket/index.js"
import shopping from "controller/shopping/index.js"
import discover from "controller/discover/index.js"
import mine from "controller/mine/index.js"

const router=new Router({
    mode:"hash",
    routes:[
        {
            path:"/",
            template:home
        },
        {
            path:"/ticket",
            template:ticket
        },
        {
            path:"/shopping",
            template:shopping
        },
        {
            path:"/discover",
            template:discover
        },
        {
            path:"/mine",
            template:mine
        },

    ]
})

window.router=router

export default router