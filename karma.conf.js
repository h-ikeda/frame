module.exports = function(config) {
    //
    // BrowserStackの設定をkarma-browsers.jsから読み込みます。
    //
    var customLaunchers = {};
    var browsers = require("./karma-browsers").map(function(cap) {
        // baseプロパティにBrowserStackを設定（karma-browserstack-launcher)。
        cap.base = "BrowserStack";
        // テストブラウザ名は設定内容から自動生成します。
        var browser = "device" in cap ? cap.device:
            cap.browser + " " +
            cap.browser_version + " on " +
            cap.os + " " +
            cap.os_version + " resolution:" +
            cap.resolution;
        customLaunchers[browser] = cap;
        return browser;
    }).filter(function(_, index) {
        // CircleCI上でパラレルテストが有効なとき、テストブラウザを分散します。
        return process.env.CIRCLE_NODE_TOTAL < 2 || index % process.env.CIRCLE_NODE_TOTAL === parseInt(process.env.CIRCLE_NODE_INDEX);
    });
    //
    // Karmaの設定。
    //
    config.set({
        // Framework: mocha
        frameworks: ["mocha"],
        reporters: ["mocha"],
        // テストエントリファイル
        files: ["test/test_index.js"],
        // バンドラを設定（webpack）
        // 設定はwebpack.config.jsを読み込む（karma-webpack）
        preprocessors: {
            "test/test_index.js": ["webpack", "sourcemap"]
        },
        webpack: require("./webpack.config"),
        // auto watch時にテストとバンドルのタイミングを自動調整してくれる。
        beforeMiddleware: ["webpackBlocker"],
        // firebaseのモックサーバー（karma-firebase-server）
        middleware: ["firebaseServer"],
        // ブラウザの同時接続数。BrowserStack使用時は1ブラウザずつに制限する。
        concurrency: process.env.BS_USERNAME && process.env.BS_AUTHKEY ? 1: Infinity,
        // BrowserStackのユーザーIDとパスキーが設定されていればBrowserStack用の設定を使う。
        browsers: process.env.BS_USERNAME && process.env.BS_AUTHKEY ? browsers: [],
        // BrowserStack用の設定（karma-browserstack-launcher）
        browserStack: {
            username: process.env.BS_USERNAME,
            accessKey: process.env.BS_AUTHKEY,
            project: (process.env.CIRCLE_PROJECT_REPONAME || "frame") + "_" + (process.env.CIRCLE_BRANCH || require("child_process").execSync("git branch | grep \\* | cut -d \" \" -f2-")),
            build: process.env.CIRCLE_BUILD_NUM || Date.now()
        },
        customLaunchers: customLaunchers
    });
};
