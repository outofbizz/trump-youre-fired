ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
});

module.exports = {
  entry: {
    "index": "./src/index.js",
    "styles": "./src/styles.scss",
  },
  output: {
    path: __dirname + "/lib",
    filename: "[name].bundle.js",
    publicPath: "/lib/",
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader",
          options: { minimize: true },
        }, {
          loader: "sass-loader",
        }],
        fallback: "style-loader"
      }),
    }],
  },
  plugins: [
    extractSass
  ],
};
