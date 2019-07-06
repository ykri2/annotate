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
        path: helpers.root('build'),
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
              {
                test: /\.(jpg|png)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: "[path][name].[hash].[ext]",
                  },
                },
              },
      
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

/** 


{
    test: /\.(jpg|png)$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 25000,
      },
    },
  }

  *****/