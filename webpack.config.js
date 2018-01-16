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
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader",
          options: { minimize: true },
        }, {
          loader: "sass-loader",
        }],
        fallback: "style-loader",
      }),
    }, {
      test: /\.js$/,
      use: {
        loader: "babel-loader",
        options: { presets: ["es2015", "stage-0", "react"] },
      }
    }, {
      test: /\.jpg$/,
      use: ["file-loader", "image-webpack-loader"],
    }],
  },
  plugins: [
    extractSass
  ],
};
