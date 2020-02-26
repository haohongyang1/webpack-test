<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [WEBPACK](#webpack)
  - [一、从0搭建自己的webpack开发环境](#%E4%B8%80%E4%BB%8E0%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84webpack%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)
    - [1.什么是Webpack](#1%E4%BB%80%E4%B9%88%E6%98%AFwebpack)
    - [2.初始化项目](#2%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE)
    - [3.Webpack快速上手](#3webpack%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)
    - [4.Webpack-dev-server](#4webpack-dev-server)
    - [5.打包html插件](#5%E6%89%93%E5%8C%85html%E6%8F%92%E4%BB%B6)
    - [6.清空打包结果](#6%E6%B8%85%E7%A9%BA%E6%89%93%E5%8C%85%E7%BB%93%E6%9E%9C)
  - [二、 Webpack中必须要掌握的配置](#%E4%BA%8C-webpack%E4%B8%AD%E5%BF%85%E9%A1%BB%E8%A6%81%E6%8E%8C%E6%8F%A1%E7%9A%84%E9%85%8D%E7%BD%AE)
  - [三、 Webpack打包优化（打包大小、打包速度、模块拆分）](#%E4%B8%89-webpack%E6%89%93%E5%8C%85%E4%BC%98%E5%8C%96%E6%89%93%E5%8C%85%E5%A4%A7%E5%B0%8F%E6%89%93%E5%8C%85%E9%80%9F%E5%BA%A6%E6%A8%A1%E5%9D%97%E6%8B%86%E5%88%86)
    - [1、压缩+删除无用代码；](#1%E5%8E%8B%E7%BC%A9%E5%88%A0%E9%99%A4%E6%97%A0%E7%94%A8%E4%BB%A3%E7%A0%81)
    - [2、CDN加载文件；](#2cdn%E5%8A%A0%E8%BD%BD%E6%96%87%E4%BB%B6)
    - [3、Tree-shaking(webpack自带) && Scope-hoistiong](#3tree-shakingwebpack%E8%87%AA%E5%B8%A6--scope-hoistiong)
    - [4、DllPlugin && DllReferencePlugin](#4dllplugin--dllreferenceplugin)
    - [5、动态加载；](#5%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD)
    - [6、打包文件分析工具 && 费时分析](#6%E6%89%93%E5%8C%85%E6%96%87%E4%BB%B6%E5%88%86%E6%9E%90%E5%B7%A5%E5%85%B7--%E8%B4%B9%E6%97%B6%E5%88%86%E6%9E%90)
    - [7、SplitChunks；](#7splitchunks)
    - [8、热更新；](#8%E7%83%AD%E6%9B%B4%E6%96%B0)
    - [9、IgnorePlugin；](#9ignoreplugin)
    - [10、noParse；](#10noparse)
    - [11、resolve；](#11resolve)
    - [12、include/exclude；](#12includeexclude)
    - [13、happypack；](#13happypack)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


### WEBPACK

#### 一、从0搭建自己的webpack开发环境
##### 1.什么是Webpack
- 静态模块打包器
- 功能：
    -   代码转换；
    -   文件优化；在生产环境不会压缩JS、CSS....
    -   代码分割；提取多个页面的公共代码，提取首屏不需要执行部分让其异步加载
    -   模块合并；模块化的项目里会有多个模块和文件，需要构建功能把模块分类合并成一个文件
    -   自动刷新；监听本地更改并刷新页面
    -   代码校验；提交到git仓库前校验代码
    -   自动发布；自动构建线上发布代码并传输给发布系统

##### 2.初始化项目

 - npm init -y // 生成package.json文件
- npm install webpack webpack-cli --save-dev // 生成node_modules文件夹
- webpack-cli --mode 可以解析传递参数
##### 3.Webpack快速上手
- 打包：
    - webpack webpack-cli // 默认读取根目录下的src文件夹
    -  npx webpack
- 开发环境development && 生产环境 production；可以在package.json中进行脚本配置
- 打包入口和出口的个性化配置，webpack.config.js
- 配置拆分：通过参数判断当前环境，加载指定配置文件；
    - 合并配置文件：npm install webpack-merge
- 生产环境默认打包配置
##### 4.Webpack-dev-server
启动本地服务，使用webpack-dev-server，npm install webpack-dev-server在内存中打包，不会产生实体文件；
devServer配置；
##### 5.打包html插件
使用html-webpack-plugin自动生成html文件并且引入打包后的js内容；
##### 6.清空打包结果
使用clean-webpack-plugin ，在每次打包之前都清除dist文件下的目录；

#### 二、 Webpack中必须要掌握的配置

- 解析CSS ：需要强调一下**loader的执行顺序，默认是从下往上执行，从右边向左边**
    - css-loader：解析css语法
    - style-loader：将解析的css变成style标签，插入到页面中
- css预处理器 .scss node-sass sass-loader .less less-loader ... 
    - 安装：npm install node-sass sass-loader；
    - 配置：rules
    ```
    // 注意在a.css文件中再通过@import引入a.sass文件的配置方式
        use: ['style-loader', {
            loader: 'css-loader',
            options: { // 给loader传递参数
                importLoader: 1 // 代表后面参数: sass-loader
            }
        }, 'sass-loader']
    ```
- css样式兼容自动填充前缀
    - postcss-loader ，查找有兼容性要求的css属性
    - autoprefixer，自动填充ms-|| webpack-...前缀
    - mini-css-extract-plugin， 抽离css样式文件，抽离的好处是 **css文件可以和js并行加载**
- 解析图片+icon
    - file-loader，配置图片格式匹配
    ```
    {
        test: /\.(jpe?g|png|gif)$/,
        use:'file-loader'
    }
    ```
    
- js
    - @babel/core @babel/preset-env babel-loader，
        - 用法：babel-loader 默认调用 @babel-core 会转化代码，转化的时候需要用 @babel/presets-env 转化成es5
        - 作用：es6->es5  && 不是es6语法（装饰器、类的属性） && 草案语法 ...
        - 避免js代码 重用：@babel/plugin-transform-runtime
        - ts配置：@babel-preset-typescript
        ```
        type State = Readonly<typeof initState> // 把initState中的属性拿出来变成只读的
        ```
    - terser-webpack-plugin，压缩js文件
- react+vue...
- 多入口配置
实践：入口配置为对象，出口配置多个HTMLWebpackPlugin，通过 chunks 属性定义好对应的入口文件


#### 三、 Webpack打包优化（打包大小、打包速度、模块拆分）


##### 1、压缩+删除无用代码；

- 压缩css mini-css-extract-plugin
- 删除无用css样式 [purgecss-webpack-plugin](
https://www.npmjs.com/package/purgecss-webpack-plugin)
- 查找匹配文件 [glob](
https://www.npmjs.com/package/glob)
- 图片压缩插件(降低分辨率 ) [image-webpack-loader](
https://www.npmjs.com/package/image-webpack-loader)

##### 2、CDN加载文件；
- 意义：webpack打包出来的都会放到bundle.js（出口文件）中，bundle.js会非常庞大，所以我们引入CDN，**拆分bundle.js**
- 使用：[bootcnd](https://www.bootcdn.cn/)，找到插件，复制script标签，粘贴进模板文件中，但是当文件较多时，不能都在index.html中引入，所以可以使用 [add-asset-html-cdn-webpack-plugin](https://www.npmjs.com/package/add-asset-html-cdn-webpack-plugin) 插件 
```
plugins: [
    new AddCdnPlugin(true, {
        'jquery': 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'
    })
]
```
- 配置：声明外部文件
```
externals: {
    'jquery': '$' // 引入外部变量，在使用$时，是从外部引入的jq，不去打包代码中的jquery
}
```

##### 3、Tree-shaking(webpack自带) && Scope-hoistiong
- Tree-shaking
    - 作用：去除掉js无用代码； 
    - 适用范围：默认只支持 es6语法，静态导入，只在生产环境使用；
    - 需要注意的是：通过import引入的可执行文件代码，但是并未真实使用，需要在package.json中配置：**"sideEffects": true,** l（注意该种办法的副作用：如果引入css文件：import 'a.css'，也会被去除），可以根据需要指定文件类型：
    ```
      "sideEffects": [
        "**/*.css" // glob语法
      ]
    ```
- Scope-hoistiong（自带）
    - 作用：由于webpack打包的每个模块都会生成一个函数，会导致内存过大，所以，引入scope-hoistiong，作用域提升，减少作用域

##### 4、DllPlugin && DllReferencePlugin
- [DllPlugin 动态链接库](https://www.webpackjs.com/plugins/dll-plugin/) 某种方法实现了**拆分 bundles**，同时还大大**提升了构建的速度（对项目运行优化没有帮助）**
    - 打包第三方库
    - 配置：/root/build/webpack.dll.js
    注：可以通过指定libraryTarget 来决定导出方式（导出方式即图中所示）
    ![c36bb3e60b33093cbc166c3eab574c12.png](en-resource://database/428:1)
- [DllReferencePlugin](https://www.webpackjs.com/plugins/dll-plugin/) 在项目中可以找到 上一步打包好的dll中的指定文件；
```
    new DllReferencePlugin({
    manifest: path.resolve(__dirname, '../dll/mainfest.json')
    })
```
##### 5、动态加载；
- 草案语法：**import()**
    - 使用：动态导入，可以实现**代码分割**，应用在类比、路由懒加载...;
    - 原理：**JSONP**;
    - 语法：返回值为Promise对象；
- 为动态加载的文件更改文件名的配置：chunkFilename + 魔术字符串


##### 6、打包文件分析工具 && 费时分析

- 打包分析工具：[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) 可以分析打包依赖关系，以及包的大小
- 第三方库抽离，不同于dll这个是做缓存：生产环境下，将第三方库进行抽离：[optimization.splitchunks](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks)
- 费时分析：[speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin) 


**小记**
**DllPlugin与Optimization.splitChunks的区别**

| 区别比较 | 是否优化页面加载速度？ | 执行时机 | 建议使用场景|
| --- | --- | --- | --- |
| **DllPlugin** | 否 | 构建之前抽离 |开发环境提升打包速度 |
| **Optimization.splitChunks** | 是 | 编译过程中抽离 | 生产环境分割第三方代码|


##### 7、SplitChunks；

##### 8、热更新；

##### 9、IgnorePlugin；


##### 10、noParse；
##### 11、resolve；
##### 12、include/exclude；
##### 13、happypack；
[happypack](https://www.npmjs.com/package/happypack)多线程打包，将不同的逻辑交给不同的线程来处理


