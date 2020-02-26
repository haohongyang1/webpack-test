const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const path = require('path')
const merge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')
const glob = require("glob")

module.exports = (env) => {
    console.log(env)
    let bDev = env.development
    const base = {
        // entry: path.resolve(__dirname, '../src/index.js'),
        entry: {
            "a": path.resolve(__dirname, "../src/a.js"),
            "b": path.resolve(__dirname, "../src/b.js")
        },
        module: {
            // 转化什么文件，用什么去转，使用哪些loader
            // loader文件写法 [](从右向左) || {} || ''
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(jpe?g|png|gif)/,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                        {
                            // 这样配置可以在使用之前file-loader之前对图片进行压缩
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                  progressive: true,
                                  quality: 65
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: { // 拼接压缩
                                  enabled: false,
                                },
                                pngquant: {
                                  quality: [0.65, 0.90],
                                  speed: 4
                                },
                                gifsicle: {
                                  interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                  quality: 75
                                }
                              }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        bDev?'style-loader':MiniCssExtractPlugin.loader, {
                            loader: 'css-loader',
                            options: { // 给loader传递参数
                                importLoaders: 2 // 代表后面参数: sass-loader
                            }
                        },
                        'postcss-loader', 
                        'sass-loader']
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        },
        // 在生产环境下抽离第三方库，做一个缓存
        optimization: {
            splitChunks: {
              chunks: 'async', // 默认支持异步代码分割，import()，可选：async(默) all inital(只操作同步的)
              minSize: 30000, // 文件超过30K，就会抽离
            //   minRemainingSize: 0,
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
        output: {
            filename: '[name].js',
            chunkFilename: '[name].min.js', // [name]从0开始，逐个增长，如果再美化，可以在引入位置通过魔术字符串来定义
            // publicPath: '../dist', // 在webpack-dev-server里使用，如果不配置，默认为/root
            path: path.resolve(__dirname, '../dist')
        },
        externals: {
            'jquery': '$' // 引入外部变量，在使用$时，是从外部引入的jq，不去打包代码中的jquery
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/main.css'
            }),
            new PurgecssWebpackPlugin({
                paths: glob.sync(`./src/**/*`,  { nodir: true }), // 在这些文件下都使用代码检查
            }),
            new CleanWebpackPlugin(), // 每次打包前先清除dist文件夹下文件
            // 多入口配置
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'), // 选择生成的模板html文件
                filename: 'index.html',
                chunks: ['a'],
                minify: !bDev && {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true // 是否折叠行
                }
            }),
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'),
                filename: "login.html",
                chunksSortMode: 'manual', // 指定模板中引入文件的顺序
                chunks: ['b', 'a'] // 指定模板中的引入文件
            }),
            // new AddCdnPlugin([
            //     {
            //         'jquery': 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'
            //     },
            //     {
            //         filepath: path.resolve(__dirname, '../dll/react.dll.js')
            //     }
            // ]),
        ]
    }
    if (bDev) {
        return merge(base, dev) // merge 循环后面的配置，定义到前面
    } else {
        return merge(base, prod)
    }
}