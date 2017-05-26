import assert from "assert";
const {mutations} = global.requireSrc(__filename).default;

describe("component-states モジュールのテスト", function() {
    describe("mutationsのテスト", function() {
        describe("setDrawerOpenのテスト", function() {
            it("setDrawerOpenにtruthyをセット", function() {
                const state = {drawerOpen: false};
                mutations.setDrawerOpen(state, "data");
                assert.equal(Object.keys(state).toString(), ["drawerOpen"].toString());
                assert(state.drawerOpen);
            });
            it("setDrawerOpenにfalsyをセット", function() {
                const state = {drawerOpen: true};
                let undef;
                mutations.setDrawerOpen(state, undef);
                assert.equal(Object.keys(state).toString(), ["drawerOpen"].toString());
                assert(!state.drawerOpen);
            });
        });
        describe("setDatatableSubheaderのテスト", function() {
            it("setDatatableSubheaderに文字列をセット", function() {
                const state = {datatableSubheader: ""};
                mutations.setDatatableSubheader(state, "New subheader");
                assert.equal(Object.keys(state).toString(), ["datatableSubheader"].toString());
                assert.equal(state.datatableSubheader, "New subheader");
            });
            it("setDatatableSubheaderに空文字をセット", function() {
                const state = {datatableSubheader: "Some Title"};
                mutations.setDatatableSubheader(state, "");
                assert.equal(Object.keys(state).toString(), ["datatableSubheader"].toString());
                assert.strictEqual(state.datatableSubheader, "");
            });
                it("setDatatableSubheaderにnullをセット", function() {
                const state = {datatableSubheader: "Some Title"};
                assert.throws(() => {
                    mutations.setDatatableSubheader(state, null);
                });
                assert.equal(Object.keys(state).toString(), ["datatableSubheader"].toString());
                assert.equal(state.datatableSubheader, "Some Title");
            });
        });
        describe("setDatatableContentのテスト", function() {
            it("setDatatableContentにネストオブジェクトをセット", function() {
                const state = {datatableContent: {}};
                const content = {a: {x: 0, y: 2.8, n: "text"}};
                mutations.setDatatableContent(state, content);
                assert.equal(Object.keys(state).toString(), ["datatableContent"].toString());
                assert.equal(state.datatableContent, content);
            });
            it("setDatatableContentに空のオブジェクトをセット", function() {
                const state = {datatableContent: {a: {x: 0, y: 2.8, n: "text"}}};
                const content = {};
                mutations.setDatatableContent(state, content);
                assert.equal(Object.keys(state).toString(), ["datatableContent"].toString());
                assert.equal(state.datatableContent, content);
            });
            it("setDatatableContentにフラットなオブジェクトをセット", function() {
                const oldContent = {a: {x: 0, y: 2.8, n: "text"}}
                const state = {datatableContent: oldContent};
                const content = {x: 0, y: 2.8, n: "text"};
                assert.throws(() => {
                    mutations.setDatatableContent(state, content);
                });
                assert.equal(Object.keys(state).toString(), ["datatableContent"].toString());
                assert.equal(state.datatableContent, oldContent);
            });
        });
        describe("setDatatableColumnsのテスト", function() {
            it("setDatatableColumnsにValidな配列をセット", function() {
                const state = {datatableColumns: []};
                const columns = [{propertyName: "a", caption: "Cap1"}, {propertyName: "b", caption: "Cap2", optional: 20}];
                mutations.setDatatableColumns(state, columns);
                assert.equal(Object.keys(state).toString(), ["datatableColumns"].toString());
                assert.equal(state.datatableColumns, columns);
            });
            it("setDatatableColumnsにpropertyNameを欠いた配列をセット", function() {
                const oldColumns = [{propertyName: "key", caption: "Cap"}];
                const state = {datatableColumns: oldColumns};
                const columns = [{propertyName: "a", caption: "Cap1"}, {caption: "Cap2", optional: 20}];
                assert.throws(() => {
                    mutations.setDatatableColumns(state, columns);
                });
                assert.equal(Object.keys(state).toString(), ["datatableColumns"].toString());
                assert.equal(state.datatableColumns, oldColumns);
            });
            it("setDatatableColumnsにオブジェクトをセット", function() {
                const oldColumns = [{propertyName: "n", caption: "Caption"}];
                const state = {datatableColumns: oldColumns};
                const columns = {0: {propertyName: "a", caption: "Cap1"}, 1: {propertyName: "b", caption: "Cap2"}};
                assert.throws(() => {
                    mutations.setDatatableColumns(state, columns);
                });
                assert.equal(Object.keys(state).toString(), ["datatableColumns"].toString());
                assert.equal(state.datatableColumns, oldColumns);
            });
        });
    });
});
