module.exports = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                               [
                                   '@babel/preset-env',
                                   {
                                       useBuiltIns: 'usage',
                                       corejs: 3,
                                       modules: false
                                   }
                               ]
                            ],
                        }
                    }
                }
            ],
        },
    };
};