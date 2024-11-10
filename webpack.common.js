const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const Dotenv = require('dotenv-webpack');
const json5 = require("json5");
const fs = require('fs');
require('dotenv').config();


const languages = [
  { code: 'en', path: './src/lang/en.json' },
  { code: 'vi', path: './src/lang/vi.json' },
];

module.exports = {
  performance: { hints: false },
  stats: {
    children: true,
  },
  entry: {
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
      const langData = JSON.parse(fs.readFileSync(lang.path, 'utf8'));
      return new HtmlWebpackPlugin({
        template: "./src/views/pages/index.njk",
        inject: "body",
        chunks: ["index"],
        filename: `${lang.code}/index.html`,
        templateParameters : {
          APP_NAME : process.env.APP_NAME,
          SITE_LINK : process.env.SITE_LINK,
          lang : langData
        },
      });
    }),
    ...languages.map(lang => {
      const langData = JSON.parse(fs.readFileSync(lang.path, 'utf8'));
      return new HtmlWebpackPlugin({
        template: "./src/views/pages/about.njk",
        inject: "body",
        chunks: ["about"],
        filename: `${lang.code}/about.html`,
        templateParameters : {
          APP_NAME : process.env.APP_NAME,
          SITE_LINK : process.env.SITE_LINK,
          lang : langData
        }
      });
    }),
    new HtmlWebpackPlugin({
      // default lang when run server
      template: './src/views/pages/index.njk',
      filename: 'index.html',  
      inject: "body",
      chunks: ["index"],
      templateParameters: {
        APP_NAME : process.env.APP_NAME,
        SITE_LINK : process.env.SITE_LINK,
        lang : JSON.parse(fs.readFileSync('./src/lang/vi.json', 'utf8'))
      },
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
      'process.env.APP_ENV': JSON.stringify(process.env.APP_NAME)
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
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader", "sass-loader",
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
        test: /\.(jpe?g|png|gif|svg)$/i,
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
