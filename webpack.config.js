// 语法是COMMONJS
// webpack配置可以导出对象和函数（函数要求返回文件）


// const path = require('path') // node中的path模块
// module.exports = {
//     mode: "development", // 模式配置
//     // 入口 出口
//     // entry: './src/index.js' // 避免本文件更改存储目录而导致的找不到index.js问题，所以要采用绝对路径
//     entry: path.resolve(__dirname, './src/index.js'),
//     output: {
//         filename: 'bundle.js', // 出口文件名
//         path: path.resolve(__dirname, 'dist') // 出口文件存储位置
//     }
// }

// module.exports = (env) => {
//     console.log(env)
// }