const {resolve, basename, join} = require('path');
const glob = require('glob');
const OPT = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = glob.sync(resolve(join(OPT.pug, 'pages', '*.pug')));

module.exports = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: '\t',
                    }
                }
            ],
        },
        plugins: pages.map((file) => {
            let base = basename(file, '.pug');
            return new HtmlWebpackPlugin({
                filename: base + '.html',
                template: resolve(join(OPT.pug, 'pages', base + '.pug'))
            })
        })
    };
};