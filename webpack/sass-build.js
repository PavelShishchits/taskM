const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
    return {
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        },
                        'css-loader',
                        'sass-loader',
                    ],
                }
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].min.css',
                chunkFilename: 'css/[id].css',
            })
        ]
    };
};