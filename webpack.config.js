var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "build.js"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
                loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                    scss: "vue-style-loader!css-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules"),
                    sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax&includePaths[]=" + path.resolve(__dirname, "./node_modules")
                }
                // other vue-loader options go here
            }
        }, {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
                presets: ["env"]
            }
        }, {
            test: /\.(png|jpg|gif|svg|ico)$/,
            loader: "file-loader?name=[hash].[ext]"
        }, {
            test: /\.html$/,
            loader: "file-loader?name=[name].[ext]"
        }]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    }
};

if (process.env.NODE_ENV === "production") {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "\"production\""
            }
        })
    ]);
}
