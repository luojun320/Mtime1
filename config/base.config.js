//文件夹的作用，开发环境和生存环境中都能用到的配置项

//开发环境和生存环境需要共用的
const path = require('path')
//引入插件。打包自动生成index的html自动引入打包的js文件，安装命令：cnpm install html-webpack-plugin -D
const HtmlWebpackPlugin = require("html-webpack-plugin")
//返回值是一个对象,所以需要结构出来，重新清除文件在生成新的
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin")

const CopyWebpackPlugin = require("copy-webpack-plugin");

//__dirname:当前文件夹的绝对路径 
//path.join:做路径的拼接


//配置路口文件和出口文件地址
//作用：webpack的特点是通过一个入口文件，将入口文件所依赖的所有模块通过node的方式进行打包成一个或者多个模块  就像gulp的管道一样，压缩或者完毕之后进行传输

//PATH、app都是自定义名字
const PATH = {
    //main.js是入口文件;开发环境是一个src文件夹
    app: path.join(__dirname, "../src/main.js"),
    //找第二个路径，build打包，生产环境的路径,为dist文件夹，打包的时候会自动生成dist文件夹，所以不需要创建dist文件夹
    build: path.join(__dirname, "../dist")

}

//配置webpack
module.exports = {
    //入口的配置
    entry: {
        app: PATH.app
    },
    //出口配置
    output: {
        path: PATH.build,
        filename: "[name].js"
    },
    //使用插件配置项
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            title: "SINA:M站开发"
        }),
        new CleanWebpackPlugin(),
        //拷贝静态资源
        new CopyWebpackPlugin([
            {
                context: path.join(__dirname, "../public"),
                //代表多级的意思
                from: "**/*",
                to: path.join(__dirname, "../dist"),
                //忽略文件
                ignore: ["index.html"]
            }
        ])
    ],
    //别名的配置项
    resolve: {
        //文件引入的优先级
        extensions: [".js", "scss", "art", "css", "json"],
        //别名的配置
        alias: {
            "@": path.join(__dirname, "../src"),
            "view": path.join(__dirname, "../src/view"),
            "controller": path.join(__dirname, "../src/controller"),
            "lib": path.join(__dirname, "../src/lib"),
            "router": path.join(__dirname, "../src/router"),
            "style": path.join(__dirname, "../src/style"),
            "api":path.join(__dirname,"../src/api"),
            "model":path.join(__dirname,"../src/model"),
            "utils":path.join(__dirname,"../src/utils")
        }
    },
    //loader的配置  有些文件浏览器无法识别 ，因此我们需要将浏览器不识别的文件转换为浏览器识别的文件
    module: {
        //规则
        rules: [
            {
                //引入非模块化的插件
                test: require.resolve('zepto'),
                //转化成模块的方式
                loader: 'exports-loader?window.Zepto!script-loader'
            },
            //一个对象代表一个规则
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: path.join(__dirname, "../node_modules")
            },
            {
                test: /\.art$/,
                loader: "art-template-loader"
            },
            // 处理图片的loader
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 2048,
                        // name是图片原始的名称  ext是文件的后缀名
                        name: "img/[name].[ext]"
                    }
                },
                exclude: path.join(__dirname, "../node_modules")
            },
            //处理字体的配置项
            {
                test: /\.(woff|woff2|svg|ttf|eot)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "font/[name].[ext]"
                    }
                },
                exclude: path.join(__dirname, "../node_modules")
            }
        ]
    }
}
