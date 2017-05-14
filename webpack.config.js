var CopyWebpackPlugin = require("copy-webpack-plugin");
var FaviconsWebpackPlugin = require("favicons-webpack-plugin");
var HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var fs = require("fs");
var interpolateName = require("loader-utils").interpolateName;
var webpack = require("webpack");

module.exports = {
    entry: "./src",
    output: {
        path: __dirname + "/dist",
        filename: "build.js"
    },
    module: {
        rules: [{
            //
            // .vue拡張子のファイルは、vue-loaderで読み込みます。
            // <template>タグ、<style>タグ、<script>タグの内容が、HTML、CSS、javascriptとして読み込まれます。
            //
            test: /\.vue$/,
            use: [{
                loader: "vue-loader",
                options: {
                    loaders: {
                        scss: "vue-style-loader!css-loader!sass-loader",
                        sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
                    }
                }
            }]
        }, {
            //
            // .js拡張子のファイルは、babel-loaderで読み込みます。
            // 最新の構文で書かれたスクリプトを、現行のブラウザで解釈できるスクリプトに変換してくれます。
            //
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            }],
            exclude: /node_modules\//
        }, {
            //
            // 画像ファイルは、url-loaderで読み込みます。
            // ファイルの内容がエンコードされ、スクリプト内に埋め込まれます。
            // 32kB以上のファイルは、file-loaderで読み込まれます。
            // ファイル名がハッシュ文字列で置き換えられて配信されます。
            //
            test: /\.(png|jpg|gif|svg|ico)$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 32000,
                    name: "[hash].[ext]"
                }
            }]
        }]
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js" // import vue from "vue" でvue.jsのES Moduleビルドをインポートできます。
        }
    },
    node: {
        __filename: true, // 各モジュール内で、そのモジュール自身の相対パスを__filenameで取得できます。
        __dirname: true // 各モジュール内で、そのモジュールを含むディレクトリの相対パスを__dirnameで取得できます。
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true
    },
    devtool: process.env.NODE_ENV !== "production" && "cheap-module-eval-source-map",
    plugins: [
        //
        // スクリプト内の変数を環境変数で置き換えます。
        // 本番build時には、NODE_ENV=production と、FirebaseのIDやKEYが設定されます。
        // 下記デフォルト値はテスト用のダミー変数です。
        //
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development",
            FB_APIKEY: "AIzaSyD_xT2uE82MaQL08P_BshM-q7bbPMejlWE",
            FB_AUTHDOMAIN: "",
            FB_DATABASEURL: "",
            FB_PROJECTID :"",
            FB_STORAGEBUCKET: "",
            FB_MESSAGINGSENDERID: "",
        }),
        //
        // EJSテンプレートからindex.htmlを作成します。
        // サイトにアクセスした時、最初に読み込まれるHTMLファイルになります。
        //
        new HtmlWebpackPlugin({
            template: "./src/index.ejs"
        }),
        //
        // 画像ファイルからマルチブラウザ対応のfaviconを生成します。
        // 生成されたfaviconへのリンクがindex.htmlの<head>タグ内に挿入されます。
        //
        new FaviconsWebpackPlugin({
            logo: "./resources/logo.png"
        })
    ].concat([
        //
        // リソースをコピーして配信します。
        // .jsファイルと.cssファイルへのリンクがindex.htmlに自動的に挿入されます。
        //
            "material-components-web/dist/material-components-web.min.css"
        //
        ].reduce(function(prev, curr) {
            var filename = interpolateName({
                resourcePath: require.resolve(curr)
            },
            // 配信ファイル名のパターン（file-loaderの記述方法が使えます。）
            "[hash].[ext]"
            //
            , {content: fs.readFileSync(require.resolve(curr))});
            prev[0].push({from: require.resolve(curr), to: filename});
            prev[1].assets.push(filename);
            return prev;
        }, [[], {
            assets: [],
            // リンク挿入時のオプション（HTML Webpack Include Assets Plugin）
            append: true,
            hash: true
            //
        }]).map(function(options, i) {
            return new ([
                CopyWebpackPlugin,
                HtmlWebpackIncludeAssetsPlugin
            ][i])(options);
        })
    )
};
