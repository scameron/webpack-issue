const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
// Uncomment this optimization block to force ModuleB into a separate chunk.  Since ModuleB is actually part of "chunk1", you'll
// see "chunk3" get eagerly loaded...
//   optimization: {
//       splitChunks: {
//           cacheGroups: {
//               chunk3: {
//                   name: "chunk3",
//                   test(module) {
//                       return module.nameForCondition() && module.nameForCondition().includes("ModuleB");
//                   },
//                   enforce: true
//               }
//           }
//       }
//   }
};