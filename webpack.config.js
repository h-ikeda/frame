/*eslint-env node */

var BabiliPlugin = require("babili-webpack-plugin");
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
                loader: "url-loader"
            }]
        }]
    },
    plugins: [
        new BabiliPlugin(),
        new HtmlWebpackPlugin({
            title: "Frame | 1stop-st.org",
            favicon: "favicon.ico",
            minify: {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                sortAttributes: true,
                sortClassName: true,
                useShortDoctype: true
            }
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
        }, {
            name: "Solufa",
            var: "S",
            path: "solufa/static/js/Solufa.min.js"
        }, {
            name: "Solufa-OrbitVp",
            path: "solufa/static/components/Solufa-OrbitVp.js"
        }], {
            basedir: __dirname
        })
    ]
};
