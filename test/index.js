// eslint no-console:0

// three.jsのnull文字を含むログがkarma-junit-reporterからXMLStringifyに渡されるとエラーとなるので、null文字をreplaceしておく。
["log", "warn", "error"].map((funcName) => {
    console[funcName + "old"] = console[funcName];
    console[funcName] = function(funcName, ...args) {
        console[funcName + "old"].apply(console, args.map((arg) => ("" + arg)
            .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/g,"_")));
    }.bind(console, funcName);
});

const src = require.context("istanbul-instrumenter-loader?esModules!../src/", true, /\.(vue|js)$/);
const test = require.context("../src/", true, /test_[^\/]*\.spec\.js$/);

src.keys().filter((key) => !key.match(/test_[^\/]*\.spec\.js$/)).forEach(src);
test.keys().forEach(test);
