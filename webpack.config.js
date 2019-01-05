const $ = require('load-webpack-plugins')();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const autoprefixer = require('autoprefixer');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: './src/js/main.js'
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'js/main.js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: false
  },
  cache: dev,
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    hot: dev,
    historyApiFallback: dev
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      { // js uses babel and eslint
        test: /\.(jsx|js)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png)/,
        loader: 'file-loader?name=images/[name].[ext]',
        include: path.join(__dirname, '/src')
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['svg-react-loader']
      },
      {
        test: /\.(html)$/,
        use: ['html-loader']
      },
      {
        test: /\.(ico|pdf)/,
        loader: 'file-loader?name=[name].[ext]',
        include: path.join(__dirname, '/src')
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      { // compile scss with css loader, postcss loader, and sass loader
        test: /\.scss/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: !dev,
              url: true
            }
          },
          {
            loader: 'clean-css-loader',
            options: {
              format: 'beautify'
            }
          },
          {
            loader: 'group-css-media-queries-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-bulk-import-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/scss/shared.scss'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractCssChunks({
      hot: dev,
      filename: 'css/[name].css'
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),

    new CleanWebpackPlugin(['public']),

    new CopyWebpackPlugin([
      { from: 'vendor/**/*', to: 'js/', context: 'src/js/' },
      { from: 'images/**/*', to: './', context: 'src/assets/' }
    ]),

    new $.HtmlPlugin({
      title: 'Gone Busy',
      template: 'src/templates/index.hbs',
      minify: !dev && {
        html5: true,
        collapseWhitespace: false,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: false
      }
    }),

    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true
    }),

    new $.HotModuleReplacementPlugin(),
    new $.NamedModulesPlugin()
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
