const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const Dotenv = require('dotenv-webpack');
const json5 = require("json5");
const fs = require('fs');
require('dotenv').config();


const languages = [
  { code: 'en', path: require('./src/lang/en.js') },
  { code: 'vi', path: require('./src/lang/vi.js') },
];

module.exports = {
  performance: { hints: false },
  stats: {
    children: true,
  },
  entry: {
    app :{
      import: "./src/js/app.js",
      filename: "js/app.[contenthash].js",
    },
    index: {
      import: "./src/js/index.js",
      filename: "js/index.[contenthash].js",
    },
    about : {
      import: "./src/js/about.js",
      filename: "js/about.[contenthash].js",
    }
  },
  output: {
    path: `${__dirname}/dist`,
    clean: true
  },
  plugins: [
    new Dotenv({
       path: './.env',
       safe : true
    }),
    ...languages.map(lang => {
      return new HtmlWebpackPlugin({
        template: "./src/views/pages/index.njk",
        inject: "body",
        chunks: ["app" , "index"],
        filename: `${lang.code}/index.html`,
        templateParameters : {
          APP_NAME : process.env.APP_NAME,
          SITE_LINK : process.env.SITE_LINK,
          lang : lang.path
        },
      });
    }),
    ...languages.map(lang => {
      return new HtmlWebpackPlugin({
        template: "./src/views/pages/about.njk",
        inject: "body",
        chunks: ["app" ,"about"],
        filename: `${lang.code}/about.html`,
        templateParameters : {
          APP_NAME : process.env.APP_NAME,
          SITE_LINK : process.env.SITE_LINK,
          lang : lang.path
        }
      });
    }),
    new HtmlWebpackPlugin({
      // default lang when run server
      template: './src/views/pages/index.njk',
      filename: 'index.html',  
      inject: "body",
      chunks: ["app" ,"index"],
      templateParameters: {
        APP_NAME : process.env.APP_NAME,
        SITE_LINK : process.env.SITE_LINK,
        lang : require('./src/lang/vi.js')
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new ImageMinimizerWebpackPlugin({
      minimizerOptions: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
        ],
      },
    }),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.njk$/,
        use: [
          {
              loader: 'simple-nunjucks-loader',
              options : {
                assetsPaths: [
                  './src/img'
                ],
                searchPaths: [
                  './src/views/layout',
                  './src/views/components'
                ]
              }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        generator: {
          filename: "fonts/[name][ext]",
        },
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  devServer: {
    hot: true,
    port: 3000
  },
};
