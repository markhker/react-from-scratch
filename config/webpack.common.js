const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')
const commonPaths = require('./commonPaths')

const resolveJsconfigPathsToAlias = ({ jsconfigPath = '../jsconfig.json' } = {}) => {
  const { paths } = require(jsconfigPath).compilerOptions // eslint-disable-line global-require
  const aliases = {}

  Object.keys(paths).forEach(item => {
    const key = item.replace('/*', '')
    const value = resolve(commonPaths.projectRoot, paths[item][0].replace('/*', ''))

    aliases[key] = value
  })

  return aliases
}

console.log(resolveJsconfigPathsToAlias())

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    presets: ['@babel/env'],
  },
}

const config = {
  entry: `${commonPaths.appEntry}/index.tsx`,
  output: {
    path: commonPaths.outputPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [babelLoader],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          {
            loader: require.resolve('ts-loader'),
            options: { transpileOnly: true },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/],
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs', '*'],
    symlinks: false,
    cacheWithContext: false,
    alias: resolveJsconfigPathsToAlias(),
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    emitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new Dotenv({
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      // favicon: 'public/favicon.ico',
    }),
  ],
}

module.exports = config
