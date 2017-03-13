/*eslint-env node, mocha*/
/*global browser*/

var assert = require("assert");

describe("アプリの読み込みと表示", function() {
    it("タイトルは「Frame | 1stop-st.org」", function () {
        browser
            .url("http://127.0.0.1:8080")
            .pause(5000);
        assert(browser.getTitle().match(/Frame | 1stop-st.org/i));
    });
});
