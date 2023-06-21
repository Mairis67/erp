const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        // entries
    },
    // cache: false,
    output: {
        path: path.resolve(__dirname, '../static'),
        filename: '[name]/bundle.js',
        hashFunction: 'md5'
        //output: { hashFunction: 'md5' }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    // Cache loader seems to be messing with rebuilding
                    // { loader: 'cache-loader' },
                    //
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]/bundle.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    //{ loader: 'style-loader' },
                    {
                      loader: 'fast-sass-loader',
                      // Without doing this cannot find all mixins
                      options: {
                        webpackImporter: false,
                        includePaths: glob.sync(
                          path.join(__dirname, '**/node_modules/@material')
                        ).map((dir) => path.dirname(dir)),
                      }
                    },
                ]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    { loader: 'cache-loader' },
                    {
                        loader: 'babel-loader',
                        options: {

                            query: {
                                presets: ['react', 'es2015'],
                                plugins: ['transform-object-assign']
                            }
                        }
                    },
                ]

                //~ loader: 'babel-loader',
                //~ include: path.resolve(__dirname, 'src'),
                //~ query: {
                    //~ presets: ['es2015'],
                    //~ plugins: ['transform-object-assign']
                //~ }
            }
        ]
    },
    optimization: {
        concatenateModules: false,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    mangle: false,
                    module: true,
                }
            }),
        ],
    },
};
