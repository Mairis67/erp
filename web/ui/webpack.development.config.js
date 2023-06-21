const path = require('path');

module.exports = {
    entry: {
        // entries
    },
    output: {
        path: "/home/kristaps/Development/TikiTakaPayWeb/web/static",
        filename: '[name]/bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [

                    { loader: 'cache-loader' },

                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]/bundle.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'fast-sass-loader',
                        options: {
                            includePaths: ['./node_modules'],
                        }
                    }
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
                                presets: ['es2015'],
                                plugins: ['transform-object-assign']
                            }
                        }
                    },
                ]
            }
        ]
    },
};
