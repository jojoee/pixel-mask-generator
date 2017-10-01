const path = require('path')

module.exports = {
  devtool: 'none',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: 'pmg',
    libraryTarget: 'umd'
  }
}
