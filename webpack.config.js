const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {    
    target: 'web',
    
    entry: {
        main: ['./src/app.jsx']
    },        
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },

    devtool: 'source-map',
    debug: true,
    postcss: () => [autoprefixer],

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
                /*loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style',
                    loader: 'css?less!postcss'
                })*/                
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),        
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })

        //new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true})        
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.less']        
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

     externals: {
        // Use external version of React
        "react": "React",
        "react-dom": "ReactDOM"
    },


    devServer: {
        contentBase: './build',
        port: 8080,
        hot: true
    },

}