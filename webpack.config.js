const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  entry: {
    main: "./src/main.js",
    index: "./src/pages/index/index.js",
    secondary: "./src/pages/secondary/index.js",
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[hash][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext]",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["main", "index"],
      template: path.resolve(__dirname, "./src/pages/Index/pageIndex.html"),
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["main", "secondary"],
      template: path.resolve(
        __dirname,
        "./src/pages/secondary/pageSecondary.html"
      ),
      filename: "secondary.html",
    }),
    new CleanWebpackPlugin(),
  ],

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
};
