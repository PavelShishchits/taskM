const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ((env, argv) => {
  return {
    mode: 'production',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: [
          argv['mode-production'] ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  }
});