/**
 * 用法：
 * plugins: [
 *  new MyPlugin()
 * ]
 * 插件是什么？
 * 可以作用于webpack打包的整个周期中；做一些
 */
class MyPlugin{
    constructor(options) {
        this.options = options
    }
    apply(compiler) { // compiler包含了打包过程中的每个时间钩子
        // 同步 无回调
        conpiler.hooks.compile.tap("plugin", (compilation) => {
            console.log("我是同步的")
        })
        // 异步 有回调
        // test-在输出目录放入一个.txt文件
        compiler.hooks.emit.tapAsync("plugin", (compilation, cb) => {
            compilation.assets['hhy.txt'] = {
                source: () => {
                    return '我是一个测试文本'
                },
                size: ()=> {
                    return 1024
                }
            }
            cb()
        })

        
    }
}
module.exports = MyPlugin