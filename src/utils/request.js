export default (options)=>{
    //返回的是一个promis，成功之后调用success里面的函数，利用请求回来的数据
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:options.method || "GET",
            url:options.url,
            data:options.data,
            headers:options.headers || {},
            success:function(data){
                resolve(data);
            },
            error:function(err){
                reject(err)
            }
        })
    })
}
