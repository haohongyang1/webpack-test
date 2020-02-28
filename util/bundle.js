// 找到入口文件，分析内容，如果有历来，就拿到依赖路径，转换代码（浏览器里可以运行的）
const path = require("path")
const fs = require("fs")
const parser = require("@babel/parser") // 取得引入source的路径
const traverse = require("@babel/traverse").default // 在ast中抽离主要内容
const {transformFromAst} = require("@babel/core") // 按照规则转换成对应代码

const entry = entryFile => {
    // 拿到入口文件内容
    const content = fs.readFileSync(entryFile, "utf-8")
    // 渠道
    const ast = parser.parse(content, {
        sourceType: "module"
    })
    const dependecies = {} // 保存引入的依赖路径
    traverse(ast, {
        // 以函数的方式来定义在抽象语法树里面拿到的东西
        ImportDeclaration({node}) {
            const dirname = path.dirname(entryFile) // 拿到./src
            const itemPath = "../" + path.join(dirname, node.source.value) // 拿到./src/a-module.js
            dependecies[node.source.value] = itemPath
        }
    })
    const {code} = transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })
    return {
        entryFile,
        dependecies,
        code
    }
}

const info = entry('../src/test.js')

// 分析出所有依赖关系

const Dependecies = entryFile => {
    const info = entry(entryFile)
    const modules = []
    modules.push(info) // 默认进入第一个
    for (let i=0;i<modules.length;i++) {
        const item = modules[i]
        const {dependecies} = item
        if (dependecies) {
            for (let j in dependecies) {
                modules.push(entry(dependecies[j]))
            }
        }
    }
    const obj = {}
    modules.forEach((item) => {
        obj[item.entryFile] = {
            dependecies: item.dependecies,
            code: item.code
        }
    })
    console.log(obj)
    return obj
}
Dependecies('../src/test.js')

// 生成代码，输出文件
const genCode = (entryFile) => {
    const obj = Dependecies("../src/test.js")
    const graph = JSON.stringify(obj)
    const bundle = `(function (graph) {
        function require(module){
            function localRequire(relativePath) {
                return require(graph[module].dependecies[relativePath])
            }
            var export = {}
            (function (require,exports,code) {
                eval(code)
            })(localRequire, exports, graph[module].code)
            return exports
        }
        require(${entryFile})
    }(${graph}))`

    fs.writeFileSync(path.resolve(__dirname, "./dist/main.js", bundle, "utf-8"))
}

genCode("../src/test.js")