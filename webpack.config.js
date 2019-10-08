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
                },
                {
                    test: /\.(png|svg|jpe?g)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: 'images/[name].[hash:7].[ext]',
                                publicPath: './'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'file-loader'
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

