const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // o production
    entry: './src/main.js',

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
           filename: 'index.html',
           template: 'src/index.html',
        }),
    ], 

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        static: './dist',
    },

    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader',
            ],
        },
        ],
    },
 
 
};
