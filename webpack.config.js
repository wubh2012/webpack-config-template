const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const APPDIR = 'src/';

module.exports = env => {
  console.log('mode', env.mode) // development, production
  const devMode = env.mode !== 'production';
  return {
    mode: env.mode,
    entry: {
      app: './src/index.js',
    },
    devtool: 'source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    output: {
      filename: devMode ? '[name].js' : '[name].[hash:8].js',
      chunkFilename: devMode ? '[id].js' : '[id].[hash:8].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [{
          test: /\.css|.scss|.sass$/,
          use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode,
              },
            },
            'css-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        }      
      ]
    },
    plugins: [
      // 清理 dist
      new CleanWebpackPlugin(),
      // 热部署
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, APPDIR, 'index.html'),
        filename: 'index.html',
        inject: 'body',
      }),
      // 独立css文件
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash:8].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash:8].css',
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true
            }
          }],
        },
        canPrint: true
      })
    ],
  }
};