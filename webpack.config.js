/*eslint-env node */

var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

module.exports = {
    context: __dirname + "/src",
    entry: "./entry.js",
    output: {
        path: __dirname + "/dest",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: [__dirname + "/node_modules"]
                }
            }]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [{
                loader: "file-loader"
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Frame | 1stop-st.org",
            favicon: "favicon.ico"
        }),
        new HtmlWebpackExternalsPlugin([{
            name: "jquery",
            var: "jQuery",
            path: "jquery/dist/jquery.min.js"
        }, {
            name: "w2ui",
            var: "w2ui",
            path: "w2ui/w2ui.min.js"
        }, {
            name: "w2ui.css",
            path: "w2ui/w2ui.min.css"
        }], {
            basedir: __dirname
        })
    ]
};
