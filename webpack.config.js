/*
 * Copyright 2025 Dragonfruit AI
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Webpack configuration and federation settings for your custom federated App.
 *
 * This configuration enables Module Federation to expose the root/main App component,
 * allowing it to be dynamically loaded by Dragonfruit AI's Launchpad system.
 *
 * The config is optimized for development but should be adapted for production use
 * (e.g., setting mode to 'production', enabling optimizations).
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  /** Entry point for the application during local development. */
  entry: './src/dev.tsx',
  /** Development mode enables debugging; switch to 'production' for optimized builds. */
  mode: 'development',
  /** Configuration for the Webpack development server. */
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8500,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  /** Rules for processing and loading different file types. */
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
          plugins: ['babel-plugin-styled-components'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: ['file-loader'],
      },
    ],
  },
  /** Plugins to extend Webpack functionality. Enable federated module loading. */
  plugins: [
    new ModuleFederationPlugin({
      /* !!! TODO: change the name of your app to your company plus app purpose, e.g. dragonfruitVehicleManagerApp !!! */
      name: 'exampleApp',
      /* How your app is exposed */
      filename: 'remote.js',
      exposes: {
        './App': './src/App',
      },
      /** Shared dependencies to prevent duplication in the host app. Must agree on versions. */
      shared: {
        'react': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'styled-components': { singleton: true, eager: true, requiredVersion: '^6.0.0' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/dev_index.html',
    }),
  ],
};