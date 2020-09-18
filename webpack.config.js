/**
 * Created by grovekingli on 2019/9/27.
 */

const path = require('path');
const HtmlPlugins = require('html-webpack-plugin');

module.exports = function(env,argv){

    env = env?env:{development:true},
    console.log(env);
    return {
        entry:path.resolve(__dirname,'./src/index'),
        module: {
            rules: [
                {
                    test: /\.css$/i, use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader'
                    }
                ]
                },
                {
                    test: /\.js$/i, use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    },
                }
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'imgs/',
                            publicPath: 'dist/imgs/',
                            limit:4*1024
                        }

                    }
                }

            ]
        },
        plugins: [
            new HtmlPlugins({
                template: path.resolve(__dirname, './index.html'),
            })
        ],
        ...env.production?require('./config/webpack.production'):require('./config/webpack.development'),
    }
}

/*
const path = require('path');
const HtmlPlugins = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i, use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader'
                }
            ]
            },
            {
                test: /\.js$/i, use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                },
            }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'imgs/',
                        publicPath: 'dist/imgs/',
                        limit:4*1024
                    }

                }
            }

        ]
    },
    plugins: [
        new HtmlPlugins({
            template: path.resolve(__dirname, './index.html'),
        })
    ]
};
*/
