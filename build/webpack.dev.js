const path = require('path')
const AddCdnPlugin = require("add-asset-html-cdn-webpack-plugin")
const DllReferencePlugin = require("webpack").DllReferencePlugin
// const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer") // 打包分析工具
const {HotModuleReplacementPlugin} = require("webpack")

module.exports = {
    mode: "development",
    plugins: [
        new DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/mainfest.json')
        }),
        new AddCdnPlugin({
            filepath: path.resolve(__dirname, '.././dll/react.dll.js')
        }),
        // new BundleAnalyzerPlugin(),
        new HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 4000,
        compress: true, // 使用gzip压缩，提升返回页面速度
        contentBase: path.resolve(__dirname, '../dist') // 给服务器指定访问文件的入口，实际上访问的是内存中的
    }
}