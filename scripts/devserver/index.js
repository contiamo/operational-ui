const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const page = process.argv[2]

if (!page) {
  throw new Error('Provide a page name as a CLI argument, e.g. Buttons.')
}

const config = {
  entry: path.resolve(__dirname, 'site.tsx'),
  output: {
    path: path.resolve(__dirname),
    publicPath: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        oneOf: [
          // Documentation snippets
          {
            test: /\.snippet/,
            loader: "raw-loader",
            exclude: /node_modules/
          },
          // All other TS
          {
            test: /.*/,
            loader: "awesome-typescript-loader",
            exclude: /node_modules/
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'contiamo-ui-components': path.resolve(__dirname, '../../packages/ui-components/index.ts'),
      'contiamo-ui-utils': path.resolve(__dirname, '../../packages/utils/index.ts'),
      'react': path.resolve(__dirname, 'node_modules', 'react')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      PAGE_NAME: JSON.stringify(page)
    })
  ]
}

const compiler = webpack(config)
const server = new WebpackDevServer(compiler)

server.listen(3000)