const { merge } = require('webpack-merge')
const commonConfig = require('./config/webpack.common')

module.exports = env => {
  const envFile = env.dev ? 'dev' : 'prod'
  const envConfig = require(`./config/webpack.${envFile}.js`) // eslint-disable-line global-require
  const mergedConfig = merge(commonConfig, envConfig)

  return mergedConfig
}
