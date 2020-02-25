// webpack默认支持模块写法；commonjs 规范
// es6 规范
// let result = require('./a-module.js')
// console.log(result)
// webpack webpack-cli 进行打包
// 或者 npx webpack --mode development 使用npx执行node_modules/.bin/webpack文件

// 引入样式文件test-----------------------------------^.^-------------------------------
// loader配置-test
// import './index.css'
// 预处理器-test
// import './a.scss'
// babel-test -----------------------------------^.^-------------------------------
// class A {
//     a = 1
//     constructor() {
//         this.name = '111'
//     }
// }

// console.log(()=>{1})

// 3、CDN加载文件test-----------------------------------^.^-------------------------------
// import $ from 'jquery' // 如果使用这种打包方式，会将整个jquery放入出口文件(bundle.js)中，会非常庞大，所以我们使用cdn配置方式
// console.log($)

// 4、去除无用js代码test-----------------------------------^.^-------------------------------
// import config from './a-module'
// console.log(config)


// 5、DllPlugin配置test-----------------------------------^.^-------------------------------
// import React from 'react'
// import { render } from 'react-dom'
// render('<h1>hello</h1>', document.getElementById('app'))


// 6、动态加载test-----------------------------------^.^-------------------------------
// 固定加载
// import calc from './calc'
let button = document.createElement('button')
button.addEventListener('click', () => {
    // 草案语法 动态导入 类比 路由懒加载 import语法
    // 原理是JSONP
    import(/* webpackChunkName:'111' */'./calc').then(data => {
        console.log(data)
    })
    console.log('click')
})

button.innerHTML = '点我'
document.body.appendChild(button)