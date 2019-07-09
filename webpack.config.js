const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

// modules
const sass = require('./webpack/sass');
const pug = require('./webpack/pug');
const favicon = require('./webpack/favicon');
const fonts = require('./webpack/fonts');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const devserver = require('./webpack/devserver');
const svgSprite = require('./webpack/svgSprite');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

const commonConfig = (argv) => {
  const {mode} = argv;
  return merge([
    {
      entry: {
        app: path.join(PATHS.src, 'index.js')
      },
      output: {
        filename: mode === 'production' ? './js/[name].min.js' : './js/[name].js',
        path: PATHS.dist
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ]
    },
    pug(),
    fonts(),
    images(argv),
    babel(),
    sass(argv),
    svgSprite()
  ])
};

module.exports = ((env, argv) => {
  const {mode} = argv;
  if (mode === 'production') {
    return merge([
      {
        plugins: [
          new CleanWebpackPlugin(),
          new BundleAnalyzerPlugin()
        ]
      },
      commonConfig(argv),
      favicon()
    ])
  } else if (mode === 'development') {
    return merge([
      commonConfig(argv),
      devserver(),
      {
        devtool: 'eval-sourcemap'
      }
    ])
  }
});

// todos
// toDo svg icon generator (investigate if it is possible to generate css file with icons viewboxes)
// toDo png icon generator
// toDo detectors (isIe, js-on)
// toDo setUp base components (breadcrumbs, forms)
// toDo find why mqpacker sort mediaqeuries wrong