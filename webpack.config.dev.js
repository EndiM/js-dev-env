const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    bundle: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      path.resolve(__dirname, "src/index")
    ]
  },
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: "/",
    filename: "[name].js"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: "src/index.html",
    })

  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          "style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
}
