const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = glob.sync(path.resolve('./src/pug/pages/*pug'));

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
            let base = path.basename(file, '.pug');
            return new HtmlWebpackPlugin({
                filename: base + '.html',
                template: path.resolve('./src/pug/pages/' + base + '.pug')
            })
        })
    };
};