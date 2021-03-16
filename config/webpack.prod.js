const TerserPlugin = require('terser-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const config = {
  mode: 'production',
  output: {
    filename: 'static/[name].[contenthash].js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      name: false,
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
      typescript: {
        enabled: true,
        memoryLimit: 4096,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
}

module.exports = config
