const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let DEBUG;

process.env.NODE_ENV === "production" ? (DEBUG = false) : (DEBUG = true);

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: DEBUG ? "bundle.js" : "bundle.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.scss$/,
        loaders: DEBUG
          ? [
              "style-loader",
              "css-loader?sourceMap",
              "sass-loader?sourceMap",
              "postcss-loader"
            ]
          : ExtractTextPlugin.extract("css-loader!sass-loader!postcss-loader")
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: "file-loader?name=images/[name].[ext]"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true
    // proxy: {
    //   "/v1/*": {
    //     target: "https://api.coinmarketcap.com",
    //     secure: false
    //   }
    // }
  },
  plugins: [
    new ExtractTextPlugin("style.css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: "../index.html",
      filename: "index.html"
    })
  ]
};
