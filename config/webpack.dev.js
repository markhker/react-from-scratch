const webpack = require('webpack')

const PORT = process.env.PORT || 3040

const config = {
  mode: 'development',
  output: {
    filename: '[name].[contenthash].js',
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    host: 'localhost',
    disableHostCheck: true,
    port: PORT,
    historyApiFallback: true,
    noInfo: false,
    hot: true,
    open: false,
    stats: 'minimal',
  },
}

module.exports = config
