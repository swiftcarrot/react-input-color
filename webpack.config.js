module.exports = {
  entry: './example/app.js',
  output: {
    path: __dirname + '/builds',
    filename: 'app.js',
    publicPath: "/builds/",
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: "jsx-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }
    ]
  },
  devtool: "source-map"
};