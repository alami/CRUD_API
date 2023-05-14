const path=require("path")
//import path from "path"
module.exports = {
  entry: "./src/index.ts",
  target: "node",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },],
  },
  resolve: {
    extensions: [".ts",".js"],
  },
}