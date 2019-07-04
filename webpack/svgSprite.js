module.exports = () => {
    return {
        module: {
            rules: [
                {
                    test: /(svg).*\.svg$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader'
                        },
                        'svgo-loader'
                    ]
                }
            ]
        }
    }
};