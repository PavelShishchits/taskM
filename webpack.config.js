const webpack = require('webpack');
const {join} = require('path');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

// modules
const OPT = require('./webpack/config');
const sass = require('./webpack/sass');
const pug = require('./webpack/pug');
const favicon = require('./webpack/favicon');
const fonts = require('./webpack/fonts');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const devserver = require('./webpack/devserver');
const svgSprite = require('./webpack/svgSprite');
const pngSprite = require('./webpack/pngSprite');

const commonConfig = (argv) => {
  const {mode} = argv;
  return merge([
    {
      entry: {
        app: join(__dirname, OPT.src, 'index.js')
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            app: {
              chunks: "initial",
              minChunks: 2
            },
            vendor: {
              test: /node_modules/,
              chunks: "initial",
              name: "vendor",
              priority: 10,
              enforce: true
            }
          }
        }
      },
      output: {
        filename: mode === 'production' ? './js/[name].min.js' : './js/[name].js',
        path: join(__dirname, OPT.dist)
      },
      resolve: {
        modules: ['node_modules', 'images']
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }),
        new WriteFilePlugin({
          writeToDisk: true
        }),
        new CopyWebpackPlugin ([ //copy all images
          {
            from: { glob: './src/components/**/img/*.*'},
            to: './images',
            flatten: true
          },
        ]),
        new CopyWebpackPlugin ([ //copy all svg icons included in scss files
          {
            from: { glob: './src/components/**/svgCss/*.*'},
            to: '../src/images/svgCss',
            flatten: true
          },
        ])
      ]
    },
    pug(),
    fonts(),
    images(argv),
    babel(),
    sass(argv),
    svgSprite(),
    pngSprite(),
    favicon()
  ])
};

module.exports = ((env, argv) => {
  const {mode} = argv;
  if (mode === 'production') {
    return merge([
      {
        plugins: [
          new CleanWebpackPlugin()
        ]
      },
      commonConfig(argv),
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
// toDo open webpack analyzer by separate command (2)

// forms
// toDo datepicker (4)
// toDo input[file] (4)
// toDo input[number] (ui-spinner) (4)

// bootstrap modules
// toDo add tabs-menu
