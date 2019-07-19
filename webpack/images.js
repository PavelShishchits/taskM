const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = (argv) => {
    const {mode} = argv;
    const isProduction = mode === 'production';

    const config = {
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new WriteFilePlugin({
                writeToDisk: true
            }),
            new CopyWebpackPlugin ([
                {
                    from: { glob: './src/components/**/img/*.*'},
                    to: './images',
                    flatten: true
                },
            ])
        ],
    };

    if (isProduction) {
        config.module.rules[0].use = [...config.module.rules[0].use, {
            loader: 'image-webpack-loader',
            options: {
                mozjpeg: {
                    progressive: true,
                    quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                    enabled: false,
                },
                pngquant: {
                    quality: '65-90',
                    speed: 4
                },
                gifsicle: {
                    interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                    quality: 75
                }
            }
        }]
    }

    return config;
};