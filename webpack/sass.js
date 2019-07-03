const sass = require('sass');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (argv) => {
    const {mode} = argv;
    const isProduction = mode === 'production';

    let config = {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        isProduction ? {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        } : 'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    autoprefixer(),
                                    mqpacker()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: sass,
                                data: '@import "./src/scss/globUtils/style";'
                            }
                        }
                    ]
                }
            ]
        }
    };
    if (isProduction) {
        config.optimization = {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        };
        config.plugins = [
            new MiniCssExtractPlugin({
                filename: 'css/[name].min.css',
                chunkFilename: 'css/[id].css',
            })
        ];
    }
    return config;
};