const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = () => {
    return {
        plugins: [
            new SpritesmithPlugin({
                src: {
                    cwd: path.resolve('./src/images/pngIcons/'),
                    glob: '*.png'
                },
                target: {
                    image: path.resolve('./src/images/sprite.png'),
                    css: [
                        [path.resolve('./src/scss/utils/png/_mixin.scss'), {format: 'mixin'}],
                        [path.resolve('./src/scss/utils/png/_icons.scss'), {format: 'icons'}]
                    ]
                },
                apiOptions: {
                    cssImageRef: "~sprite.png"
                },
                spritesmithOptions: {
                    padding: 2,
                },
                customTemplates: {
                    mixin: path.resolve('./src/scss/utils/png/mixin.handlebars'),
                    icons: path.resolve('./src/scss/utils/png/icons.handlebars')
                }
            })
        ]
    }
};