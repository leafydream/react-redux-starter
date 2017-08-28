const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port = 8000;

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'react'],
                        plugins: [
                            ['import', [{ libraryName: 'antd', style: 'css'}]]
                        ]
                    },
                },
                include: path.resolve(__dirname, 'src')
            },
            {
                // 当前项目，启用CSS modules
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[path][name]-[local]-[hash:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        broswers: ['last 5 versions']
                                    })
                                ]
                            }
                        }
                    ]
                })
            },
            {
                // 依赖库，禁用CSS modules
                test: /\.css$/,
                include: path.resolve(__dirname, 'node_modules'),
                exclude: path.resolve(__dirname, 'src'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        broswers: ['last 5 versions']
                                    })
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 3,
                                localIdentName: '[path][name]-[local]-[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        broswers: ['last 5 versions']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 3,
                                localIdentName: '[path][name]-[local]-[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        broswers: ['last 5 versions']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/images/[name].[hash:5].[ext]'
                },
            },
            {
                test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/[name].[hash:5].[ext]',
                    limit: 10000,
                },
            }
        ]
    },
    devServer: {
        hot: true,
        compress: true,
        inline: true,
        stats: { colors: true },
        port: port
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.json'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/static/index.html',
            title: 'react example',
            inject: 'body',
            chunks: ['main'],
        }),
        new ExtractTextPlugin({
            filename: 'assets/css/[name].[chunkhash:8].css'
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:' + port
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.DefinePlugin({
            '__DEV__': JSON.stringify(process.env.NODE_ENV == 'development') || 'false'
        })
    ]
};