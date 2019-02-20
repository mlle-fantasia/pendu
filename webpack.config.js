const path = require('path');

const webpack = require('webpack');

let config =
{
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename : 'index.js',
        publicPath : '/dist'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module:{
        rules:[
            {
               test: /\.ts/,
                loader: 'ts-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    plugins: [
        webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: JSON.stringify(webpack.env.NODE_ENV)
            }
        })
    ]
};