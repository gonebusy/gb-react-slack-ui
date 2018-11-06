const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: './src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/main.js',
    publicPath: '/'
  },
  devtool: isDevelopment && 'inline-cheap-module-source-map',
  devServer: {
    port: 8080,
    open: true,
    contentBase: path.join(__dirname, './src')
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(jsx|js)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              minimize: !isDevelopment
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browsers: ['last 2 versions']
              },
              sourceMap: isDevelopment,
              plugins: () => [
                autoprefixer
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-bulk-import-loader'
          }
        ]
      },
      {
        test: /\.(ico|pdf)/,
        loader: 'file-loader?name=[name].[ext]',
        include: path.join(__dirname, '/src')
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    /** Since Webpack 4 */
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),

    new CleanWebpackPlugin(['public']),

    new CopyWebpackPlugin([
      { from: 'vendor/**/*', to: 'js/', context: 'src/js/' },
      { from: 'images/**/*', to: './', context: 'src/assets/' }
    ]),

    new HtmlWebpackPlugin({
      title: 'Gone Busy',
      template: 'src/templates/index.hbs',
      minify: !isDevelopment && {
        html5: true,
        collapseWhitespace: false,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: true
      }
    }),

    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true
    })
  ],
  resolve: {
    alias: {
      TweenLite: './node_modules/gsap/src/uncompressed/TweenLite'
    }
  },
  externals: {
    TweenLite: 'TweenLite'
  }
};
