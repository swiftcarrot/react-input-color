module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'react-input-color.js',
    library: 'InputColor',
    publicPath: "/builds/",
  },
  externals: {
    "react": "React"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }
    ]
  },
  devtool: "source-map"
};