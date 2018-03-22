var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        // new webpack.optimize.CommonsChunkPlugin('common'),
        new HtmlWebpackPlugin({
            title: "g2-demo",
            filename: 'index.html',
            template: './src/index.html', //Load a custom template 
            // chunks:['common.js']
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    entry: {
        app: path.resolve(__dirname, './src/app.js'),
        // common:['react', 'g2']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
        //filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.less/,
                use: ['style', 'css', 'less']
            },
            {
                test: /\.css$/,
                use: ['style', 'css']
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: ['url']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.scss', '.less', 'jsonp']
    }
};