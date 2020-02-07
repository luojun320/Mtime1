import axios from "utils/request.js"

export const showtimeApi=()=>axios({
    method:"get",
    url:"/Mtime/Service/callback.mi/Showtime/LocationMovies.api?locationId=290&t=2020241617197852",
})

