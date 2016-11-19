const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'source-map',
    debug: true,
    postcss: () => [autoprefixer],
    entry: {
        main: ['./src/app.js']
    },
    target: 'web',
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                 loaders: [
                'style',
                'css',
                'less',
                'postcss'
                ]
                /*loaders: ExtractTextPlugin.extract({
                    fallbackLoader: 'style',
                    loader: 'css?less!postcss'
                })*/
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),        
        new HtmlWebpackPlugin({
            template: './index.html'
        })

        //new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true})        
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },


    devServer: {
        contentBase: './build',
        port: 8080,
        hot: true
    },

}