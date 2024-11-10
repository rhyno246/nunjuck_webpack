const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "production",
  optimization: {
    usedExports: true,
    minimizer: [
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
});
