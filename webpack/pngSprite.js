const {resolve, join} = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
const OPT = require('./config');

module.exports = () => {
    return {
        plugins: [
            new SpritesmithPlugin({
                src: {
                    cwd: resolve(join(OPT.images, 'pngIcons/')),
                    glob: '*.png'
                },
                target: {
                    image: resolve(join(OPT.images, 'sprite.png')),
                    css: [
                        [resolve(join(OPT.scss, 'utils', 'png', '_mixin.scss')), {format: 'mixin'}],
                        [resolve(join(OPT.scss, 'utils', 'png', '_icons.scss')), {format: 'icons'}]
                    ]
                },
                apiOptions: {
                    cssImageRef: "~sprite.png"
                },
                spritesmithOptions: {
                    padding: 2,
                },
                customTemplates: {
                    mixin: resolve(join(OPT.scss, 'utils', 'png', 'mixin.handlebars')),
                    icons: resolve(join(OPT.scss, 'utils', 'png', 'icons.handlebars'))
                }
            })
        ]
    }
};