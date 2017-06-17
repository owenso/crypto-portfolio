const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname, 'app/src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'app/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'app'),
                loader: 'eslint-loader',
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'app/src'),
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|png|jpg|svg|[ot]tf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 25000
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        port: 3000,
        compress: true,
        hot: true,
        stats: 'minimal',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'CryptoCurrency',
            minify: {
                collapseWhitespace: true
            },
            template: 'app/templates/index.ejs'
        }),
        new ExtractTextPlugin({
            filename: 'app.js',
            disable: true,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};