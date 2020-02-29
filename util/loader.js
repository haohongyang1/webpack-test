// 实现一个loder
/**
 * loader: "[path]",
 * options: {}
 */
const utils = require("loader-utils")
module.exports = function(source) {
    // 不能用箭头函数，需要正确的this指向
    let contents = source // 接收到需要匹配的内容
    contents.replace("loader", "my_loader")
    const options = utils.getOptions(this) // 获得options选项
    
    return this.callback(null, contents)
}

