const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/popupIndex.js', // Entry point for your popup script
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'popup.bundle.js' // Output bundle
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/popupIndex.html', // Use popupIndex.html as the template
      filename: 'popup.html', // Output filename
      chunks: ['popupIndex'] // Ensure only the popup chunk is included
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '', globOptions: { ignore: ['**/popupIndex.html'] } },
      ],
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve from 'dist' directory
    },
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: {
      index: '/popup.html' // Ensure DevServer serves 'popup.html'
    }
  }
};
