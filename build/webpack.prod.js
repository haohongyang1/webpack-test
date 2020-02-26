const path = require('path')
module.exports = {
    mode: "production",
    // 在生产环境下抽离第三方库，做一个缓存
    optimization: {
        splitChunks: {
            chunks: 'async', // 默认支持异步代码分割，import()，可选：async(默) all inital(只操作同步的)
            minSize: 30000, // 文件超过30K，就会抽离
            minRemainingSize: 0,
            maxSize: 0,
            minChunks: 1, // 最少模块引用一次，抽离
            maxAsyncRequests: 6, // 最多6个请求
            maxInitialRequests: 4, // 最多首屏超过3个请求
            automaticNameDelimiter: '~', // 文件命名
            automaticNameMaxLength: 30, // 最长名字大小
            cacheGroups: { // 缓存组
            defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10 // 优先级
            },
            default: {
                minChunks: 1,
                priority: -20,
                reuseExistingChunk: true
            }
            }
        }
    },
    devServer: {
        port: 4000,
        compress: true, // 使用gzip压缩，提升返回页面速度
        contentBase: path.resolve(__dirname, '../dist')
    }
}