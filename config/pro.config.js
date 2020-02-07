
//文件的作用：只是生产环境中用到的配置项
const path=require("path");
const baseConfig=require("./base.config");
const webpackMerge=require("webpack-merge");
//抽离css文件，放在dist文件夹下
const ExtractTextWebpackplugin=require("extract-text-webpack-plugin")
const config = webpackMerge(baseConfig, {
    //生产环境的配置项
    mode: "production",
    devtool:"cheap-module-source-map",
    module: {
        rules: [
            {
                //scss浏览器不支持  需要安装
                test: /\.(css|scss)$/,
                //css抽离
                use:ExtractTextWebpackplugin.extract({
                    //解析css 和sass  postcss 用来加浏览器的前缀
                    use:[
                        {loader:"css-loader"},
                        {loader:"postcss-loader"},
                        {loader:"sass-loader"}
                    ],
                    //将页面中的style进行转成css
                    fallback: "style-loader",
                }),
                exclude:path.join(__dirname,"../node_modules")
            }
        ]
    },
    //打包出来的文件，名为hash值前八
    plugins:[
        new ExtractTextWebpackplugin({
            filename:"css/[name].[hash:8].css"
        })
    ]
})

module.exports = config;