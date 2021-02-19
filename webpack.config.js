const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

module.exports = (env, argv) => {
  // Set Environment

  const devMode = argv.mode !== 'production';

  // Webpack Config

  return {
    entry: path.resolve(__dirname, 'theme/scripts/layout/theme.js'),
    // Output built assets to the dist folder. Use a hash during production.
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'theme/assets'),
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
      extensions: ['.js', '.css', '.json', '.vue'],
    },
    module: {
      rules: [
        // JS Processing
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            // Babel. Transpiles ES6+ code for older browsers.
            // Present env is a smart preset that auto transpiles syntaxes to their readable versions. References browserlist in package.json to know what environments to support.
            // Transform runtime allows us to work with async/await and some newer functionality. Enables the re-use of Babel's injected helper code to save on codesize.
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime'],
              },
            },
          ],
        },
        // Sass Processing
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // Extract css plugin which creates a css file per JS file that contains CSS.
            { loader: MiniCssExtractPlugin.loader },
            // Translate CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                url: false, // No url processing because all references in css files should be to the root directory. URL processing gets complicated due to MAMP and subfolder setup.
              },
            },
            // Process CSS with Post CSS (Autoprefixing, Minifying, etc). Config for this is found in postcss.config.js
            {
              loader: 'postcss-loader',
            },
            // Compiles Sass to CSS, using Node Sass by default
            { loader: 'sass-loader' },
          ],
        },
        // Apply Vue Loader to any .vue files
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    plugins: [
      // Extracts css into separate files. Creates a CSS file per JS file that contains CSS.
      // Hashing production output to be able to cache bust in production.
      new MiniCssExtractPlugin({
        filename: '[name].min.css',
        chunkFilename: '[id].min.css',
      }),
      // Mac notifications for js or scss errors. In case terminal isn't visible and need to know if something is wrong.
      new WebpackNotifierPlugin(),
      // Provides a way to glob for entry files in Webpack watch and non-watch modes.
      new WebpackWatchedGlobEntries(),
      // Loads and compiles *.vue files to js
      new VueLoaderPlugin(),
    ],
    // Webpack console stats info.
    stats: {
      children: false,
      colors: true,
      errors: true,
      errorDetails: true,
      chunks: false,
      source: false,
      reasons: false,
      entrypoints: devMode ? false : true,
      hash: devMode ? false : true,
      version: devMode ? false : true,
      timings: true,
      assets: devMode ? true : true,
      modules: devMode ? false : true,
      warnings: devMode ? false : true,
      publicPath: devMode ? false : true,
    },
    // Webpack console performance info.
    performance: {
      hints: false,
    },
    // Optimization of bundles.
    optimization: {
      chunkIds: 'named',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
    // Watch options
    watchOptions: {
      // Ignore node_modules folder so the watch mode takes up less CPU.
      ignored: /node_modules/,
    },
  };
};
