//文件的作用：只是开发环境中用到的配置项
const baseConfig=require("./base.config")
const webpackMerge=require("webpack-merge");
const path=require("path");

//合并，相当于ES6中Object.assign({},{})
const config=webpackMerge(baseConfig,{
    //设置node，作用：当前的环境;警告，当前环境是开发环境,警告就没有了
    mode:"development",
    devtool:"cheap-module-eval-source-map",

    //配置css
    module:{
        rules:[
            {
                //scss浏览器不支持  需要安装
                test:/\.(css|scss)$/,
                //cssloader的执行顺序，从右到左，从下到上
                use:["style-loader","css-loader","sass-loader"],
                exclude:path.join(__dirname,"../node_modules")
                
            }
        ]
    },
    //前端有前端服务器，实现前后端分离，搭建开发服务器
    devServer:{
        //开启浏览器，服务器自动打开
        open:true,
        //端口号
        port:3200,
        historyApiFallback:{
            rewrites: [{
                from: /.*/g,
                to: '/index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
            }]
        },
        //代理
        // proxy:{
        //     "/Service":{
        //         target:"https://m.mtime.cn",
        //         changeOrigin:true
        //     }
        // }
        proxy:{
            ////https://app2.motie.com/h5/channels/106  中的/h5,单你请求的地址以/h5开头的时候，就会将请求的地址代理到motie的https://app2.motie.com地址中，，，模式相当于key value值键值对的形式存在的
            "/Mtime":{
                target:"https://m.mtime.cn",
                //允许跨域代理
                changeOrigin:true,
                pathRewrite:{
                    //统一路径
                    //https://app2.motie.com/api/books/156198/detail  ===> https://app2.motie.com/books/156198/detail
                    "^/Mtime":""
                }
            }
        }
    }
})

module.exports=config;