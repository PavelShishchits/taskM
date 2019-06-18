const path = require('path');
const merge = require('webpack-merge');
const sass = require('./webpack/sass');
const sassbuild = require('./webpack/sass-build');
const pug = require('./webpack/pug');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const devserver = require('./webpack/devserver');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

const commonConfig = merge([
  {
    entry: {
      app: path.join(PATHS.src, 'index.js')
    },
    output: {
      filename: '[name].js',
      path: PATHS.dist
    }
  },
  pug(),
  images(),
  babel()
]);

module.exports = ((env, argv) => {
  if (argv.mode === 'production') {
    return merge([
      commonConfig,
      sassbuild()
    ])
  } else if (argv.mode === 'development') {
    return merge([
      commonConfig,
      devserver(),
      sass(),
      {
        devtool: 'eval-sourcemap',
      }
    ])
  }
});