const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const helpers = require('./config/helpers')

const NODE_ENV = process.env.NODE_ENV;
const devMode = NODE_ENV === "production";

module.exports = {

    entry: {
        'app': [
            helpers.root('src/index.js')
        ]
    },

    output: {
        path: helpers.root('dist'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.json', '.css', '.scss', '.html'],
        alias: {
            'app' : 'src/index',
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },

    plugins: [

        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),

        new HtmlWebPackPlugin({
            template: helpers.root('/public/index.html'),
            inject: 'body'
        }),

        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),

    ]

}