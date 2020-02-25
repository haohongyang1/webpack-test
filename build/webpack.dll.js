/**
 * dll打包第三方库 react和react-dom示例：
 * 执行顺序：本地使用import "react",先去mainfest.json中查找，找到后会加载指定库名对应的文件以及模块，会去dll.js文件中查找
 */
const path = require("path")
const DllPlugin = require("webpack").DllPlugin

module.exports = {
    mode: "development",
    entry: ['react', 'react-dom'],
    output: {
        library: "react",
        // libraryTarget: "var", // 默认var, 可选：var || commonjs || commonjs2 || umd .... 
        filename: 'react.dll.js',
        path: path.resolve(__dirname, "../dll")
    },
    plugins: [
        // 生成一个缓存列表
        new DllPlugin({
            name: 'react',
            path: path.resolve(__dirname, "../dll/mainfest.json")
        })
    ]
}

