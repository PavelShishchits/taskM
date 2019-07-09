const sass = require('sass');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const inlinesvg = require('postcss-inline-svg');
const postcsssvgo = require('postcss-svgo');
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
                                    inlinesvg(),
                                    postcsssvgo(),
                                    mqpacker({
                                        sort: sortCSSmq.desktopFirst
                                    }),
                                    autoprefixer()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: sass,
                                data: '@import "./src/scss/data";'
                            }
                        }
                    ]
                }
            ]
        }
    };
    if (isProduction) {
        config.optimization = {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
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