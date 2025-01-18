const webpack = require('webpack');

module.exports = {
  // Other webpack configurations...
  plugins: [
    new webpack.DefinePlugin({
      global: 'window',
    }),
  ],
};
