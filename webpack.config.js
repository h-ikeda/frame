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
                    scss: "vue-style-loader!css-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules"),
                    sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax&includePaths[]=" + path.resolve(__dirname, "./node_modules")
                }
            }
        }, {
            test: /\.js$/,
            loader: "babel-loader?presets[]=env",
            exclude: /node_modules/
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
        disableHostCheck: true
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "\"" + process.env.NODE_ENV + "\""
            }
        })
    ]
};

if (process.env.NODE_ENV === "production") {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "\"production\""
            }
        })
    ];
}