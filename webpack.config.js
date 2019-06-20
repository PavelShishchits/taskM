const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
      }
    },
    pug(),
    images(),
    babel()
  ])
};

module.exports = ((env, argv) => {
  const {mode} = argv;
  if (mode === 'production') {
    return merge([
      commonConfig(argv),
      {
        plugins: [
          new CleanWebpackPlugin()
        ]
      },
      sassbuild()
    ])
  } else if (mode === 'development') {
    return merge([
      commonConfig(argv),
      devserver(),
      sass(),
      {
        devtool: 'eval-sourcemap',
      }
    ])
  }
});