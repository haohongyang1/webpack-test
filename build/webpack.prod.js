const path = require('path')
module.exports = {
    mode: "production",
    devServer: {
        port: 4000,
        compress: true, // 使用gzip压缩，提升返回页面速度
        contentBase: path.resolve(__dirname, '../dist')
    }
}