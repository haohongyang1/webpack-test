const path = require('path')
const AddCdnPlugin = require("add-asset-html-cdn-webpack-plugin")
const DllReferencePlugin = require("webpack").DllReferencePlugin
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")

module.exports = {
    mode: "development",
    plugins: [
        new DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/mainfest.json')
        }),
        new AddCdnPlugin({
            filepath: path.resolve(__dirname, '.././dll/react.dll.js')
        }),
        new BundleAnalyzerPlugin()
    ]
}